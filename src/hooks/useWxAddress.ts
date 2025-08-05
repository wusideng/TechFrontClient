// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getAddressManual, saveUserAddress } from "@/store/slices/addressSlice";
// import { getDeviceType } from "@/util/wxUtil";

// //微信定位获取坐标，然后调用高德restapi获取地址
// const useInitAddress = () => {
//   const location = useLocation();
//   const dispatch = useAppDispatch();
//   const { user } = useAppSelector((state) => state.user);
//   const [addressSaved, setAddressSaved] = useState(false);
//   const { address, wxcoord, wx_api_ticket } = useAppSelector((state) => state.address
//   );
//   useEffect((: any) => {
//     if (
//       address &&
//       address.component &&
//       user.openid &&
//       wxcoord.lon &&
//       wxcoord.lat &&
//       !addressSaved
//     ) {
//       dispatch(
//         saveUserAddress(wxcoord.lon, wxcoord.lat, user.openid, address)
//       ).then((: any) => {
//         setAddressSaved(true);
//       });
//     }
//   }, [address, user, wxcoord]);
//   //通过微信获取经纬度，再通过其他api获取地址详细信息, 最终保存到redux userReducer address
//   const getLBSAddressHandler = async () => {
//     if (wx_api_ticket.appId != "" && JSON.stringify(address) !== "{}") {
//       return;
//     }
//     await dispatch(getAddressManual(window.location.href));
//   };

//   useEffect((: any) => {
//     if (!address.addressComponent) {
//       const deviceType = getDeviceType();
//       if (deviceType == "IOS") {
//         //ios地址必须在登录前获取
//         getLBSAddressHandler();
//       }
//     }
//   }, [location.pathname, address]);
//   useEffect((: any) => {
//     if (!address.addressComponent) {
//       const deviceType = getDeviceType();
//       //安卓地址必须在登录后获取
//       if (user.openid && deviceType == "Android") {
//         getLBSAddressHandler();
//       }
//     }
//   }, [location.pathname, user, address]);

//   return null;
// };
// export default useInitAddress;
