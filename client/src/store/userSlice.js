import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");

let initialUser = storedUser ? JSON.parse(storedUser) : null;

const initialState = {
  loading: false,
  user: initialUser,
  success: false,
  error: "",
};

const userSlice = createSlice({
  name: "setUserLogin",
  initialState: initialState,
  reducers: {
    requestUser(state, action) {
      state.loading = true;
      state.success = false;
    },
    setUser(state, action) {
      return { loading: false, user: action.payload, success: true };
    },
    failUser(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    logout(state, action) {
      localStorage.clear("user");
      return { loading: false, error: null, user: null };
    },
    resetSuccess(state, action) {
      state.success = false;
    },
  },
});

export default userSlice;
