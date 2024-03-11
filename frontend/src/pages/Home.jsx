import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";

const Home = () => {
	return (
		<>
			<PageHeader
				title="Home"
				desc="Welcome!"
			/>
			<ContentContainer>
				<ul>
					<li>
						<Link to="/verify">Verify</Link>
					</li>
					<li>
						<Link to="/search">Search</Link>
					</li>
					<li>
						<Link to="/green-resources">Green Resources</Link>
					</li>
				</ul>
			</ContentContainer>
		</>
	);
};

export default Home;
