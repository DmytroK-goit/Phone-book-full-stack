import { Route, Routes } from "react-router-dom";
import ContactList from "./components/ContactList/ContactList";
import Layout from "./components/Layout";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { PrivateRoute } from "./components/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { AnimatePresence } from "framer-motion";
import SendResEmail from "./pages/SendResEmail";
import ResetPassword from "./pages/ResetPassword";

function App() {
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
          <Route
            path="send-reset-email"
            element={<RestrictedRoute component={<SendResEmail />} />}
          />
          <Route path="auth/reset-pwd" element={<ResetPassword />} />
          <Route
            path="login"
            element={
              <RestrictedRoute
                component={<Login />}
                redirectTo="/contactlist"
              />
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
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
