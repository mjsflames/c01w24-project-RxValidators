import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import Navbar from "./Navbar";

const Header = () => {
	return (
		<div className="header w-screen min-h-[120px] ">
			<div className="h-[30px] bg-gray-300"></div>
			<div className="flex items-center px-24 justify-between">
				<Link to="">
					<img src={logo} className="h-32 w-32" />
				</Link>
				<Navbar />
			</div>
		</div>
	);
};

export default Header;
