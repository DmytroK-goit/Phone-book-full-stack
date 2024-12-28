import s from "./Contact.module.css";
import { IoPeopleSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import PropTypes from "prop-types";
import { deleteContact } from "../../redux/contacts/operations";

const Contact = ({ contact }) => {
  const { _id, name, phoneNumber, email, contactType } = contact;
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(_id));

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -20 }}
      transition={{ duration: 0.2 }}
      className={s.contact}
      key={_id}
    >
      <div>
        <p>
          <IoPeopleSharp /> {name}
        </p>
        <p>
          <FaPhoneAlt /> {phoneNumber}
        </p>
        <p>
          <TfiEmail /> {email}
        </p>
        <p>{contactType}</p>
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
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contactType: PropTypes.string.isRequired,
  }).isRequired,
};
export default Contact;
