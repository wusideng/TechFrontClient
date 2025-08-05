// // src/reducers/productReducer.js
// import {
//   LOAD_TECHUSERS_REQUEST,
//   LOAD_TECHUSERS_SUCCESS,
//   LOAD_TECHUSERS_FAILURE,
//   LOAD_TECHUSERDETAIL_REQUEST,
//   LOAD_TECHUSERDETAIL_SUCCESS,
//   LOAD_TECHUSERDETAIL_FAILURE,
//   LOAD_TECHUSERPRODUCT_REQUEST,
//   LOAD_TECHUSERPRODUCT_SUCCESS,
//   LOAD_TECHUSERPRODUCT_FAILURE,
//   CLEAR_TECH_DETAIL,
//   SELECT_TECHUSER,
// } from "@/store/slices/techUserSlice";
// import { TechUser } from "@/types/Tech";
// interface State {
//   loading: boolean;
//   techusers: TechUser[];
//   techuser: TechUser | {};
//   techuserproducts: any[];
//   error: string | null;
// }
// const initialState: State = {
//   loading: false,
//   techusers: [],
//   techuser: {},
//   techuserproducts: [],
//   error: null,
// };

// const userReducer = (state = initialState, action: any) => {
//   switch (
//     action.type
//     // case LOAD_TECHUSERS_REQUEST:
//     // case LOAD_TECHUSERDETAIL_REQUEST:
//     // case LOAD_TECHUSERPRODUCT_REQUEST:
//     //   return { ...state, loading: true, error: null };
//     // case LOAD_TECHUSERS_SUCCESS:
//     //   const techusers = action.payload;
//     //   return { ...state, loading: false, techusers: techusers };
//     // case LOAD_TECHUSERDETAIL_SUCCESS:
//     //   return { ...state, loading: false, techuser: action.payload };
//     // case LOAD_TECHUSERPRODUCT_SUCCESS:
//     //   return { ...state, loading: false, techuserproducts: action.payload };
//     // case LOAD_TECHUSERS_FAILURE:
//     // case LOAD_TECHUSERDETAIL_FAILURE:
//     // case LOAD_TECHUSERPRODUCT_FAILURE:
//     //   return { ...state, loading: false, error: action.payload };
//     // case SELECT_TECHUSER:
//     //   return { ...state, techuser: action.payload };
//     // case CLEAR_TECH_DETAIL:
//     //   return { ...state, techuser: {} };
//     // default:
//     //   return state;
//   ) {
//   }
// };

// export default userReducer;
