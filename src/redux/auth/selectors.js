export const selectUser = (state) => state.auth.user;
export const selectUserName = (state) => state.auth.user?.name || "Guest";
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
