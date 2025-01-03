import { useSelector, useDispatch } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import { setPage } from "../../redux/contacts/slice";
import s from "./pagination.module.css";
import clsx from "clsx";

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages, perPage } = useSelector(
    (state) => state.contacts
  );

  const buildLinkClass = (isActive) => {
    return clsx(s.link, isActive && s.activeLink);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    dispatch(setPage(page));
  };

  const renderPageButtons = () => {
    const range = 3;
    const buttons = [];

    for (
      let i = Math.max(1, currentPage - range);
      i <= Math.min(totalPages, currentPage + range);
      i++
    ) {
      buttons.push(
        <button
          key={i}
          aria-label={`Сторінка ${i}`}
          className={buildLinkClass(currentPage === i)}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className={s.pagination}>
        <button
          aria-label="Попередня сторінка"
          className={buildLinkClass(currentPage === 1)}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Попередня
        </button>
        {renderPageButtons()}
        <button
          aria-label="Наступна сторінка"
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
