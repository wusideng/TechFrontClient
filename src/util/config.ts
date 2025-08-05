// 用于开发模式调试使用
// export const isDev = true
export const isDev = process.env.isDev === "true" ? true : false;

// 用于上线测试版本，生成版本
export const baseUrl = process.env.baseUrl;
// export const baseUrl = `devclient`
export const staticUrl = process.env.staticUrl;

// 用于下单后配置发送通知短信
export const notificationPhone = [18010260892, 13683575261, 18996531158];
// 用于下单后配置发送语音通知
export const notificationVoicePhone = [18010260892, 13683575261, 18996531158];

export const testOrderOpenIds = [
  "oK9p06eiEk0jWNvowVjb5lGlkocM",
  "oK9p06S43s67ui0VxR3-h3REu0VY",
  "oK9p06UX2a02_b9Cn4W7cfoWjE3c",
];

// 海东
// oK9p06eiEk0jWNvowVjb5lGlkocM （186）
// oK9p06UX2a02_b9Cn4W7cfoWjE3c （180）
// 姜成
// oK9p06S43s67ui0VxR3-h3REu0VY
// 蒋娜（姚静，星闻大海）
// oK9p06VSWWzEnSwNNLwnv_3oP-oE

export const cityOption = [
  "杭州市",
  "重庆市",
  "石家庄市",
  "安康市",
  "北京市",
  "青岛市",
];
export const cityAdmin = {
  oK9p06eiEk0jWNvowVjb5lGlkocM: cityOption,
  oK9p06UX2a02_b9Cn4W7cfoWjE3c: cityOption,
  "oK9p06S43s67ui0VxR3-h3REu0VY": cityOption,
  "oK9p06VSWWzEnSwNNLwnv_3oP-oE": ["杭州", "巫山"],
};
export const cityAdminPhone = {
  杭州市: [18010260892, 13683575261, 18996531158],
  重庆市: [18010260892, 13683575261, 18996531158],
  北京市: [18614032685],
  青岛市: [13683575261],
};
export const gaode_api_key = process.env.gaode_api_key;
export const gaode_api_secure_key = process.env.gaode_api_secure_key;
export const default_travel_time_seconds = 15 * 60;
export const enable_phone_validation_code = false;
