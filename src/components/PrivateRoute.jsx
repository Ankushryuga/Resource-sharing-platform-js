import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PrivateRoute = ({ children }) => {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated=true; //temprary.
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
