export type ClientUser = {
  openid?: string;
  user_phone?: string;
  headimgurl?: string | null;
  user_nickname?: string | null;
  invite_code?: string | null;
  following_techs?: string[] | null;
  is_new_user?: boolean;
  // user_id?: number;
  // user_pwd?: string;
  // user_age?: number;
  // user_photo?: string;
  // user_city?: string;
  // user_grade?: number;
  // user_be_report?: string;
  // user_sex?: string;
  // user_location?: string;
  // user_be_blacklist?: string;
};
