"use client";

import React, { useEffect, useState } from "react";
import JobSearch from "./_components/job-search";
import JobPost from "./_components/job-post";
import AddModal from "./_components/add-modal";
import GlobalStateProvider from "./context/GlobalStateProvider";
import NavBar from "./_components/navbar";
import { getSession, signIn } from "next-auth/react";
import Loading from "@/components/loading";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();

      !session ? await signIn() : setLoading(false);
    };

    securePage();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <NavBar />
          <GlobalStateProvider>
            <div className="items-center justify-between pt-10 px-[25rem]">
              <JobSearch />
              <JobPost />
              <AddModal />
            </div>
          </GlobalStateProvider>
        </>
      )}
    </>
  );
}
