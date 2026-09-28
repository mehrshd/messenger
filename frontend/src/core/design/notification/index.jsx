import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CircleAlert, Info } from "lucide-react";

const types = {
  success: {
    icon: Check,
    iconClass: "bg-emerald-500",
  },

  error: {
    icon: CircleAlert,
    iconClass: "bg-orange-500",
  },

  info: {
    icon: Info,
    iconClass: "bg-zinc-400",
  },
};

export default function Notification({
  message,
  type = "info",
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    // هر بار message یا type تغییر کرد، دوباره نمایش بده
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, type]);

  const config = types[type] || types.info;
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {visible && message && (
        <motion.div
          initial={{
            opacity: 0,
            y: -15,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -15,
            scale: 0.95,
          }}
          transition={{ duration: 0.25 }}
          className="
            fixed
            top-6
            left-1/2
            z-9999
            -translate-x-1/2

            flex
            items-center
            gap-3

            rounded-[15px]
            border
            border-white/10
            bg-gray-900/70
            px-3
            py-2

            text-[15px]
            text-white

            shadow-[0_12px_35px_rgba(0,0,0,0.35)]
            backdrop-blur-xl
          "
        >
          <div
            className={`
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-full
              ${config.iconClass}
            `}
          >
            <Icon size={17} strokeWidth={2.5} />
          </div>

          <span className="whitespace-nowrap">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
