import { useRef, useState } from "react";

import { motion } from "framer-motion";

import {
  AtSign,
  CalendarDays,
  LoaderCircle,
  Mail,
  UserRound,
} from "lucide-react";

import { InfoCard } from "../../../../core/design/infoCard";

import UpdateProfileServices from "../../../../core/services/api/updateAccount/updateProfileServices";

export default function Tablet({ user }) {
  const fileInputRef = useRef(null);

  const [avatar, setAvatar] = useState(user.avatar);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const handleAvatarClick = () => {
    if (avatarLoading) return;

    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatarLoading(true);

    try {
      const formData = new FormData();

      formData.append("avatar", file);

      const result = await UpdateProfileServices(formData);

      if (result.success) {
        setAvatar(result.avatar);
      }
    } finally {
      setAvatarLoading(false);
      window.location.reload();

      e.target.value = "";
    }
  };

  const avatarUrl = `${import.meta.env.VITE_API_URL}${avatar}`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="mx-auto h-screen w-full"
    >
      <div className="h-screen overflow-hidden border border-white/8 bg-[#0a101b] shadow-2xl shadow-black/30 backdrop-blur-2xl">

        {/* Banner */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            src={avatarUrl}
            alt="Profile banner"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-[#060b14]" />
        </div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.25,
            type: "spring",
            stiffness: 160,
          }}
          className="absolute left-8 top-35"
        >
          <button
            type="button"
            onClick={handleAvatarClick}
            disabled={avatarLoading}
            className="group cursor-pointer rounded-full border-[6px] border-[#0a101b] bg-[#0a101b] p-1 disabled:cursor-wait"
          >
            {avatarLoading ? (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/5">
                <LoaderCircle
                  size={30}
                  className="animate-spin text-white/60"
                />
              </div>
            ) : (
              <img
                src={avatarUrl}
                alt={user.fullname}
                className="h-28 w-28 rounded-full object-cover transition duration-200 group-hover:brightness-75"
              />
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </motion.div>

        {/* Main */}
        <div className="grid grid-cols-[220px_1fr] gap-8 px-8 pb-8 pt-16">

          {/* Identity */}
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-semibold tracking-tight"
            >
              {user.fullname}
            </motion.h1>

            <p className="mt-1 text-sm text-white/35">
              {user.username}
            </p>

            <div className="mt-8 h-px bg-white/6" />

            <div className="mt-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/25">
                Account
              </p>

              <p className="mt-2 text-sm text-white/70">
                {user.account}
              </p>
            </div>
          </div>

          {/* Information */}
          <div className="grid grid-cols-2 gap-3">
            <InfoCard
              icon={<Mail size={18} />}
              label="Email"
              value={user.email}
              delay={0.5}
            />

            <InfoCard
              icon={<AtSign size={18} />}
              label="Username"
              value={user.username}
              delay={0.6}
            />

            <InfoCard
              icon={<CalendarDays size={18} />}
              label="Age"
              value={new Date(user.created_at).toLocaleDateString("en-CA")}
              delay={0.7}
            />

            <InfoCard
              icon={<UserRound size={18} />}
              label="Account"
              value={user.role}
              delay={0.8}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}