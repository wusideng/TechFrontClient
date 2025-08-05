import orderStatusCodeDict from "@/lib/statusCodeDict.json";

export const renderPaymentStatus = (order: any) => {
  //支付失败，显示待支付
  if (
    order.payment_status_code === orderStatusCodeDict.client.payment_failed.code
  ) {
    return orderStatusCodeDict.client.wait_for_payment.text;
  }
  //退款请求已向微信发出，显示退款中
  if (
    order.payment_status_code ===
    orderStatusCodeDict.client.refund_quest_send_to_3rd_party.code
  ) {
    return orderStatusCodeDict.client.wait_for_refund.text;
  }
  //退款异常，显示退款失败
  if (
    [
      orderStatusCodeDict.client.refund_abnormal.code,
      orderStatusCodeDict.client.refund_closed.code,
      orderStatusCodeDict.client.refund_fail.code,
    ].includes(order.payment_status_code)
  ) {
    return "退款失败";
  }
  if (
    order.payment_status_code ===
    orderStatusCodeDict.client.refund_auditing.code
  ) {
    return "退款审核中";
  }

  return order.payment_status;
};

export const isFinish = (order: any) => {
  return (
    order.order_status_code_client ===
    orderStatusCodeDict.client.service_end.code
  );
};
export const hasCommented = (order: any) => {
  return (
    order.order_comment?.client_score_to_tech !== undefined &&
    order.order_comment?.client_score_to_tech !== null
  );
};
