import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";

const Dropdown = ({ items, selected, close, overload_callback = (e, cb) => {cb(e)} }) => {
	// const dropdownRef = useRef(null);

	return (
		<>
			<div className="z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-0">
				{items.map((section_data) => (
					<ul key={section_data} className="py-2 text-sm text-gray-700 dark:text-gray-200">
						{section_data.map(
							({ value, callback, className="", icon=null }) => (
								<li
									key={value}
									className={`px-4 py-2 text-black select-none hover:bg-gray-100 active:bg-gray-200 ${className}`}
									onClick={(e) => {
										overload_callback(e, callback);
										close();
									}}
								>
									<FontAwesomeIcon
										visibility={
											selected == value
												? "visible"
												: icon ? icon : "hidden"
										}
										icon={icon ? icon : faCheck}
										className="mr-2"
									/>
									{value}
								</li>
							)
						)}
					</ul>
				))}
			</div>
		</>
	);
};

export default Dropdown;
