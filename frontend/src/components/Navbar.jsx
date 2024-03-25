import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
	const userContext = useContext(UserContext);

	const assignedLinks = {
		admin: [
			{ to: "/temp-links", text: "DEV" },
			{ to: "/", text: "Home" },
			{ to: "/temp-links", text: "DEV" },
			{ to: "/account", text: "My Account" },
			{ to: "/log", text: "Log PaRx" },
		],
		prescriber: [
			{ to: "/temp-links", text: "DEV" },
			{ to: "/", text: "Home" },
			{ to: "/temp-links", text: "DEV" },
			{ to: "/account", text: "My Account" },
			{ to: "/log", text: "Log PaRx" },
		],
		patient: [
			{ to: "/temp-links", text: "DEV" },
			{ to: "/", text: "Home" },
			{ to: "/patient", text: "My Prescriptions" },
			{ to: "/green-resources", text: "Green Resources" },
			{ to: "/account", text: "My Account" },
			{ to: "/log", text: "Log PaRx" },
		],
		any: [
			{ to: "/temp-links", text: "DEV" },
			{ to: "/", text: "Home" },
			{ to: "#", text: "FAQ" },
			{ to: "/login", text: "Login" },
			{ to: "/register", text: "Register" },
		],
	};

	const myLinks = userContext.user && assignedLinks[userContext.user.role] || assignedLinks.any;


	return (
		<div className="mr-4 flex gap-4">
			{myLinks.map((link, index) => (
				<Link key={index} to={link.to} className=" text-gray-800 hover:text-[#556e4d]">
					{link.text}
				</Link>

			))}
		</div>
	);
};

export default Navbar;