import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";
import nature from "../assets/adminNature.jpg";

const AdminHome = () => {
  return (
    <>
      <PageHeader
        title="Home"
        desc="Welcome to the Administrator Parks Prescriptions Account."
      />

      <div className="w-full h-[650px] bg-white flex">
        <div className="grid grid-cols-2 gap-y-0 w-1/3 items-center" >
          <div className="col-span-2 ml-5 font-bold">
            <h1>Connect to the evidence. <br /> Your best health,</h1>
            <h2 className="text-green-700">naturally.</h2>
          </div>

          <Link to="/addPrescriber">
            <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm ml-5 mr-8 h-12 w-64 text-center">Verify new Prescriber</button>
          </Link>
          <Link to="/addPatient">
            <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm mr-3 h-12 w-64 text-center align-middle">Add a Patient</button>
          </Link>
          <Link to="/accessPrescribers">
            <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm ml-5 mr-8 h-12 w-64 text-center">Access Prescribers</button>
          </Link>
          <Link to="/accessPatients">
            <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm mr-3 h-12 w-64 text-center align-middle">Access Patients</button>
          </Link>
        </div>
        <div className="w-2/3">
          <img src={nature} className="h-[650px] ml-auto" />
        </div>
      </div>
    </>
  );
};

export default AdminHome;
