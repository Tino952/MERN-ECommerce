import axios from "axios";
import { orderActions } from ".";

const getOrderThunk = (id) => {
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
      if (id) {
        const { data } = await axios.get(`/api/orders/${id}`, config);
        dispatch(orderActions.setOrder(data));
      } else {
        const { data } = await axios.get("/api/orders/myorders", config);
        dispatch(orderActions.setOrders(data));
      }
    } catch (error) {
      let errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(orderActions.failOrder(errorMessage));
    }
  };
};

export default getOrderThunk;
