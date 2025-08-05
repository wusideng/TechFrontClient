import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "@/components/common/Loading";
import { baseUrl } from "@/util/config";

import WeChatLogin from "@/containers/Login/WeChatLogin";
import PhoneLoginContainer from "@/containers/Login/PhoneLogin";
import WeChatCode from "@/containers/Login/WeChatCode";
import HomeContainer from "@/containers/Home/HomeContainer";
import TechContainer from "@/containers/Tech/TechContainer";
import ProductTechListContainer from "@/containers/Home/ProductTechListContainer";
import OrderContainer from "@/containers/Order/OrderContainer";
import CreateOrderContainer from "@/containers/Order/CreateOrderContainer";
import OrderDetailContainer from "@/containers/Order/OrderDetailContainer";
import UserContainer from "@/containers/User/UserContainer";
import UserDevPositionContainer from "@/containers/User/UserDevPositionContainer";
import CouponContainer from "@/containers/User/CouponContainer";
import TechDetailContainer from "@/containers/Tech/TechDetailContainer";
import ProductDetailContainer from "@/containers/Home/ProductDetailContainer";
import ChatContainer from "@/containers/Chat";
import FeedBackContainer from "@/containers/FeedBack";
import FeedBackHistoryContainer from "@/containers/FeedBack/FeedBackHistoryContainer";
import AddressManagementContainer from "@/containers/User/AddressManagement/AddressManagementContainer";
import AddressFormContainer from "@/containers/User/AddressManagement/AddressFormContainer";
import AddressSelectContainer from "@/containers/User/AddressManagement/AddressSelectContainer";
import AddressModifyForTechContainer from "@/containers/User/AddressManagement/AddressModifyForTechContainer";
import FollowsContainer from "@/containers/User/FollowsContainer";
import AboutUsContainer from "@/containers/AboutUs";
import SoftWareAgreementContainer from "@/containers/AboutUs/SoftwareAgreement";
import PrivacyAgreementContainer from "@/containers/AboutUs/PrivacyAgreement";
import UserAgreementContainer from "@/containers/AboutUs/UserAgreement";
import CustomerServicePhone from "@/containers/AboutUs/CustomerServicePhone";
import TechUserCertify from "@/containers/Tech/TechUserCertify";
import SettingsContainer from "@/containers/User/Settings";
import CloseAccountContainer from "@/containers/User/Settings/CloseAccount";
import PartnerRecruit from "@/containers/PartnerRecruit";
import TechRecruit from "@/containers/TechRecruit";

const RouterComponent = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={`/${baseUrl}/login`} element={<WeChatLogin />} />
        <Route
          path={`/${baseUrl}/phoneLogin`}
          element={<PhoneLoginContainer />}
        />
        <Route path={`/${baseUrl}/code`} element={<WeChatCode />} />
        <Route path={`/${baseUrl}/login/code`} element={<WeChatLogin />} />

        <Route path={`/${baseUrl}/home`} element={<HomeContainer />} />
        <Route
          path={`/${baseUrl}/product/:id`}
          element={<ProductDetailContainer />}
        />
        <Route
          path={`/${baseUrl}/tech/:techid/product/:id`}
          element={<ProductDetailContainer />}
        />
        <Route path={`/${baseUrl}/tech`} element={<TechContainer />} />
        <Route
          path={`/${baseUrl}/prodtech`}
          element={<ProductTechListContainer />}
        />
        <Route
          path={`/${baseUrl}/tech/:id`}
          element={<TechDetailContainer />}
        />
        <Route path={`/${baseUrl}/order`} element={<OrderContainer />} />
        <Route
          path={`/${baseUrl}/order/create`}
          element={<CreateOrderContainer />}
        />

        <Route
          path={`/${baseUrl}/order/:id`}
          element={<OrderDetailContainer />}
        />
        <Route path={`/${baseUrl}/feedback`} element={<FeedBackContainer />} />
        <Route
          path={`/${baseUrl}/partnerRecruit`}
          element={<PartnerRecruit />}
        />
        <Route path={`/${baseUrl}/techRecruit`} element={<TechRecruit />} />
        <Route
          path={`/${baseUrl}/feedback/history`}
          element={<FeedBackHistoryContainer />}
        />

        <Route path={`/${baseUrl}/user`} element={<UserContainer />} />
        <Route
          path={`/${baseUrl}/userdev`}
          element={<UserDevPositionContainer />}
        />
        <Route path={`/${baseUrl}/chat`} element={<ChatContainer />} />
        <Route
          path={`/${baseUrl}/ordercreate/coupon`}
          element={<CouponContainer />}
        />
        <Route path={`/${baseUrl}/user/coupon`} element={<CouponContainer />} />
        <Route
          path={`/${baseUrl}/user/address`}
          element={<AddressManagementContainer />}
        />
        <Route
          path={`/${baseUrl}/user/address/add`}
          element={<AddressFormContainer />}
        />
        <Route
          path={`/${baseUrl}/user/address/edit/:addressId`}
          element={<AddressFormContainer />}
        />
        <Route
          path={`/${baseUrl}/user/address/selectpoi`}
          element={<AddressSelectContainer />}
        />
        <Route
          path={`/${baseUrl}/address/modifyfortech`}
          element={<AddressModifyForTechContainer />}
        />
        <Route
          path={`/${baseUrl}/user/follows`}
          element={<FollowsContainer />}
        />
        <Route
          path={`/${baseUrl}/user/aboutus`}
          element={<AboutUsContainer />}
        />
        <Route
          path={`/${baseUrl}/user/aboutus/software_agreement`}
          element={<SoftWareAgreementContainer />}
        />
        <Route
          path={`/${baseUrl}/user/aboutus/privacy_agreement`}
          element={<PrivacyAgreementContainer />}
        />
        <Route
          path={`/${baseUrl}/user/aboutus/user_agreement`}
          element={<UserAgreementContainer />}
        />
        <Route
          path={`/${baseUrl}/user/aboutus/customer_service_phone`}
          element={<CustomerServicePhone />}
        />
        <Route
          path={`/${baseUrl}/techuser_certify/:id`}
          element={<TechUserCertify />}
        />
        <Route
          path={`/${baseUrl}/user/settings`}
          element={<SettingsContainer />}
        />
        <Route
          path={`/${baseUrl}/user/close_account`}
          element={<CloseAccountContainer />}
        />
        <Route path={`/${baseUrl}/`} element={<HomeContainer />} />
        <Route path="*" element={<HomeContainer />} />
      </Routes>
    </Suspense>
  );
};

export default RouterComponent;
