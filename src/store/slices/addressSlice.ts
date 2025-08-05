import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { POIformatted } from "@/types/AddressManagement";
import { addClientUserPositionApi } from "@/api/addressApi";

interface AddressState {
  // load_gaode_address_failed: boolean;
  locationPermissionOn: null | boolean;
  // is_address_saved: boolean;
  is_address_saved_before_login: boolean;
  is_address_saved_after_login: boolean;
  address: POIformatted | null;
  mockcity: string | null;
  error: any;
}

const initialState: AddressState = {
  // load_gaode_address_failed: false,
  is_address_saved_before_login: false,
  is_address_saved_after_login: false,
  address: null,
  locationPermissionOn: null,
  mockcity: null,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setGaodeAddress: (state, action: PayloadAction<POIformatted>) => {
      state.address = action.payload;
    },
    setMockAddress: (state, action: PayloadAction<POIformatted>) => {
      state.address = action.payload;
    },
    setMockCity: (state, action: PayloadAction<string>) => {
      state.mockcity = action.payload;
    },
    setLocationPermissionOn: (state, action: PayloadAction<boolean>) => {
      state.locationPermissionOn = action.payload;
    },

    // loadGaodeAddressFailure: (state) => {
    //   state.load_gaode_address_failed = true;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(saveUserAddress.fulfilled, (state, action) => {
      const userOpenid = action.payload;
      if (userOpenid) {
        state.is_address_saved_after_login = true;
      } else {
        state.is_address_saved_before_login = true;
      }
    });
  },
});

export const {
  setGaodeAddress,
  setMockAddress,
  setMockCity,
  setLocationPermissionOn,
  // saveUserAddressRequest,
  // saveUserAddressSuccess,
  // saveUserAddressFailure,
} = addressSlice.actions;

// Async Thunk
export const saveUserAddress = createAsyncThunk(
  "address/saveUserAddress",
  async ({
    lon,
    lat,
    userOpenid,
    address,
  }: {
    lon: number;
    lat: number;
    userOpenid: string;
    address: POIformatted;
  }) => {
    let clientUserPosition: any = {
      // client_openid: userOpenid,
      lon: lon,
      lat: lat,
      address:
        address.province +
          address.city +
          address.district +
          address.street +
          address.region || "默认地址",
      city: address.city || "默认城市",
      detail_address: "",
    };
    if (userOpenid) {
      clientUserPosition.client_openid = userOpenid;
    }
    // 增加客户位置信息
    await addClientUserPositionApi(clientUserPosition);
    return userOpenid;
  }
);

export default addressSlice.reducer;

// 注解：
// 1. createSlice：Redux Toolkit的核心函数，用于创建reducer和actions。
// 2. PayloadAction：用于类型化action的payload。
// 3. 状态更新：在reducers中，我们可以直接修改state，Redux Toolkit使用Immer库来确保不可变更新。
// 4. Thunk：异步action创建器，使用Redux Toolkit的方式进行类型推断。
