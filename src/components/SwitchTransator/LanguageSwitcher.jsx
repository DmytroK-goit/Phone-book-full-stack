import { useTranslation } from "react-i18next";
import s from "./LanguageSwitcher.module.css";
export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={s.cont}>
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
      >
        <option value="en">🇬🇧 Eng</option>
        <option value="uk">🇺🇦 Укр</option>
      </select>
    </div>
  );
};
