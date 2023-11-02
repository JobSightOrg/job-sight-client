"use client";

import React from "react";
import JobSearch from "./_components/job-search";
import JobPost from "./_components/job-post";
import AddModal from "./_components/add-modal";

export default function Home() {
  const [showAddModal, setShowAddModal] = React.useState(false);

  return (
    <main className="items-center justify-between pt-10 px-[20rem]">
      <JobSearch openAddModal={() => setShowAddModal(true)} />
      <JobPost />
      <AddModal
        isVisible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </main>
  );
}
