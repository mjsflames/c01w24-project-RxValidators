import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import AddressAlert from "../components/AddressAlert";

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
    setData(sampleData)
  }, []);

  useEffect(() => {
    async function fetchData() {
      const username = "testUser";
      try {
        const res = await fetch(`http://localhost:5001/api/getPrescriptions/${username}`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const pData = await res.json();

        setData(pData);
        console.log(pData);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
    fetchData();
  }, []);

	return (
		<>
      <PageHeader
        title="My Prescriptions"
        desc="Check the statuses of your prescriptions and find out if you are eligible for the Discovery Pass."
        rightDiv=""
      />
      <AddressAlert></AddressAlert>
      <div className="h-10"></div>
			<div className="w-full flex justify-center">
        <table id="patientPrescriptionTable" className="w-4/5 rounded-lg">
          <thead className="bg-PaRxGreen">
            <tr>
              <th className="text-left p-2">Date</th>
              <th className="w-1/8 text-left">Patient Initials</th>
              <th className="w-1/8 text-left">Prescriber Code</th>
              <th className="w-1/5 text-left">Status</th>
              <th className="w-1/2 text-left px-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={index} className="text-left border-t border-white even:bg-gray-200 odd:bg-gray-300">
                  <td className="p-2">{item.date}</td>
                  <td>{item.patient_initials}</td>
                  <td>{item.prescriber_code}</td>
                  <td>{item.status}</td>
                  <td className="truncate px-2">{item.comments}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      
		</>
	);
};

export default PatientPrescriptions;
