import { ReactNode } from "react";
import { motion } from "framer-motion";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary";
};

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
}: ButtonProps) => {
  const baseClasses =
    "px-5 py-2 rounded-full font-medium transition duration-300 ease-in-out";

  const variantClasses =
    variant === "primary"
      ? "bg-gray-300 text-black hover:bg-yellow-500 dark:text-black"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white";

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;
