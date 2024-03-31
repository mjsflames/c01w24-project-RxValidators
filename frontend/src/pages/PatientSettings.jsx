import React, { useContext, useState, useEffect } from "react";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";
import Modal from "../components/modal";
import { UserContext } from "../App";
import api from "../axiosConfig";
import PatientEdit from "../components/PatientEdit";

const PatientSettings = () => {
  const [userData, setData] = useState(null);
  const { user } = useContext(UserContext);
  const [newItem, setNewItem] = useState(null);

  // useEffect(() => {
  //   const sampleData = {
  //     id: "3",
  //     name: "patient",
  //     role: "patient",
  //     address: "123 Main St",
  //     city: "Anytown",
  //     college: "University of Anywhere",
  //     email: "example@example.com",
  //     firstName: "John",
  //     lastName: "Doe",
  //     language: "English",
  //     license: "123456",
  //     profession: "Pat",
  //     providerCode: "7890",
  //     province: "Anyprovince",
  //     username: "johndoe123"
  //   }
  //   setData(sampleData);
  // }, []);

  useEffect(() => {
    if (user) setData(user);
  }, []);

  const dataKeys = [
    { key: "Address", value: "address" },
    { key: "City", value: "city" },
    { key: "Province", value: "province" },
    { key: "Language", value: "language" },
  ];

  const changeItem = (key, newValue) => {
    userData[key] = newValue;
    setData(userData);
  };

  function updateData() {
    console.log(userData._id);
    api.patch(`/auth/updateUser/${userData._id}`).then((res) => {
      console.log(res.userData);
      setData(userData);
    }).catch((err) => {
      console.log(err.response)
    })
  }

  return (
    <>
      <PageHeader
        title="Your Account"
        desc="You can see all of your account details below."
      />
      <ContentContainer>
        <div className="mr-auto ml-auto w-3/4 flex flex-cols-3 mb-8 text-lg font-semibold text-gray-600">
          <div class="w-1/4 mr-auto font-semibold space-y-3.5 text-gray-600 mt-2">Account Details
            {userData ? (
              <>
                <div className="flex flex-col items-center mb-2 mt-3 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
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
                  <div>
                    <label for="province" className="block mb-2 text-sm font-medium text-indigo-900">Initials</label>
                    <div type="text" id="province" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block p-2.5">
                      {userData.firstName[0] + userData.lastName[0]}
                    </div>
                  </div>
                </div>
                <div className="w-full space-x-0 mb-3 space-y-2 sm:space-x-4 sm:space-y-0">
                  <div className="w-full">
                    <label for="email" className="block mb-2 text-sm font-medium text-indigo-900">Email Address</label>
                    <div type="text" id="email" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5 ">
                      {userData.email}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label for="accounttype" className="block mb-2 text-sm text-nowrap font-medium text-indigo-900">Account Type</label>
                    <div id="accounttype" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                      {userData.role.toUpperCase()}
                    </div>
                  </div>
                  <div className="w-full">
                    <label for="status" className="block mb-2 text-sm text-nowrap font-medium text-indigo-900">Account Status</label>
                    <div type="text" id="status" className="bg-indigo-50 text-indigo-900 text-sm rounded-lg block w-full p-2.5">
                      {userData.accStatus == null || userData.accStatus == true ? "ACTIVE" : "UNACTIVE"}
                    </div>
                  </div>
                </div>
                </>
            ) : null}
          </div>
          <div className="ml-auto mr-auto items-center w-1/4 mb-2 sm:flex-row sm:space-x-4">
            {userData && (
              <table className="w-full mb-2 mt-2">
                <tbody className="w-full space-x-0 space-y-2 sm:space-x-4 sm:space-y-0 mt-2">
                  {dataKeys.map(({ key, value }) => (
                    <tr className="w-full mb-3" key={key}>
                      <td className="w-2/3 px-2">{key}:</td>
                      <td className="w-1/3 px-2">
                        <input onChange={(e) => changeItem(value, e.target.value)} placeholder={userData[value]} className="font-normal bg-slate-400 bg-opacity-30 text-current p-1 rounded-md placeholder-current"></input>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="flex p-3 flex-col">
            <button onClick={() => updateData()} className="border border-black rounded-md font-bold hover:bg-PaRxGreen">Update</button>
          </div>
          <div className="ml-10 text-lg font-semibold text-gray-600">Contact Us
            <div class="max-w-md font-bold space-y-1 text-gray-600 mt-2">
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