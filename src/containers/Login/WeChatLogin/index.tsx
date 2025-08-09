// WeChatLogin.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Grid, Input, Toast } from "antd-mobile";
import { PhonebookFill } from "antd-mobile-icons";

import { baseUrl, isDev } from "@/util/config";
import { setMockUser } from "@/store/slices/userSlice";
import BlockA from "@/components/common/BlockA";
import { useAppDispatch, useAppSelector } from "@/store";
import styles from "./style.module.less";
import MiddleContentTab from "@/components/layout/MiddleContentTab";
// import { setMenu } from "@/store/slices/routerSlice";

const WeChatLogin = ({ loading = false }: { loading?: boolean }) => {
  const [consentAgreements, setConsentAgreements] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [wechatModel, setwechatModel] = useState(true);
  const { invite_code } = useAppSelector((state) => state.user);

  const loginHandler = () => {
    if (!consentAgreements) {
      Toast.show({
        content: "请先同意《使用协议》和《隐私政策》",
      });
      return;
    }
    const appId = "wxfa6035d95514257e"; // 替换为你的 AppID
    // const redirectUri = encodeURIComponent(
    //   `http://visualstreet.cn/${baseUrl}/`
    // ); // 替换为你的重定向 URI

    const redirectUri = encodeURIComponent(
      `https://visualstreet.cn/${baseUrl}/?invite_code=${invite_code}`
    ); // 替换为你的重定向 URI
    const state = Math.random().toString(36).substring(7); // 随机生成状态字符串
    const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
    //防止后退按钮跳转回这个页面造成直接访问/baseurl/login 页面给出404
    window.history.replaceState(
      {}, // 状态对象，可以存储与 URL 相关的数据
      "", // 页面标题（大多数浏览器忽略这个参数）
      `/${baseUrl}/` // 新的 URL
    );
    window.location.href = authUrl; // 重定向到微信授权页面
  };
  const codeHandler = () => {
    const appId = "wxfa6035d95514257e"; // 替换为你的 AppID
    const redirectUri = encodeURIComponent(
      `https://visualstreet.cn/${baseUrl}/code`
    ); // 替换为你的重定向 URI
    const state = Math.random().toString(36).substring(7); // 随机生成状态字符串
    const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
    window.location.href = authUrl; // 重定向到微信授权页面
  };
  const mockLogin = () => {
    dispatch(setMockUser());
    localStorage.setItem("userToken", "mockopenid");
    navigate(`/${baseUrl}/`);
    // dispatch(setMenu("home"));
  };
  // const mockRegister = () => {
  //   dispatch(setMockUserDefault());
  //   localStorage.setItem("userToken", "mockopenid");
  //   navigate(`/${baseUrl}/`);
  //   // dispatch(setMenu("home"));
  // };
  // const mockLoginPay = () => {
  //   dispatch(setMockUser());
  //   localStorage.setItem("userToken", "mockopenid");
  //   navigate(`/${baseUrl}/order/pay`);
  //   // dispatch(setMenu("home"));
  // };

  const DevComponent = isDev ? (
    <>
      <Grid.Item>
        <Button block color="primary" onClick={codeHandler}>
          微信Code
        </Button>
      </Grid.Item>
      <Grid.Item>
        <Button block color="primary" onClick={mockLogin}>
          模拟登录
        </Button>
      </Grid.Item>
      {/* <Grid.Item>
         <Button block color="primary" onClick={mockRegister}>
          模拟注册
        </Button> 
      </Grid.Item> */}
      {/* <Grid.Item>
        <Button block color="primary" onClick={mockLoginPay}>
          模拟支付
        </Button>
      </Grid.Item> */}
    </>
  ) : null;

  const wechatLogin = (
    <BlockA title={"注册/登录"}>
      <Grid columns={2} gap={8}>
        <Grid.Item span={2}>
          <Button block color="primary" onClick={loginHandler}>
            微信登录
          </Button>
        </Grid.Item>
        {DevComponent}
      </Grid>
      <div className="contract">
        <Checkbox
          style={{
            "--icon-size": "18px",
            "--font-size": "14px",
            "--gap": "6px",
          }}
          checked={consentAgreements}
          onChange={(checked) => setConsentAgreements(checked)}
        >
          阅读并同意
          <Link to={`/${baseUrl}/user/aboutus/software_agreement`}>
            《软件许可使用协议》
          </Link>
          <Link to={`/${baseUrl}/user/aboutus/privacy_agreement`}>
            《隐私政策》
          </Link>
        </Checkbox>
      </div>
    </BlockA>
  );
  // 真实信息绑定
  const phoneLogin = (
    <BlockA title={"注册/登录"}>
      <Form
        layout="horizontal"
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Header>手机号码登录</Form.Header>
        <Form.Item
          name="phone"
          label="手机号码"
          rules={[{ required: true, message: "手机号码不能为空" }]}
        >
          <Input placeholder="请输入手机号码" {...({} as any)} />
        </Form.Item>
      </Form>
    </BlockA>
  );
  const phoneLoginBtn = (
    <div
      className="logintype"
      onClick={() => {
        setwechatModel(false);
      }}
    >
      <p>
        <PhonebookFill color="var(--adm-color-primary)" fontSize={30} />
      </p>
      <p>手机号登录</p>
    </div>
  );

  const wechatLoginBtn = (
    <div
      className="logintype"
      onClick={() => {
        setwechatModel(true);
      }}
    >
      <p>
        <PhonebookFill color="var(--adm-color-primary)" fontSize={30} />
      </p>
      <p>微信登录</p>
    </div>
  );

  return (
    <MiddleContentTab
      withFooter={false}
      loading={loading}
      className={styles.login_wrapper}
    >
      <div className="login">
        <div className="advertising">
          <p>您好，</p>
          <p>欢迎使用尚达元</p>
        </div>
        {wechatModel ? wechatLogin : phoneLogin}
        {/* {wechatModel ? phoneLoginBtn : wechatLoginBtn} */}
      </div>
    </MiddleContentTab>
  );
};

export default WeChatLogin;
