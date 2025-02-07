import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";

import { slideInFromRight } from "../motion/motion";
import { motion } from "framer-motion";
import {
  selectNameFilter,
  selectNumberFilter,
} from "../../redux/filters/selectors";
import { changeFilter, changeFilterNumber } from "../../redux/filters/slice";
import { useTranslation } from "react-i18next";

const SearchBox = () => {
  const { t } = useTranslation();
  const searchIdName = useId();
  const searchIdNumber = useId();
  const dispatch = useDispatch();
  const name = useSelector(selectNameFilter);
  const number = useSelector(selectNumberFilter);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInFromRight()}
    >
      <form
        className="w-full flex gap-8 flex-col bg-amber-500 p-10 rounded-2xl mb-10 border-solid border-2 border-black"
        style={{
          boxShadow: "15px 15px 10px rgba(255, 223, 186, 0.8)",
          backgroundImage: "linear-gradient(to right, #fceabb, #f8b500)",
          color: "black",
        }}
      >
        <h3 className="text-xl font-bold text-center py-3 px-5 rounded-lg bg-gradient-to-r from-orange-300 to-yellow-400 text-black shadow-md">
          {t("searchForm.header")}
        </h3>
        <label className="w-3/4 flex flex-col " htmlFor={searchIdName}>
          {t("searchForm.findName")}
          <input
            className="border-solid border-2 border-black"
            type="text"
            id={searchIdName}
            value={name}
            onChange={(e) => dispatch(changeFilter(e.target.value))}
            placeholder="Enter search name"
          />
        </label>
        <label className="w-3/4 flex flex-col " htmlFor={searchIdNumber}>
          {t("searchForm.findPhone")}
          <input
            className="border-solid border-2 border-black"
            type="text"
            id={searchIdNumber}
            value={number}
            onChange={(e) => dispatch(changeFilterNumber(e.target.value))}
            placeholder="Enter search name"
          />
        </label>
      </form>
    </motion.div>
  );
};
export default SearchBox;
