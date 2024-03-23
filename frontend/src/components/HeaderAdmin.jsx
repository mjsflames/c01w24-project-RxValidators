import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import NavbarAdmin from "./NavbarAdmin";

const HeaderAdmin = () => {
	return (
		<div className="header w-screen min-h-[120px] ">
			<div className="h-[30px] bg-gray-300"></div>
			<div className="flex items-center px-24 justify-between">
				<Link to="">
					<img src={logo} className="h-32 w-32" />
				</Link>
				<div className="flex-1 flex justify-end items-center">
					<NavbarAdmin />
					<div className="border-black border-l-2 px-12 ">
						<div className="h-full py-2 pl-0 pr-8 font-bold">ADMIN</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeaderAdmin;
