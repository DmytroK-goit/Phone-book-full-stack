import { IoPeopleSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { RxAvatar } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import PropTypes from "prop-types";
import { deleteContact } from "../../redux/contacts/operations";

const Contact = ({ contact }) => {
  const { _id, name, phoneNumber, email, contactType, photo } = contact;
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(_id));

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -20 }}
      transition={{ duration: 0.2 }}
      className="border rounded-xl p-4 flex flex-col shadow-md bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500 hover:shadow-xl transition-all duration-300"
      key={_id}
    >
      <div className="contact-card p-2 ">
        <div className="contact-info flex items-center gap-2 pb-4">
          <RxAvatar className="text-blue-500" />
          <img
            src={photo}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
        <div className="contact-info flex items-center gap-2 pb-4">
          <IoPeopleSharp className="text-blue-500" />
          <span className="font-medium text-lg">{name}</span>
        </div>
        <div className="contact-info flex items-center gap-2 pb-4">
          <FaPhoneAlt className="text-green-500" />
          <span>{phoneNumber}</span>
        </div>
        <div className="contact-info flex items-center gap-2 pb-4">
          <TfiEmail className="text-red-500" />
          <span>{email}</span>
        </div>
        <div className="contact-info flex items-center gap-2">
          <span className="font-medium text-gray-600">{contactType}</span>
        </div>
      </div>
      <button
        className="w-1/3 rounded-full bg-red-500 text-white p-3 md:p-4 lg:p-5 hover:bg-red-600 transition-colors duration-200"
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
    photo: PropTypes.string.isRequired,
  }).isRequired,
};
export default Contact;
