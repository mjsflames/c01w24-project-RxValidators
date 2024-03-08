import React from "react";

const ProgressBar = ({ amount }) => {
	const clampedAmount = Math.min(Math.max(amount, 0), 1) || 1;
	return (
		<div>
			<div className="flex justify-between mb-1">
				<span className="text-base font-medium text-black">Status</span>
				<span className="text-sm font-medium text-black">{Math.round(clampedAmount * 100)}%</span>
			</div>
			<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
				<div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${clampedAmount * 100}%` }}></div>
			</div>
		</div>
	);
};

export default ProgressBar;
