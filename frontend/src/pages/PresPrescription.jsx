import React, { useContext, useEffect, useState } from "react";
import Prescription from "../components/Prescription";
import ContentContainer from "../components/ContentContainer";
import PageHeader from "../components/PageHeader";
import pic from "../assets/prescribertable.jpg";
import { UserContext } from "../App";

const PrescriberPrescriptions = () => {
  const [data, setData] = useState(null);
  const [myItem, setItem] = useState(null);
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState();
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const sampleData = [
  //     {
  //       "date": "2024-03-12",
  //       "patient_initials": "AB",
  //       "prescriber_code": "001",
  //       "status": "Pending",
  //       "comments": "Details for item 1",
  //       "discovery": true,
  //     },
  //     {
  //       "date": "2024-03-12",
  //       "patient_initials": "CD",
  //       "prescriber_code": "001",
  //       "status": "Completed",
  //       "comments": "Details for item 2 asjdfklajsdlfj alsdfjaslkdfjas lasdjfaslkdjf alsdkjfalskdjfaslkdfjalksdjf aslkdfjalsd fal"
  //     },
  //     {
  //       "date": "2024-03-12",
  //       "patient_initials": "EF",
  //       "prescriber_code": "001",
  //       "status": "Pending",
  //       "comments": "Details for item 3"
  //     }
  //   ];

  //   setData(sampleData)
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const username = "testUser";
      try {
        const res = await fetch(`http://localhost:5001/api/getPrescriptions/${username}`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error('No response');
        }
        const pData = await res.json();
        console.log(pData);

        if (pData) {
          setData(pData);
        }
      } catch (error) {
        console.error('No fetch:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
		if (user) setUserData(user);
	  }, []);

  const itemClick = (item) => {
    if (myItem !== item) {
      setItem(item);
    }
    else {
      setItem(null);
    }
  };

  const deleteHandler = async (id) => {
    console.log(id)
    try {
        const res = await fetch(`http://localhost:5001/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
    } catch (err) {
        setError(err.response);
        console.log(err.res)
    }
}

  return (
    <>
      <PageHeader
        title="My Prescriptions"
        desc="Check all of your prescriptions all in one place."
      />
      <div className="flex w-full items-center justify-center bg-cover" style={{backgroundImage: `url(${pic})`}}>

        <div class="rounded-xl w-3/4 bg-gray-200 bg-opacity-70 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="flex flex-col mx-auto mb-12 text-center">
          {userData ? (
            <h1 className="text-3xl underline font-bold !text-gray-900  mb-5">{userData.firstName} {userData.lastName}'s Logged Prescriptions</h1>
          ) : null}
          <p className="font-semibold">Click on Show More to access more details about your prescription. Prescription status will automatically change once both parties log the prescription.</p>
          <p className="font-semibold">Prescribed Discovery Passes will be mailed to the patient.</p>
        </div>
          <table className="w-full mt-10 mb-20 text-sm rtl:text-right text-gray-500">
            <thead className="text-xs text-left text-black uppercase bg-[#f0fff0]">
              <tr>
                <th scope="col" className="px-2 py-3">Date</th>
                <th scope="col" className="px-2 py-3">Patient Initials</th>
                <th scope="col" className="px-2 py-3 text-nowrap">Prescription Status</th>
                <th scope="col" className="px-2 py-3 text-nowrap">Discovery Pass?</th>
                <th scope="col" className="px-2 py-3">Prescriber Comments</th>
                <th scope="col" className="px-2 py-3"></th>
                <th scope="col" className="px-2 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item) => (
                <>
                  <tr className="w-full text-left text-black border-t border-white odd:bg-white/60 even:text-white even:bg-[#0a0e1a]/40 hover:">
                    <td className="px-2 py-3 w-1/8">{item.date}</td>
                    <td className="px-2 py-3 w-1/8">{item.patient_initials}</td>
                    <td className="px-2 py-3">{item.status}</td>
                    <td className="px-2 py-3 w-1/8 pointer-events-none"><input type="checkbox" checked={item.discovery}/></td>
                    <td className="px-2 py-3 w-1/2 truncate max-w-md">{item.comments}</td>
                    <td>
                      <button class="btn btn-danger" onClick={() => deleteHandler(item._id)}>Delete</button>
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

export default PrescriberPrescriptions;