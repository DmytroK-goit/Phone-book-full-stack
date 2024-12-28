import Contact from "../Contact/Contact";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/slice";
import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideInFromRight } from "../motion/motion";
import { fetchContacts } from "../../redux/contacts/operations";

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (index) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
    },
  }),
};

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (contacts.length > 0) {
      setIsFirstRender(false);
    }
  }, [contacts]);

  return (
    <div className="p-5">
      <ContactForm />
      <SearchBox />

      <motion.h2
        initial="hidden"
        animate="visible"
        variants={slideInFromRight()}
        className="text-xl my-20 shadow-1xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-black"
        style={{ boxShadow: "15px 15px 10px rgb(190, 126, 30)" }}
      >
        Contacts List : {contacts.length} contacts.
      </motion.h2>

      <ul className="grid gap-4 grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {contacts.map((contact, index) => (
          <motion.li
            custom={index}
            initial={isFirstRender ? "hidden" : false}
            animate="visible"
            variants={itemVariants}
            layout
            className="w-full"
            key={contact.id}
          >
            <Contact contact={contact} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
