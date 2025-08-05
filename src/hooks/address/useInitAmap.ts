import { useEffect, useRef, useState } from "react";
// @ts-ignore
import AMapLoader from "@amap/amap-jsapi-loader";
import { baseUrl, gaode_api_key, gaode_api_secure_key } from "@/util/config";
import { Toast } from "antd-mobile";
import { useLocation } from "react-router-dom";

export const useInitAmap = () => {
  const amapRef = useRef(null);
  const [loadingAMap, setLoadingAMap] = useState(false);
  const [amapInitialized, setAmapInitialized] = useState(false);
  useEffect(() => {
    initAMap();
    return () => {
      amapRef.current?.destroy && amapRef.current.destroy();
      amapRef.current = null;
    };
  }, []);
  const initAMap = async () => {
    try {
      setLoadingAMap(true);
      // 设置安全密钥;
      // @ts-ignore
      window._AMapSecurityConfig = {
        securityJsCode: gaode_api_secure_key,
      };
      const plugins = ["AMap.Geolocation", "AMap.PlaceSearch", "AMap.Driving"];
      // const plugins =
      //   location.pathname == `/${baseUrl}/user/address/selectpoi`
      //     ? ["AMap.Geolocation", "AMap.PlaceSearch"]
      //     : ["AMap.Geolocation"];
      // 加载高德地图SDK
      const AMap = await AMapLoader.load({
        key: gaode_api_key,
        version: "2.0",
        plugins: plugins,
      });
      amapRef.current = AMap;
      setAmapInitialized(true);

      setLoadingAMap(false);
    } catch (err) {
      setAmapInitialized(false);
      setLoadingAMap(false);
      Toast.show({
        icon: "fail",
        content: "加载地址失败",
      });
      const error = JSON.stringify(err);
      console.error(error);
      throw new Error(error);
    }
  };

  return {
    amap: amapRef.current,
    amapInitialized,
    initAMap,
    loadingAMap,
  };
};
export default useInitAmap;
