// import {
//   createOrderSMSApi,
//   createOrderSMSVoiceTechApi,
//   createOrderSMSVoiceApi,
//   createOrderWxPayApi,
//   fetchOrders,
//   fetchOrderDetailApi,
//   updateOrderStatusApi,
//   fetchOrderStatusApi,
//   fetchWorktimeBlock,
//   insertCouponApi,
//   getCouponsApi,
//   addCommentApi,
//   cancelOrderApi,
//   updateOrderPaymentApi,
// } from "@/api/orderApi";
// import { UserAddress } from "@/types/AddressManagement";

// import {
//   notificationPhone,
//   notificationVoicePhone,
//   cityAdminPhone,
// } from "@/util/config";
// import { getCityByStr } from "@/util/wxUtil";

// export const INIT_ORDER = "INIT_ORDER";

// export const LOAD_UPDATEORDER_PAYMENT_REQUEST =
//   "LOAD_UPDATEORDER_PAYMENT_REQUEST";
// export const LOAD_UPDATEORDER_PAYMENT_SUCCESS =
//   "LOAD_UPDATEORDER_PAYMENT_SUCCESS";
// export const LOAD_UPDATEORDER_PAYMENT_FAILURE =
//   "LOAD_UPDATEORDER_PAYMENT_FAILURE";
// export const LOAD_CREATEORDERSMS_REQUEST = "LOAD_CREATEORDERSMS_REQUEST";
// export const LOAD_CREATEORDERSMS_SUCCESS = "LOAD_CREATEORDERSMS_SUCCESS";
// export const LOAD_CREATEORDERSMS_FAILURE = "LOAD_CREATEORDERSMS_FAILURE";
// export const LOAD_CREATEORDERWXPAY_REQUEST = "LOAD_CREATEORDERWXPAY_REQUEST";
// export const LOAD_CREATEORDERWXPAY_SUCCESS = "LOAD_CREATEORDERWXPAY_SUCCESS";
// export const LOAD_CREATEORDERWXPAY_FAILURE = "LOAD_CREATEORDERWXPAY_FAILURE";
// export const LOAD_ORDERS_REQUEST = "LOAD_ORDERS_REQUEST";
// export const LOAD_ORDERS_SUCCESS = "LOAD_ORDERS_SUCCESS";
// export const LOAD_ORDERS_FAILURE = "LOAD_ORDERS_FAILURE";
// export const LOAD_ORDER_REQUEST = "LOAD_ORDER_REQUEST";
// export const LOAD_ORDER_SUCCESS = "LOAD_ORDER_SUCCESS";
// export const LOAD_ORDER_FAILURE = "LOAD_ORDER_FAILURE";
// export const LOAD_UPDATEORDER_REQUEST = "LOAD_UPDATEORDER_REQUEST";
// export const LOAD_UPDATEORDER_SUCCESS = "LOAD_UPDATEORDER_SUCCESS";
// export const LOAD_UPDATEORDER_FAILURE = "LOAD_UPDATEORDER_FAILURE";
// export const LOAD_FETCHORDERSTATUS_REQUEST = "LOAD_FETCHORDERSTATUS_REQUEST";
// export const LOAD_FETCHORDERSTATUS_SUCCESS = "LOAD_FETCHORDERSTATUS_SUCCESS";
// export const LOAD_FETCHORDERSTATUS_FAILURE = "LOAD_FETCHORDERSTATUS_FAILURE";

