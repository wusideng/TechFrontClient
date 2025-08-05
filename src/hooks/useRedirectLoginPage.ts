import { useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useRedirectLoginPage = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);
  const [loadingLoginPage, setLoadingLoginPage] = useState(false);
  const isLogin = () => {
    return user.openid != "" && user.openid != undefined;
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    if (code && !isLogin()) {
      setLoadingLoginPage(true);
    } else {
      setLoadingLoginPage(false);
    }
  }, [location.search]);
  return { loadingLoginPage };
};
export default useRedirectLoginPage;
