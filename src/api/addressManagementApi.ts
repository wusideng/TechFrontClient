import { UserAddress } from "@/types/AddressManagement";
import apiClient from "./apiClient";

// 获取用户地址列表
export const getUserAddressesApi = (openid: string): Promise<UserAddress[]> => {
  return apiClient.get(`/user/addresses?openid=${openid}`);
};

export const getUserDefaultAddressApi = async (
  openid: string
): Promise<UserAddress> => {
  return await apiClient.get(`/user/addresses/default?openid=${openid}`);
};
// 添加新地址
export const addUserAddressApi = (
  address: UserAddress
): Promise<UserAddress> => {
  return apiClient.post("/user/addresses", address);
};

// 更新地址
export const updateUserAddressApi = (
  addressId: number,
  address: UserAddress
): Promise<UserAddress> => {
  return apiClient.put(`/user/addresses/${addressId}`, address);
};

// 删除地址
export const deleteUserAddressApi = (addressId: number) => {
  return apiClient.delete(`/user/addresses/${addressId}`);
};
