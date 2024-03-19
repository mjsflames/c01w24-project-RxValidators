import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

const PatientPrescriptions = () => {
	const [data, setData] = useState(null);

	useEffect(() => {

    const sampleData = [
      {
        "Date": "2024-03-12",
        "Initials": "AB",
        "Code": "001",
        "Prescription_status": "Pending",
        "Body": "Details for item 1"
      },
      {
        "Date": "2024-03-12",
        "Initials": "CD",
        "Code": "002",
        "Prescription_status": "Completed",
        "Body": "Details for item 2"
      },
      {
        "Date": "2024-03-12",
        "Initials": "EF",
        "Code": "003",
        "Prescription_status": "Pending",
        "Body": "Details for item 3"
      }
    ];
    // const username = "testUser"
    // const res = await fetch(`http://localhost:5000//api/getPrescriptions/${username}`, {
		// 	method: "POST",
		// });
		// const pData = await res.json();
    // setData(pData);
    // console.log(pData);
    setData(sampleData)
  }, []);


	return (
		<>
      <PageHeader
        title="My Prescriptions"
        desc="Check the statuses of your prescriptions and find out if you are eligible for the Discovery Pass."
        rightDiv=""
      />
      <div className="h-10"></div>
			<div className="w-full flex justify-center">
        <table id="patientPrescriptionTable" className="w-4/5 rounded-lg bg-PaRxGreen">
          <thead>
            <tr>
              <th className="text-left p-2">Date</th>
              <th className="w-1/8 text-left">Initials</th>
              <th className="w-1/8 text-left">Code</th>
              <th className="w-1/5 text-left">Status</th>
              <th className="w-1/2 text-left px-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={index} className="text-left border-t border-white">
                  <td className="p-2">{item.Date}</td>
                  <td>{item.Initials}</td>
                  <td>{item.Code}</td>
                  <td>{item.Prescription_status}</td>
                  <td className="truncate px-2">{item.Body}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
		</>
	);
};

export default PatientPrescriptions;
