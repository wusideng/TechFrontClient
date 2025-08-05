import { TechUser } from "@/types/Tech";
import apiClient from "./apiClient";

export const followTech = async (user_openid: string, tech_openid: string) => {
  return await apiClient.post(`/follow`, {
    user_openid: user_openid,
    tech_openid: tech_openid,
  });
};

export const unfollowTech = async (
  user_openid: string,
  tech_openid: string
) => {
  return await apiClient.post(`/unfollow`, {
    user_openid: user_openid,
    tech_openid: tech_openid,
  });
};

export const getFollowingTechs = async (
  user_openid: string,
  lon: number,
  lat: number
): Promise<TechUser[]> => {
  if (lon & lat) {
    return await apiClient.get(
      `/following/${user_openid}` + (lon && lat ? `?lon=${lon}&lat=${lat}` : "")
    );
  }
  return await apiClient.get(`/following/${user_openid}`);
};
