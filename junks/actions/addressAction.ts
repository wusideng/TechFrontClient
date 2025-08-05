// import { addClientUserPositionApi } from "@/api/addressApi";
// // import mockAddress from "@/lib/mockAddressjc.json";
// import { POIformatted } from "@/types/AddressManagement";

// export const SAVE_USER_ADDRESS_REQUEST = "SAVE_USER_ADDRESS_REQUEST";
// export const SAVE_USER_ADDRESS_SUCCESS = "SAVE_USER_ADDRESS_SUCCESS";
// export const SAVE_USER_ADDRESS_FAILURE = "SAVE_USER_ADDRESS_FAILURE";

// // export const LOAD_JSAPITICKET_REQUEST = "LOAD_JSAPITICKET_REQUEST";
// // export const LOAD_JSAPITICKET_SUCCESS = "LOAD_JSAPITICKET_SUCCESS";
// // export const LOAD_JSAPITICKET_FAILURE = "LOAD_JSAPITICKET_FAILURE";
// // export const LOAD_LBSADDRESS_REQUEST = "LOAD_LBSADDRESS_REQUEST";
// // export const LOAD_LBSADDRESS_SUCCESS = "LOAD_LBSADDRESS_SUCCESS";
// // export const LOAD_LBSADDRESS_FAILURE = "LOAD_LBSADDRESS_FAILURE";
// // export const LOAD_PATHANALYSIS_REQUEST = "LOAD_PATHANALYSIS_REQUEST";
// // export const LOAD_PATHANALYSIS_SUCCESS = "LOAD_PATHANALYSIS_SUCCESS";
// // export const LOAD_PATHANALYSIS_FAILURE = "LOAD_PATHANALYSIS_FAILURE";

// // export const LOAD_LBSADDRESSPOI_REQUEST = "LOAD_LBSADDRESSPOI_REQUEST";
// // export const LOAD_LBSADDRESSPOI_SUCCESS = "LOAD_LBSADDRESSPOI_SUCCESS";
// // export const LOAD_LBSADDRESSPOI_FAILURE = "LOAD_LBSADDRESSPOI_FAILURE";

// export const SET_MOCK_CITY = "SET_MOCK_CITY";
// export const SET_COORD = "SET_COORD";
// export const SET_MOCK_ADDRESS = "SET_MOCK_ADDRESS";
// export const SET_GAODE_ADDRESS = "SET_GAODE_ADDRESS";
// export const LOAD_GAODE_ADDRESS_FAILURE = "LOAD_GAODE_ADDRESS_FAILURE";

// // export const setMockAddress = () => ({
// //   type: SET_MOCK_ADDRESS,
// //   payload: mockAddress,
// // });

// //高德地址
// // export const setGaodeAddress = (address: POIformatted) => ({
// //   type: SET_GAODE_ADDRESS,
// //   payload: address,
// // });

// // 更新用户信息，用于dev环境修改城市；

// // export const setMockCity = (city: any) => ({
// //   type: SET_MOCK_CITY,
// //   payload: city,
// // });

// // export const saveUserAddress = (
// //   lon: number,
// //   lat: number,
// //   openid: string,
// //   address: POIformatted
// // ) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: SAVE_USER_ADDRESS_REQUEST });
// //     try {
// //       let clientUserPosition = {
// //         client_user_id: openid,
// //         lon: lon,
// //         lat: lat,
// //         address:
// //           address.province +
// //             address.city +
// //             address.district +
// //             address.street +
// //             address.region || "默认地址",
// //         city: address.city || "默认城市",
// //         detail_address: "",
// //       };

// //       // 增加客户位置信息
// //       const position = await addClientUserPositionApi(clientUserPosition);
// //       dispatch({ type: SAVE_USER_ADDRESS_SUCCESS, payload: position });
// //     } catch (error) {
// //       dispatch({ type: SAVE_USER_ADDRESS_FAILURE, payload: error.message });
// //     }
// //   };
// // };

