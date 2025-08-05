import { useNavigate, useLocation } from "react-router-dom";
import { baseUrl, isDev } from "@/util/config";
import { useEffect } from "react";
import {
  setInviteCode,
  getUserInfoByWxCode,
  getUserInfoByOpenId,
} from "@/store/slices/userSlice";
import { getCookie } from "@/util/utils";
import { useAppDispatch, useAppSelector } from "@/store";
import { Modal, Toast } from "antd-mobile";
import {
  getValidCouponActivityApi,
  takeCouponsFromCouponActivityApi,
} from "@/api/couponActivityApi";
import { CouponActivity } from "@/types/Coupon";
import CouponImageContent from "@/components/CouponImageContent";
const loginExemptRoutes = [
  `/${baseUrl}/`,
  `/${baseUrl}/home`,
  `/${baseUrl}/techRecruit`,
  `/${baseUrl}/partnerRecruit`,
  `/${baseUrl}/tech`,
  `/${baseUrl}/order`,
  `/${baseUrl}/user`,
  `/${baseUrl}/login`,
  `/${baseUrl}/user/aboutus/privacy_agreement`,
  `/${baseUrl}/user/aboutus/software_agreement`,
  `/${baseUrl}/register`,
  `/${baseUrl}/phoneLogin`,
  `/${baseUrl}/prodTech`,
];
const new_user_coupon_image_url =
  "https://cdn.visualstreet.cn/images/coupon/55_1.png";
const useInitUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, loadUserInfoFailure } = useAppSelector((state) => state.user);
  const { address } = useAppSelector((state) => state.address);
  // const prevLocationPath = usePrevLocationPath();
  const { routerLocation } = useAppSelector((state) => state.router);
  const { previous: prevLocationPath } = routerLocation;
  const searchParams = new URLSearchParams(location.search);
  // 获取特定的查询参数
  const code = searchParams.get("code");
  const invite_code = searchParams.get("invite_code");
  const isAuth = () => {
    if (isDev) {
      return isLogin();
    }
    return getCookie("openid");
  };
  const isLogin = () => {
    if (process.env.auto_login_id && isDev) {
      document.cookie = `openid=${process.env.auto_login_id}; path=/; max-age=7200; domain=${window.location.hostname}`;
      return true;
    }
    return user.openid != "" && user.openid != undefined;
  };
  // 绑定手机号
  const isBindPhone = () => {
    if (
      user.user_phone == "" ||
      user.user_phone == "string" ||
      user.user_phone == undefined ||
      user.user_phone == null
    ) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    //跳转login条件
    //从首页跳转至其他页面，并且cookie里没有openid或者 得到了用户数据发现没有电话
    //还有这个其他页面只是功能页，不包括注册页面之类的
    if (
      // prevLocationPath == `/${baseUrl}/` &&
      !(
        loginExemptRoutes.includes(location.pathname) ||
        location.pathname.includes(`/${baseUrl}/prodTech`)
      )
    ) {
      if (!isAuth()) {
        navigate(`/${baseUrl}/`, { replace: true });
        navigate(`/${baseUrl}/login`);
      }
      if (isLogin() && !isBindPhone()) {
        navigate(`/${baseUrl}/`, { replace: true });
        navigate(`/${baseUrl}/phoneLogin`);
      }
    }
    // }, [location.pathname, user, prevLocationPath]);
  }, [location.pathname, user]);

  //有cookie但从cookie的openid没有查到用户，这种情况直接跳转login
  useEffect(() => {
    if (loadUserInfoFailure) {
      navigate(`/${baseUrl}/`, { replace: true });
      navigate(`/${baseUrl}/login`);
    }
  }, [loadUserInfoFailure]);

  useEffect(() => {
    const init = async () => {
      if ((isAuth() && isLogin() && isBindPhone()) || (!isAuth() && !code)) {
        const res = await getValidCouponActivityApi(user?.openid);
        if (res) {
          if (!isAuth() && !code) {
            if (parseInt(getCookie("coupon_activity_id")) == res.activity_id) {
              return;
            }
          }
          document.cookie = `coupon_activity_id=${res.activity_id}; path=/; max-age=86400`;
          initCouponActivity(res);
          return;
        }
      }
      if (isLogin() && isBindPhone() && user.is_new_user) {
        initCoupon(); //优惠券领取
      }
    };
    init();
  }, [user]);

  useEffect(() => {
    const init = async () => {
      if (invite_code) {
        //这里是为了跳转/login用的
        dispatch(setInviteCode(invite_code));
      }
      //根据cookie登录
      if (isAuth()) {
        dispatch(getUserInfoByOpenId());
      }
      //根据微信code登录,微信登录后跳转会自动加code参数，微信给加的
      if (code) {
        const res = await dispatch(
          getUserInfoByWxCode({ code, invite_code })
        ).unwrap();
        if ((!res.user_phone || res.user_phone == "string") && res.openid) {
          navigate(`/${baseUrl}/phoneLogin`);
        } else {
          navigate(`/${baseUrl}/`);
        }
      }
    };
    init();
  }, []);

  // 登录判断发放优惠券
  const initCoupon = async () => {
    const city = address?.city ? address.city : "默认城市";

    Modal.alert({
      className: "coupon-modal",
      closeOnMaskClick: true,
      content: <CouponImageContent image_url={new_user_coupon_image_url} />,
      onConfirm: async () => {
        Toast.show({
          content: "优惠券已领取",
        });
      },
    });
  };
  const takeCoupons = async (couponActivity: CouponActivity) => {
    if (!isLogin()) {
      navigate(`/${baseUrl}/login`);
    } else {
      const city = address?.city ? address.city : "默认城市";
      await takeCouponsFromCouponActivityApi({
        openid: user.openid,
        city,
        activity_id: couponActivity.activity_id,
      });

      Toast.show({
        content: "优惠券已领取",
      });
    }
  };
  const initCouponActivity = async (couponActivity: CouponActivity) => {
    Modal.alert({
      className: "coupon-modal",
      closeOnMaskClick: true,
      content: <CouponImageContent image_url={couponActivity.img_url} />,
      onConfirm: async () => {
        takeCoupons(couponActivity);
      },
    });
  };
};
export default useInitUser;
