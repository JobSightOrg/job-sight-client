"use client";

import { createContext, useState } from "react";

type GlobalState = {
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCompany: string;
  setSelectedCompany: React.Dispatch<React.SetStateAction<string>>;
  urlInput: string;
  setUrlInput: React.Dispatch<React.SetStateAction<string>>;
};

export const GlobalStateContext = createContext<GlobalState>({
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCompany, setSelectedCompany] =
    useState<string>("Select Company");
  const [urlInput, setUrlInput] = useState<string>("");

  const contextValue: GlobalState = {
    showAddModal,
    setShowAddModal,
    selectedCompany,
    setSelectedCompany,
    urlInput,
    setUrlInput,
  };

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
}
