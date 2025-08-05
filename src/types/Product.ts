// homeFrontClient/src/types/Product.ts

// 定义Product类型
export type Product = {
  product_id: number;
  product_name: string;
  price_current: number;
  price_old?: number;
  duration: string;
  introduction: string;
  body_parts: string;
  consumables?: string;
  contraindication?: string;
  promotion?: string;
  photo_intro?: string;
  photo_detail1?: string;
  photo_detail2?: string;
  photo_detail3?: string;
  order_count?: number;
};

// 定义Products类型
export type Products = Product[];
