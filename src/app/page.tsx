"use client";

import React, { useEffect, useState } from "react";
import JobSearch from "./_components/job-search";
import JobPost from "./_components/job-post";
import AddModal from "./_components/add-modal";
import GlobalStateProvider from "./context/GlobalStateProvider";

export interface JobListings {
  id: number;
  url: string;
  companyName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [jobListings, setJobListings] = useState<JobListings[]>([]);

  const loadJobListings = (): Promise<void> =>
    fetch("/api/listing", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setJobListings(data))
      .catch((err) => console.error(err));

  useEffect((): void => {
    loadJobListings();
  }, []);

  return (
    <GlobalStateProvider>
      <JobSearch openAddModal={() => setShowAddModal(true)} />
      <JobPost jobListings={jobListings} loadJobListings={loadJobListings} />
      <AddModal
        loadJobListings={loadJobListings}
        onClose={() => setShowAddModal(false)}
      />
    </GlobalStateProvider>
  );
}
