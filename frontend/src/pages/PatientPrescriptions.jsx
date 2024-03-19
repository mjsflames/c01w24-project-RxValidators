import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

const PatientPrescriptions = () => {
	const [data, setData] = useState(null);

	useEffect( async() => {
    const username = "testUser"
    const res = await fetch(`http://localhost:5000//api/getPrescriptions/${username}`, {
			method: "POST",
		});
		const pData = await res.json();
    setData(pData);
    console.log(pData);
  }, []);


	return (
		<>
      <PageHeader
        title="Patient Prescriptions"
        desc="here is my stuff"
        rightDiv="ADD anything on the right of the header. This part is optional and don't need to even add rightDiv to this if not needed"
      />
      <div className="flex bg-PaRxDGrenn py-8 text-left text-white border-t border-neutral-800">
        <div className="flex-initial" style={{ width: '10%' }}></div>
        <div>
          <div className="text-2xl font-bold">
            My Prescriptions
          </div>
          <div className="w-2/3">
            Check the statuses of your prescriptions and find out if you are eligible for the Discovery Pass.
          </div>
        </div>
      </div>
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
