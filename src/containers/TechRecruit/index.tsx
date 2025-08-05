import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  TextArea,
  Space,
  Card,
  Image,
  Toast,
} from "antd-mobile";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import styles from "./style.module.less";
import { baseUrl, staticUrl } from "@/util/config";
import { submitPartnerRecruitApi } from "@/api/recruitApi";
import { Link, useNavigate } from "react-router-dom";

const TechRecruit = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   name: "",
  //   phone: "",
  //   cooperationType: "技师",
  //   city: "",
  //   message: "",
  // });

  const handleSubmit = async (values) => {
    // 这里添加提交逻辑
    values.recruit_type = "tech";
    await submitPartnerRecruitApi(values);
    Toast.show({
      content: "提交成功",
    });
    navigate(-1);
  };

  const handleFinishFailed = (errorInfo) => {
    const errorfield = errorInfo.errorFields[0].errors[0];
    Toast.show({
      content: errorfield,
    });
    return;
  };

  return (
    <MiddleContentHeader
      title="技师招募"
      withFooter={false}
      className={styles.partner_recruit}
    >
      <div className={styles.wrapper}>
        <div className={styles.form_card_wrapper}>
          <div>
            <Image src={`${staticUrl}/images/tech_v6.png`} fit="fill" />
          </div>

          {/* 表单区域 */}
          <Card className={styles.form_card}>
            <Form
              className="custom-form"
              style={{ "--border-bottom": "none" }}
              form={form}
              onFinish={handleSubmit}
              onFinishFailed={handleFinishFailed}
              layout="vertical"
              // footer={}
            >
              <Form.Item
                name="name"
                label="姓名"
                rules={[
                  { required: true, message: "请输入您的姓名" },
                  { min: 2, message: "姓名至少2个字符" },
                ]}
              >
                <Input
                  placeholder="请输入您的姓名"
                  clearable
                  className={styles.formInput}
                />
              </Form.Item>
              <Form.Item
                name="gender"
                label="性别"
                initialValue={"女"}
                rules={[{ required: true, message: "请输入您的性别" }]}
              >
                <Radio.Group defaultValue={"女"}>
                  <Space>
                    <Radio value="女">女</Radio>
                    <Radio value="男">男</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="phone"
                label="手机号码"
                rules={[
                  { required: true, message: "请输入联系方式" },
                  {
                    pattern: /^1[3-9]\d{9}$/,
                    message: "请输入正确的手机号码",
                  },
                ]}
              >
                <Input
                  placeholder="请输入联系方式"
                  type="tel"
                  clearable
                  className={styles.formInput}
                />
              </Form.Item>
              <Form.Item
                name="age"
                label="年龄"
                rules={[{ required: true, message: "请输入您的年龄" }]}
              >
                <Input
                  placeholder="请输入您的年龄"
                  type="number"
                  clearable
                  // className={styles.formInput}
                />
              </Form.Item>
              <Form.Item
                name="city"
                label="意向合作城市"
                rules={[{ required: true, message: "请填写合作城市" }]}
              >
                <Input
                  placeholder="请填写合作城市"
                  clearable
                  className={styles.formInput}
                />
              </Form.Item>
              <Form.Item
                name="message"
                label="留言"
                className={styles.custom_form_item}
              >
                <div className={styles.text_area_wrapper}>
                  <TextArea
                    placeholder="请留言"
                    rows={4}
                    maxLength={500}
                    // showCount
                    className={styles.formTextarea}
                  />
                </div>
              </Form.Item>
            </Form>
          </Card>
          <div className={styles.notice}>
            请注意接听来自北京地区的陌生来电，如有微信好友申请请及时通过，我们将在24小时内与您取得联系
          </div>

          <div className={styles.privacy}>
            <Link
              to={`/${baseUrl}/user/aboutus/privacy_agreement`}
              className={styles.privacyLink}
            >
              《隐私政策》
            </Link>
          </div>
        </div>
        <div className={styles.submit_button_wrapper}>
          <Button
            block
            type="submit"
            color="primary"
            size="large"
            onClick={() => {
              form.submit();
            }}
          >
            提交申请
          </Button>
        </div>
      </div>
    </MiddleContentHeader>
  );
};

export default TechRecruit;
