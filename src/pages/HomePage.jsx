import "animate.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../redux/auth/selectors";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { slideInFromBot, slideInFromRight } from "../components/motion/motion";

const Home = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

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
        src="https://www.comreg.ie/media/2019/05/Printed-Directories-Image-1024x683.jpg"
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
              {user.name}`s Phone Book
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
                Let`s GO
              </Link>
            </motion.div>
          </div>
        ) : (
          <h2 className="text-xl font-bold text-yellow-400 lg:text-5xl mb-4 text-center font-light">
            This is your phone book made for you. Enter your{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-600 underline underline-offset-2"
            >
              login and password{" "}
            </Link>
            or{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-600 underline underline-offset-2"
            >
              register
            </Link>{" "}
            and use it.
          </h2>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
