import React from "react";
import { Link } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";

const AccountSettings = () => {
	return (
		<>
			<PageHeader
				title="Your Account"
				desc="You can see all your account details below."
			/>
			<ContentContainer>
                <h2 class="mb-2 text-lg font-semibold text-gray-600 dark:text-white">Account Details</h2>
                    <ul class = "max-w-md font-bold space-y-1 text-gray-600 list-none list-disc list-inside dark:text-gray-400">
                        <li>
                            First Name:
                        </li>
                        <li>
                            Last Name:
                        </li>
                        <li>
                            Prescriber Code:
                        </li>
                        <li>
                            Account Type: Prescriber
                        </li>
                        <br />
                        <br />
                        <li>
                            Contact Us
                            <br />
                            Email: 
                            <br />
                            Phone:
                        </li>
                        <Link to="#" class ="rounded-md bg-grey-400 py-4 px-10 text-black">Log Out</Link>
                    </ul>
			</ContentContainer>
		</>
	);
};

export default AccountSettings;