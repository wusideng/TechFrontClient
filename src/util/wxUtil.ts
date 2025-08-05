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

// 示例用法
// const distance = haversine(39.9042, 116.4074, 34.0522, -118.2437);
// console.log(`距离: ${distance.toFixed(2)} 公里`);
export const haversine = (
  lat1: any,
  lon1: any,
  lat2: any,
  lon2: any
): number => {
  const R = 6371; // 地球半径，单位为公里
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // 返回距离，单位为公里
  return parseFloat(d.toFixed(2)); // 返回距离，单位为公里
};

// // 示例用法
// if (isDaytime()) {
//     console.log("现在是白天。");
// } else {
//     console.log("现在是晚上。");
// }
export const isDaytime = () => {
  const now = new Date();
  const hours = now.getHours();
  // 假设日出时间为 6:00，日落时间为 18:00
  const sunrise = 8;
  const sunset = 18;
  return hours >= sunrise && hours < sunset;
};

// 返回年月日
export const getFormattedDate = (date: any) => {
  const year = date.getFullYear(); // 获取年份
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 获取月份 (注意月份从0开始)
  const day = String(date.getDate()).padStart(2, "0"); // 获取日期

  return `${year}-${month}-${day}`; // 格式化为 YYYY-MM-DD
};

// 返回年月日
export const getFormattedDateMin = (now: any) => {
  // const year = date.getFullYear(); // 获取年份
  // const month = String(date.getMonth() + 1).padStart(2, '0'); // 获取月份 (注意月份从0开始)
  // const day = String(date.getDate()).padStart(2, '0'); // 获取日期
  // return `${year}-${month}-${day}`; // 格式化为 YYYY-MM-DD

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需加1
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  // const seconds = String(now.getSeconds()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDateTime;
};

// 统一地址管理；微信城市获取格式化
// export const getCityByWxAddress = (addressComponent: any) => {
//   if (typeof addressComponent.city == "string") {
//     return `${addressComponent.province} ${addressComponent.city} ${addressComponent.district}`;
//   } else if (typeof addressComponent.city == "object") {
//     // 首都，直辖市
//     return `${addressComponent.province} ${addressComponent.district}`;
//   }
//   return `默认地址`;
// };
// 统一地址管理：已经赋值信息提取城市
export const getCityByStr = (city: any) => {
  if (!city) return null;
  if (typeof city == "object") return null;
  if (city.split(" ").length == 2) {
    return city.split(" ")[0];
  }
  if (city.split(" ").length == 3) {
    return city.split(" ")[1];
  }
  return city;
};
