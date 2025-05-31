import TaskDetails from "./kanbanboard/taskDetails/taskDetail";
import TaskBoard from "./kanbanboard/taskboard"; // Assuming this is your main board
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./layouts/defaultLayout";
import WorkStreamDashBoard from "./kanbanboard/taskDetails/WorkStreamDashBoard";
import { SelectedTaskProvider } from "./context/selectedTaskContext";

const App = () => {
  return (
    <SelectedTaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<WorkStreamDashBoard />} />
            <Route path="workstreams/:contentId" element={<TaskBoard />} />
            <Route
              path="workstreams/assignmentDetails/:taskId"
              element={<TaskDetails />}
            />{" "}
            {/* dynamic task route */}
            {/* Catch-all route for 404s */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SelectedTaskProvider>
  );
};

export default App;
