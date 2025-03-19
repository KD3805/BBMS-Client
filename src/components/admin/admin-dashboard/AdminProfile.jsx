import React, { useEffect, useState } from "react";
import { GiDrop } from "react-icons/gi";
import { BiSolidDonateBlood } from "react-icons/bi";
import { useAdminStore } from "../../../zustand/store";
import useAdminApi from "../../../hooks/useAdminApi";
import useBloodStockApi from "../../../hooks/useBloodStockApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const AdminProfile = () => {
  const loggedAdmin = useAdminStore((state) => state.loggedAdmin);
  const [bloodStocks, setBloodStocks] = useState([]);
  const { getAdminDashboardReportCounts } = useAdminApi();
  const { fetchAllBloodStocksApi } = useBloodStockApi();

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

  // State for storing all data
  const [dashboardData, setDashboardData] = useState({
    donorsCount: 0,
    recipientsCount: 0,
    totalDonations: 0,
    pendingRequests: 0,
    acceptedRequests: 0,
    rejectedRequests: 0,
    bloodStock: [],
    donationsOverTime: [],
    recentActivities: [],
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
          totalRequests: data.totalBloodRequests || 0,
          pendingRequests: data.pendingRequests || 0,
          acceptedRequests: data.acceptedRequests || 0,
          rejectedRequests: data.rejectedRequests || 0
        });
      } catch (error) {
        console.error("Failed to fetch dashboard report counts:", error);
      }
    };

    const fetchBloodStocks = async () => {
      try {
        const data = await fetchAllBloodStocksApi();
        setBloodStocks(data);
      } catch (error) {
        console.error("Failed to fetch blood stock records:", error);
      }
    };

    // Mock data:
    const mockData = {
      donorsCount: 3,
      recipientsCount: 1,
      totalDonations: 14,
      pendingRequests: 9,
      acceptedRequests: 4,
      rejectedRequests: 1,
      bloodStock: [
        { bloodGroup: 'A+', quantity: 120 },
        { bloodGroup: 'A-', quantity: 75 },
        { bloodGroup: 'B+', quantity: 90 },
        { bloodGroup: 'B-', quantity: 45 },
        { bloodGroup: 'AB+', quantity: 60 },
        { bloodGroup: 'AB-', quantity: 30 },
        { bloodGroup: 'O+', quantity: 150 },
        { bloodGroup: 'O-', quantity: 50 },
      ],
      donationsOverTime: [
        { date: '2025-02-14', donations: 3 },
        { date: '2025-02-15', donations: 6 },
        { date: '2025-02-16', donations: 2 },
        { date: '2025-02-17', donations: 8 },
        { date: '2025-02-18', donations: 5 },
        { date: '2025-02-19', donations: 7 },
        { date: '2025-02-20', donations: 4 },
      ],
      recentActivities: [
        { id: 1, activity: 'Added new donor John Doe' },
        { id: 2, activity: 'Blood stock updated for A+' },
        { id: 3, activity: 'Accepted blood request #1234' },
      ],
    };

    fetchBloodStocks();
    fetchData();
    setDashboardData(mockData);
  }, []);


  // ------------------------------
  // 2. Prepare chart data
  // ------------------------------

  // Blood stock data for BarChart
  const bloodStockChartData = bloodStocks.map((item) => ({
    name: item.bloodGroupName,
    quantity: item.quantity,
  }));

  // Requests data for PieChart
  const donationRequestsData = [
    { name: 'Pending', value: reportCounts.pendingDonations },
    { name: 'Accepted', value: reportCounts.acceptedDonations },
    { name: 'Rejected', value: reportCounts.rejectedDonations },
  ];
  const bloodRequestsData = [
    { name: 'Pending', value: reportCounts.pendingRequests },
    { name: 'Accepted', value: reportCounts.acceptedRequests },
    { name: 'Rejected', value: reportCounts.rejectedRequests },
  ];
  const pieColors = ['#FFBB28', '#00C49F', '#FF8042'];

  // Donations over time for LineChart
  const donationsLineData = dashboardData.donationsOverTime.map((item) => ({
    date: item.date,
    donations: item.donations,
  }));

  return (
    <div className="h-5/6 w-full flex flex-col justify-evenly items-center p-4 gap-8">

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

      {/* 
        --------------------------
        Charts Section
        --------------------------
      */}
      {/* Blood Stock Bar Chart */}
      <div style={{ width: '100%', minWidth: '400px', height: '400px' }}>
        <h2 className="text-2xl font-bold text-center">Blood Stock by Group</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bloodStockChartData}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', margin: '4rem auto 4rem auto' }}>
        {/* Requests Status Pie Chart */}
        <div style={{ flex: 1, minWidth: '400px', height: '300px' }}>
          <h2 className="text-2xl font-bold text-center">Donation Requests Status</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donationRequestsData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {donationRequestsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Requests Status Pie Chart */}
        <div style={{ flex: 1, minWidth: '400px', height: '300px' }}>
          <h2 className="text-2xl font-bold text-center">Blood Requests Status</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={bloodRequestsData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {bloodRequestsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>


      {/* Donations Over Time Line Chart */}
      <div style={{ width: '100%', height: '350px', marginTop: '2rem' }}>
        <h3>Donations Over Time</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={donationsLineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="donations" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AdminProfile;
