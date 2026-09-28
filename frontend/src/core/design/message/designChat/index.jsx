import { motion } from "framer-motion";

const TrashIcon = () => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  );
}


const SendIcon = () => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7Z" />
    </svg>
  );
}

function Loading() {
  return (
    <div className="flex h-full min-h-40 items-center justify-center">

      <div className="flex items-center gap-1.5">

        {[0, 1, 2].map((item) => (
          <motion.span
            key={item}
            className="h-2 w-2 rounded-full bg-zinc-400"
            animate={{
              y: [0, -5, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: item * 0.15,
            }}
          />
        ))}

      </div>

    </div>
  );
}

function Avatar({ src, name }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="
          h-12 w-12
          shrink-0
          rounded-full
          object-cover
          md:h-14 md:w-14
        "
      />
    );
  }

  return (
    <div className="
      flex h-12 w-12 shrink-0
      items-center justify-center
      rounded-full
      bg-white/6
      text-sm font-medium
      text-white/50
      md:h-14 md:w-14
    ">
      {name?.charAt(0)?.toUpperCase()}
    </div>
  );
}

export { SendIcon, TrashIcon, Loading, Avatar }