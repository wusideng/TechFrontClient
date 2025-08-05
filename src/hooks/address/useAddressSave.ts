import { saveUserAddress } from "@/store/slices/addressSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";

const useAddressSave = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const {
    address,
    is_address_saved_before_login,
    is_address_saved_after_login,
  } = useAppSelector((state) => state.address);
  useEffect(() => {
    if (
      address &&
      address.lon &&
      address.lat &&
      ((!is_address_saved_before_login && !user.openid) ||
        (!is_address_saved_after_login && user.openid))
    ) {
      dispatch(
        saveUserAddress({
          lon: address.lon,
          lat: address.lat,
          userOpenid: user?.openid,
          address,
        })
      );
    }
  }, [address, user]);
};
export default useAddressSave;
