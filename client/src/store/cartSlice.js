import { createSlice } from "@reduxjs/toolkit";

const storedCart = localStorage.getItem("cart");
const storedShipping = localStorage.getItem("shipping");

let initialCart = storedCart ? JSON.parse(storedCart) : [];
let initialShipping = storedShipping ? JSON.parse(storedShipping) : {};

const initialState = {
  cart: initialCart,
  loading: false,
  error: "",
  shipping: initialShipping,
  payment: "",
};

const cartSlice = createSlice({
  name: "setCart",
  initialState: initialState,
  reducers: {
    fetchItem(state, action) {
      state.loading = true;
    },
    addToCart(state, action) {
      state.loading = false;
      let cartItem = action.payload;
      let findItem = state.cart.find((item) => item.id === cartItem.id);
      if (findItem) {
        let newArray = state.cart.map((item) =>
          item.id === cartItem.id ? cartItem : item
        );
        state.cart = newArray;
      } else {
        state.cart.push(cartItem);
      }
    },
    failFetch(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromCart(state, action) {
      let itemId = action.payload;
      let findItem = state.cart.find((item) => item.id === itemId);
      if (findItem) {
        let newArray = state.cart.filter((item) => item.id !== itemId);
        state.cart = newArray;
        localStorage.setItem("cart", JSON.stringify(newArray));
      }
    },
    addShipping(state, action) {
      state.shipping = action.payload;
      localStorage.setItem("shipping", JSON.stringify(action.payload));
    },
    addPayment(state, action) {
      state.payment = action.payload;
    },
    clearCart(state, action) {
      state.cart = [];
      localStorage.clear("cart");
    },
  },
});

export default cartSlice;
