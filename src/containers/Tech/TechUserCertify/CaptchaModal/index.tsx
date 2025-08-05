import { useState, useEffect } from "react";
import { Modal, Input, Image, Toast } from "antd-mobile";
import styles from "./styles.module.less";
import { verifyTechCertifyCaptcha } from "@/api/techuserApi";
import { useParams } from "react-router-dom";

function CaptchaModal({ setModalVisible, onSuccess }) {
  const width = 120;
  const height = 50;
  const [captchaUrl, setCaptchaUrl] = useState("");
  const params = useParams<{ id?: string }>();
  const [captchaInput, setCaptchaInput] = useState("");
  const { id } = params;
  // 获取验证码图片
  const fetchCaptcha = async () => {
    // 使用时间戳防止缓存
    const timestamp = new Date().getTime();
    setCaptchaUrl(
      `${process.env.apiUrl}/tech_certify/captcha?t=${timestamp}&width=${width}&height=${height}`
    );
  };

  // 打开Modal时获取验证码
  useEffect(() => {
    fetchCaptcha();
  }, []);

  // 提交表单
  const handleConfirm = async () => {
    if (!captchaInput) return;
    try {
      // 发送验证请求
      const values = {
        captcha_text: captchaInput.toLowerCase(),
        tech_user_id: parseInt(id),
      };
      const response = await verifyTechCertifyCaptcha(values);
      if (response.status === "success") {
        Toast.show({
          content: "验证成功",
        });
        onSuccess();

        // 验证成功后的操作
        // ...
      }
    } catch (error) {
      const message = error?.response?.data?.detail || "验证失败，请重试";
      Toast.show({
        content: message,
      });
      // 如果验证码错误，刷新验证码
      fetchCaptcha();
    }
  };

  return (
    <>
      <Modal
        visible={true}
        className={styles.captcha_modal}
        content={
          <div className={styles.wrapper}>
            <div className={styles.title}>查看技师资质</div>
            <Input
              placeholder="请输入图片中的验证码（不区分大小写）"
              onChange={(val) => {
                setCaptchaInput(val);
              }}
            />
            <div className={styles.image_wrapper}>
              <Image
                src={captchaUrl}
                width={width}
                height={height}
                fit="fill"
                style={{ marginRight: "12px" }}
                onClick={fetchCaptcha} // 点击图片也可以刷新
              />
              <div onClick={fetchCaptcha} className={styles.change_captcha}>
                看不清? 换一张
              </div>
            </div>
          </div>
        }
        closeOnMaskClick
        // closeOnAction
        onClose={() => {
          setModalVisible(false);
        }}
        actions={[
          {
            key: "confirm",
            primary: true,
            text: "确定",
            onClick: handleConfirm,
            className: styles.footer_button,
          },
          {
            key: "cancel",
            text: "取消",
            onClick: () => {
              setModalVisible(false);
            },
            className: styles.footer_button,
          },
        ]}
      />
    </>
  );
}

export default CaptchaModal;
