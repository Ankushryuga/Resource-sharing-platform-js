import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { SelectedTaskProvider } from "./context/selectedTaskContext";
import { AuthProvider } from "./context/authContext";
import AppRoutes from "./routes/routes";

const App = () => {
  return (
    <AuthProvider>
      <SelectedTaskProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SelectedTaskProvider>
    </AuthProvider>
  );
};

export default App;
