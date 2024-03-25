import React from "react";
import VerificationSlot from "./VerificationSlot";

const VerificationList = ({ data, visible }) => {
	if (!visible) return null;

	const verification_data = data.map((element) => {
		const first_name = element["First Name"];
		const last_name = element["Last Name"];
		const province = element["Province"];
		const license_number = element["Licence #"];
		const status = element["Status"];
		return (
			<VerificationSlot
				first_name={first_name}
				last_name={last_name}
				license_number={license_number}
				status={status}
				province={province}
			/>
		);
	});

	return (
		<div>
			<h1 className="text-lg mb-2">Verification Results</h1>
			<div className="relative overflow-x-auto  rounded-lg">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
						<tr>
							<th scope="col" className="px-6 py-3">
								First Name
							</th>
							<th scope="col" className="px-6 py-3">
								Last Name
							</th>
							<th scope="col" className="px-6 py-3">
								License Number
							</th>
							<th scope="col" className="px-6 py-3">
								Status
							</th>
						</tr>
					</thead>
					<tbody className=" max-h-24 overflow-scroll">
						{data && verification_data}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default VerificationList;
