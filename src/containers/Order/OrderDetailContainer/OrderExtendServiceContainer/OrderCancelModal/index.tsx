import React, { useState } from "react";
import { Mask, Modal, Radio, Space, TextArea } from "antd-mobile";
import Loading from "@/components/common/Loading";
import { cancelOrderApi } from "@/api/orderApi";
import styles from "./style.module.less";
const cancelReasons = ["临时有事，无法接受服务", "价格过高", "其他原因"];

function CancelOrderModal({ showModal, onSuccess, closeModal, orderId }: any) {
  const [cancelReason, setCancelReason]: [string, any] = useState(
    cancelReasons[0]
  );
  const [otherReason, setOtherReason] = useState("");
  const [loading, setLoading] = useState(false);
  const handleConfirm = async () => {
    const finalReason =
      cancelReason === "其他原因" ? `其他原因：${otherReason}` : cancelReason;

    try {
      setLoading(true);
      const res = await cancelOrderApi({ orderId, reason: finalReason });
      setLoading(false);
      onSuccess(res);
    } catch (error) {
      // onFail(res);
      console.error(error);
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div>
      <Mask visible={loading} className="custom-mask">
        <div>
          <Loading />
          <div>退款中...</div>
        </div>
      </Mask>
      <Modal
        className={styles.order_cancel_modal}
        visible={showModal}
        content={
          <div>
            <div style={{ fontSize: 18, marginBottom: 15 }}>
              请选择取消原因：
            </div>
            <Radio.Group
              value={cancelReason}
              onChange={(val) => {
                setCancelReason(val);
              }}
            >
              <Space direction="vertical">
                {cancelReasons.map((item: any) => (
                  <Radio key={item} value={item}>
                    {item}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>

            {cancelReason === "其他原因" && (
              <TextArea
                placeholder="请输入取消原因"
                value={otherReason}
                onChange={(val: any) => setOtherReason(val)}
                maxLength={100}
                style={{ border: "1px gray solid", marginTop: 15 }}
                rows={3}
              />
            )}
          </div>
        }
        closeOnMaskClick={false}
        actions={[
          {
            key: "confirm",
            text: "确认",
            primary: true,
            onClick: handleConfirm,
          },
          {
            key: "cancel",
            text: "取消",
            onClick: handleCancel,
          },
        ]}
      />
    </div>
  );
}

export default CancelOrderModal;
