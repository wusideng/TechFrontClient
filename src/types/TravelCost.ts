export type TravelCost = {
  id?: number;
  base_price: number;
  base_distance_km: number;
  price_per_km_daytime: number;
  price_per_km_nighttime?: number;
  night_hour?: number;
  city: string;
  createTime?: Date | string;
};
