// import {
//   INIT_ORDER,
//   LOAD_CREATEORDERWXPAY_REQUEST,
//   LOAD_CREATEORDERWXPAY_SUCCESS,
//   LOAD_CREATEORDERWXPAY_FAILURE,
//   LOAD_ORDERS_REQUEST,
//   LOAD_ORDERS_SUCCESS,
//   LOAD_ORDERS_FAILURE,
//   LOAD_ORDER_REQUEST,
//   LOAD_ORDER_SUCCESS,
//   LOAD_ORDER_FAILURE,
//   LOAD_UPDATEORDER_REQUEST,
//   LOAD_UPDATEORDER_SUCCESS,
//   LOAD_UPDATEORDER_FAILURE,
//   LOAD_FETCHORDERSTATUS_REQUEST,
//   LOAD_FETCHORDERSTATUS_SUCCESS,
//   LOAD_FETCHORDERSTATUS_FAILURE,
//   LOAD_TECHWORKTIME_REQUEST,
//   LOAD_TECHWORKTIME_SUCCESS,
//   LOAD_TECHWORKTIME_FAILURE,
//   LOAD_INSERTCOUPON_REQUEST,
//   LOAD_INSERTCOUPON_SUCCESS,
//   LOAD_INSERTCOUPON_FAILURE,
//   LOAD_FETCHCOUPON_REQUEST,
//   LOAD_FETCHCOUPON_SUCCESS,
//   LOAD_FETCHCOUPON_FAILURE,
//   LOAD_CREATECOMMENT_REQUEST,
//   LOAD_CREATECOMMENT_SUCCESS,
//   LOAD_CREATECOMMENT_FAILURE,
//   CLEAR_ORDER_DETAIL,
//   SET_ORDER_TAXI_COST,
//   SET_ORDER_ADDRESS,
//   CLEAR_NEW_ORDER,
//   CLEAR_TECHWORKTIME,
//   CLEAR_COUPONS,
//   CLEAR_ORDERS,
//   // SET_COUPON,
//   // CLEAR_ORDER,
// } from "@/store/slices/orderSlice";
// import { NewOrder } from "@/types/NewOrder";
// const defaultOrder = {
//   client: {},
//   tech: {},
//   order_products: [],
//   wx_pre: {},
// };
// interface State {
//   loading: boolean;
//   newOrder: NewOrder | null;
//   techworkblock: any[];
//   coupons: any[];
//   // couponAmount: number,
//   orders: any[];
//   order: any;
//   orderstatus: any[];
//   error: string | null;
// }
// const initialState: State = {
//   loading: false,
//   newOrder: null, // 新订单详情（create order)

//   techworkblock: [],
//   coupons: [],
//   orders: [
//     // {
//     //   tech: {},
//     //   client: {},
//     //   order_products: [{}],
//     //   order_status: [],
//     // },
//   ],
//   order: defaultOrder, //订单详情(existing order)
//   orderstatus: [],
//   error: null,
// };

// const commonReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     // case SET_COUPON:
//     // //   return { ...state, loading: true, couponAmount: action.payload };
//     // case INIT_ORDER:
//     //   return { ...state, loading: true, newOrder: action.payload };
//     // case LOAD_ORDERS_REQUEST:
//     // case LOAD_ORDER_REQUEST:
//     // case LOAD_UPDATEORDER_REQUEST:
//     // case LOAD_CREATEORDERWXPAY_REQUEST:
//     // case LOAD_FETCHORDERSTATUS_REQUEST:
//     // case LOAD_TECHWORKTIME_REQUEST:
//     // case LOAD_INSERTCOUPON_REQUEST:
//     // case LOAD_FETCHCOUPON_REQUEST:
//     // case LOAD_CREATECOMMENT_REQUEST:
//     //   return { ...state, loading: true, error: null };
//     // case LOAD_ORDERS_SUCCESS:
//     //   return { ...state, loading: false, orders: action.payload };
//     // // case CLEAR_ORDERS:
//     // //   return { ...state, orders: [] };
//     // case LOAD_ORDER_SUCCESS:
//     //   return { ...state, loading: false, order: action.payload };
//     // case LOAD_UPDATEORDER_SUCCESS:
//     //   return { ...state, loading: false };
//     // case LOAD_FETCHORDERSTATUS_SUCCESS:
//     //   return { ...state, loading: false, orderstatus: action.payload };
//     // case LOAD_CREATEORDERWXPAY_SUCCESS:
//     //   return { ...state, loading: false, orderpay: action.payload };

//     // case LOAD_TECHWORKTIME_SUCCESS:
//     //   return { ...state, loading: false, techworkblock: action.payload };
//     // case CLEAR_TECHWORKTIME:
//     //   return { ...state, techworkblock: [] };
//     //新用户领取coupon
//     // case LOAD_INSERTCOUPON_SUCCESS:
//     //   return { ...state, loading: false, coupons: action.payload };
//     //获取用户已有的coupon列表
//     // case LOAD_FETCHCOUPON_SUCCESS:
//     //   return { ...state, loading: false, coupons: action.payload };
//     // //清除coupon状�?
//     // case CLEAR_COUPONS:
//     //   return { ...state, coupons: [] };
//     // case LOAD_CREATECOMMENT_SUCCESS:
//     //   return { ...state, loading: false };
//     // case LOAD_ORDERS_FAILURE:
//     // case LOAD_ORDER_FAILURE:
//     // case LOAD_UPDATEORDER_FAILURE:
//     // case LOAD_FETCHORDERSTATUS_FAILURE:
//     // case LOAD_CREATEORDERWXPAY_FAILURE:
//     // case LOAD_TECHWORKTIME_FAILURE:
//     // case LOAD_INSERTCOUPON_FAILURE:
//     // case LOAD_FETCHCOUPON_FAILURE:
//     // case LOAD_CREATECOMMENT_FAILURE:
//     //   return { ...state, loading: false, error: action.payload };
//     // case SET_ORDER_TAXI_COST:
//     //   return {
//     //     ...state,
//     //     newOrder: {
//     //       ...state.newOrder,
//     //       otherInfo: {
//     //         ...state.newOrder.otherInfo,
//     //         orderTaxiCost: action.payload,
//     //       },
//     //     },
//     //   };

//     // case CLEAR_ORDER_DETAIL:
//     //   return {
//     //     ...state,
//     //     order: defaultOrder,
//     //   };
//     // case SET_ORDER_ADDRESS:
//     //   return {
//     //     ...state,
//     //     newOrder: { ...state.newOrder, orderServiceAddress: action.payload },
//     //   };
//   //   case CLEAR_NEW_ORDER:
//   //     return { ...state, newOrder: null };
//   //   default:
//   //     return state;
//   // }
// };

// export default commonReducer;
