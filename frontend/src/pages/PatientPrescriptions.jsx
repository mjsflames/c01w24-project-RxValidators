import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Prescription from "../components/Prescription";
import ContentContainer from "../components/ContentContainer";
import pic from "../assets/prescribertable.jpg";
import { UserContext } from "../App";
import NotificationCard from "../components/NotificationCard";

const PatientPrescriptions = () => {
  const [data, setData] = useState(null);
  const [myItem, setItem] = useState(null);
  const { user, getNotifications } = useContext(UserContext);
  const [userData, setUserData] = useState();
  const [notifications, setNotifications] = useState([]);
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
        "comments": "Details for item 2 asjdfklajsdlfj alsdfjaslkdfjas lasdjfaslkdjf alsdkjfalskdjfaslkdfjalksdjf aslkdfjalsd fal",
      },
      {
        "date": "2024-03-12",
        "patient_initials": "EF",
        "prescriber_code": "003",
        "status": "Pending",
        "comments": "Details for item 3",
      },
    ];

    setData(sampleData);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const username = "testUser";
      try {
        const res = await fetch(`http://localhost:5001/api/getPrescriptions/${username}`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("No response");
        }
        const pData = await res.json();
        console.log(pData);

        if (pData) {
          setData(pData);
        }
      } catch (error) {
        console.error("No fetch:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (user) setUserData(user);
    getNotifications()
      .then((data) => {
        setNotifications(data);
      })
      .catch((error) => {
        console.error("Failed to get notifications", error);
      });
  }, []);

  const itemClick = (item) => {
    if (myItem !== item) {
      setItem(item);
    } else {
      setItem(null);
    }
  };

  return (
    <>
      <PageHeader
        title="My Prescriptions"
        desc="Check the statuses of your prescriptions and find out if you are eligible for a Discovery Pass."
      />
      <ul>
        {notifications.map((notification) => (
          <NotificationCard notification={notification} />
        ))}
      </ul>
      <div className="flex w-full h-[650px] items-center justify-center bg-cover" style={{backgroundImage: `url(${pic})`}}>
        <div className="rounded-xl w-3/4 bg-gray-200 bg-opacity-70 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="flex flex-col mx-auto mb-12 text-center">
            {userData ? (
              <h1 className="text-3xl underline font-bold !text-gray-900 mb-5">
                {userData.firstName} {userData.lastName}'s Logged Prescriptions
              </h1>
            ) : null}
            <p className="font-semibold">
              Click on Show More to access more details about your prescription.
              Prescription status will automatically change once both parties
              log the prescription.
            </p>
            <p className="font-semibold">
              If you are prescribed a Discovery Pass, it will be mailed to the
              address on file.
            </p>
          </div>
          <table className="w-full mt-10 mb-20 text-sm rtl:text-right text-gray-500">
            <thead className="text-xs text-left text-black uppercase bg-[#f0fff0]">
              <tr>
                <th className="text-left p-2 w-1/8">Date</th>
                <th className="text-left w-1/8">Prescriber Code</th>
                <th className="text-left w-1/8 text-nowrap">Prescription Status</th>
                <th className="text-left w-1/8 text-nowrap">Discovery Pass?</th>
                <th className="w-1/2 text-left px-2">Prescriber Comments</th>
                <th className="w-1/2 text-left px-2"></th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item) => (
                  <>
                    <tr className="text-left text-black border-t border-white odd:bg-white/60 even:text-white even:bg-[#0a0e1a]/50">
                      <td className="p-2 w-1/8">{item.date}</td>
                      <td className="w-1/8">{item.prescriber_code}</td>
                      <td className="w-1/8">{item.status}</td>
                      <td className="w-1/8 pointer-events-none">
                        <input type="checkbox" checked={item.discovery} />
                      </td>
                      <td className="px-2 w-1/2 truncate max-w-md text-wrap">
                        {item.comments}
                      </td>
                      <button onClick={() => itemClick(item)} className="p-2 w-1/8">
                        <p className="font-bold text-nowrap underline">Show More</p>
                      </button>
                    </tr>{myItem === item && (<tr className="text-left text-black border-t border-white">
                        <td colSpan="5">
                          <Prescription item={item} />
                        </td>
                      </tr>
                    )}
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PatientPrescriptions;
