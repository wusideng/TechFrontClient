import { CouponActivity } from "@/types/Coupon";
import apiClient from "./apiClient";
export const getValidCouponActivityApi = async (
  openid: string | null | undefined = null
): Promise<CouponActivity> => {
  return await apiClient.get(
    `/coupon_activity/get_valid_coupon_activity?openid=${openid}`
  );
};
export const takeCouponsFromCouponActivityApi = async (params: {
  openid: string;
  activity_id: number;
  city: string;
}) => {
  return await apiClient.post(`/coupon_activity/take_coupons`, params);
};
