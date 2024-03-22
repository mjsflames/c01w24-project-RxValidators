import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

const PrescriberHome = () => {
	return (
		<>
			<PageHeader
				title="Home"
				desc="Welcome Doctor PaRx!"
			/>
			<ContentContainer>
				<div className = "grid grid-cols-2" >
					<h2>Below is your unique Prescriber Code: </h2>
					<br />
					<h2>Code here</h2>
					<div className = "text-right" >
						<h2>Logging a Patient Prescription?</h2>
						<Link to="login">Log Here</Link>
					</div>
				</div>
				<div className = "grid grid-cols-2" >
					<div className = "box-border p-14 mx-96 my-40 mr-auto bg-gray-400 flex-row items-center justify-center" >
						<button className ="rounded-md bg-grey-400 py-4 px-10 text-black">Your Unique Prescription PDF</button>
					</div>
					<div className = "box-border p-10 mx-72 my-40 mr-auto bg-gray-400 flex-row items-center justify-center" >
						<Link to="prescriber" className ="rounded-md bg-grey-400 py-4 px-10 text-black">Access Your Prescriptions</Link>
					</div>
				</div>
				<PageFooter></PageFooter>
			</ContentContainer>
		</>
	);
};

export default PrescriberHome;
