import React, { useState, useEffect } from "react";
import styles from "./style.module.less";

interface VerificationCodeButtonProps {
  onClick: () => Promise<boolean>;
}

const COUNT_DOWN_SECONDS = 60;

export const VerificationCodeButton: React.FC<VerificationCodeButtonProps> = ({
  onClick,
}) => {
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleClick = async () => {
    if (isLoading || countdown > 0) return;

    setIsLoading(true);
    try {
      const success = await onClick();
      if (success) {
        setCountdown(COUNT_DOWN_SECONDS);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.button} ${
        isLoading || countdown > 0 ? styles.disabled : ""
      }`}
    >
      {isLoading
        ? "发送中..."
        : countdown > 0
        ? `${countdown}s后重新获取`
        : "获取验证码"}
    </div>
  );
};
