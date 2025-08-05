import React, { useEffect, useState } from "react";
import {
  NavBar,
  TextArea,
  Input,
  Button,
  ImageUploader,
  Toast,
  Mask,
} from "antd-mobile";
import Loading from "@/components/common/Loading";
import { PictureOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { createFeedBackApi } from "@/api/feedbackApi";
import { baseUrl } from "@/util/config";
import { useAppSelector } from "@/store";
const FeedbackForm = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  // 反馈内容
  const [content, setContent] = useState("");
  // 电话号码
  const [phone, setPhone] = useState("");
  // 上传的图片
  const [images, setImages] = useState([]);

  // 字符数限制
  const maxChars = 200;
  // 处理图片上传
  const handleUpload = async (file: any) => {
    return {
      url: URL.createObjectURL(file),
      file: file, // 保存原始文件
    };
  };

  // 图片上传前校验
  const beforeUpload = (file: any) => {
    if (images.length >= 3) {
      Toast.show("最多只能上传3张图片");
      return null;
    }
    return file;
  };

  // 提交表单
  const handleSubmit = async () => {
    if (!content.trim()) {
      Toast.show("请填写反馈内容");
      return;
    }
    setLoading(true);
    const feedBackInfo = {
      client_openid: user.openid,
      content: content,
      contact_phone: phone,
      user_phone_registered: user.user_phone,
      status: 0,
    };
    const uploadData = new FormData();
    Object.keys(feedBackInfo).forEach((key: any) => {
      uploadData.append(key, feedBackInfo[key]);
    });

    images.forEach((image: any, index: any) => {
      if (!image) {
        return; // 跳过无效图片
      }
      // 如果image有file属性（来自我们的handleUpload函数）
      if (image.file && image.file instanceof File) {
        uploadData.append(`image${index + 1}`, image.file);
      }
      // 如果image本身就是File对象
      else if (image instanceof File) {
        uploadData.append(`image${index + 1}`, image);
      }
      // 其他情况
      else {
        console.warn(`第${index}个图片格式不支持:`, image);
      }
    });

    // 这里处理提交逻辑，实际应用中需要发送到服务器
    await createFeedBackApi(uploadData);
    setLoading(false);
    Toast.show({
      icon: "success",
      content: "提交成功！您可以在反馈记录中查看进度以及处理结果",
    });
    navigate(-1);
  };
  const checkFeedbackHistory = () => {
    navigate(`/${baseUrl}/feedback/history`);
  };

  return (
    <div className="feedback-container">
      <NavBar
        onBack={() => navigate(-1)}
        right={
          <span className="nav-right" onClick={checkFeedbackHistory}>
            反馈记录
          </span>
        }
      >
        意见反馈
      </NavBar>
      <div className="content">
        <Mask visible={loading} className="custom-mask">
          <Loading />
        </Mask>
        {/* 反馈内容区域 */}
        <div className="card">
          <div className="card-title">意见反馈</div>
          <div className="text-area-container">
            <TextArea
              value={content}
              onChange={setContent}
              placeholder="我们非常重视您的反馈。如果对服务不满意，请详细说明，我们会尽快为提供您帮助！(必填)"
              maxLength={maxChars}
              showCount
              rows={5}
              className="feedback-textarea"
            />
          </div>
        </div>

        {/* 联系电话区域 */}
        <div className="card">
          <div className="card-title">联系电话</div>
          <Input
            placeholder="请输入联系电话"
            value={phone}
            onChange={setPhone}
            className="phone-input"
            {...({} as any)}
          />
        </div>

        {/* 上传凭证区域 */}
        <div className="card">
          <div className="card-title">
            上传凭证 <span className="upload-limit">(不超过3张)</span>
          </div>
          <div className="uploader-container">
            <ImageUploader
              value={images}
              onChange={setImages}
              upload={handleUpload}
              beforeUpload={beforeUpload}
              maxCount={3}
              showUpload={images.length < 3}
              accept="image/*"
            >
              <div className="uploader-button">
                <PictureOutline fontSize={24} />
                <div className="uploader-text">上传照片</div>
              </div>
            </ImageUploader>
          </div>
        </div>

        {/* 提交按钮区域 */}
        <div className="submit-area">
          <Button
            block
            color="primary"
            className="submit-button"
            onClick={handleSubmit}
          >
            提交
          </Button>
          <div className="submit-hint">
            提交后，您可以在反馈记录中查看进度以及处理结果
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
