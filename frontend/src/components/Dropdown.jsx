import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Dropdown = ({ items, selected, close }) => {
	return (
		<>
			<div class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-0">
				{items.map((section_data) => (
					<ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
						{section_data.map(
							({ value, callback, className = "" }) => (
								<li
									className={`px-4 py-2 text-black select-none hover:bg-gray-100 active:bg-gray-200 ${className}`}
									onClick={(e) => {
										callback(e);
										close();
									}}
								>
									<FontAwesomeIcon
										visibility={
											selected == value
												? "visible"
												: "hidden"
										}
										icon={faCheck}
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
