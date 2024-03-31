import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import nature from "../assets/wallf.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faFilePrescription, faPen } from "@fortawesome/free-solid-svg-icons";

const PrescriberHome = () => {
  return (
    <>
      <PageHeader
        title="Home"
        desc="Welcome to your Parks Prescriptions account!"
      />
      <div className="flex w-full h-[650px] bg-white pl-16">
        <div className="gap-y-0 w-screen-1/3 h-1/3 items-end z-20">
          <div className="col-span-2 mt-10 font-bold">
            <h1>
              Connect to the evidence. <br /> Your best health,
            </h1>
            <h2 className="text-green-700">naturally.</h2>
          </div>
          <div className="col-span-2 mt-10 lg:mt-20 text-center">
            <h2 className="font-bold mb-2">Get Started</h2>
            <button
              onClick={() =>
                window.open("https://www.parkprescriptions.ca/", "_blank")
              }
              className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm h-12 w-full lg:w-[12vw] text-center"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-2" />
              Learn More About PaRx
            </button>

            <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 pt-2 lg:pt-6">
              <Link to="/log-prescriptions">
                <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm h-12 w-full lg:w-[12vw] text-center">
                <i className="fas fa-prescription-bottle-alt mr-2"></i>
                  <FontAwesomeIcon icon={faPen} className="mr-2" />
                  Log Prescriptions
                </button>
              </Link>
              <Link to="/my-prescriptions">
                <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm h-12 w-full lg:w-[12vw] text-center align-middle">
                  <FontAwesomeIcon icon={faFilePrescription} className="mr-2" />
                  My Prescriptions
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative w-full ">
          <img src={nature} className="h-full w-full object-cover absolute" />
          <div className="w-full h-full bg-gradient-to-r from-white via-white/20 via-30% to-transparent absolute"></div>
        </div>
      </div>
    </>
  );
};

export default PrescriberHome;
