import React, { useContext, useState, useEffect } from "react";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";
import Modal from "../components/modal";
import { UserContext } from "../App";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import api from "../axiosConfig";

const PatientSettings = () => {
  const [userData, setData] = useState(null);
  const { user } = useContext(UserContext);
  const [newItem, setNewItem] = useState(null);

  useEffect(() => {
    if (user) {
      setData(user);
      setNewItem(user);
    }
  }, []);



  const dataKeys = [
    { key: "Address", value: "address" },
    { key: "City", value: "city" },
    { key: "Province", value: "province" },
    { key: "Language", value: "language" },
  ];

  const changeItem = (key, newValue) => {
    newItem[key] = newValue;
    setNewItem(newItem);
  };

  function updateData() {
    console.log(newItem);
    api.patch(`/auth/updateUser/${userData._id}`, newItem).then((res) => {
      setData(newItem);
    }).catch((err) => {
      console.log(err.response)
    })
  }

  return (
    <>
      <PageHeader
        title="Your Account"
        desc="You can see all of your account details below. To change Mailing Address or Language, update the fields and save your changes"
      />
      <ContentContainer>
        <div className="mr-auto ml-auto w-3/4 flex flex-cols-3 mb-8 text-lg font-semibold text-gray-600">
          <div class="w-1/4 mr-auto font-semibold space-y-3.5 text-gray-600 mt-2">Account Details
            {userData ? (
              <>
                <div className="flex flex-col items-center mb-2 mt-3 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
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
                  <div>
                    <label for="province" className="block mb-2 text-sm font-medium text-indigo-900">Initials</label>
                    <div type="text" id="province" className="border border-black text-indigo-900 text-sm rounded-lg block p-2.5">
                      {userData.firstName[0] + userData.lastName[0]}
                    </div>
                  </div>
                </div>
                <div className="w-full space-x-0 mb-3 space-y-2 sm:space-x-4 sm:space-y-0">
                  <div className="w-full">
                    <label for="email" className="block mb-2 text-sm font-medium text-indigo-900">Email Address</label>
                    <div type="text" id="email" className="border border-black text-indigo-900 text-sm rounded-lg block w-full p-2.5 ">
                      {userData.email}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label for="accounttype" className="block mb-2 text-sm text-nowrap font-medium text-indigo-900">Account Type</label>
                    <div id="accounttype" className="border border-black text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                      {userData.role.toUpperCase()}
                    </div>
                  </div>
                  <div className="w-full">
                    <label for="status" className="block mb-2 text-sm text-nowrap font-medium text-indigo-900">Account Status</label>
                    <div type="text" id="status" className="border border-black text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                      {userData.accStatus == null || userData.accStatus == true ? "ACTIVE" : "UNACTIVE"}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div className="w-1/3 mr-auto ml-auto">Mailing Address <FontAwesomeIcon icon={faPen} className="ml-2" />
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
                      <option value={userData ? userData.province : ""} defaultValue={userData ? userData.province : ""} selected disabled >{userData ? userData.province : ""}</option>
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
                  <label for="language" className="block mb-2 text-sm text-nowrap font-medium text-indigo-900">Language</label>
                  <select onChange={(e) => changeItem("language", e.target.value)} type="text" id="streetAddress"
                    className="bg-indigo-50 placeholder:text-indigo-900/80 text-sm rounded-lg block p-2.5 w-full">
                      <option value={userData ? userData.language : ""} defaultValue={userData ? userData.language : ""} selected disabled >{userData ? userData.language : ""}</option>
                      <option value="english">English</option>
                      <option value="french">French</option>
                    </select>
                </div>
              </div>
              
          </div>
          <div className="ml-10 text-lg font-semibold text-gray-600">Contact Us
            <div class="max-w-md font-bold space-y-1 text-gray-600 mt-2">
              <div className="block mb-2 text-sm font-medium text-indigo-900 mb-4">
                For any questions or to request a change to your account, <br /> please contact us using one of the following methods:
              </div>
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <label for="accounttype" className="block mb-2 text-sm font-medium text-indigo-900">Email</label>
                  <div id="accounttype" className="border border-black text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                    parx@bcparksfoundation.ca
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full mt-4">
                  <label for="status" className="block mb-2 text-sm font-medium text-indigo-900">Form</label>
                  <button onClick={() => window.open("https://www.parkprescriptions.ca/en/contact", "_blank")} id="status" className="bg-indigo-200 text-indigo-900 hover:bg-indigo-50/90 text-sm rounded-2xl p-2.5">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-2" />
                    CONTACT FORM
                  </button>
                </div>
              </div>
              <div className="w-full">
                <div className="mt-40 flex flex-row">
                <button onClick={() => updateData()} className="bg-[#3b5998] hover:bg-[#3b5998]/30 text-white text-sm rounded-2xl p-2.5">SAVE CHANGES</button>
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