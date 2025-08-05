import { useNavigate } from "react-router-dom";
import { baseUrl } from "@/util/config";
import { AddOutline } from "antd-mobile-icons";
import { Button, Card } from "antd-mobile";
import styles from "./style.module.less";
import { useAppSelector } from "@/store";

const OrderAddress = () => {
  const navigate = useNavigate();
  const { newOrder } = useAppSelector((state) => state.order);
  const { orderServiceAddress } = newOrder;
  if (!orderServiceAddress) {
    return (
      <div className={styles.button_wrapper}>
        <Button
          block
          color="primary"
          onClick={() => {
            navigate(`/${baseUrl}/user/address/`, {
              state: { previousPathname: "order" },
            });
          }}
        >
          <AddOutline color={"white"} />
          请先添加服务地址
        </Button>
      </div>
    );
  }
  return (
    <Card className={styles.address_card}>
      <div className={styles.address_card_conent_wrapper}>
        <div className={styles.user_info_wrapper}>
          <div className={styles.user_info}>
            <div className={styles.address}>
              {orderServiceAddress.region} {orderServiceAddress.detail_address}
            </div>
            <div className={styles.street}>{orderServiceAddress.street}</div>
            <div className={styles.name_phone_wrapper}>
              <div className={styles.name_phone}>
                <span className={styles.name}>{orderServiceAddress.name}</span>
                <span className={styles.phone}>
                  {orderServiceAddress.phone.replace(
                    /(\d{3})(\d{4})(\d{4})/,
                    "$1****$3"
                  )}
                </span>
              </div>
              <span className={styles.phone_hint}>
                （平台为保护您的隐私，显示号码已部分隐藏，拨打时将使用虚拟号码进行通话）
              </span>
            </div>
          </div>
        </div>
        <div
          className={styles.edit_button}
          onClick={() =>
            navigate(`/${baseUrl}/user/address`, {
              state: { previousPathname: "order" },
            })
          }
        >
          修改
        </div>
      </div>
    </Card>
  );
};
export default OrderAddress;
