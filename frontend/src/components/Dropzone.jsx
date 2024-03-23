import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

const Dropzone = ({ file, setFile, className = "" }) => {
	const [error, setError] = useState("");
	// const [file, setFile] = useState(null);
	const [{canDrop, isOver}, drop] = useDrop(() => ({
		accept: NativeTypes.FILE,
		drop: (item, monitor) => {
			onDrop(item);
		},
		canDrop(item) {
			return true;
		},
		collect: (monitor) => {
	        const item = monitor.getItem()
			if (item) {
			console.log('collect', item.files, item.items)
			}
			return {
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
        }	
		},
	}));
	
	const ref = useRef(null);

	function handleFileChange(e) {
		const file = e.target.files[0];
		setFile(file);
	}

	const onDrop = useCallback((item) => {
		// e.preventDefault();
		// const file = e.dataTransfer.files[0];
		if (item && item.files.length > 1) {
			console.log("Only one file can be uploaded at a time.");
			setError("Only one file can be uploaded at a time.");
			return;
		}
		setError("")
		if (item) setFile(item.files[0]);
	}, [setFile])

	const isActive = canDrop && isOver

	// TODO: Implement Drag and Drop
	return (
		<div ref={drop} className={`flex items-center justify-center w-full ${className}`}>
			<label
				htmlFor="dropzone-file"
				className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed 
				rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 ${isActive && "!bg-gray-300 scale-110"} transition-all`}
			>
				<div className="flex flex-col items-center justify-center pt-5 pb-6">
					<svg
						className="w-8 h-8 mb-4 text-gray-500"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 16"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
						/>
					</svg>
					<p className="mb-2 text-sm text-gray-500 ">
						<span className="font-semibold">Click to upload or drag and drop</span>
					</p>
					<p className="text-xs text-gray-500 ">XLSX (MAX. 1mb)</p>
				</div>
				<p className="text-xs text-gray-500 ">FILE: {file ? file.name : "NONE"}</p>
				<input ref={ref} id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
				{error && <span className="text-sm text-red-700">*{error}</span>}
			</label>
		</div>
	);
};

export default Dropzone;
