import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="flex bg-gradient-to-r from-gray-900 via-gray-500 to-black text-white p-5 justify-between items-center flex-col sm:flex-row">
      <motion.div
        whileHover={{
          color: "#84cc16",
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className="text-slate-300 decoration-slate-300 underline text-sm sm:text-base items-center lg:text-4xl animate__animated animate__flip p-2 rounded-lg shadow-lg hover:shadow-xl"
      >
        <Link to="/" className="font-semibold hover:text-lime-400 duration-300">
          {t("phoneBook")}
        </Link>
      </motion.div>
      <address className="not-italic">
        <p className="font-medium text-2xl">{t("footer.country")}</p>
        <p className="font-medium text-2xl">{t("footer.city")}</p>
        <p className="font-medium text-2xl">2025</p>
      </address>
      <div className="flex flex-col text-center sm:text-right">
        <h3 className="text-lg font-semibold mb-2">{t("footer.owner")}</h3>
        <p>
          <p>{t("footer.email")}</p>{" "}
          <a
            href="mailto:owner@example.com"
            className="text-blue-400 hover:underline"
          >
            k0vbasyuk.dim0n@gmail.com
          </a>
        </p>
        <p>
          {t("footer.phone")}{" "}
          <a href="tel:+380979638775" className="text-blue-400 hover:underline">
            +380 97 963 8775
          </a>
        </p>
        <p>
          {t("footer.social")}{" "}
          <a
            href="https://t.me/doccuper"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Telegram
          </a>
          ,{" "}
          <a
            href="https://github.com/DmytroK-goit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            GitHub
          </a>
          ,{" "}
          <a
            href="https://www.linkedin.com/in/dmytro-kovbasiuk-b473002b9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            LinkedIn
          </a>
        </p>
        <p>
          {t("footer.database")}{" "}
          <a
            href="https://nodejs-hw-mongodb-2hns.onrender.com/api-docs/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            MongoDB
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
