import { IconProps } from "@/types/Icon";

const ShieldIcon: React.FC<IconProps> = ({
  size = 14,
  color = "#4147d5",
  fill = "#d7e0ff",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      id="Shield-2--Streamline-Flex"
      height={size}
      width={size}
    >
      <desc>Shield 2 Streamline Icon: https://streamlinehq.com</desc>
      <g id="shield-2--shield-protection-security-defend-crime-war-cover">
        <path
          id="Vector 105"
          fill={fill}
          d="M1 7c0 -3.5 1.5 -5 2 -5.5C3.5 2 5.4 3 7 1c1.6 2 3.5 1 4 0.5 0.5 0.5 2 2 2 5.5 0 4 -4 5.5 -6 6 -2 -0.5 -6 -2 -6 -6Z"
          strokeWidth="1"
        ></path>
        <path
          id="Vector 106"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M1 7c0 -3.5 1.5 -5 2 -5.5C3.5 2 5.4 3 7 1c1.6 2 3.5 1 4 0.5 0.5 0.5 2 2 2 5.5 0 4 -4 5.5 -6 6 -2 -0.5 -6 -2 -6 -6Z"
          strokeWidth="1"
        ></path>
      </g>
    </svg>
  );
};

export default ShieldIcon;
