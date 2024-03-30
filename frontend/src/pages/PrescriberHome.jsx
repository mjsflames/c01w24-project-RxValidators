import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import nature from "../assets/nature.jpg";
import { UserContext } from "../App";

const PrescriberHome = () => {
	const [userData, setData] = useState();
  	const { user } = useContext(UserContext);

	useEffect(() => {
		if (user) setData(user);
	  }, []);

	  return (
		<>
		  <PageHeader
			title="Home"
			desc="Welcome to your Parks Prescriptions account!"
		  />
		  <div className="flex w-full h-[650px] bg-white pl-16">
			<div className="">
			  <div className="col-span-2 mt-10 font-bold text-lg leading-9">
				<h1 className="lg:text-5xl">
				  Connect to the evidence.<br />Connect nature.
				</h1>
				<h2 className="text-green-700">Prescribe nature.</h2>
				<p className="font-bold ">
				  <br />
				  Your PaRx Code: {userData?.providerCode}
				</p>
			  </div>
			  <div className="col-span-2 mt-10 lg:mt-20 text-center items-center justify-center">
				<h2 className="font-bold mb-2">Get Started</h2>
				<Link to="/PrescriberLogRX">
				  <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm h-12 w-full lg:w-[12vw] text-center">
					Log a Patient Prescription
				  </button>
				</Link>
	
				<div className="flex flex-col lg:flex-row gap-2 lg:gap-6 pt-2 lg:pt-6">
				  <Link to="/PDF">
					<button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm h-12 w-full lg:w-[12vw] text-center">
					  Download your Prescription PDF
					</button>
				  </Link>
				  <Link to="/prescriberPrescriptions">
					<button
					  href="#"
					  className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm h-12 w-full lg:w-[12vw] text-center"
					>
					  Access Your Prescriptions
					</button>
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

export default PrescriberHome;
