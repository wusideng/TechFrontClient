import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";
import { NewOrder } from "@/types/NewOrder";
import {
  addCommentApi,
  cancelOrderApi,
  getCouponsApi,
  getOrderDetailApi,
  getOrdersApi,
  getWorktimeBlockApi,
  insertCouponApi,
  updateOrderPaymentApi,
  updateOrderStatusApi,
} from "@/api/orderApi";
import { Coupons } from "@/types/Coupon";

const defaultOrder = {
  client: {},
  tech: {},
  order_products: [],
};

interface OrderState {
  loading: boolean;
  newOrder: NewOrder | null;
  techworkblock: any[];
  coupons: Coupons;
  orders: any[];
  order: any;
  orderstatus: any[];
  productCount: number;
  error: string | null;
  totalCount: number | null; // orderscount
  pageNumber: number; //orders page number
}

const initialState: OrderState = {
  loading: false,
  newOrder: null,
  productCount: 1,
  techworkblock: [],
  coupons: [],
  orders: [],
  order: defaultOrder,
  orderstatus: [],
  error: null,
  totalCount: null, // orderscount
  pageNumber: 1, //orders page number
};

// export const getOrders = createAsyncThunk(
//   "order/getOrders",
//   async (user_id: string) => {
//     const orders = await getOrdersApi(user_id);
//     return orders;
//   }
// );
export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (order_id: string) => {
    const order = await getOrderDetailApi(order_id);
    return order;
  }
);

export const updateOrderPayment = createAsyncThunk(
  "order/updateOrderPayment",
  async (order: any) => {
    const res = await updateOrderPaymentApi(order);
    return res;
  }
);

// export const cancelOrder = createAsyncThunk(
//   "order/cancelOrder",
//   async (refundInfo: any) => {
//     const res = await cancelOrderApi(refundInfo);
//     return res;
//   }
// );
// export const getWorktimeBlock = createAsyncThunk(
//   "order/getWorktimeBlock",
//   async (params: { openid: string; workDate: string }) => {
//     const res = await getWorktimeBlockApi(params.openid);
//     return res;
//   }
// );
export const insertCoupon = createAsyncThunk(
  "order/insertCoupon",
  async (params: { open_id: string; city: string }) => {
    await insertCouponApi(params.open_id, params.city);
    // return res;
  }
);
export const getCoupons = createAsyncThunk(
  "order/getCoupons",
  async (open_id: string) => {
    const res = await getCouponsApi(open_id);
    return res;
  }
);

export const addComment = createAsyncThunk(
  "order/addComment",
  async (orderComment: any) => {
    const res = await addCommentApi(orderComment);
    return res;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    initOrder: (state, action: PayloadAction<NewOrder>) => {
      state.newOrder = action.payload;
    },
    setOrders: (
      state,
      action: PayloadAction<{
        totalCount: number | null;
        data: any[];
        pageNumber: number;
      }>
    ) => {
      state.orders = action.payload.data;
      state.totalCount = action.payload.totalCount;
      state.pageNumber = action.payload.pageNumber;
    },
    clearTechWorkTime: (state) => {
      state.techworkblock = [];
    },
    clearCoupons: (state) => {
      state.coupons = [];
    },
    setOrderTaxiCostAndTravelTime: (
      state,
      action: PayloadAction<{ taxiCost: number; travelTime: number }>
    ) => {
      if (state.newOrder) {
        state.newOrder.otherInfo = {
          ...state.newOrder.otherInfo,
          orderTaxiCost: action.payload.taxiCost,
          travelTime: action.payload.travelTime,
        };
      }
    },
    setTechWorkTime: (
      state,
      action: PayloadAction<{ worktime: string; workdate: string }>
    ) => {
      const { workdate, worktime } = action.payload;
      state.newOrder.tech = {
        ...state.newOrder.tech,
        workdate: workdate,
        worktime: worktime,
      };
    },
    clearOrderDetail: (state) => {
      state.order = defaultOrder;
    },
    setOrderAddress: (state, action: PayloadAction<any>) => {
      if (state.newOrder) {
        state.newOrder.orderServiceAddress = action.payload;
      }
    },
    setOrderCoupon: (
      state,
      action: PayloadAction<{ amount: number; couponId: number }>
    ) => {
      if (state.newOrder) {
        state.newOrder.otherInfo = {
          ...state.newOrder.otherInfo,
          couponAmount: action.payload.amount,
          couponId: action.payload.couponId,
        };
      }
    },
    setOrderProductCount: (state, action: PayloadAction<number>) => {
      if (state.newOrder) {
        const productCount = action.payload;
        state.newOrder.otherInfo = {
          ...state.newOrder.otherInfo,
          productCount,
        };
      }
    },
    clearNewOrder: (state) => {
      state.newOrder = null;
    },
    // clearOrders: (state) => {
    //   state.orders = [];
    // },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(getOrders.fulfilled, (state, action: PayloadAction<any>) => {
      //   // 处理成功状态和数据
      //   state.loading = false;
      //   state.orders = action.payload;
      // })
      .addCase(getOrder.fulfilled, (state, action: PayloadAction<any>) => {
        // 处理成功状态和数据
        state.loading = false;
        state.order = action.payload;
      })
      // .addCase(
      //   getWorktimeBlock.fulfilled,
      //   (state, action: PayloadAction<any>) => {
      //     state.loading = false;
      //     state.techworkblock = action.payload;
      //   }
      // )
      // .addCase(insertCoupon.fulfilled, (state, action: PayloadAction<any>) => {
      //   state.loading = false;
      //   state.coupons = action.payload;
      // })
      .addCase(getCoupons.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.coupons = action.payload;
      });
    builder.addMatcher(
      isAnyOf(
        getOrder.pending,
        // getOrders.pending,
        // getWorktimeBlock.pending,
        insertCoupon.pending,
        getCoupons.pending,
        addComment.pending
      ),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      isAnyOf(
        // getOrders.rejected,
        getOrder.rejected,
        // getWorktimeBlock.rejected,
        insertCoupon.rejected,
        getCoupons.rejected,
        addComment.rejected
      ),
      (state, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      }
    );
  },
});

export const {
  initOrder,
  // clearOrders,
  // loadOrdersSuccess,
  // loadOrderSuccess,
  // loadUpdateOrderSuccess,
  // loadFetchOrderStatusSuccess,
  // loadTechWorkTimeSuccess,
  // loadInsertCouponSuccess,
  // loadFetchCouponSuccess,
  clearTechWorkTime,
  clearCoupons,
  setOrderTaxiCostAndTravelTime,
  clearOrderDetail,
  setOrderAddress,
  clearNewOrder,
  setTechWorkTime,
  setOrderCoupon,
  setOrders,
  setOrderProductCount,
} = orderSlice.actions;

export default orderSlice.reducer;
