import apiClient from "./apiClient";

// 获取微信用户Ticket
// export const fetchJsapiTicket = (url: any) => {
//   return apiClient.get(`/wx/get_jsapi_ticket?url=${url}`);
// };

// （高德）获取微信用户地址信息
// export const fetchLBSAddress = (lon: any, lat: any) => {
//   return apiExtClient.get(
//     `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${lon},${lat}&key=1c4a139d09e6d072011d125b6d54d4e6&radius=1000&extensions=all`
//   );
// };

// （高德）获取微信用户路径分析，距离计算
export const fetchPathAnalysis = (
  lon1: any,
  lat1: any,
  lon2: any,
  lat2: any
) => {
  return apiClient.get(
    `https://restapi.amap.com/v5/direction/driving?origin=${lon1},${lat1}&destination=${lon2},${lat2}&key=1c4a139d09e6d072011d125b6d54d4e6`
  );
};

// 添加顾客位置信息
// client_user_id: str
// refresh_time: datetime = Field(default_factory=datetime.now)
// lon: Decimal
// lat: Decimal
// address: Optional[str] = None
// city: Optional[str] = None
// detail_address: Optional[str] = None
export const addClientUserPositionApi = async (
  clientUserPosition: any
): Promise<any> => {
  return await apiClient.post(`/clientUserPosition/`, clientUserPosition);
};

// （高德）POI 查询周围
// export const fetchPois = (keyword: any, lon: any, lat: any, city: any) => {
//   const types =
//     "商务住宅,住宿服务,地名地址信息,公司企业,交通设施服务,风景名胜,生活服务场所,购物服务,餐饮服务";
//   if (keyword == "") {
//     return apiExtClient.get(
//       `https://restapi.amap.com/v3/place/text?keywords=${"小区"}&location=${lon},${lat}&city=${city}&offset=20&page=1&extensions=all&types=${types}&key=1c4a139d09e6d072011d125b6d54d4e6`
//     );
//   } else {
//     return apiExtClient.get(
//       `https://restapi.amap.com/v3/place/text?keywords=${keyword}&location=${lon},${lat}&city=${city}&offset=20&page=1&extensions=all&types=${types}&key=1c4a139d09e6d072011d125b6d54d4e6`
//     );
//   }
//   // return apiExtClient.get(`https://restapi.amap.com/v3/place/text?keywords={keyword}&location=${lon},${lat}&city=${city}&offset=20&page=1&extensions=all&key=1c4a139d09e6d072011d125b6d54d4e6`)
//   // return apiExtClient.get(`https://restapi.amap.com/v3/place/text?keywords=尚信&location=${lon},${lat}&city=${city}&offset=20&page=1&extensions=all&key=1c4a139d09e6d072011d125b6d54d4e6`)
// };
