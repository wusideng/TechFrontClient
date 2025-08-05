import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import styles from "./style.module.less";
import { Image, List } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { baseUrl, staticUrl } from "@/util/config";
const logoSize = 220;
const Page = () => {
  const navigate = useNavigate();

  return (
    <MiddleContentHeader
      title="关于我们"
      className={styles.aboutus_wrapper}
      withFooter={false}
    >
      <div className={styles.logo_wrapper}>
        <Image
          src={`${staticUrl}/images/logo_svg.png`}
          height={logoSize}
          width={logoSize}
        />
      </div>
      <List header={null} mode="card">
        <List.Item
          onClick={() => {
            navigate(`/${baseUrl}/user/aboutus/software_agreement`);
          }}
        >
          软件使用许可协议
        </List.Item>
        <List.Item
          onClick={() => {
            navigate(`/${baseUrl}/user/aboutus/privacy_agreement`);
          }}
        >
          隐私政策
        </List.Item>
        <List.Item
          onClick={() => {
            navigate(`/${baseUrl}/user/aboutus/user_agreement`);
          }}
        >
          用户协议
        </List.Item>
        <List.Item
          onClick={() => {
            navigate(`/${baseUrl}/user/aboutus/customer_service_phone`);
          }}
        >
          客服电话
        </List.Item>
      </List>
    </MiddleContentHeader>
  );
};
export default Page;
