import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
      initial={{ rotate: 5, opacity: 0 }}
      animate={{
        opacity: 1,
        rotate: -5,
      }}
      transition={{
        duration: 1.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 6,
      }}
      className="inline-block"
    >
      <div className="relative inline-block">
        <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent dark:from-white dark:to-yellow-400">
          SourBlitz
        </span>

        {/* Animated underline */}
        <motion.div
          layoutId="underline"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            repeatDelay: 3,
          }}
          className="h-[2px] bg-yellow-400 absolute bottom-0 left-0"
        />
      </div>
    </motion.div>
  );
};

export default Logo;
