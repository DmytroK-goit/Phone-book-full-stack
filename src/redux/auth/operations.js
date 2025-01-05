import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const goitApi = axios.create({
  baseURL: "https://connections-api.goit.global/",
});
export const mongodb = axios.create({
  baseURL: "https://nodejs-hw-mongodb-2hns.onrender.com",
});

const setAuthHeader = (token) => {
  if (token) {
    mongodb.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log(
      "Authorization Header:",
      mongodb.defaults.headers.common.Authorization
    );
  } else {
    delete mongodb.defaults.headers.common.Authorization;
  }
};

export const register = createAsyncThunk(
  "register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await mongodb.post("auth/register", credentials);
      toast.success("Success");
      setAuthHeader(data.data.accessToken);
      return data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await mongodb.post("auth/login", credentials);
      toast.success("Success");
      setAuthHeader(data.data.accessToken);
      return data;
    } catch (error) {
      toast.error(`why${error.message}`);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("logout", async (_, thunkApi) => {
  try {
    await mongodb.post("auth/logout");
    setAuthHeader("");
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const refresh = createAsyncThunk("refresh", async (_, thunkApi) => {
  try {
    const savedToken = thunkApi.getState().auth.token;
    console.log(savedToken);
    if (!savedToken) {
      return thunkApi.rejectWithValue("Token does not exist!");
    }

    setAuthHeader(savedToken);
    const { data } = await mongodb.post("auth/refresh");
    return data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error.response?.data?.message || "Refresh failed"
    );
  }
});
export const resetUser = createAsyncThunk(
  "resetUser",
  async (credentials, thunkApi) => {
    try {
      const { data } = await mongodb.post("auth/send-reset-email", credentials);
      toast.success("Success");
      return data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const resetPwd = createAsyncThunk(
  "resetPwd",
  async (credentials, thunkApi) => {
    try {
      console.log(credentials);
      const { data } = await mongodb.post("/auth/reset-pwd", credentials);
      console.log(data.data);
      toast.success(data.message || "Password has been successfully reset!");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
