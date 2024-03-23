import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import nature from "../assets/wallf.jpg";

const PrescriberHome = () => {
	return (
		<>
			<PageHeader
				title="Home"
				desc="Welcome to your Parks Prescriptions account!"
			/>
				<div className="flex w-screen h-[650px] bg-white">
					<div className = "grid grid-cols-2 gap-y-0 w-screen-1/3 h-1/3 items-end" >
						<div className="col-span-2 ml-5 mt-10 font-bold">
							<h1>Connect to the evidence. <br /> Your best health,</h1>
							<h2 className="text-green-700">naturally.</h2>
						</div>
						<div className="col-span-2 mt-32 text-center mb-8">
							<h2 className="font-bold mb-2">Get Started</h2>
							<button onClick={()=> window.open("https://www.parkprescriptions.ca/", "_blank")} className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm h-12 w-64 text-center">Learn More About PaRx</button>
						</div>
						<Link to="/PatientLogRX">
							<button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm ml-3 mr-8 h-12 w-64 text-center">Log a Prescription</button>
						</Link>
						<Link to="/patientPrescriptions">
							<button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm mr-3 h-12 w-64 text-center align-middle">Access Your Prescriptions</button>
						</Link>
					</div>
					<div>
						<img src={nature} className="h-[650px] w-[1600px] ml-auto" />
					</div>
				</div>
			<PageFooter></PageFooter>
		</>
	);
};

export default PrescriberHome;