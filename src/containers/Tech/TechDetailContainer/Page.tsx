import { useState } from "react";
import {
  Card,
  Empty,
  Image,
  ImageViewer,
  Rate,
  Swiper,
  Tabs,
} from "antd-mobile";
import { HeartFill, HeartOutline, LocationFill } from "antd-mobile-icons";

import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import ProductItem from "@/components/product/ProductItem";
import styles from "./style.module.less";
import TechComments from "./TechComments";
import { RateIcon } from "@/lib/icons";
import { generateRandomNumberFromName } from "@/util/utils";
import ShieldIcon from "@/lib/icons/ShieldIcon";
import GuaranteeIcon from "@/lib/icons/GuranteeIcon";
import CertifyIcon from "@/lib/icons/CertifyIcon";
import ReserveTag from "@/components/tech/TechItem/ReserveTag";
import { useAppSelector } from "@/store";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "@/util/config";
import useTechFollow from "@/hooks/useTechFollow";

const Page = () => {
  const navigate = useNavigate();
  const { techuser } = useAppSelector((state) => state.techuser);
  const [swiperImageUrl, setSwiperImageUrl] = useState("");
  const [imageViewerVisible, setImageViewerVisible] = useState(false);

  const { follow, followNumber, followed } = useTechFollow(techuser);
  const swiperItemsArr = [
    techuser.photo_work,
    techuser.photo_life_1,
    techuser.photo_life_2,
    techuser.photo_life_3,
  ].filter((imgUrl: any) => {
    return imgUrl && imgUrl !== "string";
  });
  const swiperItems = swiperItemsArr.map((imgUrl: any, index: any) => (
    <Swiper.Item key={index}>
      <Image
        src={imgUrl}
        //   width={"100%"}
        height={340}
        //   fit="fill"
        onClick={() => {
          setSwiperImageUrl(imgUrl);
          setImageViewerVisible(true);
        }}
      />
    </Swiper.Item>
  ));

  return (
    <MiddleContentHeader
      title="技师详情"
      loading={false}
      withFooter={false}
      className={styles.wrapper}
    >
      <div className="tech-detail-content-wrapper background-primary-super">
        <div className={styles.swipper}>
          <Swiper
            loop
            autoplay
            indicator={false}
            // autoplayInterval = '300000'
            className="swiper-content"
          >
            {swiperItems}
            {/* {techuser.photo_work?swiperItems:swiperItemsNull} */}
          </Swiper>
        </div>
        <ImageViewer
          classNames={{
            mask: "customize-mask",
            body: "customize-body",
          }}
          image={swiperImageUrl}
          visible={imageViewerVisible}
          onClose={() => {
            setImageViewerVisible(false);
          }}
        />
        <div className={styles.content_wrapper}>
          <Card className={styles.tech_card}>
            <div className={styles.tech_card_content}>
              <div style={{ padding: "0 12px" }}>
                <div className="tech-detail-line1">
                  <span className="tech-name">{techuser.user_nickname}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 12px 5px 12px",
                  }}
                >
                  <div className={styles.icon_and_text} onClick={follow}>
                    {followed ? (
                      <HeartFill fontSize={22} color={"#f85959"} />
                    ) : (
                      <HeartOutline
                        fontSize={22}
                        color={"var(--adm-color-weak)"}
                      />
                    )}
                    <span>{followNumber}</span>
                    <span>关注</span>
                  </div>
                  <div className={styles.icon_and_text}>
                    <LocationFill color="var(--adm-colo-weak)" fontSize={20} />
                    <span>
                      {(techuser.distance ? techuser.distance.toFixed(2) : "") +
                        "  km"}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.tech_intro}>{techuser.user_desc}</div>
              <div
                className={styles.certify}
                onClick={() => {
                  if (
                    techuser.business_license &&
                    techuser.health_certificate &&
                    techuser.technician_certificate
                  )
                    navigate(
                      `/${baseUrl}/techuser_certify/${techuser.user_id}`
                    );
                }}
              >
                <div className={styles.icon_and_text}>
                  <ShieldIcon size={20} />
                  <span>实名认证</span>
                </div>
                <div className={styles.icon_and_text}>
                  <GuaranteeIcon size={20} />
                  <span>平台保障</span>
                </div>
                <div className={styles.icon_and_text}>
                  <CertifyIcon size={20} />
                  <span>资质证书</span>
                </div>
              </div>
              <div className={styles.last_line}>
                <ReserveTag techuser={techuser} />
                <div style={{ color: "#e29200" }}>
                  {techuser.comment_count}条评论 好评100%
                </div>
              </div>
            </div>
          </Card>
          <Tabs stretch={false} defaultActiveKey="services">
            <Tabs.Tab title="服务项目" key="services">
              <div className={styles.cards_wrapper}>
                {techuser.products?.length > 0 ? (
                  techuser.products.map((product: any) => (
                    <ProductItem key={product.product_id} product={product} />
                  ))
                ) : (
                  <Card className={styles.empty_card}>
                    <Empty description="暂无服务项目" />
                  </Card>
                )}
              </div>
            </Tabs.Tab>
            <Tabs.Tab title="用户评价" key="comments">
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {!techuser.comments || techuser.comments?.length == 0 ? (
                  <Card className="card-style">
                    <Empty description="暂无评价" />
                  </Card>
                ) : (
                  <TechComments />
                )}
              </div>
            </Tabs.Tab>
          </Tabs>
        </div>
      </div>
    </MiddleContentHeader>
  );
};

export default Page;
