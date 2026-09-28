import { motion } from "framer-motion";

export default function Message({
  text,
  time,
  own = false,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`flex w-full ${
        own ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          group relative
          max-w-[78%]
          md:max-w-[65%]
          rounded-2xl
          px-4 py-2.5
          shadow-sm
          ${
            own
              ? `
                rounded-br-md
                bg-[#2563eb]
                text-white
                shadow-blue-950/20
              `
              : `
                rounded-bl-md
                border border-white/5
                bg-white/5.5
                text-white/90
              `
          }
        `}
      >
        <p
          className="
            whitespace-pre-wrap
            wrap-break-word
            text-sm
            leading-6
          "
        >
          {text}
        </p>

        {time && (
          <div
            className={`
              mt-1
              flex
              justify-end
              text-[10px]
              ${
                own
                  ? "text-white/50"
                  : "text-white/25"
              }
            `}
          >
            {time}
          </div>
        )}
      </div>
    </motion.div>
  );
}