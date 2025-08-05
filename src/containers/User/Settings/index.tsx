import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { Button, List } from "antd-mobile";
import { deleteCookie } from "@/util/utils";
import { logout } from "@/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useNavigate } from "react-router-dom";

import styles from "./style.module.less";
import { baseUrl } from "@/util/config";
import { PhoneFill } from "antd-mobile-icons";
import SuitCaseIcon from "@/lib/icons/SuitCaseIcon";

const SettingsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const logoutHandler = () => {
    deleteCookie("openid");
    dispatch(logout());
    // dispatch(setMenu("home"));
    navigate(`/${baseUrl}/`);
    localStorage.removeItem("userToken");
  };
  return (
    <MiddleContentHeader
      title="设置"
      withFooter={false}
      className={styles.wrapper}
    >
      <List mode="card" header={null}>
        <List.Item extra={user.user_phone} arrowIcon={false}>
          <div className={styles.line}>
            <PhoneFill color="var(--adm-color-primary)" fontSize={18} />
            <span>手机号码</span>
          </div>
        </List.Item>
        <List.Item
          onClick={() => {
            navigate(`/${baseUrl}/user/close_account`);
          }}
        >
          <div className={styles.line}>
            <SuitCaseIcon
              color="var(--adm-color-primary)"
              fill={"white"}
              size={18}
            />
            <span>注销</span>
          </div>
        </List.Item>
      </List>
      {/* <div className={styles.line}>
        <PhoneFill color="var(--adm-color-primary)" fontSize={18} />
        <span>{user.user_phone}</span>
      </div> */}
      <div style={{ margin: 10 }}>
        <Button color="primary" block onClick={logoutHandler}>
          退出登录
        </Button>
      </div>
    </MiddleContentHeader>
  );
};
export default SettingsContainer;
