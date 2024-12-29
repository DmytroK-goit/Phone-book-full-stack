import { createAsyncThunk } from "@reduxjs/toolkit";
import { mongodb } from "../auth/operations";
import toast from "react-hot-toast";

export const fetchContacts = createAsyncThunk(
  "fetchAll",
  async (perPage = 50, thunkApi) => {
    try {
      const {
        data: { data },
      } = await mongodb.get("/contacts", {
        params: {
          perPage,
        },
      });

      if (data) {
        toast.success(`На сервері знайдено ${data.totalItems} контактів`);
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
  async (_id, thunkApi) => {
    try {
      const { data } = await mongodb.delete(`/contacts/${_id}`);

      if (data) {
        toast.success(`Контакт видалено`);
      }
      return _id;
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
      const { data } = await mongodb.post("/contacts", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data) {
        const loadingToastId = toast.loading("Saving...");
        thunkApi.dispatch(fetchContacts(70));
        toast.dismiss(loadingToastId);
        toast.success(`Успішно додано контакт`);
      }
      return data;
    } catch (error) {
      toast.error(`Error ${error.message}`);
      console.error("Error response:", error.response);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
