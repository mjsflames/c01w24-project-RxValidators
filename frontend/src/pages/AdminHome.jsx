import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import nature from "../assets/adminNature.jpg";

const AdminHome = () => {
  return (
    <>
      <PageHeader
        title="Home"
        desc="Welcome to the Administrator Parks Prescriptions Account."
      />

      <div className="w-full h-[650px] lg:bg-white flex ">
        <div className="grid grid-cols-2 gap-y-0 lg:w-full xl:w-2/3 2xl:w-1/3 items-center lg:mx-4" >
          <div className="col-span-2 ml-5 font-bold text-center lg:text-left">
            <h1>See all accounts in one place. <br /> Verify providers,</h1>
            <h2 className="text-green-700">in one click.</h2>
          </div>

          <Link to="/addPrescriber">
            <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm ml-5 mr-8 h-12 w-64 text-center">Verify New Prescribers</button>
          </Link>
          <Link to="/addPatient">
            <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm mr-3 h-12 w-64 text-center align-middle">Green Resources</button>
          </Link>
          <Link to="/accessPrescribers">
            <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm ml-5 mr-8 h-12 w-64 text-center">Access Prescribers</button>
          </Link>
          <Link to="/accessPatients">
            <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm mr-3 h-12 w-64 text-center align-middle">Access Patients</button>
          </Link>
        </div>
        <div className="absolute -z-10 lg:z-0 lg:relative w-full h-full bg-white blur-sm lg:blur-0">
            <img src={nature} className="h-full w-full object-cover absolute opacity-50 lg:opacity-100" />
            <div className="opacity-0 lg:opacity-100 w-full h-full bg-gradient-to-r from-white via-white/20 via-%50 lg:via-50% xl:via-30% to-transparent absolute"></div>
          </div>
      </div>
    </>
  );
};

export default AdminHome;
