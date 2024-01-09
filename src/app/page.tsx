"use client";

import React, { useContext } from "react";
import JobSearch from "./_components/job-search";
import JobPost from "./_components/job-post";
import AddModal from "./_components/add-modal";
import GlobalStateProvider, {
  GlobalStateContext,
} from "./context/GlobalStateProvider";

export default function Home() {
  return (
    <GlobalStateProvider>
      <JobSearch />
      <JobPost />
      <AddModal />
    </GlobalStateProvider>
  );
}
