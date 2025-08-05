import { IconProps } from "@/types/Icon";

const AboutUsIcon: React.FC<IconProps> = ({
  size = 14,
  color = "#4147d5",
  fill = "#d7e0ff",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      id="Information-Circle--Streamline-Flex"
      height={size}
      width={size}
    >
      <desc>Information Circle Streamline Icon: https://streamlinehq.com</desc>
      <g id="information-circle--information-frame-info-more-help-point-circle">
        <path
          id="Vector"
          fill={fill}
          d="M2.11452 11.3428c2.2445 2.6357 7.52645 2.6357 9.77098 0 2.0673 -2.4277 1.9104 -7.17948 -0.5779 -9.2579 -2.22871 -1.861655 -6.3865 -1.861655 -8.61525 0C0.204096 4.16332 0.0471919 8.9151 2.11452 11.3428Z"
          strokeWidth="1"
        ></path>
        <path
          id="Vector_2"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.11452 11.3428c2.2445 2.6357 7.52645 2.6357 9.77098 0 2.0673 -2.4277 1.9104 -7.17948 -0.5779 -9.2579 -2.22871 -1.861655 -6.3865 -1.861655 -8.61525 0C0.204096 4.16332 0.0471919 8.9151 2.11452 11.3428Z"
          strokeWidth="1"
        ></path>
        <path
          id="Vector 1187"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.74599 6h0.49646c0.55229 0 1 0.44772 1 1v2.73504"
          strokeWidth="1"
        ></path>
        <path
          id="Vector 1188"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.76066 9.73505h2.97826"
          strokeWidth="1"
        ></path>
        <path
          id="Vector 1189"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.25713 3.71982v0.32278"
          strokeWidth="1"
        ></path>
      </g>
    </svg>
  );
};

export default AboutUsIcon;
