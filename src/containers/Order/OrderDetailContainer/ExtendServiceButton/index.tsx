import { Button, Popup } from "antd-mobile";
import React, { useState } from "react";
import orderStatusCodeDict from "@/lib/statusCodeDict.json";
import OrderExtendServiceContainer from "../OrderExtendServiceContainer";
import styles from "./style.module.less";
import { useAppSelector } from "@/store";
const showExtendServiceButton = (order: any) => {
  return (
    order.payment_status_code == orderStatusCodeDict.client.paid.code &&
    order.order_status_code_client !==
      orderStatusCodeDict.client.service_end.code &&
    order.order_status_code_tech == orderStatusCodeDict.tech.start_service.code
  );
};
const ExtendServiceButton = () => {
  const { order } = useAppSelector((state) => state.order);
  const [extendServiceVisible, setExtendServiceVisible] = useState(false);
  return (
    showExtendServiceButton(order) && (
      <div className={styles.button_wrapper}>
        <Button
          color="primary"
          size="mini"
          // width={84}
          onClick={() => {
            setExtendServiceVisible(true);
          }}
        >
          + 加钟服务
        </Button>
        <Popup
          destroyOnClose={true}
          className={styles.popup}
          visible={extendServiceVisible}
          onMaskClick={() => {
            setExtendServiceVisible(false);
          }}
          bodyStyle={{
            height: "50vh",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            // minHeight: "40vh",
          }}
        >
          <OrderExtendServiceContainer />
        </Popup>
      </div>
    )
  );
};
export default ExtendServiceButton;
