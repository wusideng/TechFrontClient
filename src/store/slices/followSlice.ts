import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TechUser } from "@/types/Tech";
import { followTech, getFollowingTechs, unfollowTech } from "@/api/followApi";
import { setTechUsers } from "./techUserSlice";

interface FollowState {
  loadingFollowingTechs: boolean;
  followingTechOpenids: string[];
  error: string | null;
  followingTechs: TechUser[];
  followsMap: { [key: string]: number };
}

const initialState: FollowState = {
  loadingFollowingTechs: false,
  followingTechOpenids: [],
  error: null,
  followingTechs: [],
  followsMap: {},
};

export const followTechAction = createAsyncThunk(
  "follow/followTech",
  async ({
    userOpenid,
    techOpenid,
  }: {
    userOpenid: string;
    techOpenid: string;
  }) => {
    await followTech(userOpenid, techOpenid);
    return null;
  }
);

export const unfollowTechAction = createAsyncThunk(
  "follow/unfollowTech",
  async ({
    userOpenid,
    techOpenid,
  }: {
    userOpenid: string;
    techOpenid: string;
  }) => {
    await unfollowTech(userOpenid, techOpenid);
    return null;
  }
);

export const getFollowingTechsAction = createAsyncThunk(
  "follow/getFollowingTechs",
  async ({
    user_openid,
    lon,
    lat,
  }: {
    user_openid: string;
    lon: number;
    lat: number;
  }) => {
    const result = await getFollowingTechs(user_openid, lon, lat);
    return result;
  }
);

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 处理 followTechAction
    builder
      .addCase(followTechAction.pending, (state, action) => {
        const { techOpenid } = action.meta.arg;
        state.followsMap[techOpenid] = (state.followsMap[techOpenid] || 0) + 1;
        if (!state.followingTechOpenids.includes(techOpenid)) {
          state.followingTechOpenids.push(techOpenid);
        }
      })
      .addCase(unfollowTechAction.pending, (state, action) => {
        const { techOpenid } = action.meta.arg;
        state.followsMap[techOpenid] = Math.max(
          (state.followsMap[techOpenid] || 0) - 1,
          0
        );
        state.followingTechOpenids = state.followingTechOpenids.filter(
          (openid) => openid !== techOpenid
        );
      });
    builder
      .addCase(getFollowingTechsAction.pending, (state) => {
        state.loadingFollowingTechs = true;
        state.error = null;
      })
      .addCase(getFollowingTechsAction.fulfilled, (state, action) => {
        state.loadingFollowingTechs = false;
        state.followingTechs = action.payload;
        const followsMap = { ...state.followsMap };
        for (const techuser of action.payload) {
          if (!state.followingTechOpenids.includes(techuser.openid)) {
            state.followingTechOpenids.push(techuser.openid);
            followsMap[techuser.openid] = techuser.follow_count;
          }
        }
        state.followsMap = followsMap;
      })
      .addCase(getFollowingTechsAction.rejected, (state, action) => {
        state.loadingFollowingTechs = false;
        state.error = action.error.message || "Failed to get following techs";
      })
      .addCase(setTechUsers, (state, action: PayloadAction<TechUser[]>) => {
        const followsMap: { [key: string]: number } = { ...state.followsMap };
        action.payload.forEach((techuser) => {
          followsMap[techuser.openid] = techuser.follow_count;
          if (
            techuser.is_followed &&
            !state.followingTechOpenids.includes(techuser.openid)
          ) {
            state.followingTechOpenids.push(techuser.openid);
          }
        });
        state.followsMap = followsMap;
      });
    //to do tech 列表附加是否被用户关注信息
    // 响应来自 userSlice 的 loadUserInfoSuccess action
    // builder.addCase(
    //   loadUserInfoSuccess,
    //   (state, action: PayloadAction<ClientUser>) => {
    //     // 更新关注的技师列表
    //     state.followingTechOpenids = action.payload?.following_techs || [];
    //   }
    // );
    // 响应来自 techSlice 的 loadTechUsersSuccess action
    // builder.addMatcher(
    //   isAnyOf(getTechUsersByRate.fulfilled, getTechUsersByDisc.fulfilled),
    //   (state, action: PayloadAction<TechUser[]>) => {
    //     const followingTechOpenids = [...state.followingTechOpenids];
    //     action.payload.forEach((techUser) => {
    //       if (techUser.is_followed) {
    //         if (!followingTechOpenids.includes(techUser.openid)) {
    //           followingTechOpenids.push(techUser.openid);
    //         }
    //       }
    //     });
    //     state.followingTechOpenids = followingTechOpenids;
    //   }
    // );
  },
});

export const {} = followSlice.actions;

export default followSlice.reducer;
