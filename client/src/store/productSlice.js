import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  product: { rating: 0, numReviews: 0 },
  error: "",
};

const productSlice = createSlice({
  name: "setProduct",
  initialState: initialState,
  reducers: {
    requestProduct(state, action) {
      state.loading = true;
    },
    setProduct(state, action) {
      return { loading: false, product: action.payload };
    },
    failProduct(state, action) {
      state.error = action.payload;
    },
  },
});

export default productSlice;
