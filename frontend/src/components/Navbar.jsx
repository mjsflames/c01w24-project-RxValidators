import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="w-1/3 flex gap-4">
			<Link to="#" className=" text-gray-800">
				HELP
			</Link>
			<Link to="#" className=" text-gray-800">
				ME
			</Link>
			<Link to="#" className=" text-gray-800">
				LORD
			</Link>
			<Link to="#" className=" text-gray-800">
				JESUS
			</Link>
		</div>
	);
};

export default Navbar;
