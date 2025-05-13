import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/defaultLayout";
import TaskDetails from "./kanbanboard/taskDetails/taskDetail";
// import TaskBoard from "./kanbanboard/TaskBoard"; // Assuming this is your main board

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* <Route index element={<TaskBoard />} /> */}
          <Route path="/taskdetails/:taskId" element={<TaskDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
