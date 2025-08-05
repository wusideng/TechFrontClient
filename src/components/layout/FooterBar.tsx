import React from "react";
import {
  AppOutline,
  MessageFill,
  UnorderedListOutline,
  UserContactOutline,
  UserOutline,
} from "antd-mobile-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, TabBar } from "antd-mobile";
import { baseUrl } from "@/util/config";

const tabs = [
  {
    key: "home",
    title: "首页",
    icon: <AppOutline />,
    badge: Badge.dot,
  },
  {
    key: "tech",
    title: "技师",
    icon: <UserContactOutline />,
    badge: "5",
  },
  {
    key: "order",
    title: "订单",
    icon: <UnorderedListOutline />,
    badge: "99+",
  },
  {
    key: "user",
    title: "我的",
    icon: <UserOutline />,
  },
];

export default function FooterBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <TabBar
      style={{ marginTop: "auto" }}
      defaultActiveKey={"home"}
      activeKey={
        tabs.map((item) => item.key).includes(location.pathname.split("/")[2])
          ? location.pathname.split("/")[2]
          : "home"
      }
      onChange={(menuItem: any) => {
        navigate(`/${baseUrl}/${menuItem}`);
      }}
    >
      {tabs.map((item: any) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
}
