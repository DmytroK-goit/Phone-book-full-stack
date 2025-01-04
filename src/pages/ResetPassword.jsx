import { Field, Form, Formik } from "formik";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPwd } from "../redux/auth/operations";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "../components/motion/motion";
import * as Yup from "yup";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(3, "Password must be at least 6 characters long")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const { newPassword } = values;
    dispatch(resetPwd({ password: newPassword, token }))
      .unwrap()
      .then(() => {
        toast.success("Password reset successfully!");
        navigate("/login"); // Перенаправлення після успіху
      })
      .catch(() => {
        toast.error("Failed to reset password.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="hero min-h-screen bg-inherit">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={slideInFromRight()}
            className="text-5xl font-bold"
          >
            Reset Password
          </motion.h1>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInFromLeft()}
          className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">New Password</span>
                  </label>
                  <Field
                    name="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
