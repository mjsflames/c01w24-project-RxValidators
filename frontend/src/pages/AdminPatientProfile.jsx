import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";

const AdminPatientProfile = () => {
    return (
        <>
			<PageHeader
				title="Patient Profiles"
				desc="Below is a list of all patient profiles!"
			/>
        </>
    );
};

export default AdminPatientProfile;