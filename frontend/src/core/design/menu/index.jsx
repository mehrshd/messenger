import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, Bell, LogOut, MessageCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import GetProfile from "../../services/api/dashboard/profile";
import { deleteAccount, getAccounts } from "../../services/switchAccounts";

const menus = [
  {
    name: "Profile",
    icon: User,
    path: "/Dashboard/profile",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/Dashboard/settings/accounts",
  },
  {
    name: "chat",
    icon: MessageCircle,
    path: "/chat",
  },
];

const handelerClick = () => {
  const accs = getAccounts();
  const index = accs.filter(item => item.isSelected === true);
  const userId = index[0].id

  deleteAccount(userId);
  window.location.reload();
}

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const {        
    data
  } = useQuery({
    queryKey:['profile'],
    queryFn: GetProfile,
    select: (response) => response.data
  });

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        animate={{
          x: open ? "-50%" : 0,
        }}
        transition={{
          layout: {
            type: "spring",
            stiffness: 260,
            damping: 22,
          },
          x: {
            type: "spring",
            stiffness: 260,
            damping: 22,
          },
        }}
        className={`
          fixed z-50 bottom-4 lg:bottom-6
          ${open ? "left-1/2" : "right-4 lg:right-6"}
          flex items-center overflow-hidden
          rounded-full border border-white/10
          bg-[#0b1220]/90
          shadow-xl backdrop-blur-xl
        `}
      >
        {!open ? (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            whileTap={{ scale: 0.92 }}
            className="
              flex h-14 w-14 items-center justify-center
              lg:h-16 lg:w-16
            "
          >
            <motion.img
              layoutId="profile-image"
              src={`${import.meta.env.VITE_API_URL}${data?.avatar ? data.avatar : "👤"}`}
              className="
                h-9 w-9 rounded-full object-cover
                lg:h-10 lg:w-10
              "
            />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="
              flex h-full w-fit items-center
              gap-2 px-3 lg:gap-3 lg:px-4 p-2
            "
          >
            <motion.img
              layoutId="profile-image"
              src={`${import.meta.env.VITE_API_URL}${data?.avatar ? data.avatar : "👤"}`}
              className="
                h-9 w-9 shrink-0 rounded-full object-cover
                lg:h-10 lg:w-10
              "
            />

            {menus.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.name}
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                    x: -8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.08 + index * 0.06,
                    type: "spring",
                    stiffness: 350,
                    damping: 22,
                  }}
                >
                  <NavLink
                    to={item.path}
                    onClick={closeMenu}
                    className="
                      flex items-center justify-center gap-2
                      rounded-full bg-white/5
                      px-3 py-2
                      text-white/80
                      transition
                      hover:bg-blue-500/20
                      lg:px-4
                    "
                  >
                    <Icon size={18} />

                    <span className="hidden lg:block">
                      {item.name}
                    </span>
                  </NavLink>
                </motion.div>
              );
            })}

            <motion.button
              type="button"
              onClick={handelerClick}
              initial={{
                opacity: 0,
                scale: 0.7,
                x: -8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                delay: 0.08 + menus.length * 0.06,
                type: "spring",
                stiffness: 350,
                damping: 22,
              }}
              className="
                flex items-center justify-center gap-2
                rounded-full bg-white/5
                px-3 py-2
                text-white/80
                transition
                hover:bg-red-500/20
                lg:px-4
              "
            >
              <LogOut size={18} />

              <span className="hidden lg:block">
                Logout
              </span>
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
