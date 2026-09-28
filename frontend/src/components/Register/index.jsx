import React, { useState } from "react";

import Field from "../../core/design/input";
import { Button } from "../../core/design/button";

import imagePassWord from "../../../public/images/Keyhole-Lock-Circle--Streamline-Plump.svg";
import imageEmail from "../../../public/images/Email-2--Streamline-Cyber (2).png";
import imageName from "../../../public/images/User-Identifier-Card--Streamline-Flex (3).png";
import imageUser from "../../../public/images/User-Circle-Single--Streamline-Flex.svg";

import { AnimatePresence, motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";

import RegisterServices from "../../core/services/api/auth/register";
import Notification from "../../core/design/notification";
import { useNavigate } from "react-router-dom";
import { setAccount } from "../../core/services/switchAccounts";

const Register = () => {
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const [notification, setNotification] = useState({
    id: 0,
    message: "",
    type: "",
  });

  const registerMutation = useMutation({
    mutationFn: RegisterServices,

    onSuccess: (data) => {
      setNotification((prev) => ({
        id: prev.id + 1,
        message: data.message,
        type: data.success ? "success" : "error",
      }));

      if (data.success) {
        setAccount(data.data)
        navigate("/Dashboard/profile")
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

  const handleNext = (e) => {
    e.preventDefault();

    if (registerMutation.isPending) {
      return;
    }

    if (step === 1) {
      if (!name.trim()) return;

      setStep(2);
      return;
    }

    if (step === 2) {
      if (!email.trim()) return;

      setStep(3);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (registerMutation.isPending) {
      return;
    }

    if (!name.trim() || !email.trim() || !password.trim()) {
      return;
    }

    registerMutation.mutate({
      fullname: name.trim(),
      email: email.trim(),
      password: password.trim(),
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080d14]">

      <AnimatePresence>
        {notification.message && (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
          />
        )}
      </AnimatePresence>

      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/4 blur-3xl" />

      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-white/4 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5">

        <form
          onSubmit={step === 3 ? handleRegister : handleNext}
          className="w-full max-w-100"
        >

          <div className="text-center">

            <motion.div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border border-white/10
                bg-white/6
              "
              animate={{
                scale: step === 3 ? 0.96 : 1,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <AnimatePresence mode="wait" initial={false}>

                <motion.span
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                    y: 4,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.7,
                    y: -4,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block text-lg font-semibold text-white"
                >
                  <img src={imageUser} alt="" className="h-8 w-8" />
                </motion.span>

              </AnimatePresence>

            </motion.div>

            <div className="relative mt-3 mb-8 min-h-19">

              <AnimatePresence mode="wait">

                {step === 1 && (

                  <motion.div
                    key="name-header"
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -12,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >

                    <span
                      className="
                        block
                        py-3
                        text-4xl
                        font-semibold
                        tracking-tight
                        text-white
                      "
                    >
                      Create account
                    </span>

                    <span className="block text-sm text-zinc-500">
                      What's your name?
                    </span>

                  </motion.div>

                )}

                {step === 2 && (

                  <motion.div
                    key="email-header"
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -12,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >

                    <span
                      className="
                        block
                        py-3
                        text-4xl
                        font-semibold
                        tracking-tight
                        text-white
                      "
                    >
                      Almost there
                    </span>

                    <span className="block text-sm text-zinc-500">
                      Enter your email
                    </span>

                  </motion.div>

                )}

                {step === 3 && (

                  <motion.div
                    key="password-header"
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -12,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >

                    <span
                      className="
                        block
                        py-3
                        text-4xl
                        font-semibold
                        tracking-tight
                        text-white
                      "
                    >
                      Secure your account
                    </span>

                    <span className="block text-sm text-zinc-500">
                      Create a strong password
                    </span>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          </div>

          <AnimatePresence mode="wait">

            {step === 1 && (

              <motion.div
                key="name"
                initial={{
                  opacity: 0,
                  x: -20,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: 20,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="space-y-4"
              >

                <Field
                  type="text"
                  plaz="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  imaged={imageName}
                />

                <Button type="submit">
                  Next
                </Button>

                <div className="text-right mt-2">

                  <button
                    type="button"
                    className="
                      w-full
                      block
                      text-xs
                      text-zinc-500
                      transition
                      hover:text-white
                    "
                    onClick={() => navigate("/login")}
                  >
                    Login to your account
                  </button>

                </div>

              </motion.div>

            )}

            {step === 2 && (

              <motion.div
                key="email"
                initial={{
                  opacity: 0,
                  x: 20,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: -20,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="space-y-4"
              >

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={registerMutation.isPending}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-white/3
                    px-4
                    py-3
                    text-left
                    transition
                    hover:bg-white/5
                    disabled:pointer-events-none
                    disabled:opacity-50
                  "
                >

                  <div className="min-w-0">

                    <p className="text-[11px] text-zinc-500">
                      Name
                    </p>

                    <p className="mt-0.5 truncate text-sm text-zinc-200">
                      {name}
                    </p>

                  </div>

                  <span className="ml-3 text-xs text-zinc-500">
                    Change
                  </span>

                </button>

                <Field
                  type="email"
                  plaz="EmailAddress"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  imaged={imageEmail}
                />

                <Button type="submit">
                  Next
                </Button>

              </motion.div>

            )}

            {step === 3 && (

              <motion.div
                key="password"
                initial={{
                  opacity: 0,
                  x: 20,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: -20,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="space-y-4"
              >

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={registerMutation.isPending}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-white/3
                    px-4
                    py-3
                    text-left
                    transition
                    hover:bg-white/5
                    disabled:pointer-events-none
                    disabled:opacity-50
                  "
                >

                  <div className="min-w-0">

                    <p className="text-[11px] text-zinc-500">
                      Name
                    </p>

                    <p className="mt-0.5 truncate text-sm text-zinc-200">
                      {name}
                    </p>

                  </div>

                  <span className="ml-3 text-xs text-zinc-500">
                    Change
                  </span>

                </button>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={registerMutation.isPending}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-white/3
                    px-4
                    py-3
                    text-left
                    transition
                    hover:bg-white/5
                    disabled:pointer-events-none
                    disabled:opacity-50
                  "
                >

                  <div className="min-w-0">

                    <p className="text-[11px] text-zinc-500">
                      Email address
                    </p>

                    <p className="mt-0.5 truncate text-sm text-zinc-200">
                      {email}
                    </p>

                  </div>

                  <span className="ml-3 text-xs text-zinc-500">
                    Change
                  </span>

                </button>

                <Field
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  imaged={imagePassWord}
                />

                <Button
                  type="submit"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending
                    ? "Creating account..."
                    : "Create account"}
                </Button>

              </motion.div>

            )}

          </AnimatePresence>

        </form>
      </div>
    </div>
  );
};

export default Register;