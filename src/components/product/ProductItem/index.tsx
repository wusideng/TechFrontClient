import React from "react";
import { Image, Button, Card } from "antd-mobile";
import CustomClockIcon from "@/components/icons/CustomClockIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { selectProduct } from "@/store/slices/productSlice";
import { baseUrl } from "@/util/config";
import { Product } from "@/types/Product";
import { TechUser } from "@/types/Tech";
import styles from "./style.module.less";
import { useAppDispatch, useAppSelector } from "@/store";
import { productBaseSales } from "@/util/utils";

const ProductItem = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { techuser } = useAppSelector((state) => state.techuser);
  const isInTechPage = location.pathname.split("/")[2] === "tech";

  const imageSize = isInTechPage ? 90 : 110;
  const turnToDetail = (product_id: number) => {
    if (isInTechPage) {
      //跳转到技术详情页
      navigate(`/${baseUrl}/tech/${techuser.user_id}/product/${product_id}`);
    } else {
      //跳转到产品详情页
      navigate(`/${baseUrl}/product/${product_id}`);
    }
  };
  const turnToTech = (product_id: number) => {
    navigate(`/${baseUrl}/prodTech?id=${product_id}`);
  };

  return (
    <Card
      className="card-style"
      onClick={(event: any) => {
        event.stopPropagation();
        if (isInTechPage) {
          dispatch(selectProduct(product));
          navigate(`/${baseUrl}/order/create`);
        } else {
          turnToDetail(product.product_id);
        }
      }}
    >
      <div className="product-item-container">
        <Image
          src={product.photo_intro}
          width={imageSize}
          height={imageSize}
          fit="cover"
          style={{ borderRadius: 5, alignSelf: "center" }}
        />
        <div
          className="product-item-desc"
          style={isInTechPage ? { paddingTop: 5 } : null}
        >
          <div className="title">{product.product_name}</div>
          <div className="duration">
            <CustomClockIcon size="14px" />
            <span style={{ marginLeft: 3 }}> {product.duration}</span>
          </div>
          {!isInTechPage && (
            <div style={{ color: "var(--adm-color-weak)" }}>
              下单数量：
              {productBaseSales[product.product_name] + product.order_count}
            </div>
          )}
          <div className="price">
            <div>
              <span className="content-price">
                <span>¥</span>
                <span className="money">{product.price_current}</span>
              </span>
              <span className="content-oldprice"> ¥{product.price_old} </span>
            </div>
            <div className="content-btn">
              {isInTechPage ? (
                <Button
                  size="small"
                  color="primary"
                  className="long-btn"
                  // onClick={(event) => {
                  //   event.stopPropagation();
                  //   dispatch(selectProduct(product));
                  //   navigate(`/${baseUrl}/order/create`);
                  // }}
                >
                  立即预约
                </Button>
              ) : (
                <Button
                  size="small"
                  color="primary"
                  className={styles.long_btn}
                  onClick={(event) => {
                    event.stopPropagation();
                    turnToTech(product.product_id);
                  }}
                >
                  选择技师
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
