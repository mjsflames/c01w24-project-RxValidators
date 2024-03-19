import React, { useEffect } from "react";
import { sysInstance } from "../axiosConfig";

const ServiceRegistryInfo = () => {
	// Allow the user to drag the service registry info
	const [position, setPosition] = React.useState({ x: 0, y: 300 });
	const [isDragging, setIsDragging] = React.useState(false);
	const [draggingPosition, setDraggingPosition] = React.useState({ x: 0, y: 0 });

	const [services, setServices] = React.useState([]);
	useEffect(() => {
		// Get services from localhost:3130/service-registry/services
		sysInstance
			.get("/service-registry/services")
			.then((response) => {
				setServices(response.data);
			})
			.catch((error) => {
				console.log(error);
				setServices([{ serviceName: "CONNECT FAIL", serviceUrl: "api-gateway" }]);
			});
	}, []);

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
			className="absolute bg-white px-8 rounded-lg py-8 shadow-md z-[100]"
		>
			<h1 className="text-sm select-none">Service Registry Monitor</h1>
			<p>For development.</p>
			<br />
			<ol className="flex flex-col gap-4 mt-2">
				{services.map((service) => (
					<li key={service.serviceName} className="flex gap-4 items-center capitalize">
						<div className={goodCSS} />
						<div className="flex flex-col">
							{service.serviceName}
							<p className="text-gray-400 text-sm lowercase">@ {service.serviceUrl}</p>
						</div>
					</li>
				))}
			</ol>
		</div>
	);
};

export default ServiceRegistryInfo;
