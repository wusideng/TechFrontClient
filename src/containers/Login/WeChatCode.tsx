import React, { useEffect } from "react";
import BlockA from "@/components/common/BlockA";
import { useAppDispatch } from "@/store";

const WeChatCode = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
  }, [dispatch]);

  return <BlockA>[code]</BlockA>;
};

export default WeChatCode;
