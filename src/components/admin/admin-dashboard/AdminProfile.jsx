import React from "react";
import { format } from "date-fns";
import { GiDrop } from "react-icons/gi";
import { BiSolidDonateBlood } from "react-icons/bi";
import { useAdminStore } from "../../../zustand/store";

const AdminProfile = () => {
  const loggedAdmin = useAdminStore((state) => state.loggedAdmin);

  return (
    <div className="h-full w-full flex flex-col justify-evenly items-center">
      <div className="w-full flex justify-evenly items-center flex-wrap flex-grow">

        {/* First Card */}
        {/* <div className="w-[350px] h-fit red-bg-gradient text-white flex flex-col items-start rounded-tl-3xl rounded-br-3xl">
          <div className="w-full px-2">
            <div className="border-b py-4">
              <div className="flex flex-col justify-between items-end">
                <div className="flex gap-2 items-center justify-center ">
                  <p className="text-5xl">0</p>
                  <span className="text-4xl">
                    <GiDrop />
                  </span>
                </div>
                <div className="text-end">
                  <p className="text-xl font-semibold me-2">
                    Donated Blood &nbsp;
                    <span className="text-lg font-medium">(units)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-4 py-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start">
                <p className="text-base">Blood Group</p>
                <p className="text-lg font-bold">
                {loggedAdmin
                    ? loggedAdmin.bloodGroupName || loggedAdmin.BloodGroupName
                    : "-"}
                </p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-base">Blood Score</p>
                <p className="text-lg font-bold">0</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Second Card */}
        <div className="w-[350px] h-fit red-bg-gradient text-white flex flex-col items-start rounded-tl-3xl rounded-br-3xl">
          <div className="w-full px-2">
            <div className="border-b py-4">
              <div className="flex flex-col justify-between items-end">
                <div className="flex gap-2 items-center justify-center ">
                  <p className="text-5xl">0</p>
                  <span className="text-4xl">
                  <BiSolidDonateBlood />
                  </span>
                </div>
                <div className="text-end">
                  <p className="text-xl font-semibold me-2">Total Donations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-4 py-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start">
                <p className="text-base">Pending</p>
                <p className="text-lg font-bold">0</p>
              </div>

              <div className="flex flex-col items-start">
                <p className="text-base">Accepted</p>
                <p className="text-lg font-bold">0</p>
              </div>

              <div className="flex flex-col items-start">
                <p className="text-base">Rejected</p>
                <p className="text-lg font-bold">0</p>
              </div>
            </div>
          </div>
        </div>


        {/* Second Card */}
        <div className="w-[350px] h-fit red-bg-gradient text-white flex flex-col items-start rounded-tl-3xl rounded-br-3xl">
          <div className="w-full px-2">
            <div className="border-b py-4">
              <div className="flex flex-col justify-between items-end">
                <div className="flex gap-2 items-center justify-center ">
                  <p className="text-5xl">0</p>
                  <span className="text-4xl">
                  <BiSolidDonateBlood />
                  </span>
                </div>
                <div className="text-end">
                  <p className="text-xl font-semibold me-2">Total Donations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-4 py-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start">
                <p className="text-base">Pending</p>
                <p className="text-lg font-bold">0</p>
              </div>

              <div className="flex flex-col items-start">
                <p className="text-base">Accepted</p>
                <p className="text-lg font-bold">0</p>
              </div>

              <div className="flex flex-col items-start">
                <p className="text-base">Rejected</p>
                <p className="text-lg font-bold">0</p>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      

      {/* Admin Information Table */}
      <div
        className="w-[750px] box-border h-fit border-pink-900 rounded-md"
        style={{ border: "1px solid #852B2D" }}
      >
        <h1
          className="bg-pink-100 p-3 font-semibold text-lg"
          style={{ color: "#852B2D", borderBottom: "1px solid #852B2D" }}
        >
          Personal Information
        </h1>
        <div className="p-3">
          <table className="w-4/5">
            <tbody>
              <tr>
                <td className="text-base font-medium">Name</td>
                <td className="text-base font-semibold">:</td>
                <td className="text-base font-semibold pl-5">
                  {loggedAdmin
                    ? loggedAdmin.name || loggedAdmin.Name
                    : "-"}
                </td>
              </tr>

              <tr>
                <td className="text-base font-medium">Mobile Number</td>
                <td className="text-base font-semibold">:</td>
                <td className="text-base font-semibold pl-5">
                  {loggedAdmin
                    ? loggedAdmin.phone || loggedAdmin.Phone
                    : "-"}
                </td>
              </tr>

              <tr>
                <td className="text-base font-medium">Email</td>
                <td className="text-base font-semibold">:</td>
                <td className="text-base font-semibold pl-5">
                  {loggedAdmin
                    ? loggedAdmin.email || loggedAdmin.Email
                    : "-"}
                </td>
              </tr>

              <tr>
                <td className="text-base font-medium">Role</td>
                <td className="text-base font-semibold">:</td>
                <td
                  className="text-base font-semibold pl-5"
                  style={{ textTransform: "capitalize" }}
                >
                  {loggedAdmin
                    ? loggedAdmin.role || loggedAdmin.Role
                    : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
