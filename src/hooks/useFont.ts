import { useEffect, useLayoutEffect } from "react";

export const getDeviceType = () => {
  var userAgent = navigator.userAgent || navigator.vendor || window.opener;
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "IOS";
  }
  if (/android/i.test(userAgent)) {
    return "Android";
  }
  return "Other";
};

const useFont = () => {
  useLayoutEffect(() => {
    const deviceType = getDeviceType();
    const screenActualWidth = 400;
    const testElement = document.createElement("div");
    testElement.style.cssText =
      "position:absolute; left:-9999px; font-size:100px; font-family:Arial; line-height:normal; visibility:hidden;";
    testElement.innerText = "天"; // 使用中文字符可能更敏感于字体缩放

    document.body.appendChild(testElement);
    const width = testElement.offsetWidth;
    const scale = width / 100;
    const clientWidth = document.documentElement.clientWidth;
    // document.documentElement.style.fontSize =
    // ((16 / scale) * clientWidth) / screenActualWidth + "px";
    // const finalScale = (1 / scale) * (clientWidth / screenActualWidth);
    // document.body.removeChild(testElement);
    if (true || (scale > 1 && deviceType !== "IOS")) {
      document.documentElement.style.fontSize =
        ((16 / scale) * clientWidth) / screenActualWidth + "px";
      alert(((16 / scale) * clientWidth) / screenActualWidth);
      // IOS可以通过css完美处理

      //放大字体的情况，让字体缩放到400px屏幕宽度适配， 因为具体screenActualWidth我们无法获取，无法计算
      //只能通过不同大小的手机统计的方式来推测规则，这点就不做了，如果有字体放大的人，就让他适配400宽度的字体
      // document.documentElement.style.fontSize =
      //   ((16 / scale) * clientWidth) / screenActualWidth + "px";
      // // 添加到现有代码中

      const styleEl = document.createElement("style");
      document.head.appendChild(styleEl);

      // 使用缩放反比创建强制覆盖规则
      const fontScaleFactor = 1;
      // alert(fontScaleFactor);
      // 添加通用样式规则 - 覆盖所有可能的文本元素
      styleEl.textContent = `
        /* 基础文本元素 */
        body, p, span, h1, h2, h3, h4, h5, h6, 
        div, a, button, input, textarea, label, li {
          font-size: ${fontScaleFactor}em !important;
        }
        
        /* 覆盖常见的大小类 */
        .text-sm, .text-md, .text-lg, .text-xl { 
          font-size: ${fontScaleFactor}em !important; 
        }
        
        /* 覆盖内联样式 - 使用属性选择器 */
        [style*="font-size"] {
          font-size: ${fontScaleFactor}em !important;
        }
      `;
    }
  }, []);
};

export default useFont;
