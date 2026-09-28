import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-1.5 mt-57">
        {[0, 1, 2].map((item) => (
          <motion.span
            key={item}
            className="h-2 w-2 rounded-full bg-zinc-400"
            animate={{
              y: [0, -5, 0],
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: item * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;