import React, { useEffect, useState } from "react";
import { useRecipientStore } from "../../../zustand/store";
import { format } from "date-fns";
import { GiDrop } from "react-icons/gi";
import { BiSolidDonateBlood } from "react-icons/bi";
import useBloodRequestApi from "../../../hooks/useBloodRequestApi";

const RecipientProfile = () => {
  const loggedRecipient = useRecipientStore((state) => state.loggedRecipient);
  const { getRecipientRequestReportByRecipientIDApi } = useBloodRequestApi();

  const [requestReport, setRequestReport] = useState([]);
  const [totalBloodRequested, setTotalBloodRequested] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    const fetchRequestReport = async () => {
      const report = await getRecipientRequestReportByRecipientIDApi(loggedRecipient.recipientID);
      setRequestReport(report);

      const { totalBlood, totalRequestsCount } = report.reduce(
        (acc, curr) => {
          acc.totalBlood += curr.totalBloodRequested || 0;
          acc.totalRequestsCount += curr.totalRequest || 0;
          return acc;
        },
        { totalBlood: 0, totalRequestsCount: 0 }
      );

      setTotalBloodRequested(totalBlood);
      setTotalRequests(totalRequestsCount);
    };
    fetchRequestReport();
  }, [loggedRecipient.recipientID]);

  return (
    <div className="h-full w-full flex flex-col justify-evenly items-center">
      <div className="w-full flex justify-evenly items-center flex-wrap flex-grow">

        {/* First Card */}
        <div className="w-[350px] h-fit red-bg-gradient text-white flex flex-col items-start rounded-tl-3xl rounded-br-3xl">
          <div className="w-full px-2">
            <div className="border-b py-4">
              <div className="flex flex-col justify-between items-end">
                <div className="flex gap-2 items-center justify-center ">
                  <p className="text-5xl">{totalBloodRequested}</p>
                  <span className="text-4xl">
                    <GiDrop />
                  </span>
                </div>
                <div className="text-end">
                  <p className="text-xl font-semibold me-2">
                    Requested Blood &nbsp;
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
                  {loggedRecipient
                    ? loggedRecipient.bloodGroupName || loggedRecipient.BloodGroupName
                    : "-"}
                </p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-base">Blood Score</p>
                <p className="text-lg font-bold">{parseInt(totalRequests / 3) || 0}</p>
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
                  <p className="text-5xl">{totalRequests}</p>
                  <span className="text-4xl">
                    <BiSolidDonateBlood />
                  </span>
                </div>
                <div className="text-end">
                  <p className="text-xl font-semibold me-2">Total Requests</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-4 py-6">
            <div className="flex justify-between items-center">
              {
                requestReport.map((rp, index) => (
                  <div key={index} className="flex flex-col items-start">
                    <p className="text-base">{rp.status}</p>
                    <p className="text-lg font-bold">{rp.totalRequest}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* Recipient Information Table */}
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
                  {loggedRecipient
                    ? loggedRecipient.name || loggedRecipient.Name
                    : "-"}
                </td>
              </tr>

              <tr>
                <td className="text-base font-medium">Date of Birth</td>
                <td className="text-base font-semibold">:</td>
                <td className="text-base font-semibold pl-5">
                  {loggedRecipient
                    ? format(new Date(loggedRecipient.dob || loggedRecipient.DOB), 'dd MMM, yyyy')
                    : "-"}
                </td>
              </tr>

              <tr>
                <td className="text-base font-medium">Age</td>
                <td className="text-base font-semibold">:</td>
                <td className="text-base font-semibold pl-5">
                  {loggedRecipient ? loggedRecipient.age || loggedRecipient.Age : "-"}
                </td>
              </tr>

              <tr>
                <td className="text-base font-medium">Gender</td>
                <td className="text-base font-semibold">:</td>
                <td className="text-base font-semibold pl-5">
                  {loggedRecipient
                    ? loggedRecipient.gender || loggedRecipient.Gender
                    : "-"}
                </td>
              </tr>

              <tr>
                <td className="text-base font-medium">Blood Group</td>
                <td className="text-base font-semibold">:</td>
                <td className="text-base font-semibold pl-5">
                  {loggedRecipient
                    ? loggedRecipient.bloodGroupName ||
                    loggedRecipient.BloodGroupName
                    : "-"}
                </td>
              </tr>

              <tr>
                <td className="text-base font-medium">Mobile Number</td>
                <td className="text-base font-semibold">:</td>
                <td className="text-base font-semibold pl-5">
                  {loggedRecipient
                    ? loggedRecipient.phone || loggedRecipient.Phone
                    : "-"}
                </td>
              </tr>

              <tr>
                <td className="text-base font-medium">Email</td>
                <td className="text-base font-semibold">:</td>
                <td className="text-base font-semibold pl-5">
                  {loggedRecipient
                    ? loggedRecipient.email || loggedRecipient.Email
                    : "-"}
                </td>
              </tr>

              <tr>
                <td className="text-base font-medium">Address</td>
                <td className="text-base font-semibold">:</td>
                <td
                  className="text-base font-semibold pl-5"
                  style={{ textTransform: "capitalize" }}
                >
                  {loggedRecipient
                    ? loggedRecipient.address || loggedRecipient.Address
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

export default RecipientProfile;
