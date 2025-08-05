import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Image, Toast } from "antd-mobile";
import CustomStepper from "@/components/icons/CustomStepper";
import CustomClockIcon from "@/components/icons/CustomClockIcon";
import { Product } from "@/types/Product";
import { TechUser } from "@/types/Tech";

import { selectProduct } from "@/store/slices/productSlice";
import { baseUrl } from "@/util/config";
import { selectTechUser } from "@/store/slices/techUserSlice";
import styles from "./style.module.less";
import { useAppDispatch } from "@/store";
import { setOrderProductCount } from "@/store/slices/orderSlice";

const TechPageSelectProductContainer = ({
  techuser,
}: {
  techuser: TechUser;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentProductId, setCurrentProductId] = useState();
  const [currentProductCount, setCurrentProductCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const handleOrder = async () => {
    if (totalCost === 0) {
      Toast.show({
        content: "请选择服务项目",
      });
      return;
    } else {
      const product = techuser.products.find(
        (product: Product) => product.product_id === currentProductId
      );
      dispatch(selectProduct(product));
      dispatch(selectTechUser(techuser));
      navigate(`/${baseUrl}/order/create?productcount=${currentProductCount}`);
    }
  };

  useEffect(() => {
    let productPrice = techuser.products.find(
      (product: Product) => product.product_id === currentProductId
    )?.price_current;
    if (!productPrice) {
      productPrice = 0;
    }
    setTotalCost(currentProductCount * productPrice);
  }, [currentProductId, currentProductCount]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {techuser.products.map((product: any, index: any) => (
          <Card className={styles.card} key={index}>
            <div className={styles.product_item}>
              <Image
                src={product.photo_intro}
                width={60}
                height={60}
                fit="cover"
              />
              <div className={styles.product_desc}>
                <div className={styles.product_desc_line}>
                  <div className={styles.product_desc_name}>
                    {product.product_name}
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CustomClockIcon />
                    <span style={{ marginLeft: 5 }}>{product.duration}</span>
                  </div>
                </div>
                <div className={styles.product_desc_line}>
                  <div className="money-color" style={{ fontSize: 14 }}>
                    ¥{product.price_current}
                  </div>
                  <div>
                    <CustomStepper
                      defaultValue={0}
                      value={
                        currentProductId == product.product_id
                          ? currentProductCount
                          : 0
                      }
                      min={0}
                      max={5}
                      onChange={(value) => {
                        setCurrentProductId(product.product_id);
                        setCurrentProductCount(value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.summary}>
          <span className={styles.summary_title}>合计：</span>
          <span className={"money-color"}>￥{totalCost}</span>
          <span className={styles.summary_desc}>
            详细折扣请进入下单页面查看
          </span>
        </div>
        <Button
          color="primary"
          style={{ padding: "5px 30px", borderRadius: 15 }}
          onClick={handleOrder}
        >
          立即下单
        </Button>
      </div>
    </div>
  );
};
export default TechPageSelectProductContainer;
