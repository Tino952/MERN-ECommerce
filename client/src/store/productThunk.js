import axios from "axios";
import { productActions } from ".";

const productThunk = (id) => {
  return async (dispatch) => {
    try {
      dispatch(productActions.requestProduct());
      // fetching from backend http request is made possible with proxy in package.json
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(productActions.setProduct(data));
    } catch (error) {
      let errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(productActions.failProduct(errorMessage));
    }
  };
};

export default productThunk;
