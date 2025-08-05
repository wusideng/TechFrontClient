import { TechListParams, TechUser } from "@/types/Tech";
import apiClient from "./apiClient";
import { LoadMoreDataResponse } from "@/types/InfiniteScroll";

export const getTechListApi = async <T = TechUser>({
  lon,
  lat,
  city,
  user_openid,
  orderBy,
  name,
  pageNumber,
  pageSize,
  signal,
  product_id = null,
}: TechListParams): LoadMoreDataResponse<T> => {
  let techListUrl = `/techUser/techlistfromclient/?lon=${lon}&lat=${lat}&city=${city}&pageNumber=${pageNumber}&pageSize=${pageSize}&orderBy=${orderBy}`;
  if (name) {
    techListUrl += `&name=${name}`;
  }
  if (user_openid) {
    techListUrl += `&user_openid=${user_openid}`;
  }
  if (product_id) {
    techListUrl += `&product_id=${product_id}`;
  }
  const res = await apiClient.get(techListUrl, { signal });
  return res;
};

// // 获取用户列表-上门快
// export const getTechUsersByRateApi = async (
//   lon: any,
//   lat: any,
//   city: any,
//   user_openid: string
// ): Promise<TechUser[]> => {
//   // return apiClient.get('/techUser/?pageNum=0&pageSize=10');
//   // city = "重庆";
//   return await apiClient.get(
//     `/techUser/techlistbyrate/?lon=${lon}&lat=${lat}&city=${city}&user_openid=${user_openid}`
//   );
// };

// // 获取用户列表-距离近
// export const getTechUsersByDiscApi = async (
//   lon: any,
//   lat: any,
//   city: any,
//   user_openid: string
// ): Promise<TechUser[]> => {
//   return await apiClient.get(
//     `/techUser/techlistbydisc/?lon=${lon}&lat=${lat}&city=${city}&user_openid=${user_openid}`
//   );
// };
// export const getTechUsersByNameApi = async (
//   lon: any,
//   lat: any,
//   city: any,
//   user_openid: string,
//   name: string
// ): Promise<TechUser[]> => {
//   return await apiClient.get(
//     `/techUser/techlistbyname/?lon=${lon}&lat=${lat}&city=${city}&user_openid=${user_openid}&name=${name}`
//   );
// };

// 获取技师详细
export const getTechUserDetailApi = async (
  user_id: any,
  lon: any,
  lat: any
): Promise<TechUser> => {
  if (lon & lat) {
    return await apiClient.get(
      `/techUser/${user_id}/techWithPosition/?lon=${lon}&lat=${lat}`
    );
  } else {
    return await apiClient.get(`/techUser/${user_id}/techWithPosition/`);
  }
};

// 获取技师上架的产品
export const fetchTechUserProducts = (user_id: any) => {
  return apiClient.get(`/techUserProduct/${user_id}/products`);
};
export const fetchTechUserComments = (user_id: any) => {
  return apiClient.get(`/ordersComment/tech/${user_id}`);
};
export const verifyTechCertifyCaptcha = async (values: {
  captcha_text: string;
  tech_user_id: number;
}) => {
  const response = await apiClient.post(
    "/tech_certify/verify_captcha",
    {
      captcha_text: values.captcha_text,
      tech_user_id: values.tech_user_id,
    },
    {
      withCredentials: true, // 重要：确保包含cookies
    }
  );
  return response;
};
export const inviteHerApi = async (client_openid, tech_openid: string) => {
  return await apiClient.post(`/techUser/invite_her`, {
    client_openid,
    tech_openid,
  });
};
