import { Image, Modal } from "antd-mobile";

//注：image大小必须满足750x950的尺寸，不然显示会出问题。这是因为苹果手机的modal有自己的长宽比，跟图片长宽比
//不一样，尝试过很多方法都不行，最后只能限制图片比例了。

const CouponImageContent = ({ image_url }: { image_url: string }) => {
  return (
    <div style={{ position: "relative" }}>
      <Image
        src={image_url}
        fit="cover"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      {/* 关闭按钮 */}
      <div
        style={{
          position: "absolute",
          bottom: "-45px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "40px",
          height: "40px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1000,
        }}
        onClick={() => {
          // 关闭Modal的逻辑
          Modal.clear(); // 或者其他关闭方法
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            lineHeight: 1,
          }}
        >
          ×
        </span>
      </div>
    </div>
  );
};
export default CouponImageContent;
