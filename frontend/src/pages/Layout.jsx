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
			<br className="mb-12" />
			<PageFooter />
		</>
	);
};

export default Layout;
