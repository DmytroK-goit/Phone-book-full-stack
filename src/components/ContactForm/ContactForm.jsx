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
        name: values.name,
        phoneNumber: values.phoneNumber,
        contactType: values.contactType,
        email: values.email,
        photo: values.photo,
      })
    );
    resetForm();
  };

  const nameId = useId();
  const phoneId = useId();
  const contactTypeId = useId();
  const emailId = useId();
  const photoId = useId();

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
    photo: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        "Файл занадто великий",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024) // <= 5MB
      )
      .test(
        "fileType",
        "Неправильний тип файлу",
        (value) =>
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
      ),
  });

  const initialValues = {
    name: "",
    phoneNumber: "",
    contactType: "",
    email: "",
    photo: null,
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
        {({ setFieldValue }) => (
          <Form
            className="w-full p-5 sm:p-10 flex gap-8 flex-col bg-amber-500 rounded-2xl mb-10 border-solid border-2 border-black"
            style={{
              boxShadow: "15px 15px 10px rgba(255, 223, 186, 0.8)", // Тінь для світлого вигляду
              backgroundImage: "linear-gradient(to right, #fceabb, #f8b500)", // Світлий градієнт
              color: "black", // Темний текст для контрасту
            }}
          >
            <h3 className="text-xl font-bold text-center py-3 px-5 rounded-lg bg-gradient-to-r from-orange-300 to-yellow-400 text-black shadow-md">
              Contact Form
            </h3>
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
            <div>
              <label
                className="w-3/4 flex flex-col border-solid border-2 border-black"
                htmlFor={photoId}
              >
                <input
                  type="file"
                  id={photoId}
                  name="photo"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={(event) => {
                    setFieldValue("photo", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage name="photo" component="span" />
              </label>
            </div>
            <button
              className="w-2/3 flex rounded-2xl justify-center text-gray-50 border-black border-solid bg-indigo-700 border-2 border-indigo-600  transition-transform duration-200 hover:scale-110 sm:w-1/3"
              type="submit"
            >
              Add contact
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};
export default ContactForm;
