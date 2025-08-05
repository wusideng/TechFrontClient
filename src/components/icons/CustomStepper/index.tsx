import React, { useState, useEffect } from "react";
import "./style.less";

const CustomStepper = ({
  min = 0,
  max = 5,
  step = 1,
  defaultValue = 0,
  value,
  onChange,
  className = "",
}: any) => {
  // 使用受控或非受控模式
  const [innerValue, setInnerValue] = useState(
    value !== undefined ? value : defaultValue
  );

  // 当外部value改变时同步
  useEffect(() => {
    if (value !== undefined) {
      setInnerValue(value);
    }
  }, [value]);

  // 处理值的变化
  const handleChange = (newValue: any) => {
    // 确保值在范围内
    const clampedValue = Math.min(Math.max(newValue, min), max);
    setInnerValue(clampedValue);

    // 如果提供了onChange回调，则调用它
    if (onChange) {
      onChange(clampedValue);
    }
  };

  // 减少值
  const decrease = () => {
    handleChange(innerValue - step);
  };

  // 增加值
  const increase = () => {
    handleChange(innerValue + step);
  };

  // 手动输入值
  const handleInputChange = (e: any) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      handleChange(val);
    }
  };

  return (
    <div className={`custom-stepper ${className}`}>
      <button
        className="stepper-button minus"
        onClick={decrease}
        disabled={innerValue <= min}
      >
        &#8722;
      </button>

      <input
        type="text"
        className="stepper-input"
        value={innerValue}
        disabled={true}
        onChange={handleInputChange}
      />

      <button
        className="stepper-button plus"
        onClick={increase}
        disabled={innerValue >= max}
      >
        +
      </button>
    </div>
  );
};

export default CustomStepper;
