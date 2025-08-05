import orderStatusCodeDict from "@/lib/statusCodeDict.json";
import { isDev, testOrderOpenIds } from "./config";
import { hasCommented } from "@/containers/Order/OrderDetailContainer/util";

export const formatDateString = (dateString: any) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: false, // 24小时制
  });
  return formattedDate;
};

export const orderIsCanceled = (order: any) => {
  return [
    orderStatusCodeDict.client.payment_timeout.code,
    orderStatusCodeDict.client.cancel_before_pay.code,
    orderStatusCodeDict.client.refund_quest_send_to_3rd_party.code,
    orderStatusCodeDict.client.wait_for_refund.code,
    orderStatusCodeDict.client.refunded.code,
    orderStatusCodeDict.client.refund_abnormal.code,
    orderStatusCodeDict.client.refund_closed.code,
    orderStatusCodeDict.client.refund_fail.code,
    orderStatusCodeDict.client.refund_auditing.code,
  ].includes(order.payment_status_code);
};

// 订单列表数组过滤
export const getOrderListByStatus = (orders: any, status: any) => {
  let newOrders = [];

  switch (status) {
    case "全部订单":
      newOrders = orders;
      break;
    // case "待支付":
    //   orders.map((order: any) => {
    //     if (
    //       order.payment_status_code ==
    //         orderStatusCodeDict.client.wait_for_payment.code ||
    //       order.payment_status_code ==
    //         orderStatusCodeDict.client.payment_failed.code
    //     ) {
    //       newOrders.push(order);
    //     }
    //   });
    //   break;
    case "进行中":
      orders.map((order: any) => {
        if (
          order.payment_status_code == orderStatusCodeDict.client.paid.code &&
          order.order_status_code_client !==
            orderStatusCodeDict.client.service_end.code
        ) {
          newOrders.push(order);
        }
      });
      break;
    case "待评价":
      orders.map((order: any) => {
        if (
          order.payment_status_code == orderStatusCodeDict.client.paid.code &&
          !hasCommented(order) &&
          order.order_status_code_client ==
            orderStatusCodeDict.client.service_end.code
        ) {
          newOrders.push(order);
        }
      });
      break;
    case "已完成":
      orders.map((order: any) => {
        if (
          order.payment_status_code == orderStatusCodeDict.client.paid.code &&
          order.order_status_code_client ==
            orderStatusCodeDict.client.service_end.code &&
          hasCommented(order)
        ) {
          newOrders.push(order);
        }
      });
      break;
    case "已取消":
      orders.map((order: any) => {
        if (orderIsCanceled(order)) {
          newOrders.push(order);
        }
      });
      break;
  }
  return newOrders;
};

export const arrTechTime = [
  "00:00:00",
  "00:30:00",
  "01:00:00",
  "01:30:00",
  "02:00:00",
  "02:30:00",
  "03:00:00",
  "03:30:00",
  "04:00:00",
  "04:30:00",
  "05:00:00",
  "05:30:00",
  "06:00:00",
  "06:30:00",
  "07:00:00",
  "07:30:00",
  "08:00:00",
  "08:30:00",
  "09:00:00",
  "09:30:00",
  "10:00:00",
  "10:30:00",
  "11:00:00",
  "11:30:00",
  "12:00:00",
  "12:30:00",
  "13:00:00",
  "13:30:00",
  "14:00:00",
  "14:30:00",
  "15:00:00",
  "15:30:00",
  "16:00:00",
  "16:30:00",
  "17:00:00",
  "17:30:00",
  "18:00:00",
  "18:30:00",
  "19:00:00",
  "19:30:00",
  "20:00:00",
  "20:30:00",
  "21:00:00",
  "21:30:00",
  "22:00:00",
  "22:30:00",
  "23:00:00",
  "23:30:00",
];

// 测试订单，支付0.1元
export function isTestOrder(openid: any) {
  return isDev && testOrderOpenIds.includes(openid);
}
export const renderOrderStatus = (order: any) => {
  // 待支付
  if (
    [
      orderStatusCodeDict.client.wait_for_payment.code,
      orderStatusCodeDict.client.payment_failed.code,
    ].includes(order.payment_status_code)
  ) {
    return orderStatusCodeDict.client.wait_for_payment.text;
  }

  // 退款中
  if (
    [
      orderStatusCodeDict.client.wait_for_refund.code,
      orderStatusCodeDict.client.refund_quest_send_to_3rd_party.code,
    ].includes(order.payment_status_code)
  ) {
    return orderStatusCodeDict.client.wait_for_refund.text;
  }
  // 已退款
  if (
    [orderStatusCodeDict.client.refunded.code].includes(
      order.payment_status_code
    )
  ) {
    return orderStatusCodeDict.client.refunded.text;
  }
  //退款失败
  if (
    [
      orderStatusCodeDict.client.refund_abnormal.code,
      orderStatusCodeDict.client.refund_closed.code,
      orderStatusCodeDict.client.refund_fail.code,
    ].includes(order.payment_status_code)
  ) {
    return "退款失败";
  }
  //退款审核中
  if (
    [orderStatusCodeDict.client.refund_auditing.code].includes(
      order.payment_status_code
    )
  ) {
    return "退款审核中";
  }
  //已取消
  if (
    [orderStatusCodeDict.client.cancel_before_pay.code].includes(
      order.payment_status_code
    )
  ) {
    return "已取消";
  }
  //支付超时
  if (
    [orderStatusCodeDict.client.payment_timeout.code].includes(
      order.payment_status_code
    )
  ) {
    return orderStatusCodeDict.client.payment_timeout.text;
  }
  if (
    order.order_status_code_client ===
    orderStatusCodeDict.client.service_end.code
  ) {
    if (hasCommented(order)) {
      return "已完成";
    } else {
      return "待评价";
    }
  }
  if (
    [orderStatusCodeDict.client.paid.code].includes(
      order.payment_status_code
    ) &&
    order.order_status_code_client !==
      orderStatusCodeDict.client.service_end.code
  ) {
    return "服务进行中";
  }
  return "";
};
