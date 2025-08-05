import apiClient from "./apiClient";
export const createFeedBackApi = (feedbackInfo: any) => {
  return apiClient.post(`/feedback/create`, feedbackInfo);
};

export const getFeedBackListByClientId = (clientId: any) => {
  return apiClient.get(`/feedback/client/${clientId}`, clientId);
};
