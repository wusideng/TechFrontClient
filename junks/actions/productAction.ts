// // src/actions/userActions.js
// import { fetchProducts, fetchProductDetail } from "@/api/productApi"; // 假设你有一个 API 模块

// export const LOAD_PRODUCT_REQUEST = "LOAD_PRODUCT_REQUEST";
// export const LOAD_PRODUCT_SUCCESS = "LOAD_PRODUCT_SUCCESS";
// export const LOAD_PRODUCT_FAILURE = "LOAD_PRODUCT_FAILURE";
// export const LOAD_PRODUCTDETAIL_REQUEST = "LOAD_PRODUCTDETAIL_REQUEST";
// export const LOAD_PRODUCTDETAIL_SUCCESS = "LOAD_PRODUCTDETAIL_SUCCESS";
// export const LOAD_PRODUCTDETAIL_FAILURE = "LOAD_PRODUCTDETAIL_FAILURE";
// export const SELECT_PRODUCT = "SELECT_PRODUCT";
// export const CLEAR_PRODUCT_DETAIL = "CLEAR_PRODUCT_DETAIL";
// // export const getProducts = () => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_PRODUCT_REQUEST });
// //     try {
// //       const products = await fetchProducts();
// //       dispatch({ type: LOAD_PRODUCT_SUCCESS, payload: products });
// //     } catch (error) {
// //       dispatch({ type: LOAD_PRODUCT_FAILURE, payload: error.message });
// //     }
// //   };
// // };
// // export const selectProduct = (product: any) => {
// //   return { type: SELECT_PRODUCT, payload: product };
// // };
// // export const getProductDetail = (product_id: any) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_PRODUCTDETAIL_REQUEST });
// //     try {
// //       const product = await fetchProductDetail(product_id);
// //       dispatch({ type: LOAD_PRODUCTDETAIL_SUCCESS, payload: product });
// //     } catch (error) {
// //       dispatch({ type: LOAD_PRODUCTDETAIL_FAILURE, payload: error.message });
// //     }
// //   };
// // };

// // export const clearProduct = () => {
// //   return { type: CLEAR_PRODUCT_DETAIL };
// // };
