import React from "react";

const BlockD = ({ title, children, control, classname }: any) => {
  return (
    <div className={"block-d " + classname}>
      {control}
      <h3 className="title">{title}</h3>
      {children}
    </div>
  );
};

export default BlockD;
