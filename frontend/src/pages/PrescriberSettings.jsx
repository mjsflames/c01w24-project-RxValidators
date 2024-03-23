import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

const AccountSettings = () => {
	return (
		<>
			<PageHeader
				title="Your Account"
				desc="You can see all your account details below."
			/>
			<ContentContainer>
                <div className="absolute start-1/4 mb-2 text-lg font-semibold text-gray-600">Account Details
                    <div class = "max-w-md font-bold space-y-1 text-gray-600 mt-2">
                        <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                            <div className="w-full">
                                <label for="first_name" className="block mb-2 text-sm font-medium text-indigo-900">First Name</label>
                                <div type="text" id="first_name" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                                    Bernadette     
                                </div>
                            </div>
                            <div className="w-full">
                                <label for="last_name" className="block mb-2 text-sm font-medium text-indigo-900">Last Name</label>
                                <div type="text" id="last_name" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                                    Lopez Sarmiento     
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-cols w-full space-x-0 space-y-2 sm:space-x-4 sm:space-y-0">
                            <div className="col-span-1 mb-2 sm:mb-8">
                                <label for="province" className="block mb-2 text-sm font-medium text-indigo-900">Province</label>
                                <div type="text" id="province" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block p-2.5">
                                    ON     
                                </div>
                            </div>
                            <div className="w-full">
                                <label for="college" className="block mb-2 text-sm font-medium text-indigo-900">Licensing College</label>
                                <div type="text" id="college" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5 ">
                                    College of Physicians and Surgeons of Newfoundland and Labrador
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-cols w-full space-x-0 space-y-2 sm:space-x-4 sm:space-y-0">
                            <div className="col-span-2 mb-2 sm:mb-6">
                                <label for="license#" className="block mb-2 text-sm font-medium text-indigo-900">License#</label>
                                <div type="text" id="license#" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block p-2.5">
                                    746345542542   
                                </div>
                            </div>
                            <div className="w-full">
                                <label for="parx" className="block mb-2 text-sm font-medium text-indigo-900">PaRx Code</label>
                                <div type="text" id="parx" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                                    PA_7463 jfdskl  cvgjhchgchgchg   
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                            <div className="w-full">
                                <label for="accounttype" className="block mb-2 text-sm font-medium text-indigo-900">Account Type</label>
                                <div id="accounttype" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                                    PRESCRIBER     
                                </div>
                            </div>
                            <div className="w-full">
                                <label for="status" className="block mb-2 text-sm font-medium text-indigo-900">Account Status</label>
                                <div type="text" id="status" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                                    ACTIVE     
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute start-1/2 ml-24 mb-2 text-lg font-semibold text-gray-600">Contact Us
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
                    </div>
                </div>
			</ContentContainer>
            <PageFooter></PageFooter>
		</>
	);
};

export default AccountSettings;