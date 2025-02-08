import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refresh, register, resetPwd } from "./operations";

const initialState = {
  user: {
    name: "",
    email: "",
  },
  token: "",
  isLoading: false,
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = { name: "", email: "" };
      state.token = "";
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { userName, accessToken } = action.payload.data;
        state.user = { ...state.user, name: userName };
        state.token = accessToken;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refresh.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
      })
      .addCase(resetPwd.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.password = action.payload.password;
      })
      .addCase(refresh.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.isLoading = false;
      });
  },
});

export const { setUser } = slice.actions;
export const authSlice = slice.reducer;
