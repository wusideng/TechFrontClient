// import {
//   ADD_TO_USER_FOLLOW_LIST,
//   REMOVE_FROM_USER_FOLLOW_LIST,
// } from "@/store/slices/followSlice";
// import {
//   LOAD_UPDATE_USERPHONE_REQUEST,
//   LOAD_UPDATE_USERPHONE_SUCCESS,
//   LOAD_UPDATE_USERPHONE_FAILURE,
//   // SET_DEVICE,
//   // SET_WX_CODE,
//   SET_ACCESS_TOKEN,
//   SET_USER,
//   SET_INVITECODE,
//   SET_MOCK_USER,
//   SET_MOCK_USER_PHONE,
//   LOGOUT,
//   LOAD_USERINFO_REQUEST,
//   LOAD_USERINFO_SUCCESS,
//   LOAD_USERINFO_FAILURE,
// } from "@/store/slices/userSlice";
// import { ClientUser } from "@/types/ClientUser";
// import { deleteCookie } from "@/util/utils";
// interface State {
//   loading: boolean;
//   loadingUser: boolean;
//   loadUserInfoFailure: boolean;
//   user: ClientUser;
//   code: string;
//   access_token: string;
//   invite_code: string;
//   // device: string;
//   error: any;
// }
// const initialState: State = {
//   loading: false,
//   loadingUser: false,
//   loadUserInfoFailure: false,
//   user: {
//     openid: "",
//     user_phone: "",
//   },
//   code: "",
//   access_token: "",
//   invite_code: "",
//   // device: "",
//   error: null,
// };

// const userReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     // case LOAD_USERINFO_REQUEST:
//     // case LOAD_UPDATE_USERPHONE_REQUEST:
//     //   return { ...state, loadingUser: true, error: null };
//     // case LOAD_USERINFO_FAILURE:
//     //   deleteCookie("openid");
//     //   return {
//     //     ...state,
//     //     loadingUser: false,
//     //     error: action.payload,
//     //     loadUserInfoFailure: true,
//     //   };
//     // case LOAD_UPDATE_USERPHONE_FAILURE:
//     //   return { ...state, loading: false, error: action.payload };
//     // case LOAD_USERINFO_SUCCESS:
//     //   deleteCookie("openid");
//     //   document.cookie = `openid=${action.payload.openid}; path=/; max-age=7200; domain=${window.location.hostname}`;
//     //   return { ...state, loadingUser: false, user: action.payload };
//     // case LOAD_UPDATE_USERPHONE_SUCCESS:
//     //   return { ...state, loadingUser: false, user: action.payload };
//     // case SET_USER:
//     //   return { ...state, loadingUser: false, user: action.payload };
//     // case SET_DEVICE:
//     //   return { ...state, loading: false, device: action.payload };
//     // case SET_WX_CODE:
//     //   return { ...state, loading: false, code: action.payload };
//     // case SET_ACCESS_TOKEN:
//     //   return { ...state, access_token: action.payload };
//     // case SET_INVITECODE:
//     //   return { ...state, invite_code: action.payload };
//     // case SET_MOCK_USER:
//     // case SET_MOCK_USER_PHONE:
//     //   return { ...state, user: action.payload };
//     case LOGOUT:
//       return {
//         ...state,
//         user: {
//           openid: "",
//           user_phone: "",
//         },
//       };
//     default:
//       return state;
//   }
// };

// export default userReducer;
