import React from "react";
import Spinner from "./Spinner";

const VerificationSlot = ({
	first_name = "John",
	last_name = "Doe",
	license_number = "123456",
	province = "",
	status = "",
	pending = true,
}) => {
	const verified_symbol = status == "VERIFIED" ? "✅" : "❌";

	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
			<th scope="row" className="px-6 py-4">
				{first_name}
			</th>
			<td className="px-6 py-4">{last_name}</td>
			<td className="px-6 py-4">{license_number}</td>
			<td className="px-6 py-4">{status}</td>
		</tr>
	);
};

export default VerificationSlot;
