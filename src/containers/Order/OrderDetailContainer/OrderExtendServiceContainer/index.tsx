import React, { useEffect, useState } from "react";
import { Button, Card, Image, Toast } from "antd-mobile";
import { fetchTechUserProducts } from "@/api/techuserApi";
import CustomStepper from "@/components/icons/CustomStepper";
import "./style.less";
import Loading from "@/components/common/Loading";

import CustomClockIcon from "@/components/icons/CustomClockIcon";
import { Products } from "@/types/Product";
import usePay from "@/hooks/order/usePay";
import { extendServicePayApi } from "@/api/orderApi";
import { useAppSelector } from "@/store";
const OrderExtendServiceContainer = () => {
  const { order } = useAppSelector((state) => state.order);
  const { user } = useAppSelector((state) => state.user);

  const [techuserproducts, setTechUserProducts]: [Products, any] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentProductId, setCurrentProductId] = useState();
  const [currentProductCount, setCurrentProductCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const { tech } = order;
  const extendServicePayHandler = usePay();
  const handleExtendService = async () => {
    if (totalCost === 0) {
      Toast.show({
        content: "请选择服务项目",
      });
      return;
    }
    pay();
  };
  const pay = () => {
    const payContent = {
      user_openid: user.openid,
      order_id: order.order_id,
      product_id: currentProductId,
      product_count: currentProductCount,
    };
    extendServicePayHandler(payContent, extendServicePayApi);
  };
  useEffect(() => {
    const init = async () => {
      const techuserproducts = await fetchTechUserProducts(tech.user_id);
      setTechUserProducts(techuserproducts);
      setLoading(false);
    };
    init();
  }, []);
  useEffect(() => {
    let productPrice = techuserproducts.find(
      (product: any) => product.product_id === currentProductId
    )?.price_current;
    if (!productPrice) {
      productPrice = 0;
    }
    setTotalCost(currentProductCount * productPrice);
  }, [currentProductId, currentProductCount]);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="extend-service-container">
      <div className="extend-service-content">
        {techuserproducts.map((product: any, index: any) => (
          <Card className="card-style" key={index}>
            <div className="extend-service-product-item-container">
              <Image
                src={product.photo_intro}
                width={60}
                height={60}
                fit="cover"
              />
              <div className="product-desc">
                <div className="product-desc-line">
                  <div style={{ fontWeight: "bold", fontSize: 14 }}>
                    {product.product_name}
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CustomClockIcon />
                    <span style={{ marginLeft: 5 }}>{product.duration}</span>
                  </div>
                </div>
                <div className="product-desc-line">
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
      <div className="extend-service-footer">
        <div style={{ fontSize: 14 }}>
          <span style={{ fontWeight: "bold" }}>合计：</span>
          <span className="money-color">￥{totalCost}</span>
        </div>
        <Button
          color="primary"
          style={{ padding: "5px 30px", borderRadius: 15 }}
          onClick={handleExtendService}
        >
          立即下单
        </Button>
      </div>
    </div>
  );
};
export default OrderExtendServiceContainer;
