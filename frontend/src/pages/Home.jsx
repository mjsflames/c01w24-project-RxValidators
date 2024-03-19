import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";

const Home = () => {
	return (
		<>
			<PageHeader title="Home" desc="Please log in or something" />
			<ContentContainer>
				<Link to="login"> Login </Link>
			</ContentContainer>
		</>
	);
};

export default Home;
