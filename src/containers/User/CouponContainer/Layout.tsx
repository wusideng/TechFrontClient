import { useAppDispatch, useAppSelector } from "@/store";
import Page from "./Page";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { useEffect, useState } from "react";
import { clearCoupons, getCoupons } from "@/store/slices/orderSlice";
const Loading = () => {
  return (
    <MiddleContentHeader
      title="尚达元.优惠券"
      loading={true}
      withFooter={false}
    >
      <></>
    </MiddleContentHeader>
  );
};
const Layout = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const init = async () => {
      const open_id = user.openid;
      await dispatch(getCoupons(open_id));
      setLoading(false);
    };
    init();
    return () => {
      clearCoupons();
    };
  }, []);
  if (loading) {
    return <Loading />;
  }
  return <Page />;
};
export default Layout;
