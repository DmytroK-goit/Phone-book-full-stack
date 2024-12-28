import { Route, Routes } from "react-router-dom";
import ContactList from "./components/ContactList/ContactList";
import Layout from "./components/Layout";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { PrivateRoute } from "./components/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refresh } from "./redux/auth/operations";
import { AnimatePresence } from "framer-motion";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { LoadingSpinner } from "./components/loader/loader";

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  if (isRefreshing) {
    return <LoadingSpinner />;
  }

  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="contactlist"
            element={
              <PrivateRoute component={<ContactList />} redirectTo="/login" />
            }
          />
        </Route>
        <Route
          path="login"
          element={
            <RestrictedRoute component={<Login />} redirectTo="/contactlist" />
          }
        />
        <Route
          path="register"
          element={
            <RestrictedRoute
              component={<Register />}
              redirectTo="/contactlist"
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
