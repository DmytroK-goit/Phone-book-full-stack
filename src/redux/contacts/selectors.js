export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectIsError = (state) => state.contacts.isError;
export const selectNameFilter = (state) => state.filters.name;
export const selectNumberFilter = (state) => state.filters?.number || "";
