import React, { useEffect, useLayoutEffect } from "react";
import Page from "./Page";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { clearProductDetail, selectProduct } from "@/store/slices/productSlice";

const Layout = () => {
  const params = useParams<{ id?: string }>();
  const { id } = params;
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  useLayoutEffect(() => {
    dispatch(clearProductDetail());
    const selectedProduct = products.find((item: any) => item.product_id == id);
    dispatch(selectProduct(selectedProduct));
  }, []);
  return <Page />;
};
export default Layout;
