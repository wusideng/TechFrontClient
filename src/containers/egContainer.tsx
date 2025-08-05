import { useAppDispatch, useAppSelector } from "@/store";
import React, { useEffect, useState } from "react";

const DemoContainer = () => {
  const dispatch = useAppDispatch();
  const {} = useAppSelector((state) => state.user);
  useEffect(() => {}, [dispatch]);

  return <div>DemoContainer</div>;
};

export default DemoContainer;
