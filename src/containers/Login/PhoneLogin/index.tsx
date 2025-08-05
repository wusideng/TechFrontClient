import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Toast } from "antd-mobile";
import { baseUrl, enable_phone_validation_code } from "@/util/config";
import { updateUserPhone } from "@/store/slices/userSlice";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { useAppDispatch, useAppSelector } from "@/store";
import styles from "./style.module.less";
import FormComponent from "@/components/FormComponent";
import { useRef, useState } from "react";
import { FormItem } from "@/types/FormItem";
import { VerificationCodeButton } from "./VerificationCodeButton";
import { sendVerificationCode } from "@/api/userApi";
const PhoneLoginContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const getVerficationCode = async (): Promise<boolean> => {
    const form = (formRef.current as any)?.form; // 获取子组件的 form
    try {
      await form.validateFields(["phone"]);
      const phone = form.getFieldValue("phone");
      await sendVerificationCode({
        phone,
        user_openid: user.openid,
      });
      Toast.show({
        content: "验证码已发送",
      });
      return true;
    } catch (error) {
      const msgs = form.getFieldError("phone");
      if (msgs.length > 0) {
        Toast.show({
          content: msgs[0],
        });
      } else {
        const errorMsg = error.response.data.detail;
        Toast.show({
          content: errorMsg,
        });
      }

      return false;
    }
  };
  const formItems: FormItem[] = enable_phone_validation_code
    ? [
        {
          name: "user_openid",
          label: "user_openid",
          type: "hidden",
          rules: [],
        },
        {
          name: "phone",
          label: "手机号",
          type: "input",
          inputType: "tel",
          placeholder: "",
          rules: [
            { required: true, message: `请输入手机号码` },
            {
              type: "string",
              pattern: /^[1][3-9][0-9]{9}$/,
              message: "请输入有效的手机号码",
            },
          ],
        },
        {
          name: "code",
          label: "短信验证码",
          type: "input",
          inputType: "number",
          placeholder: "",
          extra: <VerificationCodeButton onClick={getVerficationCode} />,
          rules: [{ required: true, message: `请输入短信验证码` }],
        },
      ]
    : [
        {
          name: "user_openid",
          label: "user_openid",
          type: "hidden",
          rules: [],
        },
        {
          name: "phone",
          label: "手机号",
          type: "input",
          inputType: "tel",
          placeholder: "",
          rules: [
            { required: true, message: `请输入手机号码` },
            {
              type: "string",
              pattern: /^[1][3-9][0-9]{9}$/,
              message: "请输入有效的手机号码",
            },
          ],
        },
      ];
  const initialValues = {
    user_openid: user.openid,
  };

  const onFinish = async (values: any) => {
    try {
      let reqparam = {
        user_openid: user.openid,
        phone: values.phone,
        code: values.code,
      };
      await dispatch(updateUserPhone(reqparam)).unwrap();
      Toast.show({
        icon: "success",
        content: "手机号码绑定成功",
      });
      navigate(`/${baseUrl}/`, { replace: true });
    } catch (error) {
      Toast.show({
        content: error,
      });
    }
  };

  return (
    <MiddleContentHeader title={"手机号绑定"} className={styles.wrapper}>
      <div className={styles.login}>
        {/* <div className={styles.advertising}>
          <p>您好，</p>
          <p>欢迎使用尚达元</p>
        </div> */}
        <h3 className={styles.title}>手机号码绑定</h3>
        <div className={styles.content}>
          <FormComponent
            ref={formRef}
            initialValues={initialValues}
            formItems={formItems}
            onFinish={onFinish}
          />
        </div>
      </div>
    </MiddleContentHeader>
  );
};

export default PhoneLoginContainer;
