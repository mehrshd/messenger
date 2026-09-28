import { useNavigate } from "react-router-dom";
const Button = ({
  children,
  type = "button",
  onClick,
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="
        h-12
        w-full
        rounded-xl
        border border-white/10
        bg-white/8

        text-sm
        font-medium
        text-white

        shadow-[0_8px_30px_rgba(0,0,0,0.25)]

        transition-all duration-200

        hover:bg-white/12
        hover:border-white/15

        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {loading ? (
        <span className="flex items-center justify-center gap-1.5">
          <span className="text-zinc-300">Logging in</span>

          <span className="flex items-center gap-1">
            <span className="h-1 w-1 animate-bounce rounded-full bg-white [animation-delay:-0.3s]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-white [animation-delay:-0.15s]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-white" />
          </span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

const ButtonSettingsMobile = ({ path, title, icon: Icon, description }) => {
  const navigate = useNavigate();

  return(
    <button
      type="button"
      onClick={() =>
          navigate(path)
      }
      className="
      relative z-40
      flex w-full items-center gap-4
      rounded-2xl border border-white/8
      bg-white/4 p-4 my-3
      text-left
      cursor-pointer
      "
    >

      <div
        className="
          flex h-11 w-11 shrink-0
          items-center justify-center
          rounded-xl bg-white/6
          text-zinc-300
        "
      >
        <Icon size={19} />
      </div>

      <div>
        <h2 className="text-sm font-medium text-white">
            {title}
        </h2>

        <p className="mt-1 text-xs text-zinc-500">
            {description}
        </p>
      </div>

    </button>
  )
}

const ButtonSettingsPc = ({ path, title, icon: Icon, description, active }) => {
  const navigate = useNavigate();
  return(
    <button
      type="button"
      onClick={() => navigate(path)}
      className={`
      relative z-40
      flex w-[95%] ml-2 items-center gap-4
      rounded-2xl border border-white/8
      bg-white/4 p-4
      text-left my-2.5
      cursor-pointer

      ${
          active
            ? `
              border-white/50
              bg-white/8
            `
            : `
              border-white/8
              bg-white/4
              hover:bg-white/6
              hover:border-white/10
            `
        }
        
      `}
  >
      <div className="
          flex h-10 w-10 shrink-0 items-center justify-center
          rounded-xl
          bg-white/5
          text-zinc-300
          transition-colors
          group-hover:bg-white/8
      ">
          <Icon size={19} />
      </div>

      <div className="min-w-0">
          <p className="text-sm font-medium text-white">
              {title}
          </p>

          <p className="truncate text-xs text-zinc-500">
              {description}
          </p>
      </div>
    </button>
  )
}

export { Button,  ButtonSettingsMobile, ButtonSettingsPc};