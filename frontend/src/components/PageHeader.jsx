import React, { useState } from "react";
import BreadCrumb from "./BreadCrumb";
import { Link } from "react-router-dom";

const PageHeader = ({ title, desc, rightDiv }) => {
	return (
		<>
			<div className="header1 w-screen min-h-[60px] bg-[#77996C] py-5 px-10">
				<BreadCrumb />
				<Link to="/login" className="absolute right-16 top-40 border-2 border-black py-4 px-10 text-sm font-medium text-white rounded">Sign Out</Link>
			</div>
			<div className="header2 w-screen min-h-[100px] bg-[#bbbbbb] py-5 px-10 flex">
				<div className="w-1/3">
					<h2 className="text-2xl font-semibold tracking-wide mb-2">{title}</h2>
					<p className="description tracking-wide leading-6">{desc}</p>
				</div>
				<div>{rightDiv}</div>
			</div>
		</>
	);
};

export default PageHeader;
