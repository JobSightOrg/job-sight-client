"use client";

import { createContext, useState } from "react";
import { JobListings, ModalFormData } from "../_types/custom";

type GlobalState = {
  jobListings: JobListings[];
  setJobListings: React.Dispatch<React.SetStateAction<JobListings[]>>;
  loadJobListings: () => Promise<void>;
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalFormData: ModalFormData;
  setModalFormData: React.Dispatch<React.SetStateAction<ModalFormData>>;
};

export const GlobalStateContext = createContext<GlobalState>({
  jobListings: [],
  setJobListings: () => {},
  loadJobListings: () => Promise.resolve(),
  showAddModal: false,
  setShowAddModal: () => {},
  editModal: false,
  setEditModal: () => {},
  modalFormData: {
    url: "",
    companyName: "",
    applicationStatus: "",
    jobType: "",
    positionTitle: "",
    location: "",
    applied: null,
    interview: null,
    offer: null,
    screen: null,
  },
  setModalFormData: () => {},
});

export default function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [jobListings, setJobListings] = useState<JobListings[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [modalFormData, setModalFormData] = useState<ModalFormData>({
    url: "",
    companyName: "",
    applicationStatus: "",
    jobType: "",
    positionTitle: "",
    location: "",
    applied: null,
    interview: null,
    offer: null,
    screen: null,
  });

  const loadJobListings = (): Promise<void> =>
    fetch("/api/listings", {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setJobListings(data))
      .catch((err) => console.error(err));

  const contextValue: GlobalState = {
    loadJobListings,
    jobListings,
    setJobListings,
    showAddModal,
    setShowAddModal,
    editModal,
    setEditModal,
    modalFormData,
    setModalFormData,
  };

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
}
