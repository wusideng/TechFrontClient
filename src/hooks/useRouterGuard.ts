import { trackUserBehaviorApi } from "@/api/userApi";
import { useAppDispatch, useAppSelector } from "@/store";
import { clearUserAddressFormData } from "@/store/slices/addressManagementSlice";
import { baseUrl } from "@/util/config";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useRouterGuard = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { routerLocation } = useAppSelector((state) => state.router);
  const { user } = useAppSelector((state) => state.user);
  const { current, previous } = routerLocation;
  const trackUserBehavior = () => {
    const params: { url: string; user_openid?: string } = {
      url: window.location.href,
    };
    if (user?.openid) {
      params.user_openid = user.openid;
    }
    trackUserBehaviorApi(params);
  };
  useEffect(() => {
    console.log(`${previous}->${current}`);
    const addEditAddressRoutePattern = new RegExp(
      `^/${baseUrl}/user/address/(add|edit/\\d+)$`
    );
    if (
      addEditAddressRoutePattern.test(previous) &&
      current !== `/${baseUrl}/user/address/selectpoi`
    ) {
      dispatch(clearUserAddressFormData());
    }
    // if (current == `/${baseUrl}/order` || current == `/${baseUrl}/order/`) {
    //   dispatch(clearOrderDetail());
    // }
    trackUserBehavior();
  }, [current, previous]);
};

export default useRouterGuard;
