import React, { useContext, useState } from "react";
import image from "../assets/background-image-1.jpeg";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const PatCreateAccount = () => {

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
            <div className="w-screen lg:w-1/2 h-screen bg-white z-20 flex items-center absolute lg:relative justify-center">
				<form className=":w-1/2 mx-auto z-50 ">
					<div className="flex flex-col items-center [&>*]:text-gray-500 mb-12">
						<h1 className="text-3xl font-bold !text-gray-900  mb-5">Create a Prescriber Account</h1>
                        <p>Please enter your given unique Prescriber ID and create a password.</p>
                        <p>If the ID is active, an account will be created.</p>
                    </div>
                    <div className="mb-5">
						<label className="block mb-2 text-sm font-medium text-gray-600 ">Enter Unique Prescriber ID</label>
						<input id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Prescriber ID" required/>
					</div>
                    <div className="mb-5">
						<label className="block mb-2 text-sm font-medium text-gray-600 ">Create a Password</label>
						<input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Password" required/>
					</div>
                    <div className="flex flex-row justify-between mt-10">
					<button className="text-white bg-[#5C6528] font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-2.5 text-center" to="/login">Create Prescriber Account</button>
                </div>
                </form>
            </div>
        </div>
	);
};

export default PatCreateAccount;