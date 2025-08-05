import { useNavigate } from "react-router-dom";
import { Image, Swiper, Toast } from "antd-mobile";

import { baseUrl, staticUrl } from "@/util/config";

import MiddleContentTab from "@/components/layout/MiddleContentTab";

import ProductItem from "@/components/product/ProductItem";
import { useAppSelector } from "@/store";
import styles from "./style.module.less";

const images = [
  {
    src: `${staticUrl}/images/tech_v6.png`,
    text: "招募技师",
    action: "techRecruit",
  },
  {
    src: `${staticUrl}/images/partner_v3.png`,
    text: "城市合作",
    action: "partnerRecruit",
  },
  {
    src: `${staticUrl}/images/feedback_v3.png`,
    text: "意见反馈",
    action: "feedback",
  },
];
const Page = () => {
  const navigate = useNavigate();
  const { products } = useAppSelector((state) => state.product);
  return (
    <MiddleContentTab className={styles.wrapper}>
      <div>
        <Swiper
          loop
          autoplay
          allowTouchMove
          className="swiper-content"
          indicator={false}
        >
          {images.map((img, index) => (
            <Swiper.Item key={index}>
              <div
                className="swiper-item"
                onClick={() => {
                  if (img.action) {
                    navigate(`/${baseUrl}/${img.action}`);
                  } else {
                    Toast.show(img.text);
                  }
                }}
              >
                <Image
                  className="swiper-bgimg"
                  src={img.src}
                  // height={210}
                  fit="fill"
                />
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
      </div>
      <div className={styles.home_wrapper}>
        <div className="list-title" style={{ paddingLeft: 10 }}>
          全部项目
        </div>
        <div className={styles.product_item_wrapper}>
          {products.map((product) => (
            <ProductItem key={product.product_id} product={product} />
          ))}
        </div>
      </div>
    </MiddleContentTab>
  );
};

export default Page;
