import React from "react";
import { Space, SpinLoading } from "antd-mobile";

const Loading = () => {
  return (
    <div className="loading">
      <SpinLoading color="primary" style={{ "--size": "48px" }} />
    </div>
  );
};

export default Loading;
