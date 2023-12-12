"use client";

import TextBox from "@/components/textbox";
import Button from "@/components/button";
import Image from "next/image";
import { useRef } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const email = useRef<string>("");
  const password = useRef<string>("");

  return (
    <div className="w-full flex justify-center items-center h-screen bg-gradient-to-br">
      <div className="w-[400px] p-4 shadow bg-white rounded-md flex flex-col gap-2">
        <TextBox
          labelText="Email Address"
          placeholder="name@address.com"
          onChange={(e) => (email.current = e.target.value)}
        />
        <TextBox
          labelText="Password"
          placeholder="Enter your password"
          type={"password"}
          onChange={(e) => (password.current = e.target.value)}
        />
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
            <u className="font-bold cursor-pointer">Sign Up</u>
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
      </div>
    </div>
  );
}
