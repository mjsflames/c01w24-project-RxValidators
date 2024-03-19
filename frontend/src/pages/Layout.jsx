import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
	return (
		<>
			<Header />
			<div>
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
