import { Link, NavLink } from "react-router-dom";
import s from "./Header.module.css";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { selectIsLoggedIn, selectUserName } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import { LanguageSwitcher } from "../SwitchTransator/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };
  const dispatch = useDispatch();

  const userName = useSelector(selectUserName);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="flex bg-gradient-to-r from-gray-900 via-gray-700 to-black text-white	p-5 justify-between items-center flex-col	sm:flex-row ">
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
        className="text-lime-300	decoration-slate-300	underline text-sm sm:text-base items-center lg:text-4xl animate__animated animate__flip"
      >
        <Link to="/">{t("phoneBook")}</Link>
      </motion.div>
      {isLoggedIn && (
        <motion.div
          whileHover={{ scale: 1.4, textDecoration: "underline" }}
          transition={{ duration: 0.4 }}
          className="text-sm sm:text-base items-center lg:text-4xl"
        >
          {t("welcome", { userName: capitalizeFirstLetter(userName) })}
        </motion.div>
      )}
      <div className="flex justify-between items-center gap-5">
        <NavLink className={buildLinkClass} to="/">
          {t("gethome")}
        </NavLink>
        {isLoggedIn && (
          <NavLink className={buildLinkClass} to="/contactlist">
            {t("contactList")}
          </NavLink>
        )}

        {!isLoggedIn && (
          <>
            <NavLink className={buildLinkClass} to="/login">
              {t("login")}
            </NavLink>
            <NavLink className={buildLinkClass} to="/register">
              {t("register")}
            </NavLink>
          </>
        )}

        {isLoggedIn && (
          <button
            onClick={() => dispatch(logout())}
            className="btn btn-secondary h:"
          >
            {t("exit")}
          </button>
        )}
        <LanguageSwitcher />
      </div>
    </div>
  );
};
export default Header;
