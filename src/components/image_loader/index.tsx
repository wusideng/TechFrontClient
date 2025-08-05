import { useEffect, useState } from "react";

const useImageLoading = (imgPaths) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let loadedCount = 0;
    // 设置超时保护
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // 预加载所有图片
    imgPaths.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imgPaths.length) {
          clearTimeout(timeout);
          setLoading(false);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imgPaths.length) {
          clearTimeout(timeout);
          setLoading(false);
        }
      };
    });
  }, []);
  return loading;
};
export default useImageLoading;
