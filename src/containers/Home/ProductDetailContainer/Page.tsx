import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd-mobile";
import { baseUrl } from "@/util/config";

import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import ProductDetail from "@/containers/Home/ProductDetailContainer/ProductDetail";
import styles from "./style.module.less";
import { useAppSelector } from "@/store";

const ProductDetailContainer = () => {
  const { product } = useAppSelector((state) => state.product);

  return (
    <MiddleContentHeader
      className={styles.wrapper}
      CustomFooter={<CustomFooter />}
      title="项目详情"
      // loading={loading}
      withFooter={false}
    >
      {product && <ProductDetail product={product} />}
    </MiddleContentHeader>
  );
};

export default ProductDetailContainer;
const CustomFooter = () => {
  const { product } = useAppSelector((state) => state.product);
  const location = useLocation();

  const navigate = useNavigate();
  const turnToTechOrOrder = () => {
    if (location.pathname.split("/")[2] === "product") {
      // 跳转到技师选择页面
      navigate(`/${baseUrl}/prodtech?id=${product.product_id}`);
    } else {
      //product already selected in redux
      //tech already selected in redux
      navigate(`/${baseUrl}/order/create`);
    }
  };
  return (
    <div className={styles.bottom_button}>
      <Button
        block
        color="primary"
        onClick={turnToTechOrOrder}
        className="single-button"
      >
        {location.pathname.split("/")[2] === "product"
          ? "选择技师"
          : "立即下单"}
      </Button>
    </div>
  );
};
