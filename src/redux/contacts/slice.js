import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";
import { selectContacts, selectNameFilter } from "./selectors";
import { selectNumberFilter } from "../filters/selectors";
import { logout } from "../auth/operations";

const initialState = {
  items: [],
  searchStr: "",
  isLoading: false,
  isError: false,
};

const slice = createSlice({
  name: "contacts",
  initialState: initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
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
