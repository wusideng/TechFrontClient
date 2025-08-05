import React, { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CouponOutline } from "antd-mobile-icons";
import { Button, Card, Image, Input, Modal, Toast } from "antd-mobile";

import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import {
  setOrderProductCount,
  setOrderTaxiCostAndTravelTime,
} from "@/store/slices/orderSlice";
import { baseUrl, default_travel_time_seconds } from "@/util/config";
import CustomStepper from "@/components/icons/CustomStepper";
import CustomClockIcon from "@/components/icons/CustomClockIcon";
import { NewOrderParam } from "@/types/OrderCreate";
import OrderAddress from "./OrderAddress";
import useGaodeAddress from "@/hooks/address/useGaodeAddress";
import styles from "./style.module.less";
import OrderTech from "./OrderTech";
import usePay from "@/hooks/order/usePay";
import { createOrderWxPayApi, getTravelCostByCityApi } from "@/api/orderApi";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@/store";
import { NewOrder } from "@/types/NewOrder";
import { isDev } from "./../../../util/config";
import { TravelCost } from "@/types/TravelCost";

export const isDaytime = () => {
  const now = moment();
  const hours = now.hours();
  // 超过或等于22点算夜里，其他时间算白天
  return hours < 22;
};
const getFinalPrice = (newOrder: NewOrder) => {
  return (
    newOrder.otherInfo.orderTaxiCost * 2 +
    newOrder.product.price_current * newOrder.otherInfo.productCount -
    newOrder.otherInfo.couponAmount
  );
};
const Page = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    getTaxiCostAndTravelTime,
    amapInitialized,
  }: {
    getTaxiCostAndTravelTime: (
      position1: { lon: number; lat: number },
      position2: { lon: number; lat: number }
    ) => Promise<{ taxi_cost: number; travel_time: number }>;
    amapInitialized: boolean;
  } = useGaodeAddress();
  const { address } = useAppSelector((state) => state.address);
  const { newOrder } = useAppSelector((state) => state.order);
  const [travelCostCurrentCity, setTravelCostCurrentCity] =
    React.useState<TravelCost | null>(null);
  const getTaxiCostAndTravelTimeAction = async (
    position1: { lat: number; lon: number },
    position2: { lat: number; lon: number }
  ) => {
    const is_daytime = isDaytime();
    const travelCostCurrentCity = await getTravelCostByCityApi(address.city);
    setTravelCostCurrentCity(travelCostCurrentCity);
    let travelTime: number = default_travel_time_seconds;
    const cost_per_km = is_daytime
      ? travelCostCurrentCity.price_per_km_daytime
      : travelCostCurrentCity.price_per_km_nighttime ||
        travelCostCurrentCity.price_per_km_daytime;

    const distance_km = parseFloat(newOrder.tech.distance.toFixed(2));
    let taxi_cost_single_way =
      distance_km <= travelCostCurrentCity.base_distance_km
        ? travelCostCurrentCity.base_price
        : travelCostCurrentCity.base_price +
          (distance_km - travelCostCurrentCity.base_distance_km) * cost_per_km;
    try {
      const { travel_time } = await getTaxiCostAndTravelTime(
        position1,
        position2
      );
      if (!(typeof travel_time === "number" && !isNaN(travel_time))) {
        throw new Error("travel_time is not a number");
      }
      travelTime = travel_time;
    } catch (error) {
      console.error(error);
    }
    console.log("taxi_cost_single_way", taxi_cost_single_way);
    return { travelTime, taxiCost: Number(taxi_cost_single_way.toFixed(2)) };
  };
  useEffect(() => {
    const initTaxiCost = async () => {
      if (newOrder.orderServiceAddress && amapInitialized) {
        let clientCoord = {
          lon: newOrder.orderServiceAddress.lon,
          lat: newOrder.orderServiceAddress.lat,
        };
        let techCoord = { lon: newOrder.tech.lon, lat: newOrder.tech.lat };
        const { taxiCost, travelTime } = await getTaxiCostAndTravelTimeAction(
          clientCoord,
          techCoord
        );
        if (taxiCost !== newOrder.otherInfo.orderTaxiCost) {
          dispatch(setOrderTaxiCostAndTravelTime({ taxiCost, travelTime }));
        }
      }
    };
    initTaxiCost();
  }, [amapInitialized]);
  // 待支付，已支付
  const getPriceBeforeCoupon = () => {
    return (
      newOrder.otherInfo.orderTaxiCost * 2 +
      newOrder.product.price_current * newOrder.otherInfo.productCount
    );
  };
  const renderTaxiCostDesc = () => {
    if (!travelCostCurrentCity) return "";
    if (travelCostCurrentCity.price_per_km_nighttime) {
      return `单程${newOrder.tech.distance.toFixed(2)}公里，${
        travelCostCurrentCity.base_price
      }元起步（含${travelCostCurrentCity.base_distance_km.toFixed(
        2
      )}公里），超出按公里计费：日间 ${travelCostCurrentCity.price_per_km_daytime.toFixed(
        2
      )}元，夜间（22点后）${travelCostCurrentCity.price_per_km_nighttime.toFixed(
        2
      )}元，单程${newOrder.otherInfo.orderTaxiCost}元, 往返车费共计${
        newOrder.otherInfo.orderTaxiCost * 2
      }元`;
    } else {
      return `单程${newOrder.tech.distance.toFixed(2)}公里，${
        travelCostCurrentCity.base_price
      }元起步（含${travelCostCurrentCity.base_distance_km.toFixed(
        2
      )}公里），超出按公里计费：每公里${travelCostCurrentCity.price_per_km_daytime.toFixed(
        2
      )}元，单程${newOrder.otherInfo.orderTaxiCost}元, 往返车费共计${
        newOrder.otherInfo.orderTaxiCost * 2
      }元`;
    }
  };
  return (
    <MiddleContentHeader
      className={styles.order}
      title={"尚达元.确认下单"}
      withFooter={false}
      CustomFooter={<CustomFooter />}
    >
      <div className={styles.order_content_wrapper}>
        <OrderAddress />
        <OrderTech />

        <Card className={styles.product}>
          <div
            style={{ fontWeight: "bold", fontSize: "1rem", paddingBottom: 12 }}
          >
            服务项目
          </div>
          <div className={styles.product_line_1}>
            <Image
              src={newOrder.product.photo_intro}
              width={64}
              height={64}
              fit="cover"
              style={{
                borderRadius: 5,
              }}
            />
            <div className={styles.product_line_1_right}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: "bold" }}>
                  {newOrder.product.product_name}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CustomClockIcon
                    size="16px"
                    // bgColor="#32a65f"
                    // handColor="#ffffff"
                  />
                  <span style={{ marginLeft: 5 }}>
                    {newOrder.product.duration}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>{newOrder.product.price_current}元</div>
                <CustomStepper
                  // className="product-count-stepper"
                  defaultValue={newOrder.otherInfo.productCount}
                  value={newOrder.otherInfo.productCount}
                  onChange={(value: any) => {
                    dispatch(setOrderProductCount(value));
                  }}
                  // style={{ "--button-text-color": "white" }}
                  min={1}
                  max={5}
                />
              </div>
            </div>
          </div>
          <div className={styles.product_line} style={{ marginTop: 25 }}>
            <div className={styles.product_line_inner}>
              <div className="item-name">出行方式</div>
              <div className="item-value">
                <div className={styles.travle_method}>打车</div>
              </div>
            </div>
          </div>
          <div className={styles.product_line} style={{ marginTop: "10px" }}>
            <div className={styles.product_line_inner}>
              <div className="item-name">出行费用</div>
              <div className="item-value">
                {newOrder.otherInfo.orderTaxiCost * 2}元
              </div>
            </div>
            <div
              className="item-value"
              style={{ color: "var(--adm-color-weak)" }}
            >
              {renderTaxiCostDesc()}
            </div>
          </div>
          <div className={styles.product_line} style={{ marginTop: 25 }}>
            <div className={styles.product_line_inner}>
              <div className={styles.coupon}>
                <div className="item-name">优惠券</div>
                {newOrder.otherInfo.couponAmount !== 0 &&
                  newOrder.otherInfo.couponAmount !== undefined &&
                  newOrder.otherInfo.couponAmount !== null && (
                    <div className="item-value">{`- ${newOrder.otherInfo.couponAmount}`}</div>
                  )}
              </div>
              <div
                className={styles.couponselect}
                onClick={() => {
                  navigate(`/${baseUrl}/ordercreate/coupon`);
                }}
              >
                <div>券</div>
                <CouponOutline
                  fontSize={20}
                  color="var(--adm-color-danger)"
                  style={{ marginTop: "5px" }}
                />
              </div>
            </div>
            <div className={styles.product_line_inner}>
              <div className="item-name">费用合计</div>
              <div className="item-value">
                <span
                  style={{
                    color: "var(--adm-color-weak)",
                    marginRight: "10px",
                  }}
                >
                  往返车费+项目服务费用
                </span>
                <span className="money-color" style={{ fontSize: 16 }}>
                  {getFinalPrice(newOrder)}元
                </span>
              </div>
            </div>
            {newOrder.otherInfo.couponAmount > 0 ? (
              <div className={styles.product_line_inner}>
                <div className="item-name">优惠</div>
                <div className="item-value">
                  <span
                    style={{
                      color: "var(--adm-color-weak)",
                      marginRight: "20px",
                    }}
                  >
                    原价
                    {getPriceBeforeCoupon()}
                    元，已经优惠
                  </span>
                  {newOrder.otherInfo.couponAmount}元
                </div>
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    </MiddleContentHeader>
  );
};

