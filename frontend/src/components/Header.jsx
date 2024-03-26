import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import Navbar from "./Navbar";
import { UserContext } from "../App";

const Header = () => {
	const userContext = useContext(UserContext);
	return (
		<div className="header w-full min-h-[120px] ">
			<div className="h-[30px] bg-gray-100 pl-[15px] py-[5px] font-[600] text-PaRxDBlue">Visit <Link to="https://www.parkprescriptions.ca/" className="text-[#767a4c] font-[600]">parkprescriptions.ca →</Link></div>
			<div className="flex items-center px-12 justify-between bg-gray-50">
				<Link to="">
					<img src={logo} className="h-32 w-32" />
				</Link>
				<div className="flex-1 flex justify-end items-center">
					<Navbar />
					<div className="border-black border-l-2 px-12 ">
						<p className="mb-3 font-semibold text-">Hello, First Name</p>
						{userContext.user ? (
						<Link to={"/logout"} className="text-black">
							<div className="border-2 border-black h-full py-2 px-8 rounded-md">
								Sign Out
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