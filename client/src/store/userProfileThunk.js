import axios from "axios";
import { userActions } from ".";

const userProfileThunk = (name, email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userActions.requestUser());
      let userToken = getState().user.user.token;
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${userToken}`,
        },
      };
      const { data } = await axios.put(
        "/api/users/profile",
        { name, email, password },
        config
      );
      dispatch(userActions.setUser(data));
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      let errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(userActions.failUser(errorMessage));
    }
  };
};

export default userProfileThunk;
