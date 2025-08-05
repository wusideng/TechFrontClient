// 在src目录下创建types/modules.d.ts文件
declare module "*.less" {
  const styles: { [className: string]: string };
  export default styles;
}
