"use client";

import TextBox from "@/components/textbox";
import Button from "@/components/button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import Logo from "@/../public/logo.png";
import NameIcon from "@/../public/assets/icons/name.svg";
import EmailIcon from "@/../public/assets/icons/email.svg";
import PasswordIcon from "@/../public/assets/icons/password.svg";
import ErrorIcon from "@/../public/assets/icons/error.svg";

interface ErrorMsgObj {
  name?: string;
  email?: string;
  password?: string;
  verifyPassword?: string;
}

export default function Login() {
  const isMounted = useRef(false);
  const [isLogin, setLogin] = useState<boolean>(true);
  const [error, setError] = useState<ErrorMsgObj | null>(null);
  const [apiErrorMsg, setApiErrorMsg] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");

  const signUp = (): void => {
    if (!verifyForm()) return;

    const data = {
      name,
      email,
      password,
    };

    // fetch("/api/register", {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json, text/plain",
    //   },
    //   method: "POST",
    //   body: JSON.stringify(data),
    // })
    //   .then(async (res) => {
    //     if (!res.ok) {
    //       const errMessage: string = await res.text();

    //       if (errMessage) throw new Error(errMessage);
    //       throw new Error(`Error status: ${res.status}`);
    //     }
    //     return res.json();
    //   })
    //   .then((data) => console.log(data))
    //   .catch((err: Error) => {
    //     console.error(err.message);
    //     setApiErrorMsg(err.message);
    //   });
  };

  const resetState = () => {
    setName("");
    setEmail("");
    setPassword("");
    setVerifyPassword("");
    setError(null);
    setApiErrorMsg(null);
  };

  const verifyForm = (): boolean => {
    let currError: ErrorMsgObj = {};

    if (!email) currError.email = "Email is required";
    if (password.length < 6)
      currError.password = "Password length must be at least 6 characters";

    if (!isLogin) {
      if (!name) currError.name = "Name is required";
      if (password !== verifyPassword)
        currError.verifyPassword = "Passwords do not match";
    }

    const isValid: boolean = Object.keys(currError).length === 0;

    if (!isValid) setError(currError);

    return isValid;
  };

  const isValidEmail = (email: string): boolean => {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regex
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("isLogin", isLogin.toString());
      resetState();
    }
  }, [isLogin]);

  useEffect((): void => {
    if (!isMounted.current) {
      const localStorageLogin = localStorage.getItem("isLogin");

      if (localStorageLogin) {
        const parsedLocalStorageLogin = JSON.parse(localStorageLogin);

        typeof parsedLocalStorageLogin === "boolean" &&
          setLogin(parsedLocalStorageLogin);
      }
    }

    isMounted.current = true;
  }, []);

  return (
    <div className="w-full flex justify-center items-center h-screen bg-gradient-to-br">
      <div className="w-[400px] p-4 shadow bg-white rounded-md flex flex-col gap-2">
        <div className="flex justify-center items-center mb-5">
          <Image className="w-[200px]" src={Logo} alt="Logo" priority={true} />
        </div>
        <div className="w-full h-[50px] flex justify-center items-center border border-black-700 rounded-lg mb-5">
          <Button
            className={`w-1/2 h-full ${
              isLogin &&
              "bg-gradient-to-r from-customLogoColor-500 via-customLogoColor-300 to-customLogoColor-200"
            }`}
            variant={isLogin ? "primary" : "none"}
            onClick={() => setLogin(true)}
          >
            Login
          </Button>
          <Button
            className={`w-1/2 h-full ${
              !isLogin &&
              "bg-gradient-to-l from-customLogoColor-500 via-customLogoColor-300 to-customLogoColor-200"
            }`}
            variant={!isLogin ? "primary" : "none"}
            onClick={() => setLogin(false)}
          >
            Register
          </Button>
        </div>
        {apiErrorMsg && (
          <>
            <ErrorIcon className="h-7 w-7 m-auto" />
            <div className="w-full items-center text-center border text-customLogoColor-500 border-customLogoColor-100 bg-red-100 rounded-lg mb-3 p-2">
              <div className="break-words">
                <p className="text-sm">{apiErrorMsg}</p>
              </div>
            </div>
          </>
        )}
        {!isLogin && (
          <TextBox
            className="mb-3"
            placeholder="Full Name"
            error={name ? null : error?.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            <NameIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
          </TextBox>
        )}
        <TextBox
          className="mb-3"
          placeholder="E-mail"
          error={email ? null : error?.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        >
          <EmailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
        </TextBox>
        <TextBox
          className="mb-3"
          placeholder="Password (6 or more characters)"
          type={"password"}
          error={password.length >= 6 ? null : error?.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <PasswordIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
        </TextBox>
        {!isLogin && (
          <TextBox
            className="mb-3"
            placeholder="Verify Password"
            type={"password"}
            error={verifyPassword === password ? null : error?.verifyPassword}
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
          >
            <PasswordIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
          </TextBox>
        )}
        {isLogin ? (
          <>
            <Button
              className="mt-5"
              onClick={() => {
                if (verifyForm())
                  signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                  });
              }}
            >
              Log In
            </Button>
            <div className="flex mt-2 justify-center">
              <span>
                Don&apos;t have an account?{" "}
                <u
                  className="font-bold cursor-pointer"
                  onClick={() => setLogin(false)}
                >
                  Sign Up
                </u>
              </span>
            </div>
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                or
              </span>
            </div>
            <Button
              className="flex justify-center align-middle px-[1rem] py-[0.75rem]"
              variant="github"
              onClick={() => signIn("github")}
            >
              <Image
                loading="lazy"
                height={24}
                width={24}
                src="https://authjs.dev/img/providers/github.svg"
                alt="Github Logo"
              />
              <span className="flex-grow mr-[24px]">Sign in with Github</span>
            </Button>
            <Button
              className="flex justify-start align-middle px-[1rem] py-[0.75rem]"
              variant="google"
              onClick={() => signIn("google")}
            >
              <Image
                loading="lazy"
                height={24}
                width={24}
                src="https://authjs.dev/img/providers/google.svg"
                alt="Google Logo"
              />
              <span className="flex-grow mr-[24px]">Sign in with Google</span>
            </Button>
          </>
        ) : (
          <>
            <Button className="mt-5" onClick={() => signUp()}>
              Sign Up
            </Button>
            <div className="flex mt-2 justify-center">
              <span>
                Have an account?{" "}
                <u
                  className="font-bold cursor-pointer"
                  onClick={() => setLogin(true)}
                >
                  Login
                </u>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
