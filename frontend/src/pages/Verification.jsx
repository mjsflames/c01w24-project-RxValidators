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
				api.get(`/verification/status/${id}`).then((response) => {
					if (response.status !== 200) {
						console.log("Error retrieving status");
						clearInterval(interval);
						return;
					}
					setStatus(response.data.status);
				}).catch((err) => {
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
		// console.log(percent);
	}

	const cancelJob = async () => {
		if (!id) return;
		const res = await api.post(`/verification/cancel/${id}`);
		if (res.status === 200) {
			setId(null);
			setStatus(null);
		}
	};

	var progress = <ProgressBar amount={percent} />;

	return (
		<>
			<PageHeader title="Verification" desc="Upload a CSV file to verify all prescribers on the platform." />
			<ContentContainer className="flex justify-between  min-h-[50vh] w-1/2 ml-auto mr-auto">
					<div className="w-full items-center justify-center flex flex-row gap-16">
						{!data && <div className="w-full">
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
							<button className="bg-red-500 text-white w-1/2 font-bold py-2 px-4 rounded ml-auto mr-auto mt-8"
							onClick={cancelJob}>Cancel</button>
						</div>
						}
						<VerificationList data={data} visible={data&&id}/>
					</div>
				<div className="">
					<h1 className="text-2xl font-semibold upper">Prescriber Codes</h1>
				</div>
			</ContentContainer>
		</>
	);
};

export default Verification;
