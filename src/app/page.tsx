"use client";

import { useEffect, useState } from "react";
import JobSearch from "./_components/job-search";
import JobPost from "./_components/job-post";
import AddModal from "./_components/add-modal";

export interface JobListings {
  id?: number;
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
    <main className="items-center justify-between pt-10 px-[20rem]">
      <JobSearch openAddModal={() => setShowAddModal(true)} />
      <JobPost jobListings={jobListings} />
      <AddModal
        isVisible={showAddModal}
        loadJobListings={loadJobListings}
        onClose={() => setShowAddModal(false)}
      />
    </main>
  );
}
