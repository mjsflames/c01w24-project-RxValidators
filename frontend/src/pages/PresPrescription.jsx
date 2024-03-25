import React, { useEffect, useState } from "react";
import Prescription from "../components/Prescription";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";

const PrescriberRX = () => {
  const [data, setData] = useState(null);
  const [myItem, setItem] = useState(null);

  useEffect(() => {
    const sampleData = [
      {
        "date": "2024-03-12",
        "patient_initials": "AB",
        "prescriber_code": "001",
        "status": "Pending",
        "comments": "Details for item 1",
        "discovery": true,
      },
      {
        "date": "2024-03-12",
        "patient_initials": "CD",
        "prescriber_code": "002",
        "status": "Completed",
        "comments": "Details for item 2 asjdfklajsdlfj alsdfjaslkdfjas lasdjfaslkdjf alsdkjfalskdjfaslkdfjalksdjf aslkdfjalsd fal"
      },
      {
        "date": "2024-03-12",
        "patient_initials": "EF",
        "prescriber_code": "003",
        "status": "Pending",
        "comments": "Details for item 3"
      }
    ];

    setData(sampleData)
  }, []);


  const itemClick = (item) => {
    if (myItem !== item) {
      setItem(item);
    }
    else {
      setItem(null);
    }
  };


  return (
    <>
      <PageHeader
        title="My Prescriptions"
        desc="Check the status of your prescriptions all in one place!"
      />
      <ContentContainer>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Patient Initials
              </th>
              <th scope="col" className="px-2 py-3">
                Prescription Comments
              </th>
              <th scope="col" className="px-2 py-3">
                Status
              </th>
              <th scope="col" className="px-2 py-3">
                Discovery Pass?
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item) => (
              <>
                <tr className="text-left border-t border-white" onClick={() => itemClick(item)}>
                  <td className="px-2 py-3 w-1/8">{item.date}</td>
                  <td className="px-2 py-3 w-1/8">{item.patient_initials}</td>
                  <td className="px-2 py-3">{item.status}</td>
                  <td className="px-2 py-3 w-1/8"><input type="checkbox" checked={item.discovery} disabled /></td>
                  <td className="px-2 py-3 w-1/2 truncate max-w-md">{item.comments}</td>
                </tr>{myItem === item && (<tr>
                  <td colSpan="5">
                    <Prescription item={item} />
                  </td>
                </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </ContentContainer>
    </>
  );
};

export default PrescriberRX;