import { useAppDispatch, useAppSelector } from "@/store";
import { clearOrderDetail, getOrder } from "@/store/slices/orderSlice";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Page from "./Page";
import MiddleContentTab from "@/components/layout/MiddleContentTab";
const Loading = () => {
  return (
    <MiddleContentTab loading={true} withFooter={false}>
      <></>
    </MiddleContentTab>
  );
};
const Layout = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const params = useParams<{ id?: string }>();
  const { order } = useAppSelector((state) => state.order);

  const { id } = params;
  // 初始化加载订单详情
  useEffect(() => {
    const init = async () => {
      if (!order.order_id) {
        await dispatch(getOrder(id));
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    init();
    return () => {
      dispatch(clearOrderDetail());
    };
  }, []);
  if (loading) return <Loading />;
  return <Page />;
};
export default Layout;
