import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../hooks/useContext";
import useAuth from "../hooks/useAuth";
const RedirectRoute = ({ path }) => {
  const [user, errorMessage] = useAuth();
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
        {" "}
        Loading...
      </div>
    );
  }
  if (user !== undefined) {
    return (
      <UserContext.Provider value={user}>
        <Navigate to={path} replace />
      </UserContext.Provider>
    );
  } else {
    return <Outlet />;
  }
};

export default RedirectRoute;
