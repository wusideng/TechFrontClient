import React, { useEffect, useState } from "react";
import { Card, Image } from "antd-mobile";
import { formatDateString, renderOrderStatus } from "@/util/dict";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { hasCommented, isFinish, renderPaymentStatus } from "./util";
import OrderComment from "./OrderComment";
import CustomFooter from "./CustomFooter";
import ExtendServiceButton from "./ExtendServiceButton";
import orderStatusCodeDict from "@/lib/statusCodeDict.json";
import moment from "moment";
import styles from "./style.module.less";
import OrderStepsCard from "./OrderStepsCard";
import CustomClockIcon from "@/components/icons/CustomClockIcon";
import { useAppSelector } from "@/store";

const OrderDetailContainer = () => {
  const { order } = useAppSelector((state) => state.order);
  const [loading, setLoading] = useState(false);
  // 初始化加载订单详情

  const totalFee = () => {
    let total = 0;
    order.order_products.forEach((product) => {
      total += product.price_current * product.product_count;
    });
    total += order.travel_cost * 2;
    total = total - (order.coupon_value || 0);
    return total;
  };
  // 提交订单
  const renderRefundAmount = () => {
    if (
      [
        orderStatusCodeDict.tech.wait_for_take_order.code,
        orderStatusCodeDict.tech.confirm_take_order.code,
      ].includes(order.order_status_code_tech) ||
      !order.order_status_code_tech
    ) {
      // 全额退款
      return <span>退款金额{order.order_cost}元</span>;
    } else {
      return (
        <span>
          退款金额{order.order_cost - order.travel_cost * 2}元
          {/* ，技师已出发，路费{order.travel_cost * 2}元无法退款 */}
        </span>
      );
    }
  };
  const renderOrderStatusTitle = () => {
    const statusText = renderOrderStatus(order);
    const text = statusText.includes("订单") ? statusText : "订单" + statusText;
    return <div className={styles.status}>{text}</div>;
  };
  return (
    <MiddleContentHeader
      title={renderOrderStatus(order)}
      loading={loading}
      withFooter={false}
      CustomFooter={<CustomFooter />}
    >
      {hasCommented(order) && <div className={styles.status}>{"已评论"}</div>}
      {order.payment_status_code === orderStatusCodeDict.client.paid.code ? (
        <OrderStepsCard />
      ) : (
        renderOrderStatusTitle()
      )}

      <Card className={`${styles.order_card} ${styles.order_products_card}`}>
        <div className={styles.order_products_wrapper}>
          {order.order_products.map((product: any, index: any) => {
            return (
              <div className={styles.product_detail} key={index}>
                <Image
                  src={product.photo_intro}
                  width={82}
                  height={82}
                  fit="cover"
                  style={{ borderRadius: 4 }}
                />
                <div className={styles.product_summary}>
                  <div className={styles.product_summary_desc}>
                    <span className={styles.product_name}>
                      {product.product_name}
                    </span>
                    <span className={styles.product_count}>
                      数量：{product.product_count}
                    </span>
                  </div>
                  <div className={styles.product_summary_desc}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <CustomClockIcon />
                      <span>{product.duration}</span>
                    </div>
                    <div className={styles.money}>
                      ￥{product.price_current}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className={styles.product_fee_summary}>
            <div className={styles.order_detail_item}>
              <div className={styles.item_name}>出行距离：</div>
              <div className={styles.item_value}>
                {order.travel_distance} km
              </div>
            </div>
            <div className={styles.order_detail_item}>
              <div className={styles.item_name}>出行费用：</div>
              <div className={styles.item_value}>
                ￥{order.travel_cost * 2}{" "}
              </div>
            </div>
            <div className={styles.order_detail_item}>
              <div
                className={styles.item_name}
                style={{ display: "flex", alignItems: "center" }}
              >
                优惠券抵扣：
              </div>
              <div className={styles.item_value} style={{ color: "red" }}>
                ￥-{order.coupon_value}
              </div>
            </div>
            <div className={styles.product_summary_all}>
              <span className={styles.text}>合计：</span>
              <span className={styles.money}>￥{totalFee()}</span>
            </div>
          </div>
        </div>
        <ExtendServiceButton />
      </Card>

      <Card className={styles.second_card}>
        <div className={styles.second_card_content}>
          <div className={styles.order_detail_item}>
            <div className={styles.item_name}>联系人：</div>
            <div className={styles.item_value}>
              {order.client.user_nickname}{" "}
            </div>
          </div>
          <div className={styles.order_detail_item}>
            <div className={styles.item_name}>服务时间：</div>
            <div className={styles.item_value}>
              {moment(order.service_time).format("YYYY-MM-DD HH:mm")}
            </div>
          </div>
          <div className={styles.order_detail_item}>
            <div className={styles.item_name}>服务地点：</div>
            <div className={styles.item_value}>
              {order.service_region} {order.service_detail_address}
            </div>
          </div>
          <div className={styles.order_detail_item}>
            <div className={styles.item_name}>订单编号：</div>
            <div className={styles.item_value}>{order.order_serial} </div>
          </div>
          <div className={styles.order_detail_item}>
            <div className={styles.item_name}>支付状态：</div>
            <div className={styles.item_value}>
              <div style={{ textAlign: "right" }}>
                <span>{renderPaymentStatus(order)} </span>
                {order.payment_status_code ==
                  orderStatusCodeDict.client.refunded.code &&
                  renderRefundAmount()}
              </div>
            </div>
          </div>
          <div className={styles.order_detail_item}>
            <div className={styles.item_name}>下单时间：</div>
            <div className={styles.item_value}>
              {formatDateString(order.create_order_time)}
            </div>
          </div>
        </div>
      </Card>
      {isFinish(order) && !hasCommented(order) && (
        <OrderComment setLoading={setLoading} />
      )}
    </MiddleContentHeader>
  );
};

export default OrderDetailContainer;
