"use client";

import TextBox from "@/components/textbox";
import Button from "@/components/button";
import Image from "next/image";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import Logo from "@/../public/logo.png";
import NameIcon from "@/../public/assets/icons/name.svg";
import EmailIcon from "@/../public/assets/icons/email.svg";
import PasswordIcon from "@/../public/assets/icons/password.svg";
import ErrorIcon from "@/../public/assets/icons/error.svg";

export default function SignIn() {
  const [isLogin, setLogin] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const name = useRef<string>("");
  const email = useRef<string>("");
  const password = useRef<string>("");

  const signUp = (): void => {
    const data = {
      name: name.current,
      email: email.current,
      password: password.current,
    };

    fetch("/api/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json, text/plain",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errMessage: string = await res.text();

          if (errMessage) throw new Error(errMessage);
          throw new Error(`Error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err: Error) => {
        console.error(err.message);
        setError(err.message);
      });
  };

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
        {error && (
          <>
            <ErrorIcon className="h-7 w-7 m-auto" />
            <div className="w-full items-center text-center border text-customLogoColor-500 border-customLogoColor-100 bg-red-100 rounded-lg mb-3 p-2">
              <div className="break-words">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </>
        )}
        {!isLogin && (
          <TextBox
            className="mb-3"
            placeholder="Full Name"
            onChange={(e) => (name.current = e.target.value)}
          >
            <NameIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
          </TextBox>
        )}
        <TextBox
          className="mb-3"
          placeholder="E-mail"
          onChange={(e) => (email.current = e.target.value)}
        >
          <EmailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
        </TextBox>
        <TextBox
          className="mb-3"
          placeholder="Password (6 or more characters)"
          type={"password"}
          onChange={(e) => (password.current = e.target.value)}
        >
          <PasswordIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
        </TextBox>
        {!isLogin && (
          <TextBox
            className="mb-3"
            placeholder="Verify Password"
            type={"password"}
            onChange={(e) => (password.current = e.target.value)}
          >
            <PasswordIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
          </TextBox>
        )}
        {isLogin ? (
          <>
            <Button
              className="mt-5"
              onClick={() =>
                signIn("credentials", {
                  email: email.current,
                  password: password.current,
                  redirect: false,
                })
              }
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
