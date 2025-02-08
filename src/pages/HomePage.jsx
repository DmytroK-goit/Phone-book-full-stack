import "animate.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserName } from "../redux/auth/selectors";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { slideInFromBot, slideInFromRight } from "../components/motion/motion";
import { useTranslation } from "react-i18next";

const Home = () => {
  const userName = useSelector(selectUserName);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { t } = useTranslation();

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="relative min-h-screen w-full flex justify-center items-center">
      <motion.img
        initial={{
          x: "-100vw",
          scale: 1,
          filter: "blur(20px) brightness(0.3)",
        }}
        animate={{
          x: 0,
          scale: 1,
          filter: "blur(0px) brightness(0.4)",
        }}
        transition={{
          duration: 1,
        }}
        // src="https://www.comreg.ie/media/2019/05/Printed-Directories-Image-1024x683.jpg"
        src="https://img.freepik.com/premium-photo/smartphone-office-desk-wooden-background-copy-space_124437-77.jpg?w=826"
        alt="Home Page Example"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideInFromRight()}
        className="relative z-10 text-center text-white"
      >
        {isLoggedIn ? (
          <div>
            <motion.h1
              animate={{ rotate: 360 }}
              transition={{ delay: 3, duration: 2 }}
              className="text-5xl sm:text-7xl md:text-9xl font-bold animate-textColorChange mb-10"
            >
              {t("home.title", { userName: capitalizeFirstLetter(userName) })}
            </motion.h1>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideInFromBot()}
            >
              <Link
                to="/contactlist"
                className="mt-8 px-20 py-3 w-50 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                {t("home.cta")}
              </Link>
            </motion.div>
          </div>
        ) : (
          <h2 className="text-xl font-bold text-yellow-400 lg:text-5xl mb-4 text-center font-light">
            {t("home.hero")}{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-600 underline underline-offset-2"
            >
              {t("home.heroLogin")}{" "}
            </Link>
            {t("home.heroOr")}{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-600 underline underline-offset-2"
            >
              {t("home.heroRegister")}
            </Link>{" "}
            {t("home.heroUse")}
          </h2>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
