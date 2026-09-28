import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import UpdateProfileServices from "../../../../core/services/api/updateAccount/updateProfileServices";
import Notification from "../../../../core/design/notification";

const fields = [
  {
    id: "fullname",
    title: "Update Name",
    placeholder: "Enter your name",
  },
  {
    id: "username",
    title: "Update Username",
    placeholder: "Enter your username",
  },
  {
    id: "bio",
    title: "Update Bio",
    placeholder: "Enter your bio",
  },
];

const UpdateProfile = ({ user }) => {
  const navigate = useNavigate();

  const [activeField, setActiveField] = useState(null);

  const [values, setValues] = useState({
    fullname: user?.fullname || "",
    username: user?.username || "",
    bio: user?.bio || "",
  });

  const [notification, setNotification] = useState({
    id: 0,
    message: "",
    type: "",
  });

  const selectedField = fields.find(
    (field) => field.id === activeField
  );

  const updateProfileMutation = useMutation({
    mutationFn: UpdateProfileServices,

    onSuccess: (data) => {
      setNotification((prev) => ({
        id: prev.id + 1,
        message: data.message,
        type: data.success ? "success" : "error",
      }));

      if (data.success) {
        setActiveField(null);
      }
    },

    onError: (error) => {
      setNotification((prev) => ({
        id: prev.id + 1,
        message: error.message || "Something went wrong.",
        type: "error",
      }));
    },
  });

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [activeField]: e.target.value,
    }));
  };

  const handleBack = () => {
    if (activeField) {
      setActiveField(null);
      return;
    }

    navigate("/Dashboard/settings");
  };

  const handleUpdate = () => {
    const updates = Object.fromEntries(
      Object.entries(values)
        .filter(([_, value]) => value.trim() !== "")
        .map(([key, value]) => [key, value.trim()])
    );

    if (Object.keys(updates).length === 0) {
      return;
    }

    updateProfileMutation.mutate(updates);
  };

  return (
    <main className="relative h-full overflow-hidden bg-[#060b14] text-white">

      <AnimatePresence>
        {notification.message && (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
          />
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        onClick={handleBack}
        disabled={updateProfileMutation.isPending}
        className="
          z-30 mt-6 ml-6 mb-1
          flex h-10 w-10 shrink-0
          cursor-pointer items-center justify-center
          rounded-xl border border-white/8
          bg-white/4
          text-zinc-400
          transition-colors duration-200
          hover:bg-white/[0.07]
          hover:text-white
          disabled:pointer-events-none
          disabled:opacity-50
        "
      >
        <ArrowLeft size={18} />
      </motion.button>

      <div className="mx-auto flex h-full w-full max-w-2xl flex-col p-4 lg:p-6">

        <div className="pb-5">
          <h1 className="text-md font-semibold md:text-lg lg:text-xl">
            Update Profile
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            {selectedField?.title || "Choose what you want to update"}
          </p>
        </div>

        <AnimatePresence mode="wait">

          {!activeField ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-2"
            >
              {fields.map((field) => (
                <motion.button
                  key={field.id}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveField(field.id)}
                  className="
                    flex w-full cursor-pointer
                    items-center justify-between
                    rounded-2xl border border-white/10
                    bg-white/[0.035]
                    p-4
                    text-left
                    transition
                    hover:bg-white/6
                  "
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {field.title}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {field.placeholder}
                    </p>
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-zinc-500"
                  />
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.form
              key="editor"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <div className="flex items-center gap-2">

                <input
                  autoFocus
                  value={values[activeField]}
                  onChange={handleChange}
                  disabled={updateProfileMutation.isPending}
                  placeholder={selectedField.placeholder}
                  className="
                    h-12 flex-1
                    rounded-2xl
                    border border-white/10
                    bg-white/4
                    px-4
                    text-sm text-white
                    outline-none
                    transition
                    placeholder:text-zinc-600
                    focus:border-blue-500/40
                    focus:bg-white/6
                    disabled:opacity-50
                  "
                />

                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.9 }}
                  disabled={updateProfileMutation.isPending}
                  className="
                    flex h-12 w-12 shrink-0
                    cursor-pointer
                    items-center justify-center
                    rounded-2xl
                    bg-blue-500
                    text-white
                    shadow-lg shadow-blue-500/20
                    transition
                    hover:bg-blue-400
                    disabled:pointer-events-none
                    disabled:opacity-50
                  "
                >
                  <ArrowRight size={19} />
                </motion.button>

              </div>

              <p className="mt-3 px-1 text-xs text-zinc-600">
                {updateProfileMutation.isPending
                  ? "Updating..."
                  : "Press Enter to update"}
              </p>
            </motion.form>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
};

export default UpdateProfile;