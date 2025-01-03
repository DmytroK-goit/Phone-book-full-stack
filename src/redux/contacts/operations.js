import { createAsyncThunk } from "@reduxjs/toolkit";
import { mongodb } from "../auth/operations";
import toast from "react-hot-toast";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (
    { page = 1, perPage = 10, sortBy = "name", sortOrder = "asc" },
    thunkApi
  ) => {
    try {
      const {
        data: { data },
      } = await mongodb.get("/contacts", {
        params: {
          page,
          perPage,
          sortBy,
          sortOrder,
        },
      });

      return {
        data: data.data,
        page: data.page,
        totalPages: data.totalPages,
        perPage: data.perPage,
        sortBy: data.sortBy,
        sortOrder: data.sortOrder,
      };
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
export const editContact = createAsyncThunk(
  "contacts/editContact",
  async ({ _id, updatedData }, thunkApi) => {
    try {
      console.log("start edit");
      const { data } = await mongodb.patch(`/contacts/${_id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(`Контакт оновлено: ${data.data.name}`);
      return data.data;
    } catch (error) {
      console.log(error);
      toast.error(`Помилка: ${error.response?.data?.message || error.message}`);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const addContact = createAsyncThunk(
  "addContact",
  async (body, thunkApi) => {
    try {
      console.log("Data being sent to API:", body);

      const { data } = await mongodb.post("/contacts", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data.data);

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
