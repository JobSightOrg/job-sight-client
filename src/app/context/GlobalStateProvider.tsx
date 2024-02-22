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
  selectedApplicationStatus: string;
  setSelectedApplicationStatus: React.Dispatch<React.SetStateAction<string>>;
  selectedJobType: string;
  setSelectedJobType: React.Dispatch<React.SetStateAction<string>>;
  urlInput: string;
  setUrlInput: React.Dispatch<React.SetStateAction<string>>;
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  selectedApplicationStatus: "",
  setSelectedApplicationStatus: () => {},
  selectedJobType: "",
  setSelectedJobType: () => {},
  urlInput: "",
  setUrlInput: () => {},
  editModal: false,
  setEditModal: () => {},
});

export default function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [jobListings, setJobListings] = useState<JobListings[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedApplicationStatus, setSelectedApplicationStatus] =
    useState<string>("");
  const [selectedJobType, setSelectedJobType] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const [editModal, setEditModal] = useState<boolean>(false);

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
    selectedApplicationStatus,
    setSelectedApplicationStatus,
    selectedJobType,
    setSelectedJobType,
    urlInput,
    setUrlInput,
    editModal,
    setEditModal,
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
