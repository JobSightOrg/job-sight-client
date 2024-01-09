"use client";

import { createContext, useEffect, useState } from "react";

type GlobalState = {
  jobListings: JobListings[];
  setJobListings: React.Dispatch<React.SetStateAction<JobListings[]>>;
  loadJobListings: () => Promise<void>;
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCompany: string;
  setSelectedCompany: React.Dispatch<React.SetStateAction<string>>;
  urlInput: string;
  setUrlInput: React.Dispatch<React.SetStateAction<string>>;
};

export type JobListings = {
  id: number;
  url: string;
  companyName: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const GlobalStateContext = createContext<GlobalState>({
  jobListings: [],
  setJobListings: () => {},
  loadJobListings: () => Promise.resolve(),
  showAddModal: false,
  setShowAddModal: () => {},
  selectedCompany: "",
  setSelectedCompany: () => {},
  urlInput: "",
  setUrlInput: () => {},
});

export default function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [jobListings, setJobListings] = useState<JobListings[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");

  const loadJobListings = (): Promise<void> =>
    fetch("/api/listing", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setJobListings(data))
      .catch((err) => console.error(err));

  const contextValue: GlobalState = {
    jobListings,
    setJobListings,
    loadJobListings,
    showAddModal,
    setShowAddModal,
    selectedCompany,
    setSelectedCompany,
    urlInput,
    setUrlInput,
  };

  useEffect((): void => {
    loadJobListings();
  }, []);

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
}
