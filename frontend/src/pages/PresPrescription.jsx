import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

const PrescriberRX = () => {

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
			<ContentContainer>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Patient Initials
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Prescription Comments
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Discovery Pass?
                        </th>
                    </tr>
                </thead>
            </table>
			</ContentContainer>
            <PageFooter></PageFooter>
		</>
	);
};

export default PrescriberRX;