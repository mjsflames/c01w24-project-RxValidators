import React from "react";

const ServiceRegistryInfo = () => {
	// Allow the user to drag the service registry info
	const [position, setPosition] = React.useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = React.useState(false);
	const [draggingPosition, setDraggingPosition] = React.useState({ x: 0, y: 0 });

	React.useEffect(() => {
		if (isDragging) {
			const onMouseMove = (event) => {
				setPosition({
					x: event.clientX - draggingPosition.x,
					y: event.clientY - draggingPosition.y,
				});
			};
			const onMouseUp = () => {
				setIsDragging(false);
				window.removeEventListener("mousemove", onMouseMove);
				window.removeEventListener("mouseup", onMouseUp);
			};
			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mouseup", onMouseUp);
		}
	}, [isDragging, draggingPosition]);

	const goodCSS = "aspect-square h-4 rounded-full bg-green-500";
	const badCSS = "aspect-square h-4 rounded-full bg-red-500";
	return (
		<div
			onMouseDown={(event) => {
				setIsDragging(true);
				setDraggingPosition({
					x: event.clientX - position.x,
					y: event.clientY - position.y,
				});
			}}
			style={{
				transform: `translate(${position.x}px, ${position.y}px)`,
			}}
			className="absolute bg-white px-8 rounded-lg py-8 shadow-md"
		>
			<h1 className="text-sm select-none">Service Registry Monitor</h1>
			<p>For development.</p>
			<br />
			<ol className="flex flex-col gap-4 mt-2">
				<li className="flex gap-4 items-center">
					<div className={goodCSS} />
					Service 1
				</li>
				<li className="flex gap-4 items-center">
					<div className={badCSS} /> Service 2
				</li>
				<li className="flex gap-4 items-center">
					<div className={goodCSS} />
					Service 3
				</li>
			</ol>
		</div>
	);
};

export default ServiceRegistryInfo;
