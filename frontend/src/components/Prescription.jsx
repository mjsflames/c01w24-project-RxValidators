import React, { useEffect, useState } from "react";

const Prescription = ({ item }) => {
  const [data, setData] = useState(item);

  useEffect(() => {
    setData(item);
  }, []);

  const patientFields = [
    { field: "Date", key: "date" },
    { field: "Patient Initials", key: "patient_initials" },
    { field: "Prescriber Code", key: "prescriber_code" },
    { field: "Status", key: "status" },
    { field: "Comments", key: "comments" }
  ];

  return (
    <>
      <div></div>
      <div>
        {data && (
          <table id="patientPrescriptionTable" className="rounded-lg font-bold w-full">
            <tbody>
              {patientFields.map(({ field, key }) => (
                <tr key={key}>
                  <td className="w-1/2 px-2 align-top">{field}:</td>
                  <td className="w-1/2 px-2">{data[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Prescription;
