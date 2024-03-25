import React, { useContext, useState } from "react";
import image from "../assets/background-image-1.jpeg";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const PatCreateAccount = () => {

	function handleClick () {
		//logic for checking active parx codes
        alert('Prescriber Account Created!');
    }
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
				<form onSubmit={handleClick} className=":w-1/2 mx-auto z-50 ">
					<div className="flex flex-col items-center [&>*]:text-gray-500 mb-12">
						<h1 className="text-3xl font-bold !text-gray-900  mb-5">Create a Prescriber Account</h1>
                        <p>Please fill out the form below with your information and Provider code.</p>
                        <p>If the Provider code is active, an account will be created.</p>
                    </div>
					<div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
						<div className="w-full">
							<label for="pres_first_name" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
							<input name="pres_first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="First Name"/>
						</div>
						<div className="w-full">
							<label for="pres_last_name" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
							<input type="text" id="pres_last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Last Name"/>   
						</div>
						<div className="w-full">
							<label className="block mb-2 text-sm font-medium text-gray-600 ">Provider Code</label>
							<input id="parx_code" type="text" maxlength="2" oninput="this.value = this.value.toUpperCase()" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="ie. BC-AA001" required/>
						</div>
					</div>
                    <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
						<div className="w-full">
							<label for="license" className="block mb-2 text-sm font-medium text-gray-900">License Number</label>
							<input name="license" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="License Number"/>
						</div>
						<div className="w-full">
							<label for="profession" className="block mb-2 text-sm font-medium text-gray-900">Profession</label>
							<input type="text" id="profession" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Profession"/>   
						</div>
						<div className="w-full">
						<label for="college" className="block mb-2 text-sm font-medium text-gray-900">Licensing College Province</label>
						<select required id="college" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5">
							<option disabled selected value="" defaultValue="">College</option>
							<option value="AB">Alberta</option>
							<option value="BC">British Columbia</option>
							<option value="MB">Manitoba</option>
							<option value="NB">New Brunswick</option>
							<option value="NL">Newfoundland & Labrador</option>
							<option value="NS">Nova Scotia</option>
							<option value="ON">Ontario</option>
							<option value="PEI">Prince Edward Island</option>
							<option value="QC">Quebec</option>
							<option value="SK">Saskatchewan</option>
						</select>
					</div>
					</div>
					<div className="mb-5">
						<label className="block mb-2 text-sm font-medium text-gray-600 ">Email Address</label>
						<input id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Email" required/>
					</div>
                    <div className="mb-5">
						<label className="block mb-2 text-sm font-medium text-gray-600 ">Create a Password</label>
						<input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Password" required/>
					</div>
                    <div className="mb-5">
						<label className="block mb-2 text-sm font-medium text-gray-600 ">Street Address</label>
						<input id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Address" required/>
					</div>
					<div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
						<div className="w-full">
							<label for="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
							<input type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"placeholder="City" required/>
						</div>
						<div className="w-full">
							<label for="province" className="block mb-2 text-sm font-medium text-gray-900">Province</label>
							<select required id="province" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5">
								<option disabled selected value="" defaultValue="">Province</option>
								<option value="AB">Alberta</option>
								<option value="BC">British Columbia</option>
								<option value="MB">Manitoba</option>
								<option value="NB">New Brunswick</option>
								<option value="NL">Newfoundland & Labrador</option>
								<option value="NS">Nova Scotia</option>
								<option value="ON">Ontario</option>
								<option value="PEI">Prince Edward Island</option>
								<option value="QC">Quebec</option>
								<option value="SK">Saskatchewan</option>
							</select>
						</div>
						<div className="w-full">
							<label for="language" className="block mb-2 text-sm font-medium text-gray-900">Preferred Language</label>
							<select required id="language" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5">
								<option disabled selected value="" defaultValue="">Language</option>
								<option value="english">English</option>
								<option value="french">French</option>
							</select>
						</div>
					</div>
                    <div className="flex mr-36 justify-between mt-12">
						<button className="text-white bg-[#5C6528] font-medium rounded-lg text-sm w-full sm:w-auto px-6 h-full py-2.5 text-center" to="/login">Create Prescriber Account</button>
						<div className="mt-4">
							<Link className="text-black underline" to="/login">
								Created an account? Login here.
							</Link>
                		</div>
					</div>
                </form>
            </div>
        </div>
	);
};

export default PatCreateAccount;