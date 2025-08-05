import React, { useState, useCallback } from "react";
import { SearchBar } from "antd-mobile";
import debounce from "lodash/debounce";
import "./style.less";

const CustomSearchBar = ({
  placeholder = "请输入搜索内容",
  onSearch,
  defaultValue,
  className,
  debounceTime = 500,
  ...props
}: any) => {
  const [isComposing, setIsComposing] = useState(false);

  // 使用useCallback包装debounce，避免重复创建
  const debouncedSearch = useCallback(
    debounce((value: any) => {
      if (onSearch) {
        onSearch(value);
      }
    }, debounceTime),
    [onSearch, debounceTime]
  );

  // 处理输入变化
  const handleChange = (value: any) => {
    // 如果不是在输入拼音状态，则触发搜索
    if (!isComposing) {
      debouncedSearch(value);
    }
  };

  // 开始输入拼音
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  // 输入拼音结束，选择汉字
  const handleCompositionEnd = (e: any) => {
    setIsComposing(false);
    // 拼音输入完成后，使用当前输入框的值触发搜索
    debouncedSearch(e.target.value);
  };

  return (
    <SearchBar
      className={"custom-search-bar" + (className ? ` ${className}` : "")}
      placeholder={placeholder}
      onChange={handleChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      defaultValue={defaultValue}
      {...props}
    />
  );
};

export default CustomSearchBar;
