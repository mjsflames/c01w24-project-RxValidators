import React from "react";
import image from "../assets/background-image-1.jpeg";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const ChooseUserType = () => {

	return (
		<div className="flex h-screen w-screen items-center justify-between bg-white" >
            <Link to="/login" className="absolute z-50 bg-white px-4 top-8 left-8 unselectable">
				<img src={logo} className="h-32 w-32 unselectable" />
			</Link>
            <img
				src={image}
				alt="logo"
				className="blur-[2px] opacity-70 z-10 h-screen object-cover  md:w-1/2 pointer-events-none"
			/>
            <div className="w-screen lg:w-1/2 h-screen bg-white z-20 flex items-center absolute lg:relative justify-center flex-col">
                <h1 className="text-4xl font-bold text-gray-900 mb-20">Sign-up as a:</h1>
                <div className = "grid grid-cols-2 gap-x-6" >
                    <Link to="/patientacc">
                        <button className="text-white bg-[#5C6528] hover:bg-[#5C6528]/40 font-medium rounded-lg text-sm w-full sm:w-auto py-3 px-20 text-center">Patient</button>
                    </Link>
                    <Link to="/prescriberacc">
                        <button className="text-white bg-[#5C6528] hover:bg-[#5C6528]/40 font-medium rounded-lg text-sm w-full sm:w-auto py-3 px-20 text-center">Prescriber</button>
                    </Link>
                </div>
                <div className="justify-between gap-8 mt-20">
					<Link className="text-blue-700 hover:text-black underline text-lg" to="/login">
						Already have an account? Login here.
					</Link>
                </div>
            </div>
        </div>
	);
};

export default ChooseUserType;