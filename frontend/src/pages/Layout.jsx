import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

const Layout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<PageFooter />
		</>	);
};

export default Layout;
