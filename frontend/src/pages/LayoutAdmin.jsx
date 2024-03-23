import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import PageHeader from "../components/PageHeader";

const LayoutAdmin = () => {
	return (
		<>
			<HeaderAdmin />
			<Outlet />
		</>	);
};

export default LayoutAdmin;
