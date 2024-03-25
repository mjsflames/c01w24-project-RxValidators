import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

const PrescriberPrescriptions = () => {

    // const columns = useMemo(
    //     () => [
    //       { Header: "Date", accessor: "date" },
    //       { Header: "Patient Initials", accessor: "initials" },
    //       { Header: "Comments", accessor: "comments" },
    //       { Header: "Status", accessor: "status" },
    //       { Header: "Discovery Pass?", accessor: "pass" }
    //     ],
    //     []
    //   );
	return (
		<>
			<PageHeader
				title="My Prescriptions"
				desc="Check the status of your prescriptions all in one place!"
			/>
			
       
           
		</>
	);
};

export default PrescriberPrescriptions;