export const selectUser = (state) => state.auth.user;
export const selectUserName = (state) => state.auth.user?.name || "Guest";
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectToken = (state) => state.auth.token;
