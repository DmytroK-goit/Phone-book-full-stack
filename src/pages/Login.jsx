import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/operations";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "../components/motion/motion";
import { useTranslation } from "react-i18next";
import Header from "../components/Header/Header";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = (values, options) => {
    dispatch(login(values))
      .unwrap()
      .then((res) => {
        toast(`Welcome, ${res.user.name}!`);
        navigate("/");
      })
      .catch(() => {
        toast.error("invalid credentials");
      });
    options.resetForm();
  };

  return (
    <>
      <Header />
      <div className="hero min-h-screen bg-inherit">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={slideInFromRight()}
              className="text-5xl font-bold"
            >
              {t("loginPage.login")}
            </motion.h1>
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInFromLeft()}
            className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
          >
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
              <Form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                </div>
                <label className="label">
                  <span className="label-text mt-3">
                    If you don`t have an account, click Sign up
                  </span>
                </label>
                <Link
                  to="/register"
                  className="mt-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Sign up
                </Link>
                <Link
                  to="/send-reset-email"
                  className="w-3/4 mt-2 px-6 py-3 bg-orange-300 hover:bg-orange-500 text-black font-bold rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Forgot password
                </Link>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </Form>
            </Formik>
          </motion.div>
        </div>
      </div>
    </>
  );
};
export default Login;
