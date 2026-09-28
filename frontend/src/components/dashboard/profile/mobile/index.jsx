import { useRef, useState } from "react";

import { motion } from "framer-motion";

import {
  AtSign,
  CalendarDays,
  LoaderCircle,
  Mail,
  UserRound,
} from "lucide-react";

import { InfoRow } from "../../../../core/design/infoCard";

import UpdateProfileServices from "../../../../core/services/api/updateAccount/updateProfileServices";

export default function Mobile({ user }) {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="mx-auto h-screen w-full"
    >
      <div className="z-40 h-screen overflow-y-scroll border border-white/8 bg-[#0a101b] shadow-2xl shadow-black/30 backdrop-blur-2xl">

        {/* Banner */}
        <div className="relative z-20 h-40 overflow-hidden">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            src={avatarUrl}
            alt="Profile banner"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 z-50 bg-linear-to-b from-black/10 via-transparent to-[#060b14]" />
        </div>

        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.25,
            type: "spring",
            stiffness: 180,
          }}
          className="absolute left-1/2 top-27.5 z-50 -translate-x-1/2"
        >
          <button
            type="button"
            onClick={handleAvatarClick}
            disabled={avatarLoading}
            className="group cursor-pointer rounded-full border-[5px] border-[#0a101b] bg-[#0a101b] p-1 disabled:cursor-wait"
          >
            {avatarLoading ? (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/5">
                <LoaderCircle
                  size={28}
                  className="animate-spin text-white/60"
                />
              </div>
            ) : (
              <img
                src={avatarUrl}
                alt={user.fullname}
                className="h-24 w-24 rounded-full object-cover transition duration-200 group-hover:brightness-75"
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

        {/* Identity */}
        <div className="mt-6 px-5 pb-5 pt-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-semibold tracking-tight"
          >
            {user.fullname}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-1 text-sm text-white/40"
          >
            {user.username}
          </motion.p>
        </div>

        {/* Information */}
        <div className="space-y-2 px-4 pb-4">
          <InfoRow
            icon={<Mail size={18} />}
            label="Email"
            value={user.email}
            delay={0.55}
          />

          <InfoRow
            icon={<AtSign size={18} />}
            label="Username"
            value={user.username}
            delay={0.65}
          />

          <InfoRow
            icon={<CalendarDays size={18} />}
            label="Age"
            value={new Date(user.created_at).toLocaleDateString("en-CA")}
            delay={0.75}
          />

          <InfoRow
            icon={<UserRound size={18} />}
            label="Account"
            value={user.role}
            delay={0.85}
          />
        </div>
      </div>
    </motion.section>
  );
}