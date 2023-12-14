import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAthenticated) navigate("/login");
  }, [isAthenticated, navigate]);

  return isAthenticated ? children : null;
}

export default ProtectedRoute;
