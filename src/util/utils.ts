import { POIformatted } from "@/types/AddressManagement";
import { isDev } from "./config";

// 用于时间转换为语音播报
export const formatDateToVoice = (input: any) => {
  // 创建一个日期对象
  const date = new Date(input);

  // 提取年份、月份和日期
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月份从0开始，所以要加1
  const day = date.getDate();

  // 提取小时和分钟
  const hour = date.getHours();
  const minute = date.getMinutes();

  // 格式化为中文日期时间
  return `${year}年${month}月${day}日${hour}点${
    minute < 10 ? "0" + minute : minute
  }分`;
};

// 获取指定名称的 Cookie 值
export const getCookie = (name: any) => {
  const cookieArr = document.cookie.split(";");
  for (let cookie of cookieArr) {
    cookie = cookie.trim(); // 去掉空格
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null; // 如果没有找到，返回 null
};
export const deleteCookie = (
  name: any,
  path: any = "/",
  domain: any = window.location.hostname
) => {
  // 设置 cookie 过期时间为过去的时间点，浏览器会自动删除
  document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${domain}`;
};

// export const getCityFromAddress = (address: any, mockcity: any = null) => {
//   if (mockcity) return mockcity;
//   const addressComponent = address?.addressComponent;
//   if (addressComponent) {
//     if (typeof addressComponent.city == "string") {
//       if (addressComponent.city.includes("市")) {
//         return addressComponent.city;
//       }
//       return `${addressComponent.province} ${addressComponent.city} ${addressComponent.district}`;
//     } else if (typeof addressComponent.city == "object") {
//       if (addressComponent.province.includes("市")) {
//         return addressComponent.province;
//       }
//       // 首都，直辖市
//       return `${addressComponent.province} ${addressComponent.district}`;
//     }
//   }
//   return "";
// };
export const getFormattedAddress = (address: POIformatted) => {
  return `${address.province || ""}${address.city || ""}${
    address.district || ""
  }${address.street || ""}${address.region || ""}`;
};
/**
 * 以名字为种子生成一个 4.1 到 4.9 之间的随机数
 * @param name 英文或汉字名称，用作随机数生成的种子
 * @returns 介于4.1到4.9之间的随机数（总是保留一位小数）
 */
export const generateRandomScoreFromName = (name: string): number => {
  // 创建一个更复杂的哈希值
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 转换为32位整数
  }

  // 获取一个0到8的整数
  const randomInteger = Math.abs(hash % 9);

  // 将整数转换为0.1到0.9
  const decimal = (randomInteger + 1) / 10;

  // 构建最终分数
  return 4 + decimal;
};

/**
 * 以名字为种子生成一个 20 到 50 之间的随机整数
 * @param name 英文或汉字名称，用作随机数生成的种子
 * @returns 20到50之间的整数
 */
export const generateRandomNumberFromName = (name: string): number => {
  // 计算名字的哈希值作为种子
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    // 这是一个简单的哈希函数，能够生成更分散的值
    const char = name.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 转换为32位整数
  }

  // 确保hash是正数
  hash = Math.abs(hash);

  // 映射到20-50之间的整数范围
  const min = 20;
  const max = 50;
  const randomNumber = min + (hash % (max - min + 1));

  return randomNumber;
};

export const productBaseSales = {
  胸肺调理: 50 * 127,
  古法推拿: 20 * 127,
  调理之源: 23 * 127,
  全身推拿: 19 * 127,
  全身推拿SPA: 24 * 127,
  头疗精油推背SPA: 21 * 129,
  头疗肩颈: 18 * 127,
  全身推拿泰式SPA: 27 * 117,
  芳香淑女: 12 * 127,
};

export function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}
export const isLogin = (user) => {
  if (process.env.auto_login_id && isDev) {
    document.cookie = `openid=${process.env.auto_login_id}; path=/; max-age=7200; domain=${window.location.hostname}`;
    return true;
  }
  return user.openid != "" && user.openid != undefined;
};
