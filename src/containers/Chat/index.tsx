import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Input, Button, Avatar } from "antd-mobile";
import { SendOutline } from "antd-mobile-icons";
import { staticUrl } from "@/util/config";
import { useAppSelector } from "@/store";

const ChatContainer = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "你好，有什么可以帮助你的？",
      sender: "system",
      time: "12:01",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const { user } = useAppSelector((state) => state.user);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const generate_reply = () => {
    // 【白天】我们非常重视您的反馈，如果您需要与人工客服沟通，请拨打：18010260892，期待为您提供帮助！【晚上】我们非常重视您的反馈，如果您需要与人工客服沟通，请拨打：13452762588，期待为您提供帮助！
    //根据当前时间判断是白天还是晚上
    const now = new Date();
    const hour = now.getHours();
    const day_contact = "18010260892";
    const night_contact = "13452762588";
    return `我们非常重视您的反馈，如果您需要与人工客服沟通，请拨打：${
      hour > 7 && hour < 20 ? day_contact : night_contact
    }，期待为您提供帮助！`;
  };
  // 发送消息
  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      content: inputValue,
      sender: "user",
      time: new Date().toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // 模拟回复
    setTimeout(() => {
      const replyMessage = {
        id: Date.now() + 1,
        content: generate_reply(),
        sender: "system",
        time: new Date().toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev: any) => [...prev, replyMessage]);
    }, 1000);
  };
  const handleGoBack = () => {
    // 返回到上一页
    navigate(-1);
  };
  return (
    <div className="chat-container">
      <NavBar onBack={handleGoBack}>尚达元客服小助手</NavBar>

      <div className="message-list">
        {messages.map((msg: any) => (
          <div
            key={msg.id}
            className={`message-item ${
              msg.sender === "user" ? "user-message" : "system-message"
            }`}
          >
            {msg.sender === "system" && (
              <Avatar
                className="avatar"
                src={`${staticUrl}/images/robot.jpg`}
              />
            )}

            <div className="message-bubble">
              <div className="message-content">{msg.content}</div>
              <div className="message-time">{msg.time}</div>
            </div>

            {msg.sender === "user" && (
              <Avatar className="avatar" src={user.headimgurl} />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <Input
          placeholder="请输入消息"
          value={inputValue}
          onChange={(val: any) => setInputValue(val)}
          onEnterPress={handleSend}
          {...({} as any)}
        />
        <Button onClick={handleSend}>
          <SendOutline />
        </Button>
      </div>
    </div>
  );
};

export default ChatContainer;
