"use client";

import { createContext, useEffect, useState } from "react";

type GlobalState = {
  jobListings: JobListings[];
  setJobListings: React.Dispatch<React.SetStateAction<JobListings[]>>;
  loadJobListings: () => void;
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  company: string;
  setCompany: React.Dispatch<React.SetStateAction<string>>;
  applicationStatus: string;
  setApplicationStatus: React.Dispatch<React.SetStateAction<string>>;
  jobType: string;
  setJobType: React.Dispatch<React.SetStateAction<string>>;
  positionTitle: string;
  setPositionTitle: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  urlInput: string;
  setUrlInput: React.Dispatch<React.SetStateAction<string>>;
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type JobListings = {
  id: number;
  url: string;
  companyName: string;
  applicationStatus: string;
  jobType: string;
  positionTitle: string;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const GlobalStateContext = createContext<GlobalState>({
  jobListings: [],
  setJobListings: () => {},
  loadJobListings: () => {},
  showAddModal: false,
  setShowAddModal: () => {},
  company: "",
  setCompany: () => {},
  applicationStatus: "",
  setApplicationStatus: () => {},
  jobType: "",
  setJobType: () => {},
  positionTitle: "",
  setPositionTitle: () => {},
  location: "",
  setLocation: () => {},
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
  const [company, setCompany] = useState<string>("");
  const [applicationStatus, setApplicationStatus] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [positionTitle, setPositionTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const [editModal, setEditModal] = useState<boolean>(false);

  const loadJobListings = (): void => {
    // const data = { email };

    fetch("/api/listing", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setJobListings(data))
      .catch((err) => console.error(err));
  };

  const contextValue: GlobalState = {
    jobListings,
    setJobListings,
    loadJobListings,
    showAddModal,
    setShowAddModal,
    company,
    setCompany,
    applicationStatus,
    setApplicationStatus,
    jobType,
    setJobType,
    positionTitle,
    setPositionTitle,
    location,
    setLocation,
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
