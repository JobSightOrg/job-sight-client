"use client";

import TextBox from "@/components/textbox";
import Button from "@/components/button";
import { useRef } from "react";

export default function SignIn() {
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
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full flex justify-center items-center h-screen bg-gradient-to-br">
      <div className="w-[400px] p-4 shadow bg-white rounded-md flex flex-col gap-2">
        <TextBox
          labelText="Full Name"
          placeholder="Enter you name"
          onChange={(e) => (name.current = e.target.value)}
        />
        <TextBox
          labelText="Email Address"
          placeholder="name@address.com"
          onChange={(e) => (email.current = e.target.value)}
        />
        <TextBox
          labelText="Password (6 or more characters)"
          placeholder="Enter your password"
          type={"password"}
          onChange={(e) => (password.current = e.target.value)}
        />
        <Button className="mt-5" onClick={() => signUp()}>
          Sign Up
        </Button>
        <div className="flex mt-2 justify-center">
          <span>
            Have an account? <u className="font-bold cursor-pointer">Login</u>
          </span>
        </div>
      </div>
    </div>
  );
}
