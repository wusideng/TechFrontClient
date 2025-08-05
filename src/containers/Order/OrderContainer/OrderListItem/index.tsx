import React from "react";
import { Button, Card, Image } from "antd-mobile";
import orderStatusCodeDict from "@/lib/statusCodeDict.json";
import usePay from "@/hooks/order/usePay";
import { renderOrderStatus } from "@/util/dict";
import { continueToPayApi } from "@/api/orderApi";
import styles from "./style.module.less";
import moment from "moment";
import CustomClockIcon from "@/components/icons/CustomClockIcon";
import { useAppSelector } from "@/store";

const OrderListItem = ({ order, turnToDetail }: any) => {
  const { user } = useAppSelector((state) => state.user);
  const needContinueToPay =
    order.payment_status_code ===
      orderStatusCodeDict.client.wait_for_payment.code ||
    order.payment_status_code ===
      orderStatusCodeDict.client.payment_failed.code;
  const payHandler = usePay();
  const pay = () => {
    const payContent = {
      user_id: user.openid,
      order_id: order.order_id,
    };
    payHandler(payContent, continueToPayApi);
  };
  return (
    <Card className={styles.order_item_card}>
      <div className={styles.card_header}>
        <div className={styles.order_time}>
          <span>
            <CustomClockIcon size="14px" />
          </span>
          <span>
            预约时间： {moment(order.service_time).format("YYYY-MM-DD HH:mm")}{" "}
          </span>
        </div>
        <div className={styles.status}>{renderOrderStatus(order)}</div>
      </div>
      <div
        className={styles.order_item}
        onClick={() => turnToDetail(order.order_id)}
      >
        <div className={styles.img_wrapper}>
          <Image
            src={order.tech.photo_work}
            width={80}
            height={80}
            fit="cover"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className={styles.order_content}>
          <div className={styles.line_1}>
            <span className={styles.tech_name}>{order.tech.user_nickname}</span>
          </div>
          <div className={styles.product_info}>
            <span className={styles.product_name}>
              {order.order_products[0]?.product_name}
            </span>
            <span className={styles.product_count}>
              x{order.order_products[0]?.product_count}
            </span>
          </div>
          <div className={styles.money_wrapper}>
            <span className={styles.money}>￥{order.order_cost}</span>
            {needContinueToPay && (
              <Button
                color="primary"
                size="mini"
                onClick={(event) => {
                  event.stopPropagation();
                  pay();
                }}
              >
                立即支付
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderListItem;
