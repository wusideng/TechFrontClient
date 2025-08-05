import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProducts, selectProduct } from "@/store/slices/productSlice";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import Page from "./Page";
import { useAppDispatch, useAppSelector } from "@/store";
const Layout = () => {
  const dispatch = useAppDispatch();
  const { product, products } = useAppSelector((state) => state.product);
  const location = useLocation();
  const loading = !product || products.length === 0 || !products;
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  useEffect(() => {
    if (products.length > 0) {
      const id = new URLSearchParams(location.search).get("id");
      const product = products.find((p) => p.product_id == parseInt(id));
      dispatch(selectProduct(product));
    }
  }, [products]);
  if (loading) {
    return (
      <MiddleContentHeader title={"尚达元"} loading={true} withFooter={false}>
        <></>
      </MiddleContentHeader>
    );
  }
  return <Page />;
};

export default Layout;
