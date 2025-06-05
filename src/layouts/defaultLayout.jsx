import Header from "./header";
import SideMenu from "./sidemenu";
import AppContent from "./appContent";
import { Outlet } from "react-router-dom";

// // const DefaultLayout = () => {
// //   return (
// //     <div className="flex h-screen">
// //       {/* Sidebar */}
// //       <div
// //         className="w-60 text-white items-center"
// //         style={{ backgroundColor: "#0b1b36" }} // ✅ correct single #!
// //       >
// //         <SideMenu />
// //       </div>

// //       {/* Main Area */}
// //       <div className="flex flex-col flex-1 bg-white overflow-y-auto">
// //         <Header />
// //         <AppContent />
// //       </div>
// //     </div>
// //   );
// // };

// // export default DefaultLayout;

// // DefaultLayout.jsx
// import Header from "./header";
// import SideMenu from "./sidemenu";
// import { Outlet } from "react-router-dom";
// // import { useState } from "react";
// // import CreateNewWorkStreamModel from "../kanbanboard/taskDetails/CreateNewWorkStreamModel";

// const DefaultLayout = () => {
//   // const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div
//         className="w-50 text-white items-center"
//         style={{ backgroundColor: "#0b1b36" }}
//       >
//         <SideMenu />
//       </div>

//       {/* Main Area */}
//       <div className="flex flex-col flex-1 bg-white overflow-y-auto">
//         <Header />
//         <div className="flex-1 overflow-y-auto p-4">
//           <Outlet /> {/* This renders TaskBoard or TaskDetails */}
//           {/* {isModalOpen ? (
//             <CreateNewWorkStreamModel onClose={() => setIsModalOpen(false)} />
//           ) : (
//             <Outlet />
//           )} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DefaultLayout;
// DefaultLayout.jsx
import { useLocation } from "react-router-dom";

const DefaultLayout = () => {
  const location = useLocation();

  let createNewType = null;

  if (location.pathname === "/dashboard") {
    createNewType = "workstream";
  } else if (location.pathname.includes("sprints")) {
    createNewType = "sprint";
  } else if (location.pathname.includes("tasks")) {
    createNewType = "task";
  }

  return (
    <div className="flex h-screen">
      <div
        className="w-50 text-white items-center"
        style={{ backgroundColor: "#0b1b36" }}
      >
        <SideMenu />
      </div>

      <div className="flex flex-col flex-1 bg-white overflow-y-auto">
        <Header createNewType={createNewType} />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default DefaultLayout;
