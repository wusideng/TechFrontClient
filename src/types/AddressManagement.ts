export type UserAddress = {
  openid: string; //微信openid
  name: string; //用户姓名
  phone: string; //用户电话，
  is_default: boolean;
  id?: number;
  address?: string; //完整的地址，包含省市县小区门牌号等
  province: string; //用户所在省份 1
  city: string; //用户所在城市 2
  district: string; //用户所在区 3
  street: string; //用户所在街道 4
  region: string; //具体到用户所在的小区 5
  detail_address: string; //门牌号 6
  lon: number; //经度
  lat: number; //纬度
};
export type POIS = {
  info: string;
  poiList: {
    pois: POI[];
    count: number;
    pageIndex: number;
    pageSize: number;
  };
};
export type POI = {
  id: string; //POI唯一标识
  name: string; //名称 小区名称
  type: string; //类型
  location: { lat: number; lng: number }; //经纬度
  address: string; //街道地址,在哪条路上（不含城市名称）
  tel: string; //电话号码
  distance: number; //距离
  shopinfo: string; //商铺信息
  website: string; //网址
  pcode: string; //邮编
  citycode: string; //城市编码
  adcode: string; //区域编码
  postcode: string; //邮编
  pname: string; //省份名称
  cityname: string; //城市名称
  adname: string; //区域名称, 比如朝阳区
  email: string; //邮箱
};

export type POIformatted = {
  // id: string; //POI唯一标识
  lat: number;
  lon: number;
  distance?: number; //距离
  province?: string; //省份名称
  city?: string; //城市名称
  district?: string; //区域名称, 比如朝阳区
  street?: string;
  region?: string; //具体到用户所在的小区
};
export const EmptyUserAddress: UserAddress = {
  openid: "",
  name: "",
  phone: "",
  is_default: false,
  // address: "", //full address， address中包括省市县和详细区域，门牌号
  province: "",
  city: "",
  district: "",
  street: "",
  region: "", //小区名
  detail_address: "", //详细门牌号
  address: "", //完整的地址，包含省市县小区门牌号等
  lat: 0,
  lon: 0,
};

export type GaodePositionResult = {
  accuracy: number;
  addressComponent: {
    adcode: string;
    building: string;
    buildingType: string;
    city: string;
    citycode: string;
    district: string;
    neighborhood: string;
    province: string;
    street: string;
    streetNumber: string;
    township: string;
  };
  code: number;
  formattedAddress: string;
  info: string;
  isConverted: boolean;
  location_type: string;
  message: string;
  position: {
    lat: number;
    lng: number;
  };
  status: number;
};
// export type GaodeAddressSaved = {
//   position: { lon: number; lat: number };
//   addressComponent: {
//     citycode?: string;
//     adcode?: string;
//     // businessAreas: any[];
//     // neighborhoodType: string;
//     neighborhood?: string;
//     building: string;
//     buildingType?: string;
//     street: string;
//     streetNumber: string;
//     province: string;
//     city: string;
//     district: string;
//     township: string;
//     pois?: POIformatted[];

//     // region: string;
//   };
//   formatted_address: string;
//   pois?: POIformatted[];
// };
