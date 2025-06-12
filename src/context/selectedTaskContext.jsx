// import React, { createContext, useContext, useState, useEffect } from "react";

// const SelectedTaskContext = createContext(null);

// export const useSelectedTask = () => useContext(SelectedTaskContext);

// export const SelectedTaskProvider = ({ children }) => {
//   const [selectedTaskName, setSelectedTaskName] = useState(() => {
//     return localStorage.getItem("selectedTaskName") || "";
//   });

//   const [selectedWorkstream, setSelectedWorkstream] = useState(() => {
//     return localStorage.getItem("selectedWorkstream") || null;
//   });

//   // Sync to localStorage on change
//   useEffect(() => {
//     localStorage.setItem("selectedTaskName", selectedTaskName);
//   }, [selectedTaskName]);

//   useEffect(() => {
//     localStorage.setItem("selectedWorkstream", selectedWorkstream);
//   }, [selectedWorkstream]);

//   return (
//     <SelectedTaskContext.Provider
//       value={{
//         selectedTaskName,
//         setSelectedTaskName,
//         selectedWorkstream,
//         setSelectedWorkstream,
//       }}
//     >
//       {children}
//     </SelectedTaskContext.Provider>
//   );
// };

/// use sessionStorage:
import { createContext, useContext, useState } from "react";
const SelectedTaskContext = createContext(null);

export const SelectedTaskProvider = ({ children }) => {
  const [selectedTaskName, setSelectedTaskName] = useState("");
  const [selectedWorkstream, setSelectedWorkstream] = useState(null);
  const [rootFolder, setRootFolder] = useState("Active Workstreams");
  const [selectedSprintName, setSelectedSprintName]=useState("");
  const [sprintIndex, setSprintIndex]=useState(null);
  return (
    <SelectedTaskContext.Provider
      value={{
        selectedTaskName,
        setSelectedTaskName,
        selectedWorkstream,
        setSelectedWorkstream,
        rootFolder,
        setRootFolder,
        selectedSprintName,
        setSelectedSprintName,
        sprintIndex,
        setSprintIndex
      }}
    >
      {children}
    </SelectedTaskContext.Provider>
  );
};

export const useSelectedTask = () => useContext(SelectedTaskContext);
