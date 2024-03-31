import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import Modal from "../components/modal";
import PageHeader from "../components/PageHeader";
import { UserContext } from "../App";
import api from "../axiosConfig";

const PrescriberSettings = () => {
  const [userData, setData] = useState(null);
  const { user } = useContext(UserContext);
  const [newItem, setNewItem] = useState(user);

  useEffect(() => {
    if (user) {
      setData(user);
      setNewItem(user);
    }
  }, []);

  const changeItem = (key, newValue) => {
    newItem[key] = newValue;
    setNewItem(newItem);
  };

  function updateData() {
    console.log(userData._id);
    console.log(newItem);
    api.patch(`/auth/updateUser/${userData._id}`, newItem).then((res) => {
      console.log(res.userData);
      setData(newItem);
    }).catch((err) => {
      console.log(err.response)
    })
  }

  return (
    <>
      <PageHeader
        title="Your Account"
        desc="You can see all of your account details below. To change Mailing Address or Language, update the fields and click Update"
      />
      <ContentContainer>
        <div className="mr-auto ml-auto w-3/4 flex flex-cols-3 flex-rows-2 mb-2 text-lg font-semibold text-gray-600">
          <div class="w-1/4 font-semibold space-y-2 text-gray-600 mt-2">Account Details
            {userData ? (
              <>
                <div className="flex flex-col items-center w-full mb-2 mt-3 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="w-full">
                    <label for="first_name" className="block mb-2 text-sm font-medium text-indigo-900">First Name</label>
                    <div type="text" id="first_name" className="border border-black text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                      {userData.firstName}
                    </div>
                  </div>
                  <div className="w-full">
                    <label for="last_name" className="block mb-2 text-sm font-medium text-indigo-900">Last Name</label>
                    <div type="text" id="last_name" className="border border-black text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                      {userData.lastName}
                    </div>
                  </div>
                </div>
                <div className="w-full space-x-0 mb-3 space-y-2 sm:space-x-4">
                  <div className="w-full">
                    <label for="profession" className="block mb-2 text-sm font-medium text-indigo-900">Profession</label>
                    <div type="text" id="profession" className="border border-black text-indigo-900 text-sm rounded-lg block w-full p-2.5 ">
                      {userData.profession}
                    </div>
                  </div>
                </div>
                <div className="w-full space-x-0 mb-3 space-y-2 sm:space-x-4">
                  <div className="w-full">
                    <label for="email" className="block mb-2 text-sm font-medium text-indigo-900">Email Address</label>
                    <div type="text" id="email" className="border border-black text-indigo-900 text-sm rounded-lg block w-full p-2.5 ">
                      {userData.email}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center w-full mb-2 sm:flex-row sm:space-x-4">
                  <div className="w-full">
                    <label for="accounttype" className="block mb-2 text-sm font-medium text-indigo-900">Account Type</label>
                    <div id="accounttype" className="border border-black text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                      {userData.role.toUpperCase()}
                    </div>
                  </div>
                  <div className="w-full">
                    <label for="status" className="block mb-2 text-sm font-medium text-indigo-900">Account Status</label>
                    <div type="text" id="status" className="border border-black text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                      {userData.accStatus == null || userData.accStatus == true ? "ACTIVE" : "UNACTIVE"}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div className="mr-auto ml-auto w-1/3 m-2 text-lg font-semibold text-indigo-900">License Details
            <div>
              <div className="w-full space-x-0 mb-2 mt-2 sm:space-x-4 sm:space-y-0">
                <div className="w-full">
                  <label for="college" className="block mb-2 text-sm font-medium text-indigo-900">Licensing College</label>
                  <div type="text" id="college" className="border border-black text-indigo-900 text-sm rounded-lg block p-2.5">
                    {userData ? userData.college : ""}
                  </div>
                </div>
              </div>
              <div className="flex flex-cols w-full sm:space-x-4 sm:space-y-0">
                <div className="col-span-2">
                  <label for="license#" className="block mb-2 text-sm font-medium text-indigo-900 text-nowrap">License #</label>
                  <div type="text" id="license#" className="border border-black text-indigo-900 text-sm rounded-lg block p-2.5">
                    {userData ? userData.license : ""}
                  </div>
                </div>
                <div className="w-full">
                  <label for="parx" className="block mb-2 text-sm font-medium text-indigo-900">PaRx Code</label>
                  <div type="text" id="parx" className="border border-black text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                    {userData ? userData.providerCode : ""}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 w-full">Mailing Address
              <div className="w-full space-x-0 space-y-2 sm:space-x-4 sm:space-y-0 mt-2 flex">
                <div className="mb-3 w-full">
                  <label for="address" className="block mb-2 text-sm font-medium text-indigo-900 w-full">Street Address</label>
                  <input onChange={(e) => changeItem("address", e.target.value)} placeholder={userData ? userData.address : ""} type="text" id="streetAddress" className="w-full bg-indigo-50 placeholder:text-indigo-900/80 text-sm rounded-lg block p-2.5"></input>
                </div>
              </div>
              <div className="flex flex-col w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <label for="city" className="block mb-2 text-sm font-medium text-indigo-900">City</label>
                  <input onChange={(e) => changeItem("city", e.target.value)} placeholder={userData ? userData.city : ""} type="text" id="streetAddress"
                    className="bg-indigo-50 placeholder:text-indigo-900/80 text-sm rounded-lg block p-2.5 w-full"></input>
                </div>
                <div className="w-full">
                  <label for="province" className="block mb-2 text-sm font-medium text-indigo-900">Province</label>
                  <select onChange={(e) => changeItem("province", e.target.value)} placeholder={userData ? userData.province : ""} type="text" id="streetAddress"
                    className="bg-indigo-50 placeholder:text-indigo-900/80 text-sm rounded-lg block p-2.5 w-full">
                      <option value={userData ? userData.province : ""} selected disabled>{userData ? userData.province : ""}</option>
                      <option value="AB">AB</option>
								      <option value="BC">BC</option>
                      <option value="MB">MB</option>
                      <option value="NB">NB</option>
                      <option value="NL">NL</option>
                      <option value="NS">NS</option>
                      <option value="ON">ON</option>
                      <option value="PEI">PEI</option>
                      <option value="QC">QC</option>
                      <option value="SK">SK</option>
                    </select>
                </div>
                <div className="w-full">
                  <label for="language" className="block mb-2 text-sm text-nowrap font-medium text-indigo-900">Language</label>
                  <select onChange={(e) => changeItem("language", e.target.value)} type="text" id="streetAddress"
                    className="bg-indigo-50 placeholder:text-indigo-900/80 text-sm rounded-lg block p-2.5 w-full">
                      <option value={userData ? userData.language : ""} defaultValue={userData ? userData.language : ""} selected disabled >{userData ? userData.language : ""}</option>
                      <option value="english">English</option>
                      <option value="french">French</option>
                    </select>
                </div>
              </div>
              <div className="w-full text-right"><br></br><button onClick={() => updateData()} className="hover:bg-black/15 text-center rounded-md border border-black p-1">Update</button></div>
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