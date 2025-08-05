import { Steps } from "antd-mobile";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import orderStatusCodeDict from "@/lib/statusCodeDict.json";
import { useAppSelector } from "@/store";
const getCurrentDeliverStep = (order: any) => {
  const tech_status = order.order_status_code_tech;
  switch (tech_status) {
    case orderStatusCodeDict.tech.confirm_take_order.code:
      return 0;
    case orderStatusCodeDict.tech.has_on_the_way.code:
      return 1;
    case orderStatusCodeDict.tech.has_arrived.code:
      return 2;
    case orderStatusCodeDict.tech.start_service.code:
      return 3;
    case orderStatusCodeDict.tech.service_end.code:
    case orderStatusCodeDict.tech.has_left.code:
      return 4;
    default:
      return -1;
  }
};
export const getDescription = (order_status: any, code: any) => {
  const status = order_status.find(
    (o: any) => o.order_status_type_code == code
  );
  if (!status) {
    return null;
  }
  return moment(status.order_status_time).format("YYYY-MM-DD HH:mm");
};

const getSteps = (order_status: any) => {
  order_status = order_status.filter((o: any) => o.order_operator === "tech");
  const steps = [
    {
      title: "已接单",
      description: getDescription(
        order_status,
        orderStatusCodeDict.tech.confirm_take_order.code
      ),
    },
    {
      title: "已出发",
      description: getDescription(
        order_status,
        orderStatusCodeDict.tech.has_on_the_way.code
      ),
    },
    {
      title: "已到达",
      description: getDescription(
        order_status,
        orderStatusCodeDict.tech.has_arrived.code
      ),
    },
    {
      title: "服务开始",
      description: getDescription(
        order_status,
        orderStatusCodeDict.tech.start_service.code
      ),
    },
    {
      title: "服务完成",
      description: getDescription(
        order_status,
        orderStatusCodeDict.tech.service_end.code
      ),
    },
  ];
  return steps;
};
const OrderSteps = () => {
  const [steps, setSteps] = useState(getSteps([]));
  const { order } = useAppSelector((state) => state.order);
  const [deliverStep, setDeliverStep] = useState(-1);
  useEffect(() => {
    if (order.order_id) {
      const currentStep = getCurrentDeliverStep(order);
      setDeliverStep(currentStep);
      if (order.order_status && order.order_status.length > 0) {
        setSteps(getSteps(order.order_status));
      }
    }
  }, [order]);
  return (
    <Steps direction="vertical" current={deliverStep}>
      {steps.map((step: any, index: any) => (
        <Steps.Step
          key={index}
          title={step.title}
          description={step.description}
        />
      ))}
    </Steps>
  );
};
export default OrderSteps;
