"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Logo from "~/public/logo.png";
import DefaultPicture from "~/public/assets/icons/vercel.svg";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-customLogoColor-500 via-customLogoColor-400 to-customLogoColor-300 w-full px-4 py-2">
      <Image className="w-[180px]" src={Logo} alt="Logo" priority={true} />
      <div className="flex items-center justify-between">
        {session?.user && (
          <Image
            className="mr-5"
            src={session.user?.image ?? DefaultPicture}
            alt="Profile"
            width={50}
            height={50}
          />
        )}
        <p
          className="font-bold text-xl hover:underline hover:cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
        >
          Logout
        </p>
      </div>
    </nav>
  );
}
