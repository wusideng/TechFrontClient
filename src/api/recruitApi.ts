import apiClient from "./apiClient";
export const submitPartnerRecruitApi = async (values: {
  name: string;
  phone: string;
  cooperationType: string;
  targetCity: string;
  message: string;
}) => {
  return await apiClient.post(`/recruit/`, values);
};
