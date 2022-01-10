import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "setOrder",
  initialState: {
    loading: false,
    order: { _id: null },
    orders: [],
    success: false,
    error: "",
  },
  reducers: {
    requestOrder(state, action) {
      state.loading = true;
    },
    setOrder(state, action) {
      state.loading = false;
      state.order = action.payload;
      state.success = true;
    },
    setOrders(state, action) {
      state.loading = false;
      state.orders = action.payload;
      state.success = true;
    },
    failOrder(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    resetOrders(state, action) {
      state = {
        loading: false,
        order: { _id: null },
        orders: [],
        success: false,
        error: "",
      };
    },
    resetSuccess(state, action) {
      state.success = false;
    },
    resetOrder(state, action) {
      state.order = { _id: null };
    },
  },
});

export default orderSlice;
