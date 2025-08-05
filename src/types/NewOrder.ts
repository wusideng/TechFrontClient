import { UserAddress } from "./AddressManagement";
import { ClientUser } from "./ClientUser";
import { Product } from "./Product";
import { TechUser } from "./Tech";

export type NewOrder = {
  client: ClientUser;
  tech: TechUser;
  product: Product;
  orderServiceAddress: UserAddress | null;
  otherInfo: {
    couponAmount: number; //优惠券金额
    couponId?: number; //优惠券id
    productCount: number; //商品数量
    orderTaxiCost: number; //订单出租车费用
    travelTime: number; //订单预计行驶时间,单位是秒
  };
};
