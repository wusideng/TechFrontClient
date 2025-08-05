import React, { useEffect, useLayoutEffect, useState } from "react";
import Page from "./Page";
import { useParams } from "react-router-dom";
import {
  clearTechDetail,
  getTechUserDetail,
} from "@/store/slices/techUserSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { POIformatted } from "@/types/AddressManagement";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
const Loading = () => {
  return (
    <MiddleContentHeader title="技师详情" loading={true} withFooter={false}>
      <></>
    </MiddleContentHeader>
  );
};

const Layout = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id?: string }>();
  const { id } = params;
  const { address }: { address: POIformatted } = useAppSelector(
    (state) => state.address
  );
  const [loading, setLoading] = useState(true);
  useLayoutEffect(() => {
    dispatch(clearTechDetail());
  }, []);
  useEffect(() => {
    //有些详细信息，如照片地址等，不在techusers 中，需要单独获取
    const init = async () => {
      await dispatch(
        getTechUserDetail({ user_id: id, lon: address?.lon, lat: address?.lat })
      );
      setLoading(false);
    };
    init();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return <Page />;
};
export default Layout;
