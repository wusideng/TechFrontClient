// // src/actions/userActions.js
// import {
//   fetchTechUserDetail,
//   fetchTechUserProducts,
//   getTechUsersByDiscApi,
//   getTechUsersByRateApi,
// } from "@/api/techuserApi"; // 假设你有一个 API 模块
// import { isDev } from "@/util/config";

// export const LOAD_TECHUSERS_REQUEST = "LOAD_TECHUSERS_REQUEST";
// export const LOAD_TECHUSERS_SUCCESS = "LOAD_TECHUSERS_SUCCESS";
// export const LOAD_TECHUSERS_FAILURE = "LOAD_TECHUSERS_FAILURE";
// export const LOAD_TECHUSERDETAIL_REQUEST = "LOAD_TECHUSERDETAIL_REQUEST";
// export const LOAD_TECHUSERDETAIL_SUCCESS = "LOAD_TECHUSERDETAIL_SUCCESS";
// export const LOAD_TECHUSERDETAIL_FAILURE = "LOAD_TECHUSERDETAIL_FAILURE";
// export const LOAD_TECHUSERPRODUCT_REQUEST = "LOAD_TECHUSERPRODUCT_REQUEST";
// export const LOAD_TECHUSERPRODUCT_SUCCESS = "LOAD_TECHUSERPRODUCT_SUCCESS";
// export const LOAD_TECHUSERPRODUCT_FAILURE = "LOAD_TECHUSERPRODUCT_FAILURE";
// export const SELECT_TECHUSER = "SELECT_TECHUSER";
// export const CLEAR_TECH_DETAIL = "CLEAR_TECH_DETAIL";

// // export const selectTechUser = (techUser: any) => {
// //   return { type: SELECT_TECHUSER, payload: techUser };
// // };
// // // 上门快
// export const getTechUsersByRate = (lon: any, lat: any, city: any) => {
//   return async (dispatch: any) => {
//     dispatch({ type: LOAD_TECHUSERS_REQUEST });
//     try {
//       const users = await getTechUsersByRateApi(lon, lat, city);
//       dispatch({ type: LOAD_TECHUSERS_SUCCESS, payload: users });
//     } catch (error) {
//       dispatch({ type: LOAD_TECHUSERS_FAILURE, payload: error.message });
//     }
//   };
// };

// // 距离近
// export const getTechUsersByDisc = (lon: any, lat: any, city: any) => {
//   return async (dispatch: any) => {
//     dispatch({ type: LOAD_TECHUSERS_REQUEST });
//     try {
//       const users = await getTechUsersByDiscApi(lon, lat, city);
//       dispatch({ type: LOAD_TECHUSERS_SUCCESS, payload: users });
//     } catch (error) {
//       dispatch({ type: LOAD_TECHUSERS_FAILURE, payload: error.message });
//     }
//   };
// };

// export const getTechUserDetail = (user_id: any, lon: any, lat: any) => {
//   return async (dispatch: any) => {
//     dispatch({ type: LOAD_TECHUSERDETAIL_REQUEST });
//     try {
//       const techuser = await fetchTechUserDetail(user_id, lon, lat);
//       dispatch({ type: LOAD_TECHUSERDETAIL_SUCCESS, payload: techuser });
//     } catch (error) {
//       dispatch({ type: LOAD_TECHUSERDETAIL_FAILURE, payload: error.message });
//     }
//   };
// };

// export const getTechUserProducts = (user_id: any) => {
//   return async (dispatch: any) => {
//     dispatch({ type: LOAD_TECHUSERPRODUCT_REQUEST });
//     try {
//       const users = await fetchTechUserProducts(user_id);
//       dispatch({ type: LOAD_TECHUSERPRODUCT_SUCCESS, payload: users });
//     } catch (error) {
//       dispatch({ type: LOAD_TECHUSERPRODUCT_FAILURE, payload: error.message });
//     }
//   };
// };

// export const getMoreTechUsers = (user1: any, user2: any) => {
//   return async (dispatch: any) => {
//     dispatch({ type: LOAD_TECHUSERS_SUCCESS, payload: [...user1, ...user2] });
//   };
// };
// export const clearTechDetail = () => {
//   return { type: CLEAR_TECH_DETAIL };
// };
