import { useSelector, useDispatch } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import { setPage } from "../../redux/contacts/slice";
import s from "./pagination.module.css";
import clsx from "clsx";

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state.contacts);

  const buildLinkClass = (isActive) => {
    return clsx(s.link, isActive && s.activeLink); // Використовуємо clsx для активної кнопки
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Заборона переходу на неіснуючі сторінки
    dispatch(setPage(page));
    dispatch(fetchContacts({ page, perPage: 10 }));
  };

  return (
    <div className="mt-4">
      <div className={s.pagination}>
        <button
          className={buildLinkClass(currentPage === 1)}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Попередня
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={buildLinkClass(currentPage === index + 1)} // Використовуємо clsx для активної сторінки
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={buildLinkClass(currentPage === totalPages)}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Наступна
        </button>
      </div>
    </div>
  );
};

export default Pagination;
