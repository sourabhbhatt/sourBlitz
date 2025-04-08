import { useState } from "react";
import { motion } from "framer-motion";

import Modal from "./Modal";
import scanner from "../assets/scanner.jpg";

export default function MyInfo() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="mb-12 text-center">
      <h1 className="text-4xl font-bold text-yellow-400 dark:text-white mb-4">
        Hey, I'm Sourabh 👋
      </h1>

      <motion.p
        className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        I craft stunning, animated mobile experiences using React Native,
        Reanimated 3, SVG, Skia, and Gesture Handler. This is my playground
        where code meets creativity.
      </motion.p>

      <button
        onClick={() => setShowModal((p) => !p)}
        className="inline-block bg-yellow-400 px-6 py-2 rounded-full text-black font-semibold hover:bg-yellow-300 transition"
      >
        ☕ Buy me a coffee
      </button>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Support My Work 💛"
      >
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          If you like what I do, you can support me by buying me a coffee!
        </p>
        <img
          src={scanner}
          alt="Buy me a coffee QR"
          className="w-40 mx-auto rounded-lg shadow"
        />
        <p className="text-sm text-gray-500 mt-4">
          Scan the QR or visit the link below
        </p>
        <a
          href="https://www.buymeacoffee.com/sourabh"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-indigo-600 font-medium hover:underline"
        >
          buymeacoffee.com/sourabh
        </a>
      </Modal>
    </div>
  );
}
