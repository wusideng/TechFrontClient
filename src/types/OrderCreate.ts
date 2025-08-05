export type NewOrderParam = {
  order: {
    service_time: any;
    service_address: any;
    service_province: string | null;
    service_city: string | null;
    service_district: string | null;
    service_street: string | null;
    service_region: string | null;
    service_detail_address: string | null;
    nickname: string;
    travel_distance: any;
    travel_time: number;
    travel_cost: number;
    tech_user_id: any;
    client_user_id: any;
    order_cost: any;
    travel_mode: any;
    payment_mode: any;
    remark: any;
    coupon_value: any;
    payment_status?: any;
    payment_status_code?: any;
    order_id?: any;
  };
  product: {
    product_id: any;
    order_id: any;
    product_name: any;
    price_current: any;
    duration: any;
    body_parts: any;
    photo_intro: any;
    product_count: any;
    server_time: any;
  };
};
