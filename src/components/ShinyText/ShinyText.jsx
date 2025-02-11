import "./ShinyText.modole.css";
import { useTranslation } from "react-i18next";
const ShinyText = ({
  userName,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;
  const { t } = useTranslation();
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{ animationDuration }}
    >
      {t("welcome", { userName: capitalizeFirstLetter(userName) })}
    </div>
  );
};

export default ShinyText;
