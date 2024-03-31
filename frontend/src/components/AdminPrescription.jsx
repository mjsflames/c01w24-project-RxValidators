import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

const AdminPrescription = ({ item }) => {
  const [data, setData] = useState(item);

  const fields = [
    { field: "Date", key: "date" },
    { field: "Patient Initials", key: "patient_initials" },
    { field: "Prescriber Code", key: "patient_email" },
    { field: "Comments", key: "comments" }
  ];

  const handleChange = (e) => {
    const newStatus = e.target.value;
    data.status = newStatus;
    data.patient.status = newStatus;
    data.prescriber.status = newStatus;
    setData(data);
    console.log(data);
  };

  const updateLogStatus = async () => {
    console.log("Trying:", data._id.$oid);
    try {
      const response = await api.post(`http://localhost:5001/api/update-prescription/${data._id.$oid}`, data);
      console.log(response.data);

      // const res = await fetch(`http://localhost:5001/`, {
      //   method: "POST",
      //   body: {
      //     targetUser: ,
      //     title: "Prescription Updated",
      //     message: "Your prescription was updated by admin"
      //   },
      // });
      // const resjson = response.json();
      // if (resjson) {
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 50);
      // }
    } catch (error) {
      console.error("UpdateError:",error);
    }
  };

  return (
    <>
      <div></div>
      <div className="flex left">
        {data && (
          <table id="patientPrescriptionTable" className="rounded-lg font-semibold w-5/6">
            <tbody>
              {fields.map(({ field, key }) => (
                <tr key={key}>
                  <td className="w-1/2 px-1 align-top">{field}:</td>
                  <input defaultValue={data[key]} className="w-full px-2 rounded-sm bg-black/15" onChange={(e) => setData(prevData => ({ ...prevData, [key]: e.target.value }))}></input>
                </tr>
              ))}
              <tr>
                <td>Status:</td>
                <td>
                  {item.status && (item.status.includes("Complete") || item.status.includes("Both")) ? (<select value={item.status} className="w-full px-2 rounded-sm bg-black/15"
                  onChange={handleChange}>
                  <option value={data.status}>{data.status}</option>
                  {item.status !== "Complete with Discovery Pass"? <option value="Complete with Discovery Pass">Complete with Discovery Pass</option>:null}
                  {item.status !== "Both Logged With Discovery Pass"? <option value="Both Logged With Discovery Pass">Both Logged With Discovery Pass</option>:null}
                </select>) : <div>{item.status}</div>} </td>
              </tr>
            </tbody>
          </table>
        )}
        <div className="grid-cols-1 w-1/6"><button className="p-2 border-black border" onClick={() => updateLogStatus(item)}>Update</button></div>
      </div>
    </>
  );
};

export default AdminPrescription;
