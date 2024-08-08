import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { UserContext } from "../hooks/useContext";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  const [user, errorMessage] = useAuth();
  const [showErrorToast, setShowErrorToast] = useState(false);

  useEffect(() => {
    if (errorMessage !== undefined && showErrorToast) {
      alert(errorMessage);
      setShowErrorToast(false);
    }
  }, [errorMessage, showErrorToast]);

  useEffect(() => {
    if (errorMessage !== undefined) {
      setShowErrorToast(true);
    }
  }, [errorMessage]);

  if (user === undefined && errorMessage === undefined) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  if (user !== undefined) {
    return (
      <UserContext.Provider value={user}>
        <Outlet />
      </UserContext.Provider>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
