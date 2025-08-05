import React, { useState, useEffect } from "react";
import { Tag, Empty, DotLoading, Tabs, Card } from "antd-mobile";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { getFeedBackListByClientId } from "@/api/feedbackApi";
import moment from "moment";
import { FeedBacks } from "@/types/FeedBack";
import { useAppSelector } from "@/store";
// 模拟反馈数据
const mockFeedbackData = [
  {
    id: 1,
    content: "商品质量存在问题，收到后发现有轻微损坏",
    createTime: "2025-02-25 14:23",
    status: "已处理",
    reply: "非常抱歉给您带来不便，我们已安排重新发货，请查收",
    replyTime: "2025-02-26 09:15",
    images: [],
  },
  {
    id: 2,
    content: "配送时间太长，下单后等了3天才收到",
    createTime: "2025-02-20 10:05",
    status: "已处理",
    reply: "感谢您的反馈，我们会持续改进物流配送体验",
    replyTime: "2025-02-21 11:30",
    images: [],
  },
  {
    id: 3,
    content: "客服态度非常好，解决问题很及时",
    createTime: "2025-02-18 16:42",
    status: "待处理",
    reply: "",
    replyTime: "",
    images: [],
  },
];

function FeedBackHistoryContainer() {
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAppSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [feedbackList, setFeedbackList]: [FeedBacks, any] = useState([]);

  useEffect(() => {
    const init = async () => {
      const feedbackList = await getFeedBackListByClientId(user.openid);
      setFeedbackList(feedbackList);
      setLoading(false);
    };
    init();
  }, []);

  // 根据标签筛选数据
  const getFilteredList = () => {
    if (activeTab === "all") {
      return feedbackList;
    } else if (activeTab === "pending") {
      return feedbackList.filter(
        (item: any) => item.status === 0 || item.status === 1
      );
    } else {
      return feedbackList.filter((item: any) => item.status === 2);
    }
  };
  const getItemStatus = (status: any) => {
    if (status !== null && (status == 0 || status == 1)) return "处理中";
    else return "已处理";
  };
  const filteredList = getFilteredList();

  return (
    <div className="feedback-history-container">
      <MiddleContentHeader withFooter={false} title="反馈记录">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="feedback-tabs"
        >
          <Tabs.Tab title="全部" key="all" />
          <Tabs.Tab title="处理中" key="pending" />
          <Tabs.Tab title="已处理" key="processed" />
        </Tabs>
        <div className="feedback-list-container">
          {loading ? (
            <div className="loading-container">
              <DotLoading color="primary" />
              <span>加载中</span>
            </div>
          ) : filteredList.length > 0 ? (
            <div className="feedback-list-card-wrapper">
              {filteredList.map((item: any) => (
                <Card key={item.id} className="feedback-item card-style">
                  <div className="feedback-header">
                    <div className="feedback-time">
                      {moment(item.create_time).format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                    <Tag
                      color={item.status === 2 ? "#10b981" : "#f59e0b"}
                      className="status-tag"
                    >
                      {getItemStatus(item.status)}
                    </Tag>
                  </div>
                  <div className="feedback-content">{item.content}</div>

                  {item.reply && (
                    <div className="reply-container">
                      <div className="reply-header">
                        <span className="reply-title">官方回复</span>
                        <span className="reply-time">
                          {moment(item.reply_at).format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                      </div>
                      <div className="reply-content">{item.reply}</div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Empty description="暂无反馈记录" />
          )}
        </div>
      </MiddleContentHeader>
    </div>
  );
}

export default FeedBackHistoryContainer;
