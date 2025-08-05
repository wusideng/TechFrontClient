import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  EmptyUserAddress,
  POIformatted,
  UserAddress,
} from "@/types/AddressManagement";
import {
  addUserAddressApi,
  deleteUserAddressApi,
  getUserAddressesApi,
  getUserDefaultAddressApi,
  updateUserAddressApi,
} from "@/api/addressManagementApi";

interface AddressManagementState {
  loading: boolean;
  addresses: UserAddress[];
  error: null | string;
  UserAddressFormData: UserAddress | null;
  selectedPoi: POIformatted | null; // 用户选择的POI
}

const initialState: AddressManagementState = {
  loading: false,
  addresses: [], // 用户保存的地址列表
  error: null,
  UserAddressFormData: EmptyUserAddress,
  selectedPoi: null,
};

const addressManagementSlice = createSlice({
  name: "addressManagement",
  initialState,
  reducers: {
    setUserAddressFormData: (state, action: PayloadAction<UserAddress>) => {
      state.UserAddressFormData = action.payload;
    },
    clearUserAddressFormData: (state) => {
      state.UserAddressFormData = EmptyUserAddress;
      state.selectedPoi = null;
    },
    selectPoi: (state, action: PayloadAction<POIformatted>) => {
      state.selectedPoi = action.payload;
    },
  },
  extraReducers: (builder) => {
    // getUserAddresses
    builder
      .addCase(getUserAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getUserAddresses.fulfilled,
        (state, action: PayloadAction<UserAddress[]>) => {
          state.loading = false;
          state.addresses = action.payload;
          state.error = null;
        }
      )
      .addCase(getUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch addresses";
      });

    // getUserDefaultAddress
    builder
      .addCase(getUserDefaultAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;
        // Handle default address logic here
        state.error = null;
      })
      .addCase(getUserDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch default address";
      });

    // addUserAddress
    builder
      // .addCase(addUserAddress.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(
        addUserAddress.fulfilled,
        (state, action: PayloadAction<UserAddress>) => {
          state.loading = false;
          state.addresses.push(action.payload);
          state.error = null;
        }
      );
    // .addCase(addUserAddress.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message || "Failed to add address";
    // });

    // updateUserAddress
    builder
      // .addCase(updateUserAddress.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.addresses.findIndex(
          (addr) => addr.id === action.payload.id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
        state.error = null;
      });
    // .addCase(updateUserAddress.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message || "Failed to update address";
    // });

    // deleteUserAddress
    builder
      // .addCase(deleteUserAddress.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.filter(
          (addr) => addr.id !== action.payload
        );
        state.error = null;
      });
    // .addCase(deleteUserAddress.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message || "Failed to delete address";
    // });
  },
});

export const { setUserAddressFormData, clearUserAddressFormData, selectPoi } =
  addressManagementSlice.actions;

// Async Thunks
export const getUserAddresses = createAsyncThunk<UserAddress[], string>(
  "addressManagement/getUserAddresses",
  async (openid: string) => {
    const response = await getUserAddressesApi(openid);
    return response;
  }
);

export const getUserDefaultAddress = createAsyncThunk(
  "addressManagement/getUserDefaultAddress",
  async (openid: string) => {
    const response = await getUserDefaultAddressApi(openid);
    return response;
  }
);

export const addUserAddress = createAsyncThunk(
  "addressManagement/addUserAddress",
  async (address: UserAddress) => {
    const response = await addUserAddressApi(address);
    return response;
  }
);

export const updateUserAddress = createAsyncThunk(
  "addressManagement/updateUserAddress",
  async (params: { addressId: number; address: UserAddress }) => {
    const response = await updateUserAddressApi(
      params.addressId,
      params.address
    );
    return response;
  }
);

export const deleteUserAddress = createAsyncThunk(
  "addressManagement/deleteUserAddress",
  async (addressId: number) => {
    await deleteUserAddressApi(addressId);
    return addressId;
  }
);

export default addressManagementSlice.reducer;
