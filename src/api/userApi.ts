import { ClientUser } from "@/types/ClientUser";
import apiClient from "./apiClient";

// 获取微信用户信息
export const fetchUserInfoByWxCode = async (
  code: string,
  invite_code: string
): Promise<ClientUser> => {
  const params = invite_code ? { invite_code } : {};
  return await apiClient.get(`wx/user_info/${code}`, { params });
};

export const fetchUserInfoByOpenId = async (): Promise<ClientUser> => {
  return await apiClient.get(`/clientUser/client_user_info/user_info`, {
    withCredentials: true, // 这会使请求发送cookies
  });
};

export const updateUserPhoneApi = async (param: {
  user_openid: string;
  phone: string;
  code: string;
}): Promise<ClientUser> => {
  return await apiClient.post(`/clientUser/update_phone/`, param);
};

// 保存客户的邀请码（引流码）
// {
//   user_id: 'oK9p06eiEk0jWNvowVjb5lGlkocM',
//   invite_code: '13300001115'
// }
export const updateUserQrCodeApi = (param: any) => {
  return apiClient.post(
    `/clientUser/update_invite_code/?user_id=${param.user_id}&invite_code=${param.invite_code}`
  );
};

export const trackUserBehaviorApi = (params) => {
  return apiClient.post("/clientUser/track_user_behavior/", params);
};

export const sendVerificationCode = async (params: {
  user_openid: string;
  phone: string;
}) => {
  return await apiClient.post(
    "/clientUser/send_sms_for_phone_validation/",
    params
  );
};
