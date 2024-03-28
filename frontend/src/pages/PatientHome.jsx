import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import nature from "../assets/wallf.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
const PrescriberHome = () => {
	return (
		<>
			<PageHeader
				title="Home"
				desc="Welcome to your Parks Prescriptions account!"
			/>
				<div className="flex w-full h-full bg-white">
					<div className = "grid grid-cols-2 gap-y-0 h-1/3 items-end" >
						<div className="col-span-2 ml-5 mt-10 font-bold">
							<h1>Connect to the evidence. <br /> Your best health,</h1>
							<h2 className="text-green-700">naturally.</h2>
						</div>
						<div className="col-span-2 mt-32 text-center mb-8">
							<h2 className="font-bold mb-2">Get Started</h2>
							<button onClick={()=> window.open("https://www.parkprescriptions.ca/", "_blank")} className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm h-12 w-64 text-center"> <FontAwesomeIcon icon={faLink} className="mr-2" /> Learn More About PaRx </button>
						</div>
						<Link to="/PatientLogRX">
							<button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm ml-3 mr-16 h-12 w-64 text-center">Log Prescriptions</button>
						</Link>
						<Link to="/patientPrescriptions">
							<button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm mr-3 h-12 w-64 text-center align-middle">Access Your Prescriptions</button>
						</Link>
					</div>
					<div>
						<img src={nature} className="h-[650px] w-screen-2/3 ml-auto" />
					</div>
				</div>

		</>
	);
};

export default PrescriberHome;