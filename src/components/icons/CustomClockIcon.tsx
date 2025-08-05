import { ClockCircleFill } from "antd-mobile-icons";

const CustomClockIcon = ({
  size = "1em",
  color = "var(--adm-color-primary)",
}) => {
  return <ClockCircleFill fontSize={size} color={color} />;
  // return (
  //   <span
  //     style={{
  //       fontSize: size,
  //       color: color,
  //       display: "flex",
  //       alignItems: "center",
  //       verticalAlign: "middle", // 确保与文本对齐
  //     }}
  //   >
  //     🕓
  //   </span>
  // );
};
export default CustomClockIcon;
