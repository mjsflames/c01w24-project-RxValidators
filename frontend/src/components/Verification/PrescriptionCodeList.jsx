import React, { useEffect, useRef, useState } from "react";

import { faDownload, faEdit, faFilePdf, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../Dropdown";
import api from "../../axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PrescriptionCodeList = ({ className }) => {
	// inter {code: "AB-LT100", status: "active"/"unassigned"}
	const [data, setData] = useState([]);
	const [filter, setFilter] = useState("");
	const [filteredData, setFilteredData] = useState(data);
	const [editObject, setEditObject] = useState("");
	const [needsUpdate, setNeedsUpdate] = useState(false);

	function fetchData() {
		// fetch data
		api.get("/verification/prescriber-codes")
		.then((response) => {
			const data = response.data;
			console.log(data);
			setData(data);
			// setFilter("")
		})
		.catch((error) => {
			console.log(error);
		});
		setNeedsUpdate(false);
	}

	useEffect(fetchData, []);
	useEffect(fetchData, [needsUpdate]);

	const items = [
		[
			{ value: "Verified", callback: (code) => {updateStatus(code, "VERIFIED")} },
			{ value: "Inactive", callback: (code) => {updateStatus(code, "INACTIVE")} },
			{ value: "Expired", callback: (code) => {updateStatus(code, "DISABLED")} },
		],
		[{ value: "Remove", callback: (code) => {}, className: "bg-red-300 hover:bg-red-500", icon: faTrash }],
	];
	
	const statusColors = {
		"VERIFIED": "border-green-600",
		"NOT FOUND": "border-gray-400",
		"INACTIVE": "border-yellow-600",
		"DISABLED": "border-red-600",
		"None": "border-black",
	};

	const updateStatus = async (code, status) => {
		try {
			const response = await api.post(`/verification/prescriber-codes/${code}`, {status });
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const downloadPDF = async (code) => {
		try {
			const response = await api.post("/verification/generatePdf", { code, output_path: "" })
			const blob = new Blob([response.data], { type: 'application/pdf' });
			const fileURL = window.URL.createObjectURL(blob);
			window.open(fileURL);
		} catch (error) {
			console.error(error)
		}

	}

	useEffect(() => {
		setFilteredData(
			data.filter(({ code, firstName, lastName }) =>
				code.toLowerCase().includes(filter.toLowerCase()) || 
				firstName.toLowerCase().includes(filter.toLowerCase()) ||
				lastName.toLowerCase().includes(filter.toLowerCase())
			)
		);
	}, [filter, data]);

	return (
		<div className={`flex flex-col mb-10 ${className}`}>
			<h1 className="text-lg font-semibold upper">Prescriber Codes</h1>
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
				{filteredData.map(({ code, status, firstName, lastName }) => {
					const selected = status == "VERIFIED" ? "Verified" : status == "INACTIVE" ? "Inactive" : "Expired";
					const overload_callback = async (e, callback) => {
						await callback(code)
						setNeedsUpdate(true);
					};

					return (<li
						key={"pc" + code+firstName}
						className={`bg-gray-300 even:bg-gray-300/50  py-4 px-4 rounded-sm border-l-8 flex justify-between ${statusColors[status]} relative`}
					>
						<p>{code}</p>
						<p>{firstName} {lastName} </p>
						<div className="flex gap-4 items-center">
							<FontAwesomeIcon
								icon={faFilePdf}
								onClick={() => downloadPDF(code)}
								className="hover:text-gray-500 cursor-pointer"/>
							<FontAwesomeIcon
								icon={faEdit}
								onClick={() => setEditObject(code)}
								className="hover:text-gray-500 cursor-pointer"
							/>
						</div>
						{editObject == code && (
							<Dropdown
								close={() => {
									setEditObject(null);
								}}
								items={items}
								selected={selected}
								overload_callback={overload_callback}
							/>
						)}
					</li>)
				})}
			</ul>
		</div>
	);
};

export default PrescriptionCodeList;
