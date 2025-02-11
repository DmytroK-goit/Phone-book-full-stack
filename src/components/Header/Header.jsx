import { Link, NavLink } from "react-router-dom";
import s from "./Header.module.css";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { selectIsLoggedIn, selectUserName } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import { LanguageSwitcher } from "../SwitchTransator/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import ShinyText from "../ShinyText/ShinyText";

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
    <div className="flex bg-gradient-to-r from-gray-900 via-gray-500 to-black text-white p-5 justify-between items-center flex-col sm:flex-row">
      <motion.div
        whileHover={{
          color: "#84cc16",
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className="text-slate-300 decoration-slate-300 underline text-sm sm:text-base items-center lg:text-4xl animate__animated animate__flip p-2 rounded-lg shadow-lg hover:shadow-xl"
      >
        <Link to="/" className="font-semibold hover:text-lime-400 duration-300">
          {t("phoneBook")}
        </Link>
      </motion.div>
      {isLoggedIn && <ShinyText userName={userName} />}
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
            className="btn btn-secondary px-8"
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
