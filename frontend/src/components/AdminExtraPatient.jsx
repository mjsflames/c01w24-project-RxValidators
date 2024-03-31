import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

const AdminExtraPatient = ({ item }) => {
  const [data, setData] = useState(item);
  const [newItem, setNewItem] = useState(item);

  useEffect(() => {
    setData(item);
  }, []);

  const userData = [
    { key: "First Name", value: "firstName" },
    { key: "Last Name", value: "lastName" },
    { key: "Address", value: "address" },
    { key: "City", value: "city" },
    { key: "Province", value: "province" },
    { key: "Email", value: "email" },
    { key: "Language", value: "language" },
];

const changeItem = (key, newValue) => {
  newItem[key] = newValue;
  setNewItem(newItem);
};

function updateData() {
  console.log(data._id);
  api.patch(`/auth/updateUser/${data._id}`, newItem).then((res) => {
    console.log(res.data);
    setData(newItem);
  }).catch((err) => {
    console.log(err.response)
  })
}

  return (
    <>
      <div></div>
      <div>
        {data && (
          <table className="rounded-lg font-bold w-full">
            <tbody>
              {userData.map(({ key, value }) => (
                <tr key={key}>
                  <td className="w-2/3 px-2 align-top">{key}:</td>
                  <td className="w-1/3 px-2">
                    <input onChange={(e) => changeItem(value, e.target.value)} placeholder={data[value]} className="font-normal bg-slate-400 bg-opacity-30 text-current p-1 rounded-md placeholder-current w-full"></input>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-end p-3">
        <button onClick={() => {updateData(); window.location.reload();}} className="border border-black border-2 rounded-md font-bold w-1/10 hover:bg-PaRxGreen">Update</button>
        </div>
    </>
  );
};

export default AdminExtraPatient;
