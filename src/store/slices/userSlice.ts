import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ClientUser } from "@/types/ClientUser";
import { deleteCookie } from "@/util/utils";
// import mockUserPhone from "@/lib/mockUserPhonejc.json";
import mockUserPhone from "@/lib/mockUserPhonehd.json";
import {
  fetchUserInfoByOpenId,
  fetchUserInfoByWxCode,
  updateUserPhoneApi,
} from "@/api/userApi";

interface UserState {
  // loading: boolean;
  loadingUser: boolean;
  loadUserInfoFailure: boolean;
  user: ClientUser;
  // code: string;
  // access_token: string;
  invite_code: string;
  error: any;
}

const initialState: UserState = {
  // loading: false,
  loadingUser: false,
  loadUserInfoFailure: false,
  user: {
    openid: "",
    user_phone: "",
  },
  // code: "",
  // access_token: "",
  invite_code: "",
  error: null,
};

export const getUserInfoByWxCode = createAsyncThunk(
  "user/getUserInfoByWxCode",
  async (params: { code: string; invite_code: string }) => {
    const { code, invite_code } = params;
    const user = await fetchUserInfoByWxCode(code, invite_code);
    return user;
  }
);

export const getUserInfoByOpenId = createAsyncThunk(
  "user/getUserInfoByOpenId",
  async () => {
    const user = await fetchUserInfoByOpenId();
    return user;
  }
);

export const updateUserPhone = createAsyncThunk(
  "user/updateUserPhone",
  async (param: any, { rejectWithValue }) => {
    try {
      const user = await updateUserPhoneApi(param);
      return user;
    } catch (error) {
      const message = error.response?.data?.detail;
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setUser: (state, action: PayloadAction<ClientUser>) => {
    //   state.loadingUser = false;
    //   state.user = action.payload;
    // },
    // setAccessToken: (state, action: PayloadAction<string>) => {
    //   state.access_token = action.payload;
    // },
    setInviteCode: (state, action: PayloadAction<string>) => {
      state.invite_code = action.payload;
    },
    setMockUser: (state) => {
      state.user = mockUserPhone as ClientUser;
    },
    // setMockUserDefault: (state, action: PayloadAction<ClientUser>) => {
    //   state.user = {
    //     headimgurl:
    //       "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKbWwpicJhyAcYbb40Yg1lboeYv9cb2pxcjVxWzECMGyAlUxiaAKgD6iaoMVBuhvdgvZmueabJBl5RuQ/132",
    //     user_id: 7,
    //     user_pwd: "string",
    //     user_age: 0,
    //     user_photo:
    //       "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKbWwpicJhyAcYbb40Yg1lboeYv9cb2pxcjVxWzECMGyAlUxiaAKgD6iaoMVBuhvdgvZmueabJBl5RuQ/132",
    //     user_city: "string",
    //     user_grade: 0,
    //     user_be_report: "string",
    //     user_phone: "",
    //     user_nickname: "xyz",
    //     user_sex: "string",
    //     openid: "oK9p06eiEk0jWNvowVjb5lGlkocM",
    //     user_location: "string",
    //     user_be_blacklist: "string",
    //   };
    // },
    setMockUserPhone: (state, action: PayloadAction<ClientUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {
        openid: "",
        user_phone: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserPhone.pending, (state) => {
        state.loadingUser = true;
        state.error = null;
      })
      .addCase(updateUserPhone.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.user = action.payload;
      })
      .addCase(updateUserPhone.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.error.message;
      });
    builder
      .addMatcher(
        isAnyOf(getUserInfoByWxCode.pending, getUserInfoByOpenId.pending),
        (state) => {
          state.loadingUser = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(getUserInfoByWxCode.fulfilled, getUserInfoByOpenId.fulfilled),
        (state, action) => {
          deleteCookie("openid");
          document.cookie = `openid=${action.payload.openid}; path=/; max-age=7200; domain=${window.location.hostname}`;
          state.loadingUser = false;
          state.user = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(getUserInfoByWxCode.rejected, getUserInfoByOpenId.rejected),
        (state, action) => {
          deleteCookie("openid");
          state.loadingUser = false;
          state.error = action.error.message;
          state.loadUserInfoFailure = true;
        }
      );
  },
});

export const {
  // setUser,
  // setAccessToken,
  setInviteCode,
  setMockUser,
  setMockUserPhone,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
