// import { Button } from "antd-mobile";
// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "react-redux";
// import { createOrderSMSVoiceApi } from "@/api/orderApi";

// import { createOrderWx } from "@/store/slices/orderSlice";
// import axios from "axios";
// import { staticUrl } from "@/util/config";

// const OrderPayContainer = () => {
//   const dispatch = useAppDispatch();
//   const { user } = useAppSelector((state) => state.user);
//   // const { orderpay } = useAppSelector((state) => state.order);
//   useEffect(() => {}, [dispatch]);

//   function createPreparePay() {
//     let payStatus = {
//       prodname: "胸肺调理",
//       clientOpenId: "oK9p06eiEk0jWNvowVjb5lGlkocM",
//       total_fee: 10,
//       order_product_info: {
//         order: {
//           service_time: "2025-02-21 19:30:00",
//           service_address:
//             "山东省青岛市市南区香港中路街道香港中路青岛市人民政府",
//           service_city: "青岛市",
//           service_detail_address: "111",
//           travel_distance: 1117.3221342050942,
//           travel_cost: "5591",
//           tech_user_id: "oK9p06eiEk0jWNvowVjb5lGlkocM",
//           client_user_id: "oK9p06eiEk0jWNvowVjb5lGlkocM",
//           order_cost: 11381,
//           payment_status: "待支付",
//           order_status_code_client: "order_011",
//           remark: "巫山推广订单",
//         },
//         product: {
//           product_id: 16,
//           order_id: 0,
//           product_name: "胸肺调理",
//           price_current: 199,
//           duration: "40分钟",
//           body_parts: "胸部，腋下淋巴，手臂",
//           photo_intro: `${staticUrl}/uploads/胸肺调理.png`,
//           product_count: 1,
//           server_time: "2025-02-21 19:30:00",
//         },
//       },
//     };
//     dispatch(
//       createOrderWx(
//         payStatus,
//         () => {},
//         () => {}
//       )
//     );
//   }

//   const handlePayment = async () => {
//     const openid = user.openid; // 获取用户的 openid
//     const total_fee = 1; // 支付金额，单位为分
//     try {
//       const response = await axios.post("http://localhost:8000/create-order", {
//         openid: openid,
//         total_fee: total_fee,
//       });

//       const data = response.data;

//       // 检查 WeixinJSBridge 是否已准备好
//       // @ts-ignore
//       if (typeof WeixinJSBridge === "undefined") {
//         document.addEventListener("WeixinJSBridgeReady", () => {
//           initiatePayment(data);
//         });
//       } else {
//         initiatePayment(data);
//       }
//     } catch (error) {
//       console.error("支付请求失败:", error);
//     }
//   };

//   function createSMSVoice() {
//     createOrderSMSVoiceApi("18614032685", "杨晓丽", "20250302 20:00", "北京市");
//   }

//   // {
//   //     "appId": "wxfa6035d95514257e",
//   //     "timeStamp": "1737195298",
//   //     "nonceStr": "kz0t08tuy4f0ch8t965wx1h26u15iebh",
//   //     "package": "prepay_id=wx181815008483252f7a82bb1d5b8b6c0000",
//   //     "signType": "MD5",
//   //     "paySign": "0DE31C67059D7D06697C454F47CA312E"
//   // }

//   const initiatePayment = (data: any) => {
//     // @ts-ignore
//     WeixinJSBridge.invoke(
//       "getBrandWCPayRequest",
//       {
//         appId: data.appId,
//         timeStamp: data.timeStamp,
//         nonceStr: data.nonceStr,
//         package: data.package,
//         signType: "MD5",
//         paySign: data.paySign,
//       },
//       (res: any) => {
//         if (res.err_msg === "get_brand_wcpay_request:ok") {
//         } else {
//         }
//       }
//     );
//   };

//   return (
//     <div>
//       <p>
//         <Button block color="primary" onClick={createPreparePay}>
//           生成微信预支付订单
//         </Button>
//       </p>
//       <p>
//         <Button block color="primary" onClick={handlePayment}>
//           微信支付
//         </Button>
//       </p>
//       <p>
//         <Button block color="primary" onClick={createSMSVoice}>
//           语音提示
//         </Button>
//       </p>
//     </div>
//   );
// };

// export default OrderPayContainer;
