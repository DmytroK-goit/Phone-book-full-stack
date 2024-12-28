import s from "./Contact.module.css";
import { IoPeopleSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import PropTypes from "prop-types";
import { deleteContact } from "../../redux/contacts/operations";

const Contact = ({ contact }) => {
  const { id, name, number } = contact;
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -20 }}
      transition={{ duration: 0.2 }}
      className={s.contact}
      key={id}
    >
      <div>
        <p>
          <IoPeopleSharp /> {name}
        </p>
        <p>
          <FaPhoneAlt /> {number}
        </p>
      </div>
      <button
        className="rounded-full p-5 "
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </motion.div>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};
export default Contact;
