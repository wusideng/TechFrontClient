import React, { useState } from "react";

import { Button, Card, Rate, Tag, TextArea, Toast } from "antd-mobile";
import { SmileOutline } from "antd-mobile-icons";
import { addComment } from "@/store/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import styles from "./style.module.less";
// 结束服务的订单
const OrderComment = ({ setLoading }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [commentTxt, setCommentTxt] = useState("");
  const [commentRate, setCommentRate] = useState(5);
  const { order } = useAppSelector((state) => state.order);

  const submitComment = async () => {
    setLoading(true);
    let commentParam = {
      order_id: order.order_id,
      client_openid: order.client.openid,
      client_comment: commentTxt,
      client_score_to_tech: commentRate,
      tech_id: order.tech.openid,
    };
    await dispatch(addComment(commentParam));
    setLoading(false);
    Toast.show({
      content: "评论成功",
    });

    navigate(-1);
    // navigate(`/${baseUrl}/order`);
  };
  return (
    <Card className={`card-style`}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div
            style={{
              fontSize: "17px",
              fontWeight: "bolder",
              borderBottom: "1px solid #dbdbdb",
            }}
          >
            顾客信息评论
          </div>
          <div>
            <Rate
              defaultValue={commentRate}
              character={<SmileOutline />}
              onChange={setCommentRate}
            />
          </div>
          <div style={{ lineHeight: "27px", height: "27px" }}>
            <Tag
              color="#87d068"
              fill="outline"
              style={{ padding: "5px", marginRight: "10px" }}
              onClick={() => {
                setCommentTxt(commentTxt + "服装整洁，");
              }}
            >
              服装整洁
            </Tag>
            <Tag
              color="#87d068"
              fill="outline"
              style={{ padding: "5px", marginRight: "10px" }}
              onClick={() => {
                setCommentTxt(commentTxt + "非常棒，");
              }}
            >
              非常棒
            </Tag>
            <Tag
              color="#87d068"
              fill="outline"
              style={{ padding: "5px", marginRight: "10px" }}
              onClick={() => {
                setCommentTxt(commentTxt + "相当专业，");
              }}
            >
              相当专业
            </Tag>
          </div>
          <div className={styles.textarea_wrapper}>
            <TextArea
              className={styles.textarea}
              placeholder={
                " 放松身心，尽享宁静时光！\n 畅享专业按摩，重拾生活的美好!"
              }
              showCount
              autoSize={{ minRows: 2, maxRows: 5 }}
              maxLength={200}
              value={commentTxt}
              onChange={(val: any) => {
                setCommentTxt(val);
              }}
            />
          </div>
        </div>
        <Button
          block
          color="primary"
          style={{
            marginTop: "5px",
          }}
          onClick={submitComment}
        >
          提交评论
        </Button>
      </div>
    </Card>
  );
};

export default OrderComment;
