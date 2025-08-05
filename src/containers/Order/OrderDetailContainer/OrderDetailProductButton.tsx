// import { Button } from "antd-mobile";
// import React from "react";
// import usePay from "@/hooks/order/usePay";
// import { extendServicePayApi } from "@/api/orderApi";

// export const OrderDetailProductButton = ({ product, order }: any) => {
//   const payHandler = usePay();
//   const { user } = useAppSelector((state) => state.user);

//   const pay = () => {
//     const payContent = {
//       user_openid: user.openid,
//       order_id: order.order_id,
//       product_id: product.product_id,
//       product_count: product.product_count,
//     };
//     payHandler(payContent, extendServicePayApi);
//   };
//   const cancelProduct = () => {};
//   return (
//     <div className="product-btn-area">
//       <Button
//         size="mini"
//         // width={84}
//         onClick={cancelProduct}
//       >
//         取消订单
//       </Button>
//       <Button
//         color="primary"
//         size="mini"
//         //  width={84}
//         onClick={pay}
//       >
//         立即支付
//       </Button>
//     </div>
//   );
// };
