import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { TechListParams, TechUser } from "@/types/Tech";
import {
  getTechListApi,
  getTechUserDetailApi,
  // getTechUsersByDiscApi,
  // getTechUsersByNameApi,
  // getTechUsersByRateApi,
} from "@/api/techuserApi";

interface TechUserState {
  loading: boolean;
  techusers: TechUser[];
  techuser: TechUser | null;
  error: string | null;
}

const initialState: TechUserState = {
  loading: false,
  techusers: [],
  techuser: null,
  error: null,
};

export const getTechUserDetail = createAsyncThunk(
  "techuser/getTechUserDetail",
  async (params: { user_id: any; lon: any; lat: any }) => {
    const { user_id, lon, lat } = params;
    const techuser = await getTechUserDetailApi(user_id, lon, lat);
    return techuser;
  }
);

const techUserSlice = createSlice({
  name: "techUser",
  initialState,
  reducers: {
    selectTechUser: (state, action: PayloadAction<TechUser>) => {
      state.techuser = action.payload;
    },
    clearTechDetail: (state) => {
      state.techuser = null;
    },
    setTechUsers: (state, action: PayloadAction<TechUser[]>) => {
      state.techusers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getTechUserDetail.fulfilled,
      (state, action: PayloadAction<TechUser>) => {
        // 处理成功状态和数据
        state.loading = false;
        state.techuser = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(getTechUserDetail.pending), (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addMatcher(
      isAnyOf(getTechUserDetail.rejected),
      (state, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      }
    );
  },
});

export const { selectTechUser, clearTechDetail, setTechUsers } =
  techUserSlice.actions;

export default techUserSlice.reducer;
