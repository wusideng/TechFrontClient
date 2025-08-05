import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RouterLocation } from "@/types/Router";

interface State {
  routerLocation: RouterLocation;
}

const initialState: State = {
  routerLocation: {
    current: window.location.pathname,
    previous: window.location.pathname,
  },
};

const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    setRouterLocation: (state, action: PayloadAction<RouterLocation>) => {
      state.routerLocation = action.payload;
    },
  },
});

export const { setRouterLocation } = routerSlice.actions;

export default routerSlice.reducer;
