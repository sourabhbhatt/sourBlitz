import { FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-zinc-900 py-6 mt-16 font-[Poppins]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600 dark:text-gray-300">
        <p className="text-sm text-yellow-400">
          © {new Date().getFullYear()} Sourabh. All rights reserved.
        </p>

        <div className="flex gap-5 text-xl">
          <a
            href="https://www.linkedin.com/in/sourabh-b-399476b0/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 text-blue-600 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/sourabh2222/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 text-red-600 transition"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
