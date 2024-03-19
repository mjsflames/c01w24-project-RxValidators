import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="mr-4 flex gap-4">
			<Link to="/temp-links" className=" text-gray-800">
				DEV
   			</Link>
			<Link to="/" className=" text-gray-800">
				Home
   			</Link>
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
