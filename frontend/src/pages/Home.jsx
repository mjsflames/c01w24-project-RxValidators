import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<p>Home</p>
			<p>Here are some links to use for now</p>
			<ul>
				<li>
					<Link to="/verify">Verify</Link>
				</li>
				<li>
					<Link to="/search">Search</Link>
				</li>
        <li>
					<Link to="/patientPrescriptions">Patient Prescriptions</Link>
				</li>
			</ul>
		</div>
	);
};

export default Home;
