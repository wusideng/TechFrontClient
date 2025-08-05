import { Button, Modal } from "antd-mobile";
import styles from "./style.module.less";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { deleteCookie } from "@/util/utils";
import { Dispatch } from "redux";
import { useAppDispatch } from "@/store";
import { logout } from "@/store/slices/userSlice";
import { baseUrl } from "@/util/config";
import { useNavigate } from "react-router-dom";
//todo 后续需要完善，目前只做简单登出
const CloseAccountContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    deleteCookie("openid");
    dispatch(logout());
    navigate(`/${baseUrl}/login`);
    localStorage.removeItem("userToken");
  };
  const confirmCloseAccount = () => {
    Modal.confirm({
      closeOnMaskClick: true,
      className: styles.modal_confirm,
      title: "温馨提示",
      content:
        // "一旦确认注销，您的全部数据将被清除（含账户余额及达元卡余额），且此操作不可逆转。您确定要继续注销流程吗？",
        "一旦确认注销，您的全部数据将被清除，且此操作不可逆转。您确定要继续注销流程吗？",
      onConfirm: async () => {
        logoutHandler();
      },
      confirmText: "确认注销",
      cancelText: "取消注销",
    });
  };
  return (
    <MiddleContentHeader title="注销账号" className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        <div className={styles.title}>确认注销账号</div>
        <div className={styles.content}>
          <div>
            为确保您的账户安全，您的注销申请只有在满足以下全部条件后才能生效：
          </div>
          <div>(1) 所有交易已结束</div>
          <div>
            您在平台上的所有订单必须已完成处理，任何未完成的交易都会导致注销请求被拒绝。
          </div>
          <div>(2) 无未解决的争议 </div>
          <div>账户不得有任何未处理的投诉、举报或其他纠纷事项。</div>
          {/* <div>(3) 自愿放弃账户内资金与资产</div>
          <div>提交注销申请即表示您同意放弃账户中的所有余额和资产。</div> */}
        </div>
      </div>
      <div className={styles.button_wrapper}>
        <Button
          className={styles.button}
          block
          color="primary"
          onClick={confirmCloseAccount}
        >
          确认注销
        </Button>
      </div>
    </MiddleContentHeader>
  );
};
export default CloseAccountContainer;
