import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

const Layout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<div className="flex-1">
				<Outlet />
			</div>
			<PageFooter />
		</div>
	);
};

export default Layout;