// export const LOAD_TECHWORKTIME_REQUEST = "LOAD_TECHWORKTIME_REQUEST";
// export const LOAD_TECHWORKTIME_SUCCESS = "LOAD_TECHWORKTIME_SUCCESS";
// export const LOAD_TECHWORKTIME_FAILURE = "LOAD_TECHWORKTIME_FAILURE";
// export const LOAD_INSERTCOUPON_REQUEST = "LOAD_INSERTCOUPON_REQUEST";
// export const LOAD_INSERTCOUPON_SUCCESS = "LOAD_INSERTCOUPON_SUCCESS";
// export const LOAD_INSERTCOUPON_FAILURE = "LOAD_INSERTCOUPON_FAILURE";
// export const LOAD_FETCHCOUPON_REQUEST = "LOAD_FETCHCOUPON_REQUEST";
// export const LOAD_FETCHCOUPON_SUCCESS = "LOAD_FETCHCOUPON_SUCCESS";
// export const LOAD_FETCHCOUPON_FAILURE = "LOAD_FETCHCOUPON_FAILURE";
// export const LOAD_CREATECOMMENT_REQUEST = "LOAD_CREATECOMMENT_REQUEST";
// export const LOAD_CREATECOMMENT_SUCCESS = "LOAD_CREATECOMMENT_SUCCESS";
// export const LOAD_CREATECOMMENT_FAILURE = "LOAD_CREATECOMMENT_FAILURE";
// export const SET_ORDER_TAXI_COST = "SET_ORDER_TAXICOST";
// export const SET_ORDER_ADDRESS = "SET_ORDER_ADDRESS";
// export const CLEAR_NEW_ORDER = "CLEAR_NEW_ORDER";
// // export const SET_COUPON = "SET_COUPON";
// // export const CLEAR_ORDER = "CLEAR_ORDER";
// export const CLEAR_ORDER_DETAIL = "CLEAR_ORDER_DETAIL";
// export const CLEAR_TECHWORKTIME = "CLEAR_TECHWORKTIME";

// // export const getOrders = (user_id: any) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_ORDERS_REQUEST });
// //     try {
// //       const products = await fetchOrders(user_id);
// //       dispatch({ type: LOAD_ORDERS_SUCCESS, payload: products });
// //     } catch (error) {
// //       dispatch({ type: LOAD_ORDERS_FAILURE, payload: error.message });
// //     }
// //   };
// // };

// // export const getOrder = (order_id: any) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_ORDER_REQUEST });
// //     try {
// //       const orders = await fetchOrderDetailApi(order_id);
// //       dispatch({ type: LOAD_ORDER_SUCCESS, payload: orders });
// //     } catch (error) {
// //       dispatch({ type: LOAD_ORDER_FAILURE, payload: error.message });
// //     }
// //   };
// // };

// // 创建到家平台订单
// // export const updateOrderPayment = (order: any) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_UPDATEORDER_PAYMENT_REQUEST });
// //     try {
// //       const res = await updateOrderPaymentApi(order);
// //       // dispatch({ type: LOAD_UPDATEORDER_PAYMENT_SUCCESS, payload: res });
// //     } catch (error) {
// //       dispatch({
// //         type: LOAD_UPDATEORDER_PAYMENT_FAILURE,
// //         payload: error.message,
// //       });
// //     }
// //   };
// // };
// // export async function cancelOrder(refundInfo: any) {
// //   try {
// //     const res = await cancelOrderApi(refundInfo);
// //     return res;
// //   } catch (error) {
// //     return error;
// //   }
// // }
// // 创建订单短信通知
// export const createOrderSMS = (
//   phoneNumber: any,
//   techName: any,
//   serviceTime: any,
//   serviceCity: any
// ) => {
//   return async (dispatch: any) => {
//     dispatch({ type: LOAD_CREATEORDERSMS_REQUEST });
//     try {
//       // 使用正则表达式去掉表情符号和数字
//       let cleanTechName = techName.replace(
//         // @ts-ignore
//         /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}0-9]/gu,
//         ""
//       );

//       // 短信通知技师
//       // const res = await createOrderSMSApi(
//       //   phoneNumber,
//       //   cleanTechName,
//       //   serviceTime
//       // );
//       // 语音通知技师
//       await createOrderSMSVoiceTechApi(
//         phoneNumber.toString(),
//         cleanTechName,
//         serviceTime
//       );

