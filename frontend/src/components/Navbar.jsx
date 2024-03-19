import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="w-1/3 flex gap-4">
			<Link to="/" className=" text-gray-800">
				Home
    </Link>
		<div className="mr-4 flex gap-4">
			<Link to="#" className=" text-gray-800">
				HELP
			</Link>
			<Link to="patient" className=" text-gray-800">
				My Prescriptions
			</Link>
			<Link to="#" className=" text-gray-800">
				Green Resources
			</Link>
			<Link to="account" className=" text-gray-800">
				My Account
			</Link>
			|
			<Link to="log" className=" text-gray-800">
				Log PaRx
			</Link>
		</div>
	);
};

export default Navbar;
