import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import usePay from "@/hooks/order/usePay";
import { isFinish } from "./util";
import { continueToPayApi, updateOrderStatusApi } from "@/api/orderApi";
import { Button, Modal, Toast } from "antd-mobile";
import CancelOrderModal from "./OrderExtendServiceContainer/OrderCancelModal";
import orderStatusCodeDict from "@/lib/statusCodeDict.json";
import { useAppSelector } from "@/store";

const showPayBtn = (order: any) => {
  return (
    order.payment_status_code ==
      orderStatusCodeDict.client.wait_for_payment.code ||
    order.payment_status_code == orderStatusCodeDict.client.payment_failed.code
  );
};
// 判断订单是否显示服务结束按钮
const showServiceEndBtn = (order: any) => {
  return (
    order.order_status_code_client !==
      orderStatusCodeDict.client.service_end.code &&
    order.payment_status_code == orderStatusCodeDict.client.paid.code
  );
};
const showCancelBtn = (order: any) => {
  //顾客已结束服务，不显示取消按钮，不给退了
  if (
    order.order_status_code_client ==
    orderStatusCodeDict.client.service_end.code
  ) {
    return false;
  }
  //顾客已退款或退款中，不显示取消按钮，但是退款失败显示取消按钮
  //已取消或者支付超时不显示取消按钮
  if (
    [
      orderStatusCodeDict.client.payment_timeout.code,
      orderStatusCodeDict.client.refunded.code,
      orderStatusCodeDict.client.refund_auditing.code,
      orderStatusCodeDict.client.wait_for_refund.code,
      orderStatusCodeDict.client.refund_quest_send_to_3rd_party.code,
      orderStatusCodeDict.client.cancel_before_pay.code,
    ].includes(order.payment_status_code)
  ) {
    return false;
  }
  return true;
};

const CustomFooter = () => {
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();
  const id = params.id;
  const { user } = useAppSelector((state) => state.user);
  const { order } = useAppSelector((state) => state.order);
  const [showOrderCancelModal, setShowOrderCancelModal] = useState(false);

  const continueToPayHandler = usePay();
  const endServiceFromClient = async () => {
    let newOrderStatus = {
      order_id: id,
      order_status_type_code: orderStatusCodeDict.client.service_end.code,
      order_status_type: orderStatusCodeDict.client.service_end.text,
      order_operator: "client",
    };
    try {
      await updateOrderStatusApi(newOrderStatus);
      Toast.show({
        content: "已结束服务，欢迎您进行评价",
      });
      // navigate(`/${baseUrl}/order`);
      navigate(-1);
    } catch (error) {
      console.error("更新订单状态失败:", error);
    }
  };
  const showBottomBtns = () => {
    return (
      !isFinish(order) &&
      (showCancelBtn(order) || showServiceEndBtn(order) || showPayBtn(order))
    );
  };
  const pay = () => {
    const payContent = {
      user_id: user.openid,
      order_id: order.order_id,
    };
    continueToPayHandler(payContent, continueToPayApi);
  };
  return (
    showBottomBtns() && (
      <div className="bottom-buttons-wrapper">
        {showCancelBtn(order) && (
          <Button
            block
            fill="outline"
            color="primary"
            onClick={() => {
              setShowOrderCancelModal(true);
            }}
          >
            取消订单
          </Button>
        )}
        {showServiceEndBtn(order) && (
          <Button
            block
            color="primary"
            onClick={() => {
              Modal.confirm({
                content: "确认服务是否结束",
                onConfirm: async () => {
                  await endServiceFromClient();
                },
              });
            }}
          >
            结束服务
          </Button>
        )}
        {showPayBtn(order) && (
          <Button
            block
            color="primary"
            onClick={() => {
              pay();
            }}
          >
            立即支付
          </Button>
        )}
        <CancelOrderModal
          orderId={id}
          showModal={showOrderCancelModal}
          onSuccess={(res: any) => {
            setShowOrderCancelModal(false);
            if (res.msg) {
              Toast.show({ content: res.msg });
            } else if (
              res.payment_status_code !==
                orderStatusCodeDict.client.wait_for_refund.code &&
              res.payment_status_code !==
                orderStatusCodeDict.client.refunded.code
            ) {
              Toast.show({ content: "退款状态异常，请联系商户进行处理" });
            } else {
              Toast.show({ content: "退款处理中" });
            }
            // navigate(`/${baseUrl}/order`);
            navigate(-1);
          }}
          closeModal={() => {
            setShowOrderCancelModal(false);
          }}
        />
      </div>
    )
  );
};
export default CustomFooter;
