import React from "react";

const BlockA = ({ title, children, control, style }: any) => {
  return (
    <div className="block1" style={style}>
      {control}
      <h3 className="title">{title}</h3>
      {children}
    </div>
  );
};

export default BlockA;
