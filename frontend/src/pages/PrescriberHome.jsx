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
				<div className="flex w-full h-[650px] bg-white">
					<div className = "grid grid-cols-2 gap-y-0 w-screen-1/3 h-1/3 items-end" >
						<div className="col-span-2 ml-5 mt-10 font-bold">
							<h1>Connect to the evidence. <br /> Connect nature.</h1>
							<h2 className="text-green-700">Prescribe nature.</h2>
							{userData ? (
								<p className="font-bold"><br />
									Your PaRx Code: {userData.providerCode}
								</p>
							) : null}
						</div>
						<div className="col-span-2 mt-32 text-center mb-8">
							<h2 className="font-bold mb-2">Get Started</h2>
							<Link to="/PrescriberLogRX">
								<button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm ml-3 mr-8 h-12 w-64 text-center">Log a Patient Prescription</button>
							</Link>
						</div>
							<button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm ml-3 mr-8 h-12 w-64 text-center">Download your Prescription PDF</button>
						<Link to="/prescriberPrescriptions">
							<button href="#" className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm mr-3 h-12 w-64 text-center align-middle">Access Your Prescriptions</button>
						</Link>
					</div>
					<div>
						<img src={nature} className="h-[650px] w-[1600px]" />
					</div>
				</div>
		</>
	);
  return (
    <>
      <PageHeader
        title="Home"
        desc="Welcome to your Parks Prescriptions account!"
      />
      <div className="flex w-full h-[650px] bg-white pl-16">
        <div className="grid grid-cols-2 gap-y-0 w-screen-1/3 h-1/3 items-end">
          <div className="col-span-2 ml-5 mt-10 font-bold">
            <h1>
              Connect to the evidence. <br /> Connect nature.
            </h1>
            <h2 className="text-green-700">Prescribe nature.</h2>
            <p className="font-bold">
              <br />
              Your PaRx Code: {}
            </p>
          </div>
          <div className="col-span-2 mt-20 text-center z-20">
            <h2 className="font-bold mb-2">Get Started</h2>
            <Link to="/PrescriberLogRX">
              <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm ml-3 mr-8 h-12 w-2/3 text-center">
                Log a Patient Prescription
              </button>
            </Link>

            <div className="flex gap-4 mt-4 justify-center items-center">
              <Link to="/pdfPage">
                <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm h-12 w-[12vw] text-center">
                  Download your Prescription PDF
                </button>
              </Link>
              <Link to="/prescriberPrescriptions">
                <button
                  href="#"
                  className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm h-12 w-[12vw] text-center"
                >
                  Access Your Prescriptions
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full bg-black">
          <img src={nature} className="h-full w-full object-cover absolute" />
          <div className="w-full h-full bg-gradient-to-r from-white via-white/20 via-30% to-transparent absolute"></div>
        </div>
      </div>
    </>
  );
};

export default PrescriberHome;
