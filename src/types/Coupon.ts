export type Coupon = {
  coupon_id: number;
  amount: number;
  open_id: string;
  condition: number;
  project?: string;
  expiration_time: string;
  grant_time: string;
  grant_city: string;
  coupon_type: string;
  msg: string;
  coupon_status?: string;
};

export type Coupons = Coupon[];

export type CouponActivity = {
  activity_id?: number;
  activity_name: string;
  start_time: string | Date;
  end_time: string | Date;
  img_url: string;
  activity_status: string;
  coupons?: CouponActivityCoupon[];
};
export type CouponActivityCoupon = {
  coupon_value: number;
  amount: number;
  coupon_condition: number;
};
