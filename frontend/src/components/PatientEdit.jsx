import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

const PatientUpdates = ({ item }) => {
  const [data, setData] = useState(item);
  const [newItem, setNewItem] = useState(item);

  useEffect(() => {
    setData(item);
  }, []);

  const userData = [
    { key: "Address", value: "address" },
    { key: "City", value: "city" },
    { key: "Province", value: "province" },
    { key: "Language", value: "language" },
];

const changeItem = (key, newValue) => {
  newItem[key] = newValue;
  setNewItem(newItem);
};

function updateData() {
  api.patch(`/auth/updateUser/${userData._id}`, newItem).then((res) => {
    console.log(res.userData);
    setData(newItem);
  }).catch((err) => {
    console.log(err.response)
  })
}

  return (
    <>
      <div></div>
      <div className="ml-auto mr-auto items-center w-1/4 mb-2 sm:flex-row sm:space-x-4">
          {item && (
            <table className="w-full mb-2 mt-2">
              <tbody className="w-full space-x-0 space-y-2 sm:space-x-4 sm:space-y-0 mt-2">
                {userData.map(({ key, value }) => (
                  <tr className="w-full mb-3" key={key}>
                    <td className="w-2/3 px-2">{key}:</td>
                    <td className="w-1/3 px-2">
                      <input onChange={(e) => changeItem(value, e.target.value)} placeholder={data[value]} className="font-normal bg-slate-400 bg-opacity-30 text-current p-1 rounded-md placeholder-current"></input>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        <div className="flex p-3 flex-col">
          <button onClick={() => {updateData();}} className="border border-black rounded-md font-bold hover:bg-PaRxGreen">Update</button>
        </div>
      </div>
    </>
  );
};

export default PatientUpdates;








