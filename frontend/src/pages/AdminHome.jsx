import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import nature from "../assets/adminNature.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faStethoscope, faTree, faUser, faUserDoctor } from "@fortawesome/free-solid-svg-icons";

const AdminHome = () => {
  return (
    <>
      <PageHeader
        title="Home"
        desc="Welcome to the Coordinator Parks Prescriptions Account."
      />

      <div className="w-full h-[650px] bg-white flex items-center pl-16">
        <div className="flex flex-col items-center gap-12 z-20">
          <div className="flex flex-col font-bold">
            <h1>See all accounts in one place. <br /> Verify providers,</h1>
            <h2 className="text-green-700">in one click.</h2>
          </div>

          <div className="flex flex-col gap-2 lg:gap-6 w-full">
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 w-full">
              <Link to="/verify">
                <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm h-12 w-full lg:w-[12vw] text-center">
                  <FontAwesomeIcon icon={faCheck} className="mr-2" />
                  Verification Platform</button>
              </Link>
              <Link to="/green-resources">
                <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm h-12 w-full lg:w-[12vw] text-center">
                  <FontAwesomeIcon icon={faTree} className="mr-2" />
                  Green Resources</button>
              </Link>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 w-full">
              <Link to="/prescriber-profiles">
                <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm h-12 w-full lg:w-[12vw] text-center">
                  <FontAwesomeIcon icon={faStethoscope} className="mr-2" />
                  Prescriber Profiles</button>
              </Link>
              <Link to="/patient-profiles">
                <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm h-12 w-full lg:w-[12vw] text-center">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Patient Profiles</button>
              </Link>
              </div>
            </div>
          </div>
          <div className="relative w-full h-full">
            <img src={nature} className="h-full w-full object-cover absolute" />
            <div className="w-full h-full bg-gradient-to-r from-white via-white/20 via-30% to-transparent absolute"></div>
          </div>
        </div>
    </>
  );
};

export default AdminHome;