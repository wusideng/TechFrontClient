import React from "react";
import { useNavigate } from "react-router-dom";

import { NavBar } from "antd-mobile";
import MiddleContentTab from "./MiddleContentTab";

const MiddleContentHeader = ({
  title,
  children,
  withFooter = true,
  className,
  CustomFooter,
  loading = false,
}: // beforeGoBack,
{
  title?: string;
  children: React.ReactNode;
  withFooter?: boolean;
  className?: string;
  CustomFooter?: React.ReactNode;
  loading?: boolean;
  // beforeGoBack?: () => void;
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // if (beforeGoBack) {
    //   beforeGoBack();
    // }
    navigate(-1);
  };

  return (
    <div className="flex-col">
      <NavBar
        onBack={handleGoBack}
        backIcon={
          <div style={{ padding: "4px" }}>
            <div>
              {/* 这是一个经过修改的更粗的箭头 SVG */}
              <svg
                width="0.8em"
                height="0.8em"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                style={{ verticalAlign: "-0.125em" }}
              >
                <path
                  d="M33.5,2 L12,22.66 C10.8,23.85 10.8,25.15 12,26.34 L33.5,47 L38.5,47 C39.2,47 39.7,46.5 39.7,45.8 C39.7,45.55 39.6,45.3 39.45,45.1 L18,24 L39.45,2.9 C39.85,2.5 39.85,1.8 39.45,1.4 C39.25,1.2 39,1 38.75,1 L33.5,2 Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        }
      >
        {title}
      </NavBar>
      <MiddleContentTab
        CustomFooter={CustomFooter}
        withFooter={withFooter}
        loading={loading}
        className={className}
      >
        {children}
      </MiddleContentTab>
    </div>
  );
};

export default MiddleContentHeader;
