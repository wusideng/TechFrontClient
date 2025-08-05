// import {
//   addUserAddressApi,
//   deleteUserAddressApi,
//   getUserAddressesApi,
//   getUserDefaultAddressApi,
//   updateUserAddressApi,
// } from "@/api/addressManagementApi";
// import { POI, POIformatted, UserAddress } from "@/types/AddressManagement";

// export const GET_USER_ADDRESSES_REQUEST = "GET_USER_ADDRESSES_REQUEST";
// export const GET_USER_ADDRESSES_SUCCESS = "GET_USER_ADDRESSES_SUCCESS";
// export const GET_USER_ADDRESSES_FAILURE = "GET_USER_ADDRESSES_FAILURE";

// export const GET_USER_DEFAULT_ADDRESS_REQUEST =
//   "GET_USER_DEFAULT_ADDRESS_REQUEST";
// export const GET_USER_DEFAULT_ADDRESS_SUCCESS =
//   "GET_USER_DEFAULT_ADDRESS_SUCCESS";
// export const GET_USER_DEFAULT_ADDRESS_FAILURE =
//   "GET_USER_DEFAULT_ADDRESS_FAILURE";

// export const ADD_USER_ADDRESS_REQUEST = "ADD_USER_ADDRESS_REQUEST";
// export const ADD_USER_ADDRESS_SUCCESS = "ADD_USER_ADDRESS_SUCCESS";
// export const ADD_USER_ADDRESS_FAILURE = "ADD_USER_ADDRESS_FAILURE";

// export const UPDATE_USER_ADDRESS_REQUEST = "UPDATE_USER_ADDRESS_REQUEST";
// export const UPDATE_USER_ADDRESS_SUCCESS = "UPDATE_USER_ADDRESS_SUCCESS";
// export const UPDATE_USER_ADDRESS_FAILURE = "UPDATE_USER_ADDRESS_FAILURE";

// export const DELETE_USER_ADDRESS_REQUEST = "DELETE_USER_ADDRESS_REQUEST";
// export const DELETE_USER_ADDRESS_SUCCESS = "DELETE_USER_ADDRESS_SUCCESS";
// export const DELETE_USER_ADDRESS_FAILURE = "DELETE_USER_ADDRESS_FAILURE";

// export const SET_USER_ADDRESS_FORM_DATA = "SET_USER_ADDRESS_FORM_DATA";
// export const CLEAR_USER_ADDRESS_FORM_DATA = "CLEAR_USER_ADDRESS_FORM_DATA";
// export const SELECT_POI = "SELECT_POI";

// // export const selectPoi = (location: POIformatted) => ({
// //   type: SELECT_POI,
// //   payload: location,
// // });

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

// // 获取用户地址列表
// // export const getUserAddresses = (openid: string) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: GET_USER_ADDRESSES_REQUEST });
// //     try {
// //       const data = await getUserAddressesApi(openid);
// //       dispatch({ type: GET_USER_ADDRESSES_SUCCESS, payload: data });
// //     } catch (error) {
// //       dispatch({ type: GET_USER_ADDRESSES_FAILURE, payload: error.message });
// //     }
// //   };
// // };
// // export const getUserDefaultAddress = (openid: string) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: GET_USER_DEFAULT_ADDRESS_REQUEST });
// //     try {
// //       const data = await getUserDefaultAddressApi(openid);
// //       dispatch({ type: GET_USER_DEFAULT_ADDRESS_SUCCESS, payload: data });
// //     } catch (error) {
// //       dispatch({
// //         type: GET_USER_DEFAULT_ADDRESS_FAILURE,
// //         payload: error.message,
// //       });
// //     }
// //   };
// // };
// // 添加用户地址
// // export const addUserAddress = (address: any) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: ADD_USER_ADDRESS_REQUEST });
// //     try {
// //       const data = await addUserAddressApi(address);
// //       dispatch({ type: ADD_USER_ADDRESS_SUCCESS, payload: data });
// //     } catch (error) {
// //       dispatch({ type: ADD_USER_ADDRESS_FAILURE, payload: error.message });
// //     }
// //   };
// // };

// // 更新用户地址
// export const updateUserAddress = (
//   addressId: number,
//   updatedAddress: UserAddress
// ) => {
//   return async (dispatch: any) => {
//     dispatch({ type: UPDATE_USER_ADDRESS_REQUEST });
//     try {
//       const data = await updateUserAddressApi(addressId, updatedAddress);
//       dispatch({ type: UPDATE_USER_ADDRESS_SUCCESS, payload: data });
//     } catch (error) {
//       dispatch({ type: UPDATE_USER_ADDRESS_FAILURE, payload: error.message });
//     }
//   };
// };

// // 删除用户地址
// export const deleteUserAddress = (addressId: any) => {
//   return async (dispatch: any) => {
//     dispatch({ type: DELETE_USER_ADDRESS_REQUEST });
//     try {
//       await deleteUserAddressApi(addressId);
//       dispatch({ type: DELETE_USER_ADDRESS_SUCCESS, payload: addressId });
//     } catch (error) {
//       dispatch({ type: DELETE_USER_ADDRESS_FAILURE, payload: error.message });
//     }
//   };
// };

// export const setUserAddressFormData = (address: UserAddress) => {
//   return { type: SET_USER_ADDRESS_FORM_DATA, payload: address };
// };
// export const clearUserAddressFormData = () => {
//   return { type: CLEAR_USER_ADDRESS_FORM_DATA };
// };
