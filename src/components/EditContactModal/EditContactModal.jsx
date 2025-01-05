import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { editContact } from "../../redux/contacts/operations";

const EditContactModal = ({ contact, onClose }) => {
  const dispatch = useDispatch();

  const initialValues = {
    name: contact.name || "",
    phoneNumber: contact.phoneNumber || "",
    email: contact.email || "",
    contactType: contact.contactType || "",
  };

  const handleSubmit = (values) => {
    dispatch(editContact({ _id: contact._id, updatedData: values }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <div className="mb-4">
              <Field
                name="name"
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <Field
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <Field
                name="contactType"
                type="text"
                placeholder="Contact Type"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </Form>
        </Formik>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

EditContactModal.propTypes = {
  contact: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contactType: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditContactModal;
