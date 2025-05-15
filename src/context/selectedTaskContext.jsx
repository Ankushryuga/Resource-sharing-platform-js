import React, { createContext, useContext, useState } from "react";

const SelectedTaskContext = createContext(null);

export const useSelectedTask = () => useContext(SelectedTaskContext);

export const SelectedTaskProvider = ({ children }) => {
  const [selectedTaskName, setSelectedTaskName] = useState("");

  return (
    <SelectedTaskContext.Provider value={{ selectedTaskName, setSelectedTaskName }}>
      {children}
    </SelectedTaskContext.Provider>
  );
};