export default Page;
const CustomFooter = () => {
  const { newOrder } = useAppSelector((state) => state.order);
  const payHandler = usePay();

  const createOrderHandler = (payContent: any = null) => {
    let newOrderParam: NewOrderParam = {
      order: {
        service_time: moment(
          `${newOrder.tech.workdate} ${newOrder.tech.worktime}`
        ).format("YYYY-MM-DD HH:mm:ss"),
        service_address: newOrder.orderServiceAddress.address,
        service_city: newOrder.orderServiceAddress.city,
        service_province: newOrder.orderServiceAddress.province,
        service_district: newOrder.orderServiceAddress.district,
        service_street: newOrder.orderServiceAddress.street,
        service_region: newOrder.orderServiceAddress.region,
        service_detail_address: newOrder.orderServiceAddress.detail_address,
        nickname: newOrder.orderServiceAddress.name,
        travel_distance: newOrder.tech.distance,
        travel_cost: newOrder.otherInfo.orderTaxiCost,
        travel_time: newOrder.otherInfo.travelTime,
        tech_user_id: newOrder.tech.openid,
        client_user_id: newOrder.client.openid,
        order_cost: getFinalPrice(newOrder),
        travel_mode: "出租车",
        payment_mode: "微信支付",
        remark: "杭州推广订单",
        coupon_value: newOrder.otherInfo.couponAmount,
      },
      product: {
        product_id: newOrder.product.product_id,
        order_id: 0,
        product_name: newOrder.product.product_name,
        price_current: newOrder.product.price_current,
        duration: newOrder.product.duration,
        body_parts: newOrder.product.body_parts,
        photo_intro: newOrder.product.photo_intro,
        product_count: newOrder.otherInfo.productCount,
        server_time: `${newOrder.tech.workdate} ${newOrder.tech.worktime}`,
      },
    };
    payContent.order_product_info = newOrderParam;
    payHandler(payContent, createOrderWxPayApi, newOrder.otherInfo.couponId);
  };
  return (
    <div className="bottom-buttons-wrapper">
      <Button
        block
        color="primary"
        onClick={() => {
          if (!isDev && getFinalPrice(newOrder) > 2000) {
            Toast.show({
              content: "单次消费不能大于2000元",
            });
            return;
          }
          if (!newOrder.orderServiceAddress) {
            Toast.show({
              content: "请先创建服务地址",
            });

            return;
          }
          if (!(newOrder.tech.workdate && newOrder.tech.worktime)) {
            Toast.show({
              content: "请选择服务时间",
            });

            return;
          }
          let payContent = {
            prodname: newOrder.product.product_name,
            clientOpenId: newOrder.client.openid,
          };
          createOrderHandler(payContent);
        }}
      >
        立即支付
        {getFinalPrice(newOrder)}元
      </Button>
    </div>
  );
};
