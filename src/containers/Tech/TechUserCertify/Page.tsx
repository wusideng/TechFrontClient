import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import styles from "./style.module.less";
import { CheckShieldFill } from "antd-mobile-icons";
import { Button, Card, Image, WaterMark } from "antd-mobile";
import { useState } from "react";
import CaptchaModal from "./CaptchaModal";
import { useAppSelector } from "@/store";

const Page = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [certifyShow, setCertifyShow] = useState(false);
  const { techuser } = useAppSelector((state) => state.techuser);

  const handleClick = () => {
    setModalVisible(true);
  };
  const onSuccess = () => {
    setModalVisible(false);
    setCertifyShow(true);
  };
  const renderCertify = (title, src) => {
    return (
      <Card className={styles.card} title={title}>
        {certifyShow ? (
          <div
            style={{
              display: "inline-flex",
              position: "relative",
              height: "100%",
              width: "100%",
            }}
          >
            <Image src={src} width={"100%"} height={"100%"} />
            <WaterMark
              image={null}
              content={"尚达元"}
              gapX={0}
              gapY={0}
              width={50}
              height={50}
              fontWeight={500}
              fontSize={12}
              fontColor={"black"}
              fullPage={false}
            />
          </div>
        ) : (
          <Button color="primary" size="small" onClick={handleClick}>
            点击查看
          </Button>
        )}
      </Card>
    );
  };
  return (
    <MiddleContentHeader withFooter={false} title={"商户信息"}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <span>签约商家</span>
          <CheckShieldFill color="var(--adm-color-primary)" fontSize={24} />
        </div>
        <div className={styles.desc}>{techuser.dealer_name}</div>
        <div className={styles.card_wrapper}>
          {renderCertify("营业执照", techuser.business_license)}
          {renderCertify("技师职业资格证", techuser.technician_certificate)}
          {renderCertify("健康证明", techuser.health_certificate)}
        </div>
        {modalVisible && (
          <CaptchaModal
            setModalVisible={setModalVisible}
            onSuccess={onSuccess}
          />
        )}
      </div>
    </MiddleContentHeader>
  );
};
export default Page;
