import { createAsyncThunk } from "@reduxjs/toolkit";
import { goitApi, mongodb } from "../auth/operations";
import toast from "react-hot-toast";

export const fetchContacts = createAsyncThunk(
  "fetchAll",
  async (_, thunkApi) => {
    try {
      const {
        data: { data },
      } = await mongodb.get("/contacts");
      console.log(data);
      if (data) {
        toast.success(`На сервері знайдено ${data.length} контактів`);
      }
      return data.data;
    } catch (error) {
      toast.error(`Error ${error.message}`);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "deleteContact",
  async (id, thunkApi) => {
    try {
      const { data } = await goitApi.delete(`/contacts/${id}`);
      if (data) {
        toast.success(`Контакт видалено`);
      }
      return data.id;
    } catch (error) {
      toast.error(`Error ${error.message}`);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "addContact",
  async (body, thunkApi) => {
    try {
      const { data } = await goitApi.post("/contacts", body);
      if (data) {
        const loadingToastId = toast.loading("Saving...");
        toast.dismiss(loadingToastId);
        toast.success(`Успішно додано контакт`);
      }
      return data;
    } catch (error) {
      toast.error(`Error ${error.message}`);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
