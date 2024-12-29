import { Link, NavLink } from "react-router-dom";
import s from "./Header.module.css";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { selectIsLoggedIn, selectUserName } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";

const Header = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };
  const dispatch = useDispatch();

  const userName = useSelector(selectUserName);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className="flex bg-teal-600 text-white	p-5 justify-between items-center flex-col	sm:flex-row ">
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
        className="text-lime-300	decoration-slate-300	underline text-sm sm:text-base items-center lg:text-4xl animate__animated animate__flip"
      >
        <Link to="/"> Phone Book</Link>
      </motion.div>
      {isLoggedIn && (
        <motion.div
          whileHover={{ scale: 1.4, textDecoration: "underline" }}
          transition={{ duration: 0.4 }}
          className="text-sm sm:text-base items-center lg:text-4xl"
        >
          Welcome, {userName}
        </motion.div>
      )}
      <div className="flex justify-between items-center gap-5">
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink className={buildLinkClass} to="/contactlist">
            Contactlist
          </NavLink>
        )}

        {!isLoggedIn && (
          <>
            <NavLink className={buildLinkClass} to="/login">
              Login
            </NavLink>
            <NavLink className={buildLinkClass} to="/register">
              Register
            </NavLink>
          </>
        )}

        {isLoggedIn && (
          <button
            onClick={() => dispatch(logout())}
            className="btn btn-secondary h:"
          >
            Exit
          </button>
        )}
      </div>
    </div>
  );
};
export default Header;
