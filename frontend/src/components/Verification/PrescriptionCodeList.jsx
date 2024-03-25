import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const PrescriptionCodeList = ({ className }) => {
	// inter {code: "AB-LT100", status: "active"/"unassigned"}
	const data = [
		{ code: "AB-LT100", status: "active" },
		{ code: "SK-AC201", status: "active" },
		{ code: "ON-AC202", status: "unassigned" },
		{ code: "NB-AC203", status: "active" },
		{ code: "NS-AC204", status: "active" },
		{ code: "AB-AC205", status: "unassigned" },
		{ code: "BC-AC206", status: "unassigned" },
		{ code: "MB-AC207", status: "unassigned" },
		{ code: "PE-AC208", status: "active" },
		{ code: "QC-AC209", status: "active" },
		{ code: "NL-AC210", status: "active" },
	];

	const [filter, setFilter] = useState("");
	const [filteredData, setFilteredData] = useState(data);

	useEffect(() => {
		setFilteredData(
			data.filter(({ code }) =>
				code.toLowerCase().includes(filter.toLowerCase())
			)
		);
	}, [filter]);

	return (
		<div className={`flex flex-col ${className}`}>
			<h1 className="text-lg	font-semibold upper">Prescriber Codes</h1>
			<p>All of the prescriber codes recorded in the system.</p>
			<br className="mt-4" />
			{/* Filter */}
			<div className="w-full border-2 border-gray-300 bg-gray-300 rounded-md overflow-clip flex gap-2">
				<div className="bg-PaRxDBlue p-2 flex items-center text-white px-4">
					<FontAwesomeIcon icon={faSearch} />
				</div>
				<input
					className=" p-2 my-2 w-full bg-inherit outline-none "
					type="text"
					placeholder="Filter (e.g. “NS”)"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
			</div>
			<br className="mt-4" />
			<p>Results ({filteredData.length | 0})</p>
			<ul className="flex flex-col gap-1 max-w-full overflow-y-scroll flex-1">
				{filteredData.map(({ code, status }) => (
					<li
						className={`bg-gray-300 py-4 px-4 rounded-sm border-l-8 ${
							status == "unassigned"
								? "border-gray-400"
								: "border-green-600"
						}`}
					>
						<p>{code}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PrescriptionCodeList;
