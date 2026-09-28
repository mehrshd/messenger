import { motion } from "framer-motion";
import { selectAccount } from "../../services/switchAccounts";
import { useNavigate } from "react-router-dom";

const UserCard = ({account}) => {

  const navigate = useNavigate();

  const handelerClick = (id) => {
    selectAccount(id);
    navigate('/dashboard/profile');
    window.location.reload();
  }
  return(
    <motion.button
      key={account.id}
      onClick={() => handelerClick(account.id)}
      type="button"
      variants={{
        hidden: {
          opacity: 0,
          y: 5,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      transition={{
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileTap={{ scale: 0.99 }}
      className="
        flex w-full items-center gap-3
        rounded-2xl
        border border-white/8
        bg-white/[0.035]
        p-3
        text-left
        transition-all duration-200
        hover:border-white/12
        hover:bg-white/6
      "
    >
      <img
        src={`${import.meta.env.VITE_API_URL}${account.avatar}`}
        alt={account.fullname}
        className="h-12 w-12 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm md:text-lg font-bold text-white">
          {account.fullname}
        </p>

        <p className="mt-0.5 truncate text-xs text-zinc-500">
          {account.username}
        </p>
      </div>
    </motion.button>
  )
}

export default UserCard