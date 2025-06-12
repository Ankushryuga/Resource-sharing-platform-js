// its for lazy loading, later will be adding actual content..
import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

const DefaultLayout = lazy(() => import("../layouts/defaultLayout"));
const LoginPage = lazy(() => import("../components/loginPage"));
const TaskDetails = lazy(() => import("../kanbanboard/taskDetails/taskDetail"));
const TaskBoard = lazy(() => import("../kanbanboard/taskboard"));
const WorkStreamDashBoard = lazy(() =>
  import("../kanbanboard/taskDetails/WorkStreamDashBoard")
);
const CreateNewWorkStreamModel = lazy(() =>
  import("../kanbanboard/taskDetails/CreateNewWorkStreamModel")
);
const WorkStreamsprints=lazy(()=>import("../kanbanboard/workstreamSprints/WorkStreamsprints"))
const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} /> */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DefaultLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<WorkStreamDashBoard active={true} />} />
          {/* <Route path="workstreams/:contentId" element={<TaskBoard />} /> */}
          <Route
            path="workstreams/assignmentDetails/:taskId"
            element={<TaskDetails />}
          />
          <Route
            path="inactiveworkstreams"
            element={<WorkStreamDashBoard active={false} />}
          />
          <Route
            path="createnewworkstreams"
            element={<CreateNewWorkStreamModel />}
          />
          <Route path="workstreams/:contentId" element={<WorkStreamsprints />}/>
<Route path="workstreams/:contentId/sprint/:sprintId" element={<TaskBoard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
