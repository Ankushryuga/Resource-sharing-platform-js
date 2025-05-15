import React, { createContext, useContext, useState, useEffect } from "react";

const SelectedTaskContext = createContext(null);

export const useSelectedTask = () => useContext(SelectedTaskContext);

export const SelectedTaskProvider = ({ children }) => {
  const [selectedTaskName, setSelectedTaskName] = useState(() => {
    return localStorage.getItem("selectedTaskName") || "";
  });

  const [selectedWorkstream, setSelectedWorkstream] = useState(() => {
    return localStorage.getItem("selectedWorkstream") || null;
  });

  // Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem("selectedTaskName", selectedTaskName);
  }, [selectedTaskName]);

  useEffect(() => {
    localStorage.setItem("selectedWorkstream", selectedWorkstream);
  }, [selectedWorkstream]);

  return (
    <SelectedTaskContext.Provider
      value={{
        selectedTaskName,
        setSelectedTaskName,
        selectedWorkstream,
        setSelectedWorkstream,
      }}
    >
      {children}
    </SelectedTaskContext.Provider>
  );
};
