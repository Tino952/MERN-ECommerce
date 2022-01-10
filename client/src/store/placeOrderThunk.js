import axios from "axios";
import { orderActions } from ".";

const placeOrderThunk = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderActions.requestOrder());
      let userToken = getState().user.user.token;
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${userToken}`,
        },
      };
      // HTTP request to paypal
      const { data } = await axios.post(`/api/orders`, order, config);
      dispatch(orderActions.setOrder(data));
    } catch (error) {
      let errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(orderActions.failOrder(errorMessage));
    }
  };
};

export default placeOrderThunk;