//       // console.log(
//       //   "phone call to admin:",
//       //   getCityByStr(serviceCity),
//       //   cityAdminPhone[getCityByStr(serviceCity)]
//       // );
//       // 发送 SMS 通知
//       // for (const phone of cityAdminPhone[getCityByStr(serviceCity)]) {
//       //   await createOrderSMSApi(phone, cleanTechName, serviceTime);
//       // }

//       // 语音通知管理员
//       for (const voicePhone of cityAdminPhone[getCityByStr(serviceCity)]) {
//         await createOrderSMSVoiceApi(
//           voicePhone.toString(),
//           cleanTechName,
//           serviceTime,
//           serviceCity
//         );
//       }

//       // dispatch({ type: LOAD_CREATEORDERSMS_SUCCESS, payload: res });
//     } catch (error) {
//       console.error(error);
//       // dispatch({ type: LOAD_CREATEORDERSMS_FAILURE, payload: error.message });
//     }
//   };
// };

// // 创建微信预支付订单
// // export const createOrderWx = (
// //   payContent: any,
// //   successcallback: any,
// //   failcallback: any
// // ) => {
// //   let orderStatus;
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_CREATEORDERWXPAY_REQUEST });
// //     try {
// //       orderStatus = await createOrderWxPayApi(payContent);
// //       // console.log("预支付成功:", orderStatus);
// //       dispatch({ type: LOAD_CREATEORDERWXPAY_SUCCESS, payload: orderStatus });
// //       // 检查 WeixinJSBridge 是否已准备好
// //       // @ts-ignore
// //       if (typeof WeixinJSBridge === "undefined") {
// //         // console.log("WeixinJSBridge undefined 逻辑");
// //         document.addEventListener("WeixinJSBridgeReady", () => {
// //           initiatePayment(
// //             orderStatus,
// //             () => {
// //               successcallback(orderStatus);
// //             },
// //             () => {
// //               failcallback(orderStatus);
// //             }
// //           );
// //         });
// //       } else {
// //         // console.log("WeixinJSBridge has 逻辑");
// //         initiatePayment(
// //           orderStatus,
// //           () => {
// //             successcallback(orderStatus);
// //           },
// //           () => {
// //             failcallback(orderStatus);
// //           }
// //         );
// //       }
// //     } catch (error) {
// //       // console.log("预支付失败:", error.message);
// //       failcallback(orderStatus);
// //       dispatch({ type: LOAD_CREATEORDERWXPAY_FAILURE, payload: error.message });
// //     }
// //   };
// // };

// // export const initiatePayment = (
// //   data: any,
// //   successcallback: any,
// //   failcallback: any
// // ) => {
// //   // @ts-ignore
// //   WeixinJSBridge.invoke(
// //     "getBrandWCPayRequest",
// //     {
// //       appId: data.appId,
// //       timeStamp: data.timeStamp,
// //       nonceStr: data.nonceStr,
// //       package: data.package,
// //       signType: "MD5",
// //       paySign: data.paySign,
// //     },
// //     (res: any) => {
// //       if (res.err_msg === "get_brand_wcpay_request:ok") {
// //         alert("支付成功");
// //         successcallback();
// //         // dispatch({ type: LOAD_CREATEORDERWXPAY_SUCCESS, payload: res });
// //       } else {
// //         // alert("支付失败: " + res.err_msg);
// //         alert("支付失败");
// //         failcallback();
// //         // dispatch({
// //         //   type: LOAD_CREATEORDERWXPAY_FAILURE,
// //         //   payload: error.message,
// //         // });
// //       }
// //     }
// //   );
// // };

// // 更新订单状态
// // orderStatus = {
// //     "order_id": 0,
// //     "order_status_type_code": "string",
// //     "order_status_type": "string"
// // }
// // export const updateOrderStatus = (orderStatus: any) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_UPDATEORDER_REQUEST });
// //     try {
// //       const res = await updateOrderStatusApi(orderStatus);
// //       dispatch({ type: LOAD_UPDATEORDER_SUCCESS, payload: res });
// //     } catch (error) {
// //       dispatch({ type: LOAD_UPDATEORDER_FAILURE, payload: error.message });
// //     }
// //   };
// // };

