import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";

const Layout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>	);
};

export default Layout;
