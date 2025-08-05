import { Button, Card, Image } from "antd-mobile";
import React, { useState } from "react";
import styles from "./style.module.less";
import { AddOutline } from "antd-mobile-icons";
import OrderTechSelectTimePopup from "./OrderTechSelectTimePopup";
import { useAppDispatch, useAppSelector } from "@/store";
import { setTechWorkTime } from "@/store/slices/orderSlice";
import moment from "moment";

const OrderTech = () => {
  const { newOrder } = useAppSelector((state) => state.order);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useAppDispatch();
  const changeServiceTime = () => {
    setShowPopup(true);
  };
  const confirmTime = (workdate: string, worktime: string) => {
    dispatch(setTechWorkTime({ workdate, worktime }));
    setShowPopup(false);
  };
  if (!newOrder.tech.workdate || !newOrder.tech.worktime) {
    return (
      <div className={styles.button_wrapper}>
        <Button
          block
          color="primary"
          onClick={() => {
            changeServiceTime();
          }}
        >
          <div className={styles.button_text}>
            <AddOutline color={"white"} />
            <span>请选择服务时间</span>
          </div>
        </Button>
        <OrderTechSelectTimePopup
          showPopup={showPopup}
          onCancel={() => {
            setShowPopup(false);
          }}
          onConfirm={(workdate: string, worktime: string) => {
            confirmTime(workdate, worktime);
          }}
        />
      </div>
    );
  }
  return (
    <Card className={styles.tech}>
      <div className={styles.tech_card_content_wrapper}>
        <div className={styles.line}>
          <div className={styles.tech_info}>
            <Image
              src={newOrder.tech.photo_work}
              width={32}
              height={32}
              fit="cover"
              style={{
                borderRadius: 32,
                marginTop: "5px",
                marginRight: "5px",
              }}
            />
            {newOrder.tech.user_nickname} .
            {newOrder.tech.user_sex.replace("string", "")}
          </div>
          <div
            className={styles.edit_time}
            onClick={() => {
              changeServiceTime();
            }}
          >
            修改
          </div>
        </div>
        <div className={styles.line}>
          <div>服务时间</div>
          <div>
            {newOrder.tech.workdate
              ? moment(
                  `${newOrder.tech.workdate} ${newOrder.tech.worktime}`
                ).format("YYYY-MM-DD HH:mm")
              : ""}
          </div>
        </div>
      </div>

      <OrderTechSelectTimePopup
        showPopup={showPopup}
        onCancel={() => {
          setShowPopup(false);
        }}
        onConfirm={(workdate: string, worktime: string) => {
          confirmTime(workdate, worktime);
        }}
      />
    </Card>
  );
};
export default OrderTech;
