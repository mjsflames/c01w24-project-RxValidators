import React from "react";
import logo from "../assets/logo.svg";

const LoginLayout = () => {
	return (
		<div className="header w-screen min-h-[120px] ">
			<div className="h-[30px] bg-gray-300"></div>
			<div className="flex items-center px-24 justify-between">
				<img src={logo} className="h-32 w-32" />
			</div>
		</div>
	);
};

export default LoginLayout;
