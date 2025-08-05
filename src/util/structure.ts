export const groupOrder = (
  client: any,
  tech: any,
  product: any,
  otherInfo: any
) => {
  return {
    client,
    tech,
    product,
    // serviceAddress: address,
    otherInfo,
  };
};
//   let mockClientuser = {
//     msg: "User already registered",
//     data: {
//       user_pwd: "string",
//       headimgurl:
//         "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKbWwpicJhyAcYbb40Yg1lboeYv9cb2pxcjVxWzECMGyAlUxiaAKgD6iaoMVBuhvdgvZmueabJBl5RuQ/132",
//       user_age: 0,
//       user_photo:
//         "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKbWwpicJhyAcYbb40Yg1lboeYv9cb2pxcjVxWzECMGyAlUxiaAKgD6iaoMVBuhvdgvZmueabJBl5RuQ/132",
//       user_city: "string",
//       user_location: "string",
//       user_be_report: "string",
//       user_phone: "string",
//       user_id: 7,
//       user_nickname: "xyz",
//       user_sex: "string",
//       openid: "oK9p06eiEk0jWNvowVjb5lGlkocM",
//       user_grade: 0,
//       user_be_blacklist: "string",
//     },
//   };
//   let mockClientwxuser = {
//     openid: "oK9p06eiEk0jWNvowVjb5lGlkocM",
//     nickname: "xyz",
//     sex: 0,
//     language: "",
//     city: "",
//     province: "",
//     country: "",
//     headimgurl:
//       "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKbWwpicJhyAcYbb40Yg1lboeYv9cb2pxcjVxWzECMGyAlUxiaAKgD6iaoMVBuhvdgvZmueabJBl5RuQ/132",
//     privilege: [],
//   };
//   let mockTech = {
//     user_nickname: "三井寿",
//     user_pwd: "string",
//     user_age: 0,
//     openid: "mockc",
//     work_phone: "string",
//     bank_card_type: "string",
//     user_desc:
//       "本人从事养生行业多年，首发专业，擅长中式按摩，泰式SPA，疏通经络调节亚健康。",
//     photo_life_1: "http://visualstreet.cn:8000/uploads/techuser1.jpg",
//     photo_life_3: "http://visualstreet.cn:8000/uploads/techuser3.jpg",
//     user_phone: "string",
//     user_sex: "string",
//     user_id: 5,
//     idnetity_card: "string",
//     headimgurl: "string",
//     bank_card_id: "string",
//     photo_work: "http://visualstreet.cn:8000/uploads/techuser2.jpg",
//     photo_life_2: "http://visualstreet.cn:8000/uploads/techuser2.jpg",
//   };
//   let mockProduct = {
//     product_name: "宁静之泉SPA",
//     price_old: 699,
//     introduction:
//       "以中医理论黄帝内经为参考，通过推、拿、揉、拨、点、滚手法方式去缓解肩颈不适、腰部不适以及腿部肌肉不适，具有疏通经络，行气活血，调理气机的好处。",
//     body_parts: "肩颈、手臂、腰部、臀部、腿部",
//     contraindication:
//       "（1）皮肤病，皮肤破损者(如瘟瘆，疤瘆，脓肿蜂窝组织炎，烧伤，烫伤者)禁用。\n（2）骨折复位稳定，开放性的骨折人体，内有金属固定物禁用。\n（3）感染性疾病，如骨结核，骨髓炎禁用。\n（4）内科危重的病人，如严重的心脏病，各种恶性肿瘤，急腹症，急性阑尾炎，宫外孕，胰腺炎等禁用。\n（5）过饱过饥(饭后半小时不宜做按摩)。",
//     photo_intro:
//       "http://visualstreet.cn:8000/uploads/Prod_6_项目-5-宁静之泉SPA-200.jpg",
//     photo_detail2:
//       "http://visualstreet.cn:8000/uploads/Prod_6_项目-5-宁静之泉SPA-200.jpg",
//     product_id: 6,
//     duration: "80分钟",
//     price_current: 298,
//     consumables: "按摩布、一次性口罩、一次性床单、音乐盒、趴趴枕、眼罩",
//     promotion:
//       "足不出户随叫随到\n无论家里、酒店、公司、公园…都可享受星级按摩服务\n众多商户24h在线\n可在线自由选择商户提供按座服务\n正规专业，用心服务\n对每位商户的按摩手法及操作流程进行专业培训、严格考核，为您提供安全、正规、专业、健康的优质按摩服务！",
//     photo_detail1:
//       "http://visualstreet.cn:8000/uploads/Prod_6_项目-5-宁静之泉SPA-200.jpg",
//     photo_detail3:
//       "http://visualstreet.cn:8000/uploads/Prod_6_项目-5-宁静之泉SPA-200.jpg",
//   };

//   return {
//     client: {
//       headimgurl: mockClientuser.headimgurl,
//       user_nickname: mockClientuser.user_nickname,
//       user_phone: mockClientuser.user_phone,
//       openid: mockClientuser.openid,
//       user_city: mockClientuser.user_city,
//     },
//     tech: {
//       user_nickname: "三井寿",
//       user_sex: "string",
//       photo_work: "http://visualstreet.cn:8000/uploads/techuser2.jpg",
//     },
//     product: {
//       product_name: "宁静之泉SPA",
//       product_id: 6,
//       duration: "80分钟",
//       price_current: 298,
//     },
//     clientAddress: {
//       lon: 0,
//       lat: 0,
//       address: "无",
//       distance: 0,
//       cost: 0,
//     },
//   };
// };
