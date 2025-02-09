import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { resetUser } from "../redux/auth/operations";
import Header from "../components/Header/Header";
import { useTranslation } from "react-i18next";

const SendResEmail = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
  };
  const handleSubmit = (values, options) => {
    console.log(values);
    dispatch(resetUser(values));
    options.resetForm();
  };
  return (
    <div>
      {/* <Header /> */}
      <div className="hero bg-inherit	min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">{t("sendResetPwd.hero")}</h1>
            {/* <p className="py-6">Registration Form</p> */}
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
              <Form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      {t("sendResetPwd.email")}
                    </span>
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    {t("sendResetPwd.sendBtn")}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SendResEmail;
