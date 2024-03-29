import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";
import log from "../assets/prescriberlog.jpg";
import api from "../axiosConfig";

const LogPresPrescription = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(prevState => ({ ...prevState, user: "prescriber"}));
  }, []);

  function handleClick() {
    async function postData() {
      try {
        const res = await api.post("/prescription/submit-form", data);
        console.log("Fetch response", res.data);
        if (res.status !== 200) {
          console.log("Fetch failed");
        }
        setData(res.data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }

    }
    postData();
  }
  return (
    <>
      <PageHeader
        title="Log a Prescription"
        desc="For new prescriptions, please fill out the form and submit below."
      />

      <div className="flex w-full h-[650px] items-center justify-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${log})` }}>
        <form onSubmit={handleClick} className="mr-auto ml-auto w-1/3">
          <div class="rounded-xl bg-gray-200 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
            <h2 className="mb-8 underline font-bold">Prescriber Prescription Form</h2>
            <div className="relative z-0 w-full mb-8 group">
              <input type="date" onChange={(e) => setData(prevState => ({ ...prevState, date: e.target.value }))} id="date" className="block py-2.5 w-full text-l text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none" placeholder="" required />
              <label for="rx_date" className="absolute font-semibold text-black -translate-y-6 top-1">Prescription Date</label>
            </div>
            <div className="relative z-0 w-full mb-8 group">
              <input id="initials" onChange={(e) => setData(prevState => ({ ...prevState, patient_initials: e.target.value }))} type="text" oninput="this.value = this.value.toUpperCase()" maxLength="2" className="block py-2.5 w-full text-l text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" required />
              <label for="patient_initials" className="absolute font-semibold text-l text-black duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Patient Initials</label>
            </div>
            <div className="relative z-0 w-full mb-8 group">
              <input id="parx_code" onChange={(e) => setData(prevState => ({ ...prevState, prescriber_code: e.target.value }))} maxLength="8" oninput="this.value = this.value.toUpperCase()" className="block py-2.5 w-full text-l text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" required />
              <label for="parx_code" className="absolute font-semibold text-l text-black duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Prescriber's Provider Code (ie. AB-AL001)</label>
            </div>
            <label for="discovery" className="block mb-3 text-l font-semibold text-gray-900 dark:text-white">Is there a Discovery Pass with this prescription?</label>
            <select onChange={(e) => setData(prevState => ({ ...prevState, discoveryPass: e.target.value }))} required="required" name="discovery" id="discovery" className="bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg block p-2.5">
              <option disabled selected value="" defaultValue="">Choose an option </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <br />
            <div className="text-right mb-5">
              <button type="submit" className="text-white bg-[#5C6528] font-medium rounded-lg text-sm px-5 py-2.5">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogPresPrescription;