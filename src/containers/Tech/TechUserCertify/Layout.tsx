import React, { useEffect, useLayoutEffect, useState } from "react";
import Page from "./Page";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { clearProductDetail, selectProduct } from "@/store/slices/productSlice";
import MiddleContentTab from "@/components/layout/MiddleContentTab";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";

const Layout = () => {
  const params = useParams<{ id?: string }>();
  const [loading, setLoading] = useState(true);
  const { id } = params;
  const dispatch = useAppDispatch();

  useEffect(() => {
    //test code
    //todo delete this code
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // dispatch(getTechUserCertify(id));
  }, []);
  if (loading) {
    return (
      <MiddleContentHeader title="商户信息" loading={true}>
        <></>
      </MiddleContentHeader>
    );
  }
  return <Page />;
};
export default Layout;
