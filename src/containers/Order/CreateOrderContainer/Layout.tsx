import { useEffect, useState } from "react";
import Page from "./Page";
import { NewOrder } from "@/types/NewOrder";
import { initOrder } from "@/store/slices/orderSlice";
import { baseUrl, default_travel_time_seconds } from "@/util/config";
import { UserAddress } from "@/types/AddressManagement";
import { getUserDefaultAddressApi } from "@/api/addressManagementApi";
import Loading from "./Loading";
import { useAppDispatch, useAppSelector } from "@/store";
import { useLocation } from "react-router-dom";
const previousLocationNoInitOrder: string[] = [
  `/${baseUrl}/ordercreate/coupon`,
  `/${baseUrl}/ordercreate/servicetime`,
  `/${baseUrl}/user/address`,
];
const Layout = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { productCount } = useAppSelector((state) => state.order);

  const { product } = useAppSelector((state) => state.product);
  const { techuser } = useAppSelector((state) => state.techuser);
  const { routerLocation } = useAppSelector((state) => state.router);
  const { previous, current } = routerLocation;
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const productcount = new URLSearchParams(location.search).get("productcount");
  //init order
  //uselayouteffect只能执行同步操作，这里有异步操作，所以用useeffect代替
  useEffect(() => {
    const init = async () => {
      const otherInfo = {
        couponAmount: 0,
        productCount: productcount ? parseInt(productcount) : 1,
        orderTaxiCost: 0,
        travelTime: default_travel_time_seconds, //默认90秒
      };
      setLoading(true);
      const address: UserAddress = await getUserDefaultAddressApi(user.openid);
      let newOrder: NewOrder = {
        client: { ...user },
        orderServiceAddress: address,
        tech: { ...techuser },
        product,
        otherInfo,
      };
      dispatch(initOrder(newOrder));
      setLoading(false);
    };
    if (current == `/${baseUrl}/order/create`) {
      if (!previousLocationNoInitOrder.includes(previous)) {
        init();
      } else {
        setLoading(false);
      }
    }
  }, [previous, current]);
  if (loading) {
    return <Loading />;
  }
  return <Page />;
};
export default Layout;
