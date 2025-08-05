// import { followTech, unfollowTech, getFollowingTechs } from "@/api/followApi";
// export const FOLLOW_TECH_REQUEST = "FOLLOW_TECH_REQUEST";
// export const FOLLOW_TECH_SUCCESS = "FOLLOW_TECH_SUCCESS";
// export const FOLLOW_TECH_FAILURE = "FOLLOW_TECH_FAILURE";

// export const UNFOLLOW_TECH_REQUEST = "UNFOLLOW_TECH_REQUEST";
// export const UNFOLLOW_TECH_SUCCESS = "UNFOLLOW_TECH_SUCCESS";
// export const UNFOLLOW_TECH_FAILURE = "UNFOLLOW_TECH_FAILURE";

// export const GET_FOLLOWING_TECHS_REQUEST = "GET_FOLLOWING_TECHS_REQUEST";
// export const GET_FOLLOWING_TECHS_SUCCESS = "GET_FOLLOWING_TECHS_SUCCESS";
// export const GET_FOLLOWING_TECHS_FAILURE = "GET_FOLLOWING_TECHS_FAILURE";
// export const ADD_TO_USER_FOLLOW_LIST = "ADD_TO_USER_FOLLOW_LIST";
// export const REMOVE_FROM_USER_FOLLOW_LIST = "REMOVE_FROM_USER_FOLLOW_LIST";

// // // Thunk Actions
// // export const followTechAction = (user_openid: string, tech_openid: string) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: FOLLOW_TECH_REQUEST, payload: tech_openid });
// //     try {
// //       const payload = await followTech(user_openid, tech_openid);
// //       dispatch({ type: FOLLOW_TECH_SUCCESS, payload });
// //       return { success: true };
// //     } catch (error) {
// //       dispatch({ type: FOLLOW_TECH_FAILURE, payload: error.message });
// //       return { success: false, error: error.message };
// //     }
// //   };
// // };

// // export const unfollowTechAction = (
// //   user_openid: string,
// //   tech_openid: string
// // ) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: UNFOLLOW_TECH_REQUEST, payload: tech_openid });
// //     try {
// //       const payload = await unfollowTech(user_openid, tech_openid);
// //       dispatch({ type: UNFOLLOW_TECH_SUCCESS, payload });
// //       return { success: true };
// //     } catch (error) {
// //       dispatch({ type: UNFOLLOW_TECH_FAILURE, payload: error.message });
// //       return { success: false, error: error.message };
// //     }
// //   };
// // };

// // export const getFollowingTechsAction = (
// //   user_openid: string,
// //   lon: number,
// //   lat: number
// // ) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: GET_FOLLOWING_TECHS_REQUEST });
// //     try {
// //       const result = await getFollowingTechs(user_openid, lon, lat);
// //       dispatch({ type: GET_FOLLOWING_TECHS_SUCCESS, payload: result });
// //     } catch (error) {
// //       dispatch({ type: GET_FOLLOWING_TECHS_FAILURE, payload: error.message });
// //       return { success: false, error: error.message };
// //     }
// //   };
// // };
