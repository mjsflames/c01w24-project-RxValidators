import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../Dropdown";

const PrescriptionCodeList = ({ className }) => {
	// inter {code: "AB-LT100", status: "active"/"unassigned"}
	const data = [
		{ code: "AB-LT100", status: "active" },
		{ code: "SK-AC201", status: "inactive" },
		{ code: "ON-AC202", status: "unassigned" },
		{ code: "NB-AC203", status: "not_found" },
		{ code: "NS-AC204", status: "active" },
		{ code: "AB-AC205", status: "unassigned" },
		{ code: "BC-AC206", status: "unassigned" },
		{ code: "MB-AC207", status: "unassigned" },
		{ code: "PE-AC208", status: "active" },
		{ code: "QC-AC209", status: "active" },
		{ code: "NL-AC210", status: "active" },
	];

	const deleteHandler = async () => {
        try {
            const res = await api.delete(`/auth/removeUser/${code}`)
            console.log(res.data)
        } catch (err) {
            setError(err.response);
            console.log(err.res)
        }
    }

	const items = [
		[
			{
				value: "Verified",
				callback: () => {},
			},
			{ value: "Inactive", callback: () => {} },
			{ value: "Expired", callback: () => {} },
		],
		[{ value: "Remove", callback: () => {deleteHandler} }],
	];
	const statusColors = {
		active: "border-green-600",
		inactive: "border-red-400",
		unassigned: "border-gray-400",
		not_found: "border-gray-400",
	};
	const [filter, setFilter] = useState("");
	const [filteredData, setFilteredData] = useState(data);
	const [editObject, setEditObject] = useState("");
	useEffect(() => {
		setFilteredData(
			data.filter(({ code }) =>
				code.toLowerCase().includes(filter.toLowerCase())
			)
		);
	}, [filter]);

	return (
		<div className={`flex flex-col mb-10 ${className}`}>
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
						key={"pc" + code}
						className={`bg-gray-300 py-4 px-4 rounded-sm border-l-8 flex justify-between ${statusColors[status]} relative`}
					>
						<p>{code}</p>
						<FontAwesomeIcon
							icon={faEdit}
							onClick={() => setEditObject(code)}
							className="hover:text-gray-500"
						/>
						{editObject == code && (
							<Dropdown
								close={() => {
									setEditObject(null);
								}}
								items={items}
								selected={
									status == "active"
										? "Verified"
										: status == "inactive"
										? "Inactive"
										: "Expired"
								}
							/>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default PrescriptionCodeList;
