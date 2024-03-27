import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import Modal from "../components/modal";
import PageHeader from "../components/PageHeader";
import { UserContext } from "../App";

const PrescriberSettings = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [userData, setData] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const sampleData = {
      id: "2",
      name: "prescriber",
      role: "prescriber",
      address: "123 Main St",
      city: "Anytown",
      college: "University of Anywhere",
      email: "example@example.com",
      firstName: "John",
      lastName: "Doe",
      language: "English",
      license: "123456",
      profession: "Doc",
      providerCode: "7890",
      province: "Anyprovince",
      username: "johndoe123"
    }
    setData(sampleData);
  }, []);

  useEffect(() => {
    if (user) setData(user);
  }, []);

  return (
    <>
      <PageHeader
        title="Your Account"
        desc="You can see all of your account details below."
      />
      <ContentContainer>
        <div className="mr-auto ml-auto w-3/4 flex flex-cols-3 flex-rows-2 mb-2 text-lg font-semibold text-gray-600">
          <div class="w-1/4 font-semibold space-y-2 text-gray-600 mt-2">Account Details
            {userData ? (
              <>
                <div className="flex flex-col items-center w-full mb-2 mt-3 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="w-full">
                    <label for="first_name" className="block mb-2 text-sm font-medium text-indigo-900">First Name</label>
                    <div type="text" id="first_name" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                      {userData.firstName}
                    </div>
                  </div>
                  <div className="w-full">
                    <label for="last_name" className="block mb-2 text-sm font-medium text-indigo-900">Last Name</label>
                    <div type="text" id="last_name" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                    {userData.lastName}
                    </div>
                  </div>
                </div>
                <div className="w-full space-x-0 mb-3 space-y-2 sm:space-x-4">
                  <div className="w-full">
                    <label for="profession" className="block mb-2 text-sm font-medium text-indigo-900">Profession</label>
                    <div type="text" id="profession" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5 ">
                    {userData.profession}
                    </div>
                  </div>
                </div>
                <div className="w-full space-x-0 mb-3 space-y-2 sm:space-x-4">
                  <div className="w-full">
                    <label for="email" className="block mb-2 text-sm font-medium text-indigo-900">Email Address</label>
                    <div type="text" id="email" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5 ">
                    {userData.email}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center w-full mb-2 sm:flex-row sm:space-x-4">
                  <div className="w-full">
                    <label for="accounttype" className="block mb-2 text-sm font-medium text-indigo-900">Account Type</label>
                    <div id="accounttype" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                    {userData.role.toUpperCase()}
                    </div>
                  </div>
                  <div className="w-full">
                    <label for="status" className="block mb-2 text-sm font-medium text-indigo-900">Account Status</label>
                    <div type="text" id="status" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                    {userData.accStatus == null || userData.accStatus == true ? "ACTIVE" : "UNACTIVE"}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div className="ml-auto mr-auto mb-2 mt-2 text-lg font-semibold text-gray-600">Mailing Address
            <div className="w-full space-x-0 space-y-2 sm:space-x-4 sm:space-y-0 mt-2">
              <div className="w-full mb-3">
                <label for="patProvince" className="block mb-2 text-sm font-medium text-indigo-900">Street Address</label>
                <div type="text" id="patProvince" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block p-2.5">
                  {userData ? userData.address : ""}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <label for="patProvince" className="block mb-2 text-sm font-medium text-indigo-900">City</label>
                <div type="text" id="patProvince" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                  {userData ? userData.city : ""}
                </div>
              </div>
              <div className="w-full">
                <label for="accounttype" className="block mb-2 text-sm font-medium text-indigo-900">Province</label>
                <div id="accounttype" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                  {userData ? userData.province : ""}
                </div>
              </div>
              <div className="w-full">
                <label for="status" className="block mb-2 text-sm text-nowrap font-medium text-indigo-900">Language</label>
                <div type="text" id="status" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                  {userData ? userData.language : ""}
                </div>
              </div>
            </div>
            <div>License Details
              <div className="w-full space-x-0 mb-2 mt-2 sm:space-x-4 sm:space-y-0">
                <div className="w-full">
                  <label for="college" className="block mb-2 text-sm font-medium text-indigo-900">Licensing College</label>
                  <div type="text" id="college" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block p-2.5">
                    {userData ? userData.college : ""}
                  </div>
                </div>
              </div>
              <div className="flex flex-cols w-full sm:space-x-4 sm:space-y-0">
                <div className="col-span-2">
                  <label for="license#" className="block mb-2 text-sm font-medium text-indigo-900">License #</label>
                  <div type="text" id="license#" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block p-2.5">
                    {userData ? userData.license : ""}
                  </div>
                </div>
                <div className="w-full">
                  <label for="parx" className="block mb-2 text-sm font-medium text-indigo-900">PaRx Code</label>
                  <div type="text" id="parx" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                    {userData ? userData.providerCode : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-auto text-lg font-semibold text-gray-600">Contact Us
            <div className="max-w-md font-bold space-y-1 text-gray-600 mt-2">
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
                  <button onClick={() => window.open("https://www.parkprescriptions.ca/en/contact", "_blank")} id="status" className="bg-indigo-200 text-indigo-900 hover:bg-indigo-50/90 text-sm rounded-full p-2.5">
                    CONTACT FORM
                  </button>
                </div>
              </div>
              <div className="w-full">
                <div className="mt-56">
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

export default PrescriberSettings;