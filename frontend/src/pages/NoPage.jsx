import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";

const NoPage = () => {
	return (
		<ContentContainer>
			<div className="flex flex-col items-center">
				<h1>UH OH...</h1>
				<p>This page does not exist...</p>
				<br />
				<Link to="/">Go back to the home page</Link>
			</div>
		</ContentContainer>
	);
};

export default NoPage;
