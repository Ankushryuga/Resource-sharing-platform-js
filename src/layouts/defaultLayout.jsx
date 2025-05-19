// import Header from "./header";
// import SideMenu from "./sidemenu";
// import AppContent from "./appContent";
// import { Outlet } from "react-router-dom";

// const DefaultLayout = () => {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div
//         className="w-60 text-white items-center"
//         style={{ backgroundColor: "#0b1b36" }} // ✅ correct single #!
//       >
//         <SideMenu />
//       </div>

//       {/* Main Area */}
//       <div className="flex flex-col flex-1 bg-white overflow-y-auto">
//         <Header />
//         <AppContent />
//       </div>
//     </div>
//   );
// };

// export default DefaultLayout;

// DefaultLayout.jsx
import Header from "./header";
import SideMenu from "./sidemenu";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className="w-50 text-white items-center"
        style={{ backgroundColor: "#0b1b36" }}
      >
        <SideMenu />
      </div>

      {/* Main Area */}
      <div className="flex flex-col flex-1 bg-white overflow-y-auto">
        <Header />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet /> {/* This renders TaskBoard or TaskDetails */}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
