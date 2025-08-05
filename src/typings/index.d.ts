declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.json" {
  const value: any;
  export default value;
}

// 添加全局类型定义
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
    wx: any;
    MSStream?: any;
  }
}

export {};
