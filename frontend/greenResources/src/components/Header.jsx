import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="header w-screen min-h-[120px] flex items-center px-12">
			<Link to="">
				<h1>PaRX</h1>
			</Link>
		</div>
	);
};

export default Header;
