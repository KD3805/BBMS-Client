import React, { useEffect, useState } from "react";
import { GiDrop } from "react-icons/gi";
import { BiSolidDonateBlood } from "react-icons/bi";
import { useAdminStore } from "../../../zustand/store";
import useAdminApi from "../../../hooks/useAdminApi";

const AdminProfile = () => {
  const loggedAdmin = useAdminStore((state) => state.loggedAdmin);
  const { getAdminDashboardReportCounts } = useAdminApi();
  
  // State to store dashboard counts
  const [reportCounts, setReportCounts] = useState({
    totalDonors: 0,
    totalDonations: 0,
    pendingDonations: 0,
    acceptedDonations: 0,
    rejectedDonations: 0,
    totalRecipients: 0,
    totalRequests: 0,
    pendingRequests: 0,
    acceptedRequests: 0,
    rejectedRequests: 0
  });

  // Fetch dashboard report counts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAdminDashboardReportCounts();
        setReportCounts({
          totalDonors: data.totalDonors || 0,
          totalDonations: data.totalDonations || 0,
          pendingDonations: data.pendingDonations || 0,
          acceptedDonations: data.acceptedDonations || 0,
          rejectedDonations: data.rejectedDonations || 0,
          totalRecipients: data.totalRecipients || 0,
          totalRequests: data.totalRequests || 0,
          pendingRequests: data.pendingRequests || 0,
          acceptedRequests: data.acceptedRequests || 0,
          rejectedRequests: data.rejectedRequests || 0
        });
      } catch (error) {
        console.error("Failed to fetch dashboard report counts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-5/6 w-full flex flex-col justify-evenly items-center p-4 gap-8">
      <div className="w-full flex justify-evenly items-center flex-wrap flex-grow lg:gap-8 sm:gap-8 md:gap-4 ">

        {/* Donors Card */}
        <div className="w-[350px] h-fit red-bg-gradient text-white flex flex-col items-start rounded-tl-3xl rounded-br-3xl">
          <div className="w-full px-2">
            <div className="border-b py-4">
              <div className="flex flex-col justify-between items-end">
                <div className="flex gap-2 items-center justify-center">
                  <p className="text-5xl">{reportCounts.totalDonors}</p>
                  <span className="text-4xl"><GiDrop /></span>
                </div>
                <div className="text-end">
                  <p className="text-xl font-semibold me-2">Total Donors</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-4 py-2">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="border-b border-dashed pb-2 mb-2 w-full flex justify-between items-center">
                <p className="text-base">Donations</p>
                <p className="text-lg font-bold">{reportCounts.totalDonations}</p>
              </div>

              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col items-start">
                  <p className="text-base">Pending</p>
                  <p className="text-lg font-bold">{reportCounts.pendingDonations}</p>
                </div>

                <div className="flex flex-col items-start">
                  <p className="text-base">Accepted</p>
                  <p className="text-lg font-bold">{reportCounts.acceptedDonations}</p>
                </div>

                <div className="flex flex-col items-start">
                  <p className="text-base">Rejected</p>
                  <p className="text-lg font-bold">{reportCounts.rejectedDonations}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recipients Card */}
        <div className="w-[350px] h-fit red-bg-gradient text-white flex flex-col items-start rounded-tl-3xl rounded-br-3xl">
          <div className="w-full px-2">
            <div className="border-b py-4">
              <div className="flex flex-col justify-between items-end">
                <div className="flex gap-2 items-center justify-center">
                  <p className="text-5xl">{reportCounts.totalRecipients}</p>
                  <span className="text-4xl"><BiSolidDonateBlood /></span>
                </div>
                <div className="text-end">
                  <p className="text-xl font-semibold me-2">Total Recipients</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full px-4 py-2">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="border-b border-dashed pb-2 mb-2 w-full flex justify-between items-center">
                <p className="text-base">Blood Requests</p>
                <p className="text-lg font-bold">{reportCounts.totalRequests}</p>
              </div>

              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col items-start">
                  <p className="text-base">Pending</p>
                  <p className="text-lg font-bold">{reportCounts.pendingRequests}</p>
                </div>

                <div className="flex flex-col items-start">
                  <p className="text-base">Accepted</p>
                  <p className="text-lg font-bold">{reportCounts.acceptedRequests}</p>
                </div>

                <div className="flex flex-col items-start">
                  <p className="text-base">Rejected</p>
                  <p className="text-lg font-bold">{reportCounts.rejectedRequests}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Admin Information Table */}
      <div className="lg:w-[750px] box-border h-fit border-pink-900 rounded-md sm:w-full sm:mb-4"
        style={{ border: "1px solid #852B2D" }}>
        <h1 className="bg-pink-100 p-3 font-semibold text-lg"
          style={{ color: "#852B2D", borderBottom: "1px solid #852B2D" }}>
          Personal Information
        </h1>
        <div className="p-3">
          <table className="w-4/5 sm:w-full">
            <tbody>
              <tr>
                <td className="text-base font-medium">Name</td>
                <td className="text-base font-semibold">:</td>
                <td className="text-base font-semibold pl-5">
                  {loggedAdmin?.name || loggedAdmin?.Name || "-"}
                </td>
              </tr>
              <tr>
                <td className="text-base font-medium">Mobile Number</td>
                <td className="text-base font-semibold">:</td>
                <td className="text-base font-semibold pl-5">
                  {loggedAdmin?.phone || loggedAdmin?.Phone || "-"}
                </td>
              </tr>
              <tr>
                <td className="text-base font-medium">Email</td>
                <td className="text-base font-semibold">:</td>
                <td className="text-base font-semibold pl-5">
                  {loggedAdmin?.email || loggedAdmin?.Email || "-"}
                </td>
              </tr>
              <tr>
                <td className="text-base font-medium">Role</td>
                <td className="text-base font-semibold">:</td>
                <td className="text-base font-semibold pl-5" style={{ textTransform: "capitalize" }}>
                  {loggedAdmin?.role || loggedAdmin?.Role || "-"}
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
