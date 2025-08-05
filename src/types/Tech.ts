import { Product, Products } from "./Product";
export type Comment = {
  order_comment_id?: number;
  order_id?: number;
  client_openid: string;
  client_comment?: string;
  client_comment_time?: number;
  client_score_to_tech?: number;
  tech_id: string; // 这里是openid
  tech_comment?: string;
  tech_comment_time?: string;
  tech_score_to_client?: string;
};

export type TechUser = {
  tech_user_id?: any;
  openid: string;
  user_id?: any;
  work_phone?: string;
  headimgurl?: string;
  photo_work?: any;
  photo_life_1?: any;
  photo_life_2?: any;
  photo_life_3?: any;
  user_nickname?: any;
  distance?: any;
  user_desc?: any;
  user_sex?: string;
  user_age?: string;
  user_city?: string;
  work_city?: string;
  workdate?: string;
  worktime?: string;
  comments?: Comment[];
  products?: Product[];
  lon?: number;
  lat?: number;
  follow_count?: number;
  comment_count?: number;
  is_followed?: boolean;
  is_new_tech: true;
  business_license?: string;
  technician_certificate?: string;
  health_certificate?: string;
  dealer_name?: string;
};
export type TechListParams = {
  lon: number;
  lat: number;
  city: string;
  user_openid: string;
  orderBy: string;
  name: string | undefined | null;
  pageNumber: number;
  pageSize: number;
  signal: AbortSignal;
  product_id: number | null;
};
