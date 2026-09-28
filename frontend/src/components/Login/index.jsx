import React, { useState } from "react";

import Field from "../../core/design/input";
import { Button } from "../../core/design/button";

import imagePassWord from "../../../public/images/Keyhole-Lock-Circle--Streamline-Plump.svg";
import imageEmail from "../../../public/images/Email-2--Streamline-Cyber (2).png";

import { AnimatePresence, motion } from "framer-motion";
import Notification from "../../core/design/notification";
import LoginRes from "../../core/services/api/auth/login";
import { useMutation } from "@tanstack/react-query";
import Navigate from "../../core/custom/navigate";
import { setAccount } from "../../core/services/switchAccounts";

const Login = () => {
  const [step, setStep] = useState(1);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const navigate = Navigate();

  const {
    mutate,
    isPending,
    isError,
    error
  } = useMutation({
    mutationKey:["login"],
    mutationFn: LoginRes,
    onSuccess: (data) => {
      setAccount(data.data)
      navigate('/Dashboard/profile');
    },
    onError: (error) => {
      console.log(error);
      
    }
  })
  

  const handleNext = (e) => {
    e.preventDefault();

    if (!identifier.trim()) return;

    setStep(2);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    mutate({
      identifier,
      password
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080d14]">

      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/4 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-white/4 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5">

        <form
          onSubmit={step === 1 ? handleNext : handleLogin}
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
                scale: step === 1 ? 1 : 0.96,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={identifier.charAt(0).toUpperCase() || "A"}
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
                  {identifier.charAt(0).toUpperCase() || "💬"}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <div className="relative mt-3 mb-8 min-h-19">

              <AnimatePresence mode="wait">

                {step === 1 ? (
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
                    <span className="block py-3 text-4xl font-semibold tracking-tight text-white">
                      Welcome back
                    </span>

                    <span className="block text-sm text-zinc-500">
                      Enter your identifier
                    </span>
                  </motion.div>
                ) : (
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
                    <span className="block py-3 text-4xl font-semibold tracking-tight text-white">
                      Almost there
                    </span>

                    <span className="block text-sm text-zinc-500">
                      Enter your password
                    </span>
                  </motion.div>
                )}

              </AnimatePresence>

            </div>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">

            {/* STEP 1 */}
            {step === 1 ? (
              <motion.div
                key="identifier"
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
                  plaz="type identifier..."
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  imaged={imageEmail}
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
                    onClick={() => navigate("/register")}
                  >
                    Create Account
                  </button>

                </div>
              </motion.div>
            ) : (

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
                  "
                >
                  <div className="min-w-0">

                    <p className="text-[11px] text-zinc-500">
                      identifier
                    </p>

                    <p className="mt-0.5 truncate text-sm text-zinc-200">
                      {identifier}
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

                <Button type="submit" loading={isPending}>
                  Login
                </Button>

              </motion.div>
            )}

          </AnimatePresence>

        </form>
      </div>

      {
        isError ? 
        <Notification 
          message={ error?.message }
          type="error"
        />
        :
        ""
      }
    </div>
  );
};

export default Login;