import { useEffect } from "react";
import Page from "./Page";
import { useAppDispatch, useAppSelector } from "@/store";
import { getProducts } from "@/store/slices/productSlice";
import MiddleContentTab from "@/components/layout/MiddleContentTab";
import { staticUrl } from "@/util/config";
import WeChatLogin from "@/containers/Login/WeChatLogin";
import useRedirectLoginPage from "@/hooks/useRedirectLoginPage";

const Layout = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.product);

  const { loadingLoginPage } = useRedirectLoginPage();
  useEffect(() => {
    if (products.length == 0) {
      dispatch(getProducts()); // 调用 API 加载用户数据
    }
  }, []);

  if (loadingLoginPage) {
    return <WeChatLogin loading={true} />;
  }
  if (loading)
    return (
      <MiddleContentTab loading={true}>
        <></>
      </MiddleContentTab>
    );
  return <Page />;
};
export default Layout;
