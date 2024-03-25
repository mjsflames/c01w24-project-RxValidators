import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import Navbar from "./Navbar";
import { UserContext } from "../App";

const Header = () => {
	const userContext = useContext(UserContext);
	return (
		<div className="header w-screen min-h-[120px] ">
			<div className="h-[30px] bg-gray-300"></div>
			<div className="flex items-center px-24 justify-between">
				<Link to="">
					<img src={logo} className="h-32 w-32" />
				</Link>
				<div className="flex-1 flex justify-end items-center">
					<Navbar />
					<div className="border-black border-l-2 px-12 ">
						{userContext.user ? (
						<Link to={"/account"} className="text-black">
							<div className="border-2 border-black h-full py-2 px-8 rounded-md">
								Account
							</div>
						</Link>
							) : (
						<Link to={"/login"} className="text-black">
							<div className="border-2 border-black h-full py-2 px-8 rounded-md">
								Login
							</div>
						</Link>
							)
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
