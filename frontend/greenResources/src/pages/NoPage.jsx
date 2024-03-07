import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
	return (
		<div>
			<h1>UH OH...</h1>
			<p>This page does not exist...</p>
			<br />
			<Link to="/">Go back to the home page</Link>
		</div>
	);
};

export default NoPage;
