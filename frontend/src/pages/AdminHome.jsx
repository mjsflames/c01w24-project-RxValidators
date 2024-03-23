import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";

const AdminHome = () => {
	return (
		<>
			<PageHeader
				title="Home"
				desc="Welcome Admin PaRx!"
			/>
			<ContentContainer>
                <div className = "grid grid-cols-2" >
					<div className = "box-border h-24 w-96 p-10 mx-16 my-0 mr-auto bg-gray-400 flex-row items-center justify-center rounded-md" >
						<Link className ="rounded-md bg-grey-400 py-4 px-10 text-black">Verify New Prescribers</Link>
					</div>
					<div className = "box-border h-24 w-96 p-10 mx-16 my-0 mr-auto bg-gray-400 flex-row items-center justify-center rounded-md" >
						<Link to="prescriber" className ="rounded-md bg-grey-400 py-4 px-10 text-black">Add New Prescribers</Link>
					</div>
				</div>
                <div className = "grid grid-cols-2" >
                    <div className = "box-border h-24 w-96 p-10 mx-16 my-10 mr-auto bg-gray-400 flex-row items-center justify-center rounded-md" >
						<Link className ="rounded-md bg-grey-400 py-4 px-10 text-black">Access Prescriber Profiles</Link>
					</div>
					<div className = "box-border h-24 w-96 p-10 mx-16 my-10 mr-auto bg-gray-400 flex-row items-center justify-center rounded-md" >
						<Link to="prescriber" className ="rounded-md bg-grey-400 py-4 px-10 text-black">Access Patient Profiles</Link>
					</div>
				</div>
            </ContentContainer>
		</>
	);
};

export default AdminHome;
