import React from "react";
import image from "../assets/background-image-1.jpeg";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const PatCreateAccount = () => {

	function handleClick () {
		//logic for checking if email already exists
        alert('Patient Account Created!');
    }

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
            <div className="w-screen lg:w-1/2 h-screen bg-white z-20 flex items-center absolute lg:relative justify-center">
				<form onSubmit={handleClick} className=":w-1/2 mx-auto z-50 ">
					<div className="flex flex-col items-center [&>*]:text-gray-500 mb-12">
						<h1 className="text-3xl font-bold !text-gray-900  mb-5">Create a Patient Account</h1>
                        <p>Please fill out the form below with your information.</p>
                        <p>Addresses are used for Green Resources and mailing Discovery Passes.</p>
                    </div>
					<div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
						<div className="w-full">
							<label for="pat_first_name" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
							<input name="pat_first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="ex. Jane"/>
						</div>
						<div className="w-full">
							<label for="pat_last_name" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
							<input type="text" id="pat_last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="ex. Doe"/>
						</div>
						<div className="mb-5">
							<label className="block mb-2 text-sm font-medium text-gray-600 ">Initials</label>
							<input id="patinitials" type="text" maxlength="2" oninput="this.value = this.value.toUpperCase()" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="ex. JD" required/>
						</div>
					</div>
					<div className="mb-5">
						<label className="block mb-2 text-sm font-medium text-gray-600 ">Email Address</label>
						<input id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Email" required/>
					</div>
					<div className="flex flex-col w-full space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
						<div className="w-full">
							<label className="block mb-2 text-sm font-medium text-gray-600 ">Username</label>
							<input id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Username" required/>
						</div>
						<div className="w-full">
							<label className="block mb-2 text-sm font-medium text-gray-600 ">Password</label>
							<input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Password" required/>
						</div>
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
						<button className="text-white bg-[#5C6528] hover:bg-[#5C6528]/40 font-medium rounded-lg text-sm w-full sm:w-auto px-6 h-full py-2.5 text-center" to="/login">Create Patient Account</button>
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