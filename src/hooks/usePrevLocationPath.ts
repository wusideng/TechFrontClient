import { useAppDispatch, useAppSelector } from "@/store";
import { setRouterLocation } from "@/store/slices/routerSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePrevLocationPath = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { routerLocation } = useAppSelector((state) => state.router);
  const { current } = routerLocation;

  useEffect(() => {
    // 只有当路径真正变化时才更新
    if (current && current !== location.pathname) {
      dispatch(
        setRouterLocation({ current: location.pathname, previous: current })
      );
    }
  }, [location.pathname, current]);
};

export default usePrevLocationPath;
