import { Card, Image } from "antd-mobile";
import React from "react";
import styles from "./style.module.less";
import OrderSteps from "./OrderSteps";
import { useAppSelector } from "@/store";
const OrderStepsCard = () => {
  const { order } = useAppSelector((state) => state.order);
  return (
    <Card className={`${styles.order_card} ${styles.steps_card}`}>
      <div className={styles.order_detail_tech}>
        <div className={styles.tech_step}>
          <OrderSteps />
        </div>
        <div className={styles.tech}>
          <Image
            src={order.tech.photo_work}
            width={100}
            height={100}
            fit="cover"
            style={{ borderRadius: 4 }}
          />
          <div className={styles.tech_name}>{order.tech.user_nickname}</div>
        </div>
      </div>
    </Card>
  );
};
export default OrderStepsCard;
