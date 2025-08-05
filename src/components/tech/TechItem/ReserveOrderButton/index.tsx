import { useState } from "react";
import { Button, Image, Modal, Popup, Toast } from "antd-mobile";
import { selectTechUser } from "@/store/slices/techUserSlice";
import { TechUser } from "@/types/Tech";
import { baseUrl, staticUrl } from "@/util/config";
import { useLocation, useNavigate } from "react-router-dom";
import TechPageSelectProductContainer from "./TechPageSelectProductContainer";
import { useAppDispatch, useAppSelector } from "@/store";
import moment from "moment";
import { inviteHerApi } from "@/api/techuserApi";
import styles from "./style.module.less";

const ReserveOrderButton = ({ techuser }: { techuser: TechUser }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);
  const { worktime, workdate } = techuser;
  const isAvailable = () => {
    return (
      workdate &&
      worktime &&
      moment(`${workdate} ${worktime}`).diff(moment(), "days") <= 1
    );
  };
  const turnToOrder = () => {
    const shouldGotoOrder =
      location.pathname != `/${baseUrl}/tech` &&
      location.pathname != `/${baseUrl}/tech/`;
    if (shouldGotoOrder) {
      dispatch(selectTechUser(techuser));
      navigate(`/${baseUrl}/order/create`);
    } else {
      setShowPopup(true);
    }
  };
  const inviteHer = async () => {
    Modal.confirm({
      closeOnMaskClick: true,
      className: styles.invite_hint_modal,
      title: "温馨提示",
      content: (
        <div className={styles.invite_hint}>
          <div>每日仅可邀请3个商家</div>
          <div>确认邀请TA上线?</div>
        </div>
      ),
      onConfirm: async () => {
        try {
          await inviteHerApi(user.openid, techuser.openid);
          Modal.alert({
            closeOnMaskClick: true,
            className: "invite-modal",
            content: (
              <Image src={`${staticUrl}/images/invite_her.png`} fit="fill" />
            ),
          });
        } catch (e) {
          const errorMsg = e.response.data.detail;
          Toast.show({ content: errorMsg });
        }
      },
      onCancel: () => {},
    });
  };
  return (
    <div className={styles.tech_item_order}>
      <div>
        {isAvailable() ? (
          <Button
            color="primary"
            size="small"
            className="long-btn"
            style={{ minWidth: 84 }}
            onClick={(event) => {
              event.stopPropagation();
              if (!user.openid) {
                navigate(`/${baseUrl}/login`);
              } else {
                turnToOrder();
              }
            }}
          >
            立即预约
          </Button>
        ) : (
          <Button
            color="primary"
            size="small"
            className={"long-btn" + " " + styles.invite_button}
            style={{ minWidth: 84 }}
            onClick={(event) => {
              event.stopPropagation();
              if (!user.openid) {
                navigate(`/${baseUrl}/login`);
              } else {
                inviteHer();
              }
            }}
          >
            邀TA上线
          </Button>
        )}
      </div>
      <Popup
        destroyOnClose={true}
        className={styles.popup}
        visible={showPopup}
        onMaskClick={() => {
          setShowPopup(false);
        }}
        bodyStyle={{
          height: "50vh",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          // minHeight: "40vh",
        }}
      >
        <TechPageSelectProductContainer techuser={techuser} />
      </Popup>
    </div>
  );
};
export default ReserveOrderButton;