// // 详细地址
// // export const getLBSAddress = (lon: any, lat: any) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_LBSADDRESS_REQUEST });
// //     try {
// //       const address = await fetchLBSAddress(lon, lat);
// //       dispatch({
// //         type: LOAD_LBSADDRESS_SUCCESS,
// //         payload: address.data.regeocode,
// //       });
// //     } catch (error) {
// //       dispatch({ type: LOAD_LBSADDRESS_FAILURE, payload: error.message });
// //     }
// //   };
// // };

// // //路径分析： 起始地 lon1, lat1 目的地 lon2，lat2
// // export const getPathAnalysis = (lon1: any, lat1: any, lon2: any, lat2: any) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_PATHANALYSIS_REQUEST });
// //     try {
// //       const path = await fetchPathAnalysis(lon1, lat1, lon2, lat2);
// //       const info = path?.data?.info;
// //       if (info == "ROUTE_FAIL") {
// //         throw new Error("路径获取失败");
// //       }
// //       dispatch({ type: LOAD_PATHANALYSIS_SUCCESS, payload: path.data.route });
// //     } catch (error) {
// //       console.error("get path error:", error);
// //       dispatch({ type: LOAD_PATHANALYSIS_FAILURE, payload: error });
// //     }
// //   };
// // };
// // 微信JSAPI
// //warning 此方法目前没用到
// // export const getJsapiTicket = (url: any) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_JSAPITICKET_REQUEST });
// //     try {
// //       const jspApiTicket = await fetchJsapiTicket(url);
// //       dispatch({ type: LOAD_JSAPITICKET_SUCCESS, payload: jspApiTicket });
// //     } catch (error) {
// //       dispatch({ type: LOAD_JSAPITICKET_FAILURE, payload: error.message });
// //     }
// //   };
// // };

// // 位置手动刷新(登陆)
// // export const getAddressManual = (url: any) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_JSAPITICKET_REQUEST });
// //     try {
// //       // 微信模块jsapi注册
// //       const jspApiTicket = await fetchJsapiTicket(url);
// //       dispatch({ type: LOAD_JSAPITICKET_SUCCESS, payload: jspApiTicket });
// //       wx.config({
// //         appId: jspApiTicket.appId,
// //         timestamp: jspApiTicket.timestamp,
// //         nonceStr: jspApiTicket.nonceStr,
// //         signature: jspApiTicket.signature,
// //         jsApiList: ["getLocation"],
// //       });
// //       wx.ready(function () {
// //         wx.getLocation({
// //           type: "wgs84",
// //           success: function (res) {
// //             const latitude = res.latitude;
// //             const longitude = res.longitude;
// //             dispatch(
// //               setCoordinate({
// //                 lat: latitude,
// //                 lon: longitude,
// //               })
// //             );
// //             // if (
// //             //   !window.location.href.includes("phoneLogin") &&
// //             //   !window.location.href.includes("login")
// //             // ) {
// //             //   Toast.show({
// //             //     content: "位置已更新！",
// //             //   });
// //             // }

// //             console.log("位置更新：", longitude, latitude);
// //             dispatch(getLBSAddress(longitude, latitude));
// //           },
// //           fail: function (err) {
// //             console.error(err);
// //             // if (
// //             //   !window.location.href.includes("phoneLogin") &&
// //             //   !window.location.href.includes("login")
// //             // ) {
// //             //   Toast.show({
// //             //     content: `获取位置失败，请手动刷新`,
// //             //   });
// //             // }
// //             if (isDev) {
// //               dispatch(setMockAddress()); // 设置模拟地址
// //             }
// //           },
// //         });
// //       });
// //     } catch (error) {
// //       if (isDev) {
// //         dispatch(setMockAddress()); // 设置模拟地址
// //       }
// //       console.error(error);
// //       dispatch({ type: LOAD_JSAPITICKET_FAILURE, payload: error.message });
// //     }
// //   };
// // };
