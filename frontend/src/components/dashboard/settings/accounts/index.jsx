import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserCard from "../../../../core/design/cardUser";
import { getAccounts } from "../../../../core/services/switchAccounts";

const AccountSwitcher = () => {

  const accounts = getAccounts();

  const navigate = useNavigate();

  return (

    <div>

      <button
        type="button"
        onClick={() => navigate("/Dashboard/settings")}
        className="
          z-40  mt-6 ml-6
          mb-5 flex h-10 w-10 shrink-0
          cursor-pointer items-center justify-center
          rounded-xl border border-white/8
          bg-white/4
          text-zinc-400
          transition-colors duration-200
          hover:bg-white/[0.07]
          hover:text-white
        "
      >
        <ArrowLeft size={18} />
      </button>

    <div
      className="h-screen p-4 max-w-2xl mx-auto"
    >

      <div className="mx-auto w-full max-w-2xl">


        <div
        >
          <h1 className="md:text-xl lg:text-2xl font-semibold text-white">
            Accounts
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Switch between your accounts
          </p>
        </div>


        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-4 space-y-2 overflow-y-scroll h-80"
        >
          {accounts.map((account) => (
            <UserCard account={account} />
          ))}
        </motion.div>

      </div>
    </div>
    </div>
  );
};

export default AccountSwitcher;