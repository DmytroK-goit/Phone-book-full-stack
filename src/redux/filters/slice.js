import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    name: "",
    number: "",
  },
  reducers: {
    changeFilter(state, action) {
      state.name = action.payload;
    },
    changeFilterNumber(state, action) {
      state.number = action.payload;
    },
  },
});

export const searchFilterReducer = slice.reducer;
export const { changeFilter, changeFilterNumber } = slice.actions;

export default slice.reducer;
