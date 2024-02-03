"use client";

import React, { useEffect, useState } from "react";
import JobSearch from "./_components/job-search";
import JobPost from "./_components/job-post";
import AddModal from "./_components/add-modal";
import GlobalStateProvider from "./context/GlobalStateProvider";
import NavBar from "./_components/navbar";
import { getSession, signIn } from "next-auth/react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();

      if (!session) signIn();
      else setLoading(false);
    };

    securePage();
  }, []);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
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
