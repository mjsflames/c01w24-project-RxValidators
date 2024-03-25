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
		],
		prescriber: [
			{ to: "/", text: "Home" },
			{ to: "/prescriberPrescriptions", text: "My Prescriptions" },
			{ to: "/PrescriberLogRX", text: "Log PaRx" },
			{ to: "/green-resources", text: "Green Resources" },
			{ to: "/prescriberSettings", text: "My Account" },
		],
		patient: [
			{ to: "/", text: "Home" },
			{ to: "/patientPrescriptions", text: "My Prescriptions" },
			{ to: "/PatientLogRX", text: "Log PaRx" },
			{ to: "/green-resources", text: "Green Resources" },
			{ to: "/patientSettings", text: "My Account" },
		],
		any: [
			{ to: "/temp-links", text: "DEV" },
			{ to: "/", text: "Home" },
			{ to: "#", text: "FAQ" },
			{ to: "/login", text: "Login" },
			{ to: "/", text: "Register" },
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