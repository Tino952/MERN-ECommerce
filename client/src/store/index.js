import { configureStore } from "@reduxjs/toolkit";
import productListSlice from "./productListSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    productList: productListSlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    orders: orderSlice.reducer,
  },
});

export const productListActions = productListSlice.actions;
export const productActions = productSlice.actions;
export const cartActions = cartSlice.actions;
export const userActions = userSlice.actions;
export const orderActions = orderSlice.actions;
export default store;
