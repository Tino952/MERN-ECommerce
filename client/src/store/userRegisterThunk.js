import axios from "axios";
import { userActions } from ".";

const userRegisterThunk = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.requestUser());
      let config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/users",
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

export default userRegisterThunk;
