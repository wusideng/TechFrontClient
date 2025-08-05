import { IconProps } from "@/types/Icon";

const FollowIcon: React.FC<IconProps> = ({
  size = 14,
  color = "#4147d5",
  fill = "#d7e0ff",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      id="Heart-Cross--Streamline-Flex"
      height={size}
      width={size}
    >
      <desc>Heart Cross Streamline Icon: https://streamlinehq.com</desc>
      <g id="heart-cross--health-sign-medical-symbol-heart-cross">
        <path
          id="Vector"
          fill={fill}
          d="M7 3.183C3.98 -0.522 0.792 2.111 0.75 4.95c0 4.224 5.055 7.69 6.25 7.69 1.195 0 6.25 -3.467 6.25 -7.692C13.208 2.11 10.02 -0.522 7 3.183Z"
          strokeWidth="1"
        ></path>
        <path
          id="Vector_2"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 3.183C3.98 -0.522 0.792 2.111 0.75 4.95c0 4.224 5.055 7.69 6.25 7.69 1.195 0 6.25 -3.467 6.25 -7.692C13.208 2.11 10.02 -0.522 7 3.183Z"
          strokeWidth="1"
        ></path>
        <path
          id="Vector_3"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.213 7.41h3.573"
          strokeWidth="1"
        ></path>
        <path
          id="Vector_4"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 5.623v3.573"
          strokeWidth="1"
        ></path>
      </g>
    </svg>
  );
};

export default FollowIcon;
