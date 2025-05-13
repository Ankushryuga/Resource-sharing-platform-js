// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import DefaultLayout from "./layouts/defaultLayout";
import TaskDetails from "./kanbanboard/taskDetails/taskDetail";
import TaskBoard from "./kanbanboard/taskboard"; // Assuming this is your main board

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<DefaultLayout />}>
//           <Route path="/taskdetails" element={<TaskDetails />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/defaultLayout";
// import TaskBoard from "./kanbanboard/TaskBoard"; // Add this
// import TaskDetails from "./kanbanboard/taskDetails/taskDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<TaskBoard />} /> {/* default route for '/' */}
          <Route path="taskdetails" element={<TaskDetails />} />{" "}
          {/* dynamic task route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
