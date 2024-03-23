import React from "react";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
	return (
		<div className="mr-4 flex gap-4">
			<Link to="/temp-links" className=" text-gray-800">
				DEV
   			</Link>
			<Link to="/" className=" text-gray-800">
				Home
   			</Link>
			<Link to="adminPatientProfile" className=" text-gray-800">
				Patient Profiles
			</Link>
			<Link to="adminPrescriberProfile" className=" text-gray-800">
				Prescriber Profiles
			</Link>
			<Link to="/verify" className=" text-gray-800">
				Verification Platform
			</Link>
			<Link to="account" className=" text-gray-800">
				My Account
			</Link>
		</div>
	);
};

export default NavbarAdmin;
