const Footer = () => {
  return (
    <div className="flex bg-gradient-to-r from-gray-900 via-gray-700 to-black text-white p-5 justify-between items-center flex-col sm:flex-row">
      <div className="mb-4 sm:mb-0">
        <h2 className="text-lg font-bold">Phone Book</h2>
      </div>
      <address className="not-italic">
        <p>Ukraine</p>
        <p>Vinnytsia</p>
        <p>2025</p>
      </address>
      <div className="flex flex-col text-center sm:text-right">
        <h3 className="text-lg font-semibold mb-2">Contact Owner</h3>
        <p>
          Email:{" "}
          <a
            href="mailto:owner@example.com"
            className="text-blue-400 hover:underline"
          >
            k0vbasyuk.dim0n@gmail.com
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href="tel:+380979638775" className="text-blue-400 hover:underline">
            +380 97 963 8775
          </a>
        </p>
        <p>
          Socials:{" "}
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
          Database information:{" "}
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
