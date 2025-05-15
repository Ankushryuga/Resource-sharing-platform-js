import TaskDetails from "./kanbanboard/taskDetails/taskDetail";
import TaskBoard from "./kanbanboard/taskboard"; // Assuming this is your main board
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/defaultLayout";
import TaskDashBoard from "./kanbanboard/taskDetails/TaskDashBoard";
import { SelectedTaskProvider } from "./context/selectedTaskContext";

const App = () => {
  return (
    <SelectedTaskProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<TaskDashBoard />} />
          <Route path="task/:contentId" element={<TaskBoard />} />
          <Route path="taskdetails/:taskId" element={<TaskDetails />} />{" "}
          {/* dynamic task route */}
        </Route>
      </Routes>
    </BrowserRouter>
    </SelectedTaskProvider>
  );
};

export default App;
