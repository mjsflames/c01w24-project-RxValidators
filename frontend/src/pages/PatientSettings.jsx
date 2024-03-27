import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";
import Modal from "../components/modal";
import { UserContext } from "../App";

const PatientSettings = () => {
  const [userData, setData] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
    setData(user);
  }, []);

	return (
		<>
			<PageHeader
				title="Your Account"
				desc="You can see all of your account details below."
			/>
			<ContentContainer>
                <div className="mr-auto ml-auto w-1/2 flex flex-cols-2 mb-8 text-lg font-semibold text-gray-600">
                    <div class = "w-1/2 font-semibold space-y-3.5 text-gray-600 mt-2">Account Details
                        <div className="flex flex-col items-center mb-2 mt-3 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                            <div className="w-full">
                                <label for="first_name" className="block mb-2 text-sm font-medium text-indigo-900">First Name</label>
                                <div type="text" id="first_name" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                                    Bernadette
                                </div>
                            </div>
                            <div className="w-full">
                                <label for="last_name" className="block mb-2 text-sm font-medium text-indigo-900">Last Name</label>
                                <div type="text" id="last_name" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                                    Lopez
                                </div>
                            </div>
                            <div>
                                <label for="province" className="block mb-2 text-sm font-medium text-indigo-900">Initials</label>
                                <div type="text" id="province" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block p-2.5">
                                    BL
                                </div>
                            </div>
                        </div>
                        <div className="w-full space-x-0 mb-3 space-y-2 sm:space-x-4 sm:space-y-0">
                            <div className="w-full">
                                <label for="email" className="block mb-2 text-sm font-medium text-indigo-900">Email Address</label>
                                <div type="text" id="email" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5 ">
                                    bl@gmail.com
                                </div>
                            </div>
                        </div>
                        <div className="w-full space-x-0 space-y-2 sm:space-x-4 sm:space-y-0">
                            <div className="w-full">
                                <label for="patProvince" className="block mb-2 text-sm font-medium text-indigo-900">Street Address</label>
                                <div type="text" id="patProvince" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block p-2.5">
                                    75 Military Trail
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                            <div className="w-full">
                                <label for="patProvince" className="block mb-2 text-sm font-medium text-indigo-900">City</label>
                                <div type="text" id="patProvince" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                                    Scarborough
                                </div>
                            </div>
                            <div className="w-full">
                                <label for="accounttype" className="block mb-2 text-sm font-medium text-indigo-900">Province</label>
                                <div id="accounttype" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                                    ON
                                </div>
                            </div>
                            <div className="w-full">
                                <label for="status" className="block mb-2 text-sm text-nowrap font-medium text-indigo-900">Preferred Language</label>
                                <div type="text" id="status" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                                    English
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                            <div className="w-full">
                                <label for="accounttype" className="block mb-2 text-sm text-nowrap font-medium text-indigo-900">Account Type</label>
                                <div id="accounttype" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                                    PATIENT
                                </div>
                            </div>
                            <div className="w-full">
                                <label for="status" className="block mb-2 text-sm text-nowrap font-medium text-indigo-900">Account Status</label>
                                <div type="text" id="status" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                                    ACTIVE
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-auto text-lg font-semibold text-gray-600">Contact Us
                        <div class = "max-w-md font-bold space-y-1 text-gray-600 mt-2">
                            <div className="block mb-2 text-sm font-medium text-indigo-900 mb-4">
                                For any questions or to request a change to your account, <br /> please contact us using one of the following methods:
                            </div>
                            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                <div className="w-full">
                                    <label for="accounttype" className="block mb-2 text-sm font-medium text-indigo-900">Email</label>
                                    <div id="accounttype" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                                        parx@bcparksfoundation.ca
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                <div className="w-full mt-4">
                                    <label for="status" className="block mb-2 text-sm font-medium text-indigo-900">Form</label>
                                    <button onClick={()=> window.open("https://www.parkprescriptions.ca/en/contact", "_blank")} id="status" className="bg-indigo-200 text-indigo-900 hover:bg-indigo-50/90 text-sm rounded-full p-2.5">
                                        CONTACT FORM
                                    </button>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="mt-44">
                                    <Modal />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
			</ContentContainer>
		</>
	);
};

export default PatientSettings;