// import {
//   FOLLOW_TECH_REQUEST,
//   UNFOLLOW_TECH_REQUEST,
//   GET_FOLLOWING_TECHS_REQUEST,
//   GET_FOLLOWING_TECHS_SUCCESS,
//   GET_FOLLOWING_TECHS_FAILURE,
// } from "@/store/slices/followSlice";
// import { LOAD_TECHUSERS_SUCCESS } from "@/store/slices/techUserSlice";
// import { LOAD_USERINFO_SUCCESS } from "@/store/slices/userSlice";
// import { ClientUser } from "@/types/ClientUser";
// import { TechUser } from "@/types/Tech";

// interface FollowState {
//   loading: boolean;
//   followingTechOpenids: string[];
//   error: string | null;
//   followingTechs: TechUser[];
//   followsMap: { [key: string]: number };
// }

// const initialState: FollowState = {
//   loading: false,
//   //用户关注了哪些技�?
//   followingTechOpenids: [],
//   error: null,
//   //用户关注的技师列�?
//   followingTechs: [],
//   //技师关注数map
//   followsMap: {},
// };

// const followReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     // case LOAD_USERINFO_SUCCESS:
//     //   const user: ClientUser = action.payload;
//     //   return {
//     //     ...state,
//     //     followingTechOpenids: user?.following_techs || [],
//     //   };
//     // case LOAD_TECHUSERS_SUCCESS:
//     //   const techusers: TechUser[] = action.payload;
//     //   const followsMap: { [key: string]: number } = {};
//     //   techusers.forEach((techuser) => {
//     //     followsMap[techuser.openid] = techuser.follow_count;
//     //   });
//     //   return {
//     //     ...state,
//     //     followsMap,
//     //   };

//     // Follow tech
//     // case FOLLOW_TECH_REQUEST:
//     //   state.followsMap[action.payload] = state.followsMap[action.payload] + 1;
//     //   return {
//     //     ...state,
//     //     followingTechOpenids: state.followingTechOpenids.includes(
//     //       action.payload
//     //     )
//     //       ? state.followingTechOpenids
//     //       : [...state.followingTechOpenids, action.payload],
//     //     followsMap: {
//     //       ...state.followsMap,
//     //     },
//     //   };

//     // Unfollow tech
//     // case UNFOLLOW_TECH_REQUEST:
//     //   state.followsMap[action.payload] = state.followsMap[action.payload] - 1;
//     //   return {
//     //     ...state,
//     //     followingTechOpenids: state.followingTechOpenids.includes(
//     //       action.payload
//     //     )
//     //       ? state.followingTechOpenids.filter(
//     //           (openid) => openid !== action.payload
//     //         )
//     //       : state.followingTechOpenids,
//     //     followsMap: {
//     //       ...state.followsMap,
//     //     },
//     //   };

//     // Get following techs
//     // case GET_FOLLOWING_TECHS_REQUEST:
//     //   return {
//     //     ...state,
//     //     loading: true,
//     //     error: null,
//     //   };
//     // case GET_FOLLOWING_TECHS_SUCCESS:
//     //   return {
//     //     ...state,
//     //     loading: false,
//     //     followingTechs: action.payload,
//     //   };
//     // case GET_FOLLOWING_TECHS_FAILURE:
//     //   return {
//     //     ...state,
//     //     loading: false,
//     //     error: action.payload,
//     //   };

//     default:
//       return state;
//   }
// };

// export default followReducer;
