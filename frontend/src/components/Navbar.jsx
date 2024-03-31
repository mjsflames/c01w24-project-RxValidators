import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
	const userContext = useContext(UserContext);

	const assignedLinks = {
		admin: [
			{ to: "/", text: "Home" },
			{ to: "/adminPrescriberProfile", text: "Prescriber Profiles" },
			{ to: "/adminPatientProfile", text: "Patient Profiles" },
			{ to: "/adminLogs", text: "Prescription Logs" },
			{ to: "/verify", text: "Verification Platform" },
			{ to: "/green-resources", text: "Green Resources" },
		],
		assistant: [
			{ to: "/", text: "Home" },
			{ to: "/adminPrescriberProfile", text: "Prescriber Profiles" },
			{ to: "/verify", text: "Verification Platform" },
			{ to: "/green-resources", text: "Green Resources" },
		],
		prescriber: [
			{ to: "/", text: "Home" },
			{ to: "/PrescriberLogRX", text: "Log Prescriptions" },
			{ to: "/my-prescriptions", text: "My Prescriptions" },
			{ to: "/green-resources", text: "Green Resources" },
			{ to: "/my-account", text: "My Account" },
		],
		patient: [
			{ to: "/", text: "Home" },
			{ to: "/PatientLogRX", text: "Log Prescriptions" },
			{ to: "/my-prescriptions", text: "My Prescriptions" },
			{ to: "/green-resources", text: "Green Resources" },
			{ to: "/my-account", text: "My Account" },
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
				<NavLink key={index} to={link.to} style={{ color: 'darkgreen' }}className={({ isActive }) =>
				[
				  	!isActive ? "active" : "font-bold underline", 
				].join(" ")
			  	}>
					{link.text}
				</NavLink>

			))}
		</div>
	);
};

export default Navbar;