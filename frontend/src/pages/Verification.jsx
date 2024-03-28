import React, { useEffect, useState } from "react";
import Dropzone from "../components/Dropzone";
import VerificationList from "../components/VerificationList.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import PageHeader from "../components/PageHeader.jsx";
import ContentContainer from "../components/ContentContainer.jsx";
import api from "../axiosConfig";
import PrescriptionCodeList from "../components/Verification/PrescriptionCodeList.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faDownload } from "@fortawesome/free-solid-svg-icons";

const Verification = () => {
	const [file, setFile] = useState(null);
	const [id, setId] = useState(null);
	const [data, setData] = useState(null);
	const [status, setStatus] = useState(null);

	const beginRequest = async () => {
		if (!file) return;
		const formData = new FormData();
		formData.append("file", file);

		const res = await api.post("/verification/upload", formData);
		const data = res.data;
		setId(data.id);
	};

	// Check status every 5 seconds
	useEffect(() => {
		if (data || !id) return;
		const interval = setInterval(() => {
			if (data && status == "completed") {
				setId(null);
				clearInterval(interval);
			}

			if (id && data) {
				clearInterval(interval);
				return;
			}

			if (!data) {
				api.get(`/verification/status/${id}`)
					.then((response) => {
						if (response.status !== 200) {
							console.log("Error retrieving status");
							clearInterval(interval);
							return;
						}
						setStatus(response.data.status);
					})
					.catch((err) => {
						console.log(err);
						clearInterval(interval);
					});
			}
		}, 2000);

		return () => clearInterval(interval);
	}, [id]);

	useEffect(() => {
		if (status != "completed") return;
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
	}

	const cancelJob = async () => {
		if (!id) return;
		api.post(`/verification/cancel/${id}`).catch((res) => console.log(res)).finally(() => {setId(null); setStatus(null);});
	};

	var progress = <ProgressBar amount={percent} />;

	return (
		<>
			<PageHeader
				title="Verification"
				desc="Upload a CSV file to verify all prescribers on the platform."
			/>
			<ContentContainer className="flex w-2/3 flex-col !ml-auto !mr-auto justify-center min-h-[50vh] w gap-16 lg:flex-row lg:gap-32">
				<div className="lg:w-1/2 flex flex-col">
					{!data && (
						<div className="w-full">
							{id ? (
								<>
									<h1>Currently processing...</h1>
									<h1 className="text-2xl font-semibold upper">
										Job ID:
									</h1>
									<p>{id}</p>
								</>
							) : (
								<div>
									<h1 className="text-lg font-semibold upper">
										{file
											? `File "${file.name}" Loaded`
											: "Upload a file to verify"}
									</h1>
									<Dropzone setFile={setFile} file={file} />
									<hr className="mt-2" />
									<button
										className="w-full py-4 bg-PaRxDBlue text-white font-bold lg:px-4 lg:rounded"
										onClick={beginRequest}
									>
										Verify
									</button>
								</div>
							)}
							{id && progress}
							{id && (
								<button
									className="bg-red-500 text-white w-full lg:w-1/3 font-bold py-4 px-4 lg:rounded ml-auto mr-auto mt-8"
									onClick={cancelJob}
								>
									<FontAwesomeIcon
										icon={faCancel}
										className="mr-2"
									/>
									Cancel
								</button>
							)}
						</div>
					)}
					{data && (
						<>
							<VerificationList
								data={data}
								visible={data && id}
							/>
							<div className="flex mt-8 items-center gap-4 justify-end w-full">
								<p className="font-bold">Download</p>
								<button className="bg-PaRxDGrenn text-white font-bold py-4 px-4 lg:rounded">
									<FontAwesomeIcon
										icon={faDownload}
										className="mr-2"
									/>
									PDFs
								</button>
								<button className="bg-PaRxDGrenn text-white font-bold py-4 px-4 lg:rounded">
									<FontAwesomeIcon
										icon={faDownload}
										className="mr-2"
									/>
									Results
								</button>
							</div>
						</>
					)}
				</div>
				<PrescriptionCodeList className="lg:w-1/2 h-[50vh] relative" />
			</ContentContainer>
			<br />
		</>
	);
};

export default Verification;
