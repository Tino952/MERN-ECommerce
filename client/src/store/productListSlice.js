import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, products: [], error: "" };

const productListSlice = createSlice({
  name: "setProductList",
  initialState: initialState,
  reducers: {
    requestProductList(state, action) {
      return { loading: true, products: [], error: "" };
    },
    setProductList(state, action) {
      return { loading: false, products: action.payload, error: "" };
    },
    failProductList(state, action) {
      return { loading: false, products: [], error: action.payload };
    },
  },
});

export default productListSlice;
