import axios from "axios";
import { cartActions } from ".";

const cartThunk = (id, quantity) => {
  return async (dispatch, getState) => {
    try {
      dispatch(cartActions.fetchItem());
      // fetching from backend http request is made possible with proxy in package.json
      const { data } = await axios.get(`/api/products/${id}`);
      let cartItem = {
        id,
        quantity,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
      };
      dispatch(cartActions.addToCart(cartItem));
    } catch (error) {
      let errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(cartActions.failFetch(errorMessage));
    }
    let cartStore = getState().cart.cart;
    localStorage.setItem("cart", JSON.stringify(cartStore));
  };
};

export default cartThunk;
