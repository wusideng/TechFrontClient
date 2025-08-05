import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import addressSlice from "./slices/addressSlice";
import addressManagementSlice from "./slices/addressManagementSlice";
import followSlice from "./slices/followSlice";
import orderSlice from "./slices/orderSlice";
import productSlice from "./slices/productSlice";
import routerSlice from "./slices/routerSlice";
import techUserSlice from "./slices/techUserSlice";
import userSlice from "./slices/userSlice";

/**
 * 配置Redux Store
 */
export const store = configureStore({
  reducer: {
    router: routerSlice,
    user: userSlice,
    techuser: techUserSlice,
    product: productSlice,
    order: orderSlice,
    address: addressSlice,
    addressManagement: addressManagementSlice,
    follow: followSlice,
  },
});

// 从store本身推断RootState和AppDispatch类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 导出可重用的hooks，解决类型问题
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
