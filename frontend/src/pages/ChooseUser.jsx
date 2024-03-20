import React, { useContext, useState } from "react";
import image from "../assets/background-image-1.jpeg";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const ChooseUserType = () => {

	return (
		<div className="flex h-screen w-screen items-center justify-between bg-white" >
            <Link to="/" className="absolute z-50 bg-white px-4 top-8 left-8 unselectable">
				<img src={logo} className="h-32 w-32 unselectable" />
			</Link>
            <img
				src={image}
				alt="logo"
				className="blur-[2px] opacity-70 z-10 h-screen object-cover  md:w-1/2 pointer-events-none"
			/>
            <div className="w-screen lg:w-1/2 h-screen bg-white z-20 flex items-center absolute lg:relative justify-center flex-col">
                <h1 className="text-3xl font-bold !text-gray-900 mb-16">Sign-up as a:</h1>
                <div className = "grid grid-cols-2 gap-x-10" >
                    <Link to="prescribersignup" className="text-white bg-[#5C6528] font-medium rounded-lg text-sm w-full sm:w-auto px-12 py-2.5 text-center">Patient</Link>
                    <Link to="patientsignup" className="text-white bg-[#5C6528] font-medium rounded-lg text-sm w-full sm:w-auto px-12 py-2.5 text-center">Prescriber</Link>
                </div>
                <div className="justify-between gap-8 mt-16">
					<Link className="text-black underline" to="/login">
						Already have an account? Login here.
					</Link>
                </div>
            </div>
        </div>
	);
};

export default ChooseUserType;