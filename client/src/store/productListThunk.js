import axios from "axios";
import { productListActions } from "./";

const productListThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(productListActions.requestProductList());
      // fetching from backend http request is made possible with proxy in package.json
      const { data } = await axios.get("/api/products");
      dispatch(productListActions.setProductList(data));
    } catch (error) {
      let errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(productListActions.failProductList(errorMessage));
    }
  };
};

export default productListThunk;
