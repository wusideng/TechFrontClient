import { getTechListApi } from "@/api/techuserApi";
import InfiniteScrollLoader from "@/components/InfiniteScroll";
import { useAppDispatch, useAppSelector } from "@/store";
import { setTechUsers } from "@/store/slices/techUserSlice";
import { TechUser } from "@/types/Tech";
import { useEffect, useMemo } from "react";
import styles from "./style.module.less";
import TechItem from "@/components/tech/TechItem";
import { Product } from "@/types/Product";

const TechList = ({
  orderBy,
  techuserName,
  product = null,
}: {
  orderBy: string;
  techuserName: string;
  product?: Product | null;
}) => {
  const { techusers } = useAppSelector((state) => state.techuser);
  const { mockcity, address } = useAppSelector((state) => state.address);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const memorizedWatchData = useMemo(() => {
    return [orderBy, techuserName, product?.product_id];
  }, [orderBy, techuserName, product?.product_id]);

  const loadMoreData = async (
    pageNumber: number,
    pageSize: number,
    signal: AbortSignal
  ) => {
    const res = await getTechListApi({
      lon: address?.lon,
      lat: address?.lat,
      city: mockcity ? mockcity : address.city,
      user_openid: user?.openid,
      orderBy,
      name: techuserName,
      pageNumber,
      pageSize,
      signal,
      product_id: product?.product_id,
    });

    return res;
  };
  return (
    <InfiniteScrollLoader
      data={techusers}
      loadMoreApi={loadMoreData}
      watchData={memorizedWatchData}
      setDataAction={(data: TechUser[]) => {
        dispatch(setTechUsers(data));
      }}
      emptyDescription="暂无技师"
    >
      <div className={styles.tech_item_list_wrapper}>
        {techusers.map((techuser: TechUser, index: number) => (
          <TechItem key={index} techuser={techuser} />
        ))}
      </div>
    </InfiniteScrollLoader>
  );
};
export default TechList;
