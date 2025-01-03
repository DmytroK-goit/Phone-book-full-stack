import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from "./operations";
import { selectContacts, selectNameFilter } from "./selectors";
import { selectNumberFilter } from "../filters/selectors";
import { logout } from "../auth/operations";

const initialState = {
  items: [],
  searchStr: "",
  totalPages: 0,
  currentPage: 1,
  perPage: 10,
  sortBy: "name",
  sortOrder: "asc",
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "contacts",
  initialState: initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSorting: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
    resetState: (state) => {
      state.items = [];
      state.currentPage = 1;
      state.perPage = 10;
      state.sortBy = "name";
      state.sortOrder = "asc";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.currentPage = action.payload.page || state.currentPage;
        state.totalPages = action.payload.totalPages || state.totalPages;
        state.perPage = action.payload.perPage || state.perPage;
        state.sortBy = action.payload.sortBy || state.sortBy;
        state.sortOrder = action.payload.sortOrder || state.sortOrder;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(logout.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(editContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (contact) => contact._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      })

      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          deleteContact.pending,
          addContact.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          deleteContact.fulfilled,
          addContact.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          deleteContact.rejected,
          addContact.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
        }
      );
  },
});

export const { setPage, setSorting, setPerPage } = slice.actions;
export const contactsReducer = slice.reducer;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter, selectNumberFilter],
  (contacts, nameFilter, numberFilter) => {
    return contacts.filter((contact) => {
      const matchesName =
        contact.name &&
        contact.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesNumber =
        contact.phoneNumber && contact.phoneNumber.includes(numberFilter);

      return matchesName && matchesNumber;
    });
  }
);
