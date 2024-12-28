import { useId } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { slideInFromRight } from "../motion/motion";
import { addContact } from "../../redux/contacts/operations";

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    console.log("Submitting values:", values);
    dispatch(
      addContact({
        // id: nanoid(),
        name: values.name,
        phoneNumber: values.phoneNumber,
        contactType: values.contactType,
        email: values.email,
      })
    );
    resetForm();
  };

  const nameId = useId();
  const phoneId = useId();
  const contactTypeId = useId();
  const emailId = useId();
  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Занадто коротке ім'я!")
      .max(50, "Занадто довге ім'я!")
      .required("Ім'я є обов'язковим"),
    phoneNumber: Yup.string()
      .matches(
        /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
        "Номер не валідний"
      )
      .min(3, "Занадто короткий номер")
      .max(50, "Занадто довгий номер")
      .required("Номер телефону є обов'язковим"),
    contactType: Yup.string()
      .oneOf(["work", "home", "personal"], "Invalid contact type")
      .required("Contact type is required"),
    email: Yup.string()
      .email("Невірний формат електронної пошти")
      .required("Електронна пошта є обов'язковою"),
  });

  const initialValues = {
    name: "",
    phoneNumber: "",
    contactType: "",
    email: "",
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
          className="w-full p-5 sm:w-3/4 sm:p-10 md:w-2/3 lg:w-1/3 xl: flex gap-8 flex-col bg-amber-500  rounded-2xl mb-10 border-solid border-2 border-black"
          style={{
            boxShadow: "15px 15px 10px rgb(190, 126, 30)",
            backgroundColor: " burlywood",
          }}
        >
          <div>
            <label
              className="w-3/4 flex flex-col border-solid border-2 border-black"
              htmlFor={nameId}
            >
              <Field
                type="text"
                name="name"
                id={nameId}
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component="span" />
            </label>
          </div>
          <div>
            <label
              className="w-3/4 flex flex-col border-solid border-2 border-black"
              htmlFor={phoneId}
            >
              <Field
                type="tel"
                name="phoneNumber"
                id={phoneId}
                placeholder="+38 (000) 000-00-00"
              />
              <ErrorMessage name="phoneNumber" component="span" />
            </label>
          </div>
          <div>
            <label
              className="w-3/4 flex flex-col border-solid border-2 border-black"
              htmlFor={emailId}
            >
              <Field
                type="email"
                name="email"
                id={emailId}
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="span" />
            </label>
          </div>
          <div>
            <label
              className="w-3/4 flex flex-col border-solid border-2 border-black"
              htmlFor={contactTypeId}
            >
              <Field as="select" name="contactType" id={contactTypeId}>
                <option value="" disabled>
                  Select contact type
                </option>
                <option value="work">Work</option>
                <option value="home">Home</option>
                <option value="personal">Personal</option>
              </Field>
              <ErrorMessage name="contactType" component="span" />
            </label>
          </div>
          <button
            className="w-2/3 flex rounded-2xl justify-center text-gray-50 border-black border-solid bg-indigo-700 border-2 border-indigo-600  transition-transform duration-200 hover:scale-110 sm:w-1/3"
            type="submit"
          >
            Add contact
          </button>
        </Form>
      </Formik>
    </motion.div>
  );
};
export default ContactForm;
