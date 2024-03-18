import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../App";

const ProtectedRoute = ({ permitted, redirectTo, children }) => {
	// Get the user from the context

	const { user } = useContext(UserContext);

	const isPermitted = user && permitted.includes(user.role); //.some((role) => user.roles.includes(role));

	if (!isPermitted) return <Navigate to={redirectTo} replace />;

	return children ? children : <Outlet />;
};

export default ProtectedRoute;
