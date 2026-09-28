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

export default function PC({ user }) {
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
    <div className="h-screen overflow-hidden border">
      <motion.section
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        <div className="relative h-screen">

          <div className="absolute -inset-6 rounded-[48px] bg-white/[0.035] blur-3xl" />

          <div className="relative h-screen overflow-hidden border border-white/8 bg-[#0a101b] shadow-2xl shadow-black/50 backdrop-blur-3xl">

            <div className="relative h-40 overflow-hidden">
              <motion.img
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
                src={avatarUrl}
                alt="Profile banner"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#060b14]/5 to-[#0a101b]" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 160,
                damping: 16,
              }}
              className="absolute left-8 top-25 z-20"
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
                    src={avatarUrl != null ? avatarUrl : "../../../../../public/iconUserr.png"}
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
            <div className="flex items-center justify-between px-8 pb-5 pt-6 pl-36">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="text-2xl font-semibold tracking-tight"
                >
                  {user.fullname}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="mt-1 text-sm text-white/35"
                >
                  {user.bio}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-full border border-white/[0.07] bg-white/[0.035] px-4 py-2 text-xs text-white/45"
              >
                {user.role}
              </motion.div>
            </div>

            {/* Divider */}
            <div className="mx-8 h-px bg-white/6" />

            {/* Information */}
            <div className="grid grid-cols-4 gap-3 p-8 pt-5">
              <InfoCard
                icon={<Mail size={17} />}
                label="Email"
                value={user.email}
                delay={0.40}
              />

              <InfoCard
                icon={<AtSign size={17} />}
                label="Username"
                value={
                  user.username
                    ? user.username
                    : "No username selected"
                }
                delay={0.45}
              />

              <InfoCard
                icon={<CalendarDays size={17} />}
                label="Age"
                value={new Date(user.created_at).toLocaleDateString("en-CA")}
                delay={0.50}
              />

              <InfoCard
                icon={<UserRound size={17} />}
                label="Account"
                value={user.role}
                delay={0.55}
              />
            </div>

          </div>
        </div>
      </motion.section>
    </div>
  );
}