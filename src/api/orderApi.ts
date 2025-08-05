import apiClient from "./apiClient";
import { formatDateToVoice } from "@/util/utils";
import { TechWorktime } from "@/types/TechWorktime";
import moment from "moment";
import { TravelCost } from "@/types/TravelCost";
// 到家平台创建订单
export const updateOrderPaymentApi = (order: any) => {
  return apiClient.post("/orders/payment_update/", order);
};

// 创建订单短信通知(阿里试用)
export const createOrderSMSApi = (
  phoneNumber: any,
  techName: any,
  serviceTime: any
) => {
  return apiClient.get(
    `/sms/createOrder?phoneNumber=${phoneNumber}&techName=${techName}&serviceTime=${serviceTime}`
  );
};

// 创建订单语音通知(互亿无限) 管理员
// 尚阳科技提醒您，杨晓丽 在巫山有一条预约时间为 2025年3月2日20点00分 的订单，请注意查看
export const createOrderSMSVoiceTechApi = (
  phoneNumber: any,
  techName: any,
  serviceTime: any
) => {
  let content = `尚阳科技提醒您，${techName}您有一条预约时间为 ${formatDateToVoice(
    serviceTime
  )}的订单，请注意查看`;
  return apiClient.post(`/hywxVoiceSMS/voice/`, {
    mobile: phoneNumber,
    text: content,
  });
};

// 创建订单语音通知(互亿无限) 管理员
// 尚阳科技提醒您，杨晓丽 在巫山有一条预约时间为 2025年3月2日20点00分 的订单，请注意查看
export const createOrderSMSVoiceApi = (
  phoneNumber: any,
  techName: any,
  serviceTime: any,
  serviceCity: any
) => {
  let content = `尚阳科技提醒您，${techName}在${serviceCity}有一条预约时间为 ${formatDateToVoice(
    serviceTime
  )}的订单，请注意查看`;
  return apiClient.post(`/hywxVoiceSMS/voice/`, {
    mobile: phoneNumber,
    text: content,
  });
};

// 微信支付系统创建订单
// req
// {
//     "prodname": "调理之源",
//     "clientOpenId": "oK9p06eiEk0jWNvowVjb5lGlkocM",
//     "total_fee": 1
// }
// res 信息
// {
//     "appId": "wxfa6035d95514257e",
//     "timeStamp": "1737195298",
//     "nonceStr": "kz0t08tuy4f0ch8t965wx1h26u15iebh",
//     "package": "prepay_id=wx181815008483252f7a82bb1d5b8b6c0000",
//     "signType": "MD5",
//     "paySign": "0DE31C67059D7D06697C454F47CA312E"
// }
export const createOrderWxPayApi = (payContent: any) => {
  return apiClient.post(`/orders/createwxpay/`, payContent);
};
export const continueToPayApi = (payContent: any) => {
  return apiClient.post(`/orders/continuetopay/`, payContent);
};
// 获取订单列表
export const getOrdersApi = ({ user_openid, pageNumber, pageSize, signal }) => {
  return apiClient.get(
    `/orders/clientOrderList/client/${user_openid}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      signal,
    }
  );
  // return
  // return apiClient.get('/orders/clientOrderList/?pageNum=0&pageSize=10');
};

// 获取订单详细
export const getOrderDetailApi = (order_id: any) => {
  return apiClient.get(`/orders/clientOrderList/${order_id}`);
};

// 更新订单状态
export const updateOrderStatusApi = (orderStatus: any) => {
  return apiClient.post(`/ordersStatus/`, orderStatus);
};

// 获取订单状态
export const fetchOrderStatusApi = (order_id: any) => {
  return apiClient.get(`/ordersStatus/orderstatus/${order_id}`);
};

// 获取技师服务时间选择，只展示技师工作时间
export const getWorktimeBlockApi = async (
  open_id: any
): Promise<TechWorktime[]> => {
  return await apiClient.get(`/techUserWorktime/worktimeBlocks/${open_id}`);
};

// 发放优惠券（新人优惠券）¥10*4， ¥25*2，¥38
export const insertCouponApi = async (open_id: any, city: any) => {
  let arrCouponAmount = [
    { amount: 10, condition: 0 },
    { amount: 10, condition: 0 },
    { amount: 10, condition: 0 },
    { amount: 10, condition: 0 },
    { amount: 25, condition: 298 },
    { amount: 25, condition: 298 },
    { amount: 30, condition: 350 },
    { amount: 38, condition: 350 },
  ]; //新人优惠券
  let coupons = arrCouponAmount.map((amount: any) => {
    return {
      open_id: open_id,
      amount: amount.amount,
      condition: amount.condition,
      project: "string",
      expiration_time: moment()
        .add(3, "months")
        .endOf("day")
        .startOf("second")
        .format("YYYY-MM-DD HH:mm:ss"),
      grant_city: city,
      coupon_type: "新人特惠",
      msg: "新人特惠",
    };
  });
  return await apiClient.post(`/coupon/insert`, { coupons });
};

export const getCouponsApi = async (open_id: any) => {
  return await apiClient.get(`/coupon/${open_id}`);
};
export const cancelOrderApi = async (refundInfo: any) => {
  return await apiClient.post(`/orders/refund`, refundInfo);
};

export const addCommentApi = async (orderComment: any) => {
  return await apiClient.post(`/ordersComment/clientOrder`, orderComment);
};

export const extendServicePayApi = async (payContent: any) => {
  return await apiClient.post(`/orders/extendService`, payContent);
};

export const getTravelCostByCityApi = async (
  city: string
): Promise<TravelCost> => {
  return await apiClient.get(`/travel_cost/city/${city}`);
};
