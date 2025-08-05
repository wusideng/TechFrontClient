// import {
//   fetchUserInfoByWxCode,
//   fetchUserInfoByOpenId,
//   updateUserPhoneApi,
//   // updateUserQrCodeApi,
// } from "@/api/userApi";
// import mockUserPhone from "@/lib/mockUserPhonejc.json";
// import { Dispatch } from "redux";
// import { ClientUser } from "@/types/ClientUser";

// export const LOAD_USERINFO_REQUEST = "LOAD_USERINFO_REQUEST";
// export const LOAD_USERINFO_SUCCESS = "LOAD_USERINFO_SUCCESS";
// export const LOAD_USERINFO_FAILURE = "LOAD_USERINFO_FAILURE";

// export const LOAD_UPDATE_USERPHONE_REQUEST = "LOAD_UPDATE_USERPHONE_REQUEST";
// export const LOAD_UPDATE_USERPHONE_SUCCESS = "LOAD_UPDATE_USERPHONE_SUCCESS";
// export const LOAD_UPDATE_USERPHONE_FAILURE = "LOAD_UPDATE_USERPHONE_FAILURE";

// // export const SET_WX_CODE = "SET_WX_CODE";
// // export const SET_DEVICE = "SET_DEVICE";
// export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
// export const SET_USER = "SET_USER";
// export const SET_INVITECODE = "SET_INVITECODE";
// export const SET_MOCK_USER = "SET_MOCK_USER";
// export const SET_MOCK_USER_PHONE = "SET_MOCK_USER_PHONE";
// export const LOGOUT = "LOGOUT";

// export const logout = () => ({
//   type: LOGOUT,
//   payload: {},
// });

// // 用于网页调试 MOCK 微信的呢狗
// export const setMockUserDefault = () => ({
//   type: SET_MOCK_USER,
//   data: {
//     headimgurl:
//       "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKbWwpicJhyAcYbb40Yg1lboeYv9cb2pxcjVxWzECMGyAlUxiaAKgD6iaoMVBuhvdgvZmueabJBl5RuQ/132",
//     user_id: 7,
//     user_pwd: "string",
//     user_age: 0,
//     user_photo:
//       "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKbWwpicJhyAcYbb40Yg1lboeYv9cb2pxcjVxWzECMGyAlUxiaAKgD6iaoMVBuhvdgvZmueabJBl5RuQ/132",
//     user_city: "string",
//     user_grade: 0,
//     user_be_report: "string",
//     user_phone: "",
//     user_nickname: "xyz",
//     user_sex: "string",
//     openid: "oK9p06eiEk0jWNvowVjb5lGlkocM",
//     user_location: "string",
//     user_be_blacklist: "string",
//   },
// });

// // 返回带手机号码的客户信息
// export const setMockUser = () => ({
//   type: SET_MOCK_USER_PHONE,
//   payload: mockUserPhone,
// });

// 微信认证
// export const setWxcode = (code: any) => ({
//   type: SET_WX_CODE,
//   payload: code,
// });

// 设备信息
// export const setDevice = (device: any) => ({
//   type: SET_DEVICE,
//   payload: device,
// });

// 邀请码
// export const setInviteCode = (code: any) => ({
//   type: SET_INVITECODE,
//   payload: code,
// });

// 更新用户信息，用于dev环境修改城市；
// export const setUser = (user: any) => ({
//   type: SET_USER,
//   payload: user,
// });

// 微信身份信息
// export const getUserInfoByWxCode = (code: any, invite_code: any) => {
//   return async (dispatch: Dispatch) => {
//     dispatch({ type: LOAD_USERINFO_REQUEST });
//     try {
//       const user = await fetchUserInfoByWxCode(code, invite_code);
//       dispatch({ type: LOAD_USERINFO_SUCCESS, payload: user });
//       return user;
//     } catch (error) {
//       dispatch({
//         type: LOAD_USERINFO_FAILURE,
//         payload: error?.message,
//       });
//       throw new Error(error);
//     }
//   };
// };
// export const getUserInfoByOpenId = () => {
//   return async (dispatch: any) => {
//     dispatch({ type: LOAD_USERINFO_REQUEST });
//     try {
//       const user: ClientUser = await fetchUserInfoByOpenId();
//       dispatch({ type: LOAD_USERINFO_SUCCESS, payload: user });
//       // return user;
//     } catch (error) {
//       dispatch({ type: LOAD_USERINFO_FAILURE, payload: error?.message });
//       throw new Error(error);
//     }
//   };
// };

// 修改用户手机号码
// export const updateUserPhone = (param: any) => {
//   return async (dispatch: any) => {
//     dispatch({ type: LOAD_UPDATE_USERPHONE_REQUEST });
//     try {
//       const user = await updateUserPhoneApi(param);
//       dispatch({ type: LOAD_UPDATE_USERPHONE_SUCCESS, payload: user });
//     } catch (error) {
//       dispatch({ type: LOAD_UPDATE_USERPHONE_FAILURE, payload: error.message });
//     }
//   };
// };

// 保存客户的邀请码（引流码）
// export const updateUserQrCode = (param: any) => {
//   return async (dispatch: any) => {
//     dispatch({ type: LOAD_UPDATE_USERPHONE_REQUEST });
//     try {
//       const user = await updateUserQrCodeApi(param);
//       dispatch({ type: LOAD_UPDATE_USERPHONE_SUCCESS, payload: user });
//     } catch (error) {
//       dispatch({ type: LOAD_UPDATE_USERPHONE_FAILURE, payload: error.message });
//     }
//   };
// };
