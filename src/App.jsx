import TaskDetails from "./kanbanboard/taskDetails/taskDetail";
import TaskBoard from "./kanbanboard/taskboard"; // Assuming this is your main board
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/defaultLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<TaskBoard />} /> {/* default route for '/' */}
          <Route path="taskdetails/:taskId" element={<TaskDetails />} />{" "}
          {/* dynamic task route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
