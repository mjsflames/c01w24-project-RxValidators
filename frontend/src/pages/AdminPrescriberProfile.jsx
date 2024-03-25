import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";

const AdminPrescriberProfile = () => {
    return (
        <>
			<PageHeader
				title="Prescriber Profiles"
				desc="Below is a list of all Prescriber profiles!"
			/>
        </>
    );
};

export default AdminPrescriberProfile;