// // // 读取订单状态
// // export const fetchOrderStatus = (order_id: any) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_FETCHORDERSTATUS_REQUEST });
// //     try {
// //       const res = await fetchOrderStatusApi(order_id);
// //       dispatch({ type: LOAD_FETCHORDERSTATUS_SUCCESS, payload: res });
// //     } catch (error) {
// //       dispatch({ type: LOAD_FETCHORDERSTATUS_FAILURE, payload: error.message });
// //     }
// //   };
// // };

// // 获取技师服务时间选择，只展示技师工作时间
// // export const getWorktimeBlock = (open_id: any, work_date: any) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_TECHWORKTIME_REQUEST });
// //     try {
// //       const res = await fetchWorktimeBlock(open_id, work_date);
// //       dispatch({ type: LOAD_TECHWORKTIME_SUCCESS, payload: res });
// //     } catch (error) {
// //       dispatch({ type: LOAD_TECHWORKTIME_FAILURE, payload: error.message });
// //     }
// //   };
// // };
// // export const clearWorkTimeBlock = () => ({ type: CLEAR_TECHWORKTIME });

// // 发放优惠券
// // export const insertCoupon = (open_id: any, city: any) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_INSERTCOUPON_REQUEST });
// //     try {
// //       const res = await insertCouponApi(open_id, city);
// //       dispatch({ type: LOAD_INSERTCOUPON_SUCCESS, payload: res });
// //     } catch (error) {
// //       dispatch({ type: LOAD_INSERTCOUPON_FAILURE, payload: error.message });
// //     }
// //   };
// // };

// // 读取优惠券
// // export const getCoupons = (open_id: any) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_FETCHCOUPON_REQUEST });
// //     try {
// //       const res = await getCouponsApi(open_id);
// //       dispatch({ type: LOAD_FETCHCOUPON_SUCCESS, payload: res });
// //     } catch (error) {
// //       dispatch({ type: LOAD_FETCHCOUPON_FAILURE, payload: error.message });
// //     }
// //   };
// // };
// // export const CLEAR_COUPONS = "CLEAR_COUPONS";
// // export const clearCoupons = () => ({
// //   type: CLEAR_COUPONS,
// // });

// // 使用优惠券
// // export const setCoupon = (amount: any) => ({
// //   type: SET_COUPON,
// //   payload: amount,
// // });

// // export const initOrder = (order: any) => ({
// //   type: INIT_ORDER,
// //   payload: order,
// // });

// // export const clearOrder = () => ({
// //   type: CLEAR_ORDER,
// // });

// // 提交评论
// // export const addComment = (orderComment: any) => {
// //   return async (dispatch: any) => {
// //     dispatch({ type: LOAD_CREATECOMMENT_REQUEST });
// //     try {
// //       const res = await addCommentApi(orderComment);
// //       dispatch({ type: LOAD_CREATECOMMENT_SUCCESS, payload: res });
// //     } catch (error) {
// //       dispatch({ type: LOAD_CREATECOMMENT_FAILURE, payload: error.message });
// //     }
// //   };
// // };

// // export const clearOrderDetailAction = () => {
// //   return {
// //     type: CLEAR_ORDER_DETAIL,
// //   };
// // };
// // export const setOrderTaxiCost = (payload: number) => ({
// //   type: SET_ORDER_TAXI_COST,
// //   payload,
// // // });
// // export const setOrderAddress = (payload: UserAddress) => ({
// //   type: SET_ORDER_ADDRESS,
// //   payload,
// // // });
// // export const clearNewOrder = () => ({
// //   type: CLEAR_NEW_ORDER,
// // });
// // export const CLEAR_ORDERS = "CLEAR_ORDERS";
// // export const clearOrders = () => {
// //   return {
// //     type: CLEAR_ORDERS,
// //   };
// // };
