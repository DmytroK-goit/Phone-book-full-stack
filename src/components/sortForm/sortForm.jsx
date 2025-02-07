import { useId } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { fetchContacts } from "../../redux/contacts/operations";
import { useTranslation } from "react-i18next";

const slideInFromRight = () => ({
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
});

const SortForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    const { perPage, sortBy, sortOrder } = values;
    dispatch(
      fetchContacts({ perPage: Number(perPage), sortBy, sortOrder, page: 1 })
    );
  };

  const perPageId = useId();
  const sortId = useId();
  const sortOrderId = useId();

  const FeedbackSchema = Yup.object().shape({
    perPage: Yup.number()
      .min(1, "Minimum value is 1")
      .max(50, "Maximum value is 50")
      .required("Please specify items per page"),
    sortBy: Yup.string()
      .oneOf(
        ["name", "phoneNumber", "email", "contactType"],
        "Invalid sort type"
      )
      .required("Please select a sorting field"),
    sortOrder: Yup.string()
      .oneOf(["asc", "desc"], "Invalid sort order")
      .required("Please select a sorting order"),
  });

  const initialValues = {
    perPage: "10",
    sortBy: "name",
    sortOrder: "asc",
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInFromRight()}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form
          className="w-full p-5 sm:p-10 flex gap-8 flex-col bg-amber-500 rounded-2xl mb-10 border-solid border-2 border-black"
          style={{
            boxShadow: "15px 15px 10px rgba(255, 223, 186, 0.8)",
            backgroundImage: "linear-gradient(to right, #fceabb, #f8b500)",
            color: "black",
          }}
        >
          <h3 className="text-xl font-bold text-center py-3 px-5 rounded-lg bg-gradient-to-r from-orange-300 to-yellow-400 text-black shadow-md">
            {t("sortForm.header")}
          </h3>
          <div>
            <label
              className="w-3/4 flex flex-col border-solid border-2 border-black"
              htmlFor={perPageId}
            >
              {t("sortForm.item")}
              <Field
                type="text"
                name="perPage"
                id={perPageId}
                placeholder="Enter items per page"
              />
              <ErrorMessage name="perPage" component="span" />
            </label>
          </div>
          <div>
            <label
              className="w-3/4 flex flex-col border-solid border-2 border-black"
              htmlFor={sortId}
            >
              {t("sortForm.sort")}
              <Field as="select" name="sortBy" id={sortId}>
                <option value="name">Name</option>
                <option value="phoneNumber">Phone Number</option>
                <option value="email">Email</option>
                <option value="contactType">Contact Type</option>
              </Field>
              <ErrorMessage name="sortBy" component="span" />
            </label>
          </div>
          <div>
            <label
              className="w-3/4 flex flex-col border-solid border-2 border-black"
              htmlFor={sortOrderId}
            >
              {t("sortForm.order")}
              <Field as="select" name="sortOrder" id={sortOrderId}>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </Field>
              <ErrorMessage name="sortOrder" component="span" />
            </label>
          </div>

          <button
            className="w-1/3 flex rounded-2xl justify-center text-gray-50 border-black border-solid bg-indigo-700 border-2 border-indigo-600 transition-transform duration-200 hover:scale-110 sm:w-2/3"
            type="submit"
          >
            {t("sortForm.btn")}
          </button>
        </Form>
      </Formik>
    </motion.div>
  );
};

export default SortForm;
