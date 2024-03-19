import React, { useEffect, useState } from "react";
import Dropzone from "../components/Dropzone";
import VerificationList from "../components/VerificationList.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import PageHeader from "../components/PageHeader.jsx";
import ContentContainer from "../components/ContentContainer.jsx";
import api from "../axiosConfig";

const Verification = () => {
	const [file, setFile] = useState(null);
	const [id, setId] = useState(null);
	const [data, setData] = useState(null);
	const [status, setStatus] = useState(null);

	const beginRequest = async () => {
		if (!file) return;
		const formData = new FormData();
		formData.append("file", file);
		// const res = await fetch("http://localhost:5000/api/upload", {
		// 	method: "POST",
		// 	body: formData,
		// });

		const res = await api.post("/verification/upload", formData);
		const data = await res.json();
		setId(data.id);
	};

	// Check status every 5 seconds
	useEffect(() => {
		if (!id) return;
		const interval = setInterval(() => {
			if (data && data.status == "completed") {
				clearInterval(interval);
			}

			if (id) {
				// fetch(`http://localhost:5000/api/status/${id}`)
				// 	.then((res) => {
				// 		if (res.status == 400) clearInterval(interval);
				// 		return res.json();
				// 	})
				// 	.then((data) => {
				// 		setStatus(data.status);
				// 	});

				api.get(`/verification/status/${id}`).then((response) => {
					if (response.status !== 200) {
						console.log("Error retrieving status");
						return;
					}

					setStatus(response.data.status);
				});
			}
		}, 2000);

		return () => clearInterval(interval);
	}, [id]);

	useEffect(() => {
		if (status != "completed") return;
		// Retrieve the data
		// fetch(`http://localhost:5000/api/download/${id}`, {
		// 	method: "GET",
		// 	headers: { "Content-Type": "application/json" },
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		setData(data);
		// 	});
		api.get(`/verification/download/${id}`).then((response) => {
			if (response.status !== 200) {
				console.log("Error retrieving data");
				return;
			}

			setData(response.data);
		});
	}, [status]);

	let percent = 0;
	if (status && status != "completed") {
		const { passed, failed, total } = status;
		percent = (passed + failed) / total;
		console.log(percent);
	}

	var progress = <ProgressBar amount={percent} />;

	return (
		<>
			<PageHeader
				title="Verification"
				desc="Upload a CSV file to verify all prescribers on the platform."
			/>
			<ContentContainer>

				<div className=" items-center justify-center flex flex-row min-h-[50vh] gap-16">
					<div className="w-1/3">
						{id ? (
							<>
								<h1>Currently processing...</h1>
								<h1 className="text-2xl font-semibold upper">Job ID:</h1>
								<p>{id}</p>
							</>
						) : (
							<div>
								<h1 className="text-4xl font-semibold upper">Verification</h1>
								<p>Upload a file to verify</p>
								<br />
								<Dropzone setFile={setFile} file={file} />
								<hr className="mt-2" />
								<button className="bg-gray-300 font-bold py-2 px-4 rounded" onClick={beginRequest}>
									Verify
								</button>
							</div>
						)}
						{id && progress}
					</div>
					{id && data && <VerificationList data={data} />}
				</div>
			</ContentContainer>
		</>
	);
};

export default Verification;
