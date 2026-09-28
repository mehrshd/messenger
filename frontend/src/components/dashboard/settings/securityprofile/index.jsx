import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import {
  RequestUpdateEmail,
  ConfirmUpdateEmail,
} from "../../../../core/services/api/updateAccount/securityProfileServices/updateEmail";

import {
  UpdatePassword,
} from "../../../../core/services/api/updateAccount/securityProfileServices/updatePassword";

import Notification from "../../../../core/design/notification";

const SecurityProfile = () => {
  const navigate = useNavigate();

  const [activeField, setActiveField] = useState(null);
  const [verificationStep, setVerificationStep] = useState(false);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [notification, setNotification] = useState({
    id: 0,
    message: "",
    type: "",
  });

  const requestEmailMutation = useMutation({
    mutationFn: RequestUpdateEmail,

    onSuccess: (data) => {
      setNotification((prev) => ({
        id: prev.id + 1,
        message: data.message,
        type: data.success ? "success" : "error",
      }));

      if (data.success) {
        setVerificationStep(true);
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

  const confirmEmailMutation = useMutation({
    mutationFn: ConfirmUpdateEmail,

    onSuccess: (data) => {
      setNotification((prev) => ({
        id: prev.id + 1,
        message: data.message,
        type: data.success ? "success" : "error",
      }));

      if (data.success) {
        setVerificationStep(false);
        setActiveField(null);
        setEmail("");
        setCode("");
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

  const updatePasswordMutation = useMutation({
    mutationFn: UpdatePassword,

    onSuccess: (data) => {
      setNotification((prev) => ({
        id: prev.id + 1,
        message: data.message,
        type: data.success ? "success" : "error",
      }));

      if (data.success) {
        setActiveField(null);

        setPasswords({
          currentPassword: "",
          newPassword: "",
        });
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

  const handleBack = () => {
    if (verificationStep) {
      setVerificationStep(false);
      setCode("");
      return;
    }

    if (activeField) {
      setActiveField(null);
      setEmail("");
      setPasswords({
        currentPassword: "",
        newPassword: "",
      });
      return;
    }

    navigate("/Dashboard/settings");
  };

  const handleRequestEmail = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    requestEmailMutation.mutate({
      target: email.trim(),
    });
  };

  const handleConfirmEmail = (e) => {
    e.preventDefault();

    if (!code.trim()) {
      return;
    }

    confirmEmailMutation.mutate({
      code: code.trim(),
    });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (
      !passwords.currentPassword.trim() ||
      !passwords.newPassword.trim()
    ) {
      return;
    }

    updatePasswordMutation.mutate({
      currentPassword: passwords.currentPassword.trim(),
      newPassword: passwords.newPassword.trim(),
    });
  };

  const isPending =
    requestEmailMutation.isPending ||
    confirmEmailMutation.isPending ||
    updatePasswordMutation.isPending;

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
        disabled={isPending}
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
            Security
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            {verificationStep
              ? "Enter the verification code"
              : activeField === "email"
                ? "Update Email"
                : activeField === "password"
                  ? "Update Password"
                  : "Choose what you want to update"}
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

              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveField("email")}
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
                    Update Email
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Change your email address
                  </p>
                </div>

                <ArrowRight
                  size={18}
                  className="text-zinc-500"
                />
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveField("password")}
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
                    Update Password
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Change your account password
                  </p>
                </div>

                <ArrowRight
                  size={18}
                  className="text-zinc-500"
                />
              </motion.button>

            </motion.div>

          ) : verificationStep ? (

            <motion.form
              key="verification"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onSubmit={handleConfirmEmail}
            >
              <div className="flex items-center gap-2">

                <input
                  autoFocus
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={isPending}
                  placeholder="Enter verification code"
                  inputMode="numeric"
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
                  disabled={isPending}
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
                {confirmEmailMutation.isPending
                  ? "Verifying..."
                  : "Enter the code sent to your new email"}
              </p>
            </motion.form>

          ) : activeField === "email" ? (

            <motion.form
              key="email"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onSubmit={handleRequestEmail}
            >
              <div className="flex items-center gap-2">

                <input
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  placeholder="Enter your new email"
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
                  disabled={isPending}
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
                {requestEmailMutation.isPending
                  ? "Sending verification code..."
                  : "Press Enter to continue"}
              </p>
            </motion.form>

          ) : (

            <motion.form
              key="password"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onSubmit={handleUpdatePassword}
            >

              <div className="space-y-2">

                <input
                  autoFocus
                  type="password"
                  value={passwords.currentPassword}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  disabled={isPending}
                  placeholder="Enter your current password"
                  className="
                    h-12 w-full
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

                <input
                  type="password"
                  value={passwords.newPassword}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  disabled={isPending}
                  placeholder="Enter your new password"
                  className="
                    h-12 w-full
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

                <div className="flex justify-end pt-1">

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.9 }}
                    disabled={isPending}
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

              </div>

              <p className="mt-3 px-1 text-xs text-zinc-600">
                {updatePasswordMutation.isPending
                  ? "Updating password..."
                  : "Press Enter to update"}
              </p>

            </motion.form>

          )}

        </AnimatePresence>
      </div>
    </main>
  );
};

export default SecurityProfile;