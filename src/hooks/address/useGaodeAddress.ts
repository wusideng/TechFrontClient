import { useEffect, useState } from "react";
import {
  setGaodeAddress,
  setLocationPermissionOn,
} from "@/store/slices/addressSlice";
import useInitAmap from "./useInitAmap";
import {
  GaodePositionResult,
  POI,
  POIformatted,
  POIS,
} from "@/types/AddressManagement";
import { Toast } from "antd-mobile";
import { DrivingResult } from "@/types/GaodeDriving";
import { useAppDispatch, useAppSelector } from "@/store";
import { isNumber } from "@/util/utils";
import { default_travel_time_seconds } from "@/util/config";

export const useGaodeAddress = () => {
  const dispatch = useAppDispatch();

  const { amap, amapInitialized } = useInitAmap();
  const { address } = useAppSelector((state) => state.address);
  const [isSearchingGeoLoaction, setIsSearchingGeoLocation] = useState(false);
  const [isSearchingPois, setIsSearchingPois] = useState(false);
  const [isCalculatingTaxiCost, setIsCalculatingTaxiCost] = useState(false);

  // const [geoLocationFailed, setGeoLocationFailed] = useState(false);
  const [pois, setPois]: [POIformatted[], any] = useState([]);

  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (!(address?.lat && address?.lon) && amapInitialized) {
      getCurrentLocation();
    }
  }, [amapInitialized]);

  const fetchNearbyLocations = async (
    keyword: string = "",
    lon: number = address?.lon,
    lat: number = address?.lat,
    pageSize: number = 10,
    isSetPois: boolean = true
    // refreshAddress: boolean = true
  ): Promise<POIformatted[]> => {
    setIsSearchingPois(true);

    return new Promise((resolve, reject) => {
      try {
        const placeSearch = new amap.PlaceSearch({
          pageSize: pageSize,
          pageIndex: 1,
          extensions: "all",
        });
        placeSearch.searchNearBy(
          keyword,
          [lon, lat],
          1000,
          (status: string, result: POIS) => {
            if (status === "complete" && result.info === "OK") {
              const formattedResults: POIformatted[] = result.poiList.pois.map(
                (poi: POI): POIformatted => ({
                  region: poi.name,
                  city: poi.cityname,
                  district: poi.adname,
                  province: poi.pname,
                  street: poi.address,
                  distance: poi.distance,
                  lat: poi.location.lat,
                  lon: poi.location.lng,
                })
              );
              if (isSetPois) {
                setPois(formattedResults);
              }
              setIsSearchingPois(false);
              resolve(formattedResults);
            } else {
              setIsSearchingPois(false);
              reject(new Error("Failed to fetch nearby locations"));
            }
          }
        );
      } catch (error) {
        console.error(error);
        setIsSearchingPois(false);
        reject(error);
      }
    });
  };
  const getCurrentLocation = async () => {
    setIsSearchingGeoLocation(true);
    try {
      // 配置定位选项
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        needAddress: true,
      };
      // 创建定位实例
      const geolocation = new amap.Geolocation(options);
      const result: GaodePositionResult = await new Promise(
        (resolve, reject) => {
          geolocation.getCurrentPosition((status, result) => {
            if (status === "complete") {
              resolve(result);
            } else {
              reject(
                new Error(`Result not complete: ${JSON.stringify(result)}`)
              );
            }
          });
        }
      );
      setIsSearchingGeoLocation(false);

      const position: { lon: number; lat: number } = {
        lon: result.position.lng,
        lat: result.position.lat,
      };
      try {
        const pois: POIformatted[] = await fetchNearbyLocations(
          "",
          position.lon,
          position.lat,
          1,
          false
        );
        if (pois.length == 0) {
          const gaodeAddressSaved: POIformatted = {
            lat: result.position.lat,
            lon: result.position.lng,
            province: result.addressComponent.province,
            city: result.addressComponent.city,
            district: result.addressComponent.district,
            street: result.addressComponent.street,
            region: result.formattedAddress,
          };
          dispatch(setGaodeAddress(gaodeAddressSaved));
        } else {
          dispatch(setGaodeAddress(pois[0]));
        }
      } catch (err) {
        if (position) {
          const gaodeAddressSaved: POIformatted = {
            lat: result.position.lat,
            lon: result.position.lng,
            province: result.addressComponent.province,
            city: result.addressComponent.city,
            district: result.addressComponent.district,
            street: result.addressComponent.street,
            region: result.formattedAddress,
          };

          dispatch(setGaodeAddress(gaodeAddressSaved));
        }
      }
      dispatch(setLocationPermissionOn(true));
    } catch (err) {
      Toast.show({
        content: "定位失败，请打开GPS定位",
      });

      dispatch(
        setGaodeAddress({
          province: "浙江省",
          city: "杭州市",
          district: "",
          street: "",
          region: "",
          lon: 0,
          lat: 0,
        })
      );
      dispatch(setLocationPermissionOn(false));
      setIsSearchingGeoLocation(false);
      // setGeoLocationFailed(true);
      const error = JSON.stringify(err);
      console.error(error);
    }
  };
  const getTaxiCostAndTravelTime = (
    position1: { lon: number; lat: number },
    position2: { lon: number; lat: number }
  ): Promise<{ taxi_cost: number; travel_time: number }> => {
    setIsCalculatingTaxiCost(true);
    return new Promise((resolve, reject) => {
      try {
        const driving = new amap.Driving({
          policy: 0, //驾车路线规划策略�?是速度优先的策�?
          extensions: "all", //打车费用，仅extensions为“all”时返回. 单位: �?
        });
        driving.search(
          [position1.lon, position1.lat],
          [position2.lon, position2.lat],
          function (status: string, result: DrivingResult) {
            //status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误
            setIsCalculatingTaxiCost(false);
            if (status === "complete") {
              let travel_time: number = default_travel_time_seconds;
              if (result.routes[0]?.time && isNumber(result.routes[0].time)) {
                travel_time = result.routes[0].time;
              }
              resolve({
                taxi_cost: Math.floor(result.taxi_cost),
                travel_time: result.routes[0]?.time,
              });
            } else {
              throw new Error(
                ",result not complete, failed to calculate taxi cost"
              );
            }
          }
        );
      } catch (err) {
        setIsCalculatingTaxiCost(false);
        console.error(err);
        reject(err);
      }
    });
  };
  const isSearching = isSearchingGeoLoaction || isSearchingPois;
  return {
    // geoLocationFailed,
    isSearchingGeoLoaction,
    isSearchingPois,
    isSearching,
    getCurrentLocation,
    amapInitialized,
    amap,
    pois,
    fetchNearbyLocations,
    getTaxiCostAndTravelTime,
  };
};
export default useGaodeAddress;
