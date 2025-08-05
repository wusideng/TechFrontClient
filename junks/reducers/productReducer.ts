// // src/reducers/productReducer.js
// import {
//   LOAD_PRODUCT_REQUEST,
//   LOAD_PRODUCT_SUCCESS,
//   LOAD_PRODUCT_FAILURE,
//   LOAD_PRODUCTDETAIL_REQUEST,
//   LOAD_PRODUCTDETAIL_SUCCESS,
//   LOAD_PRODUCTDETAIL_FAILURE,
//   CLEAR_PRODUCT_DETAIL,
//   SELECT_PRODUCT,
// } from "@/store/slices/productSlice";

// const initialState = {
//   loading: false,
//   products: [],
//   product: {},
//   error: null,
// };

// const productReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     // case LOAD_PRODUCT_REQUEST:
//     // case LOAD_PRODUCTDETAIL_REQUEST:
//     //   return { ...state, loading: true, error: null };
//     // case LOAD_PRODUCT_SUCCESS:
//     //   return { ...state, loading: false, products: action.payload.data };
//     // case LOAD_PRODUCTDETAIL_SUCCESS:
//     //   return { ...state, loading: false, product: action.payload };
//     // case LOAD_PRODUCT_FAILURE:
//     // case LOAD_PRODUCTDETAIL_FAILURE:
//     //   return { ...state, loading: false, error: action.payload };
//     // case SELECT_PRODUCT:
//     //   return { ...state, product: action.payload };
//     // case CLEAR_PRODUCT_DETAIL:
//     //   return { ...state, product: {} };
//     default:
//       return state;
//   }
// };

// export default productReducer;
