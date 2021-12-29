import { configureStore } from "@reduxjs/toolkit";
import productListSlice from "./productListSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    productList: productListSlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export const productListActions = productListSlice.actions;
export const productActions = productSlice.actions;
export const cartActions = cartSlice.actions;
export default store;
