import React, { useEffect, useState } from 'react';
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
// import axios from 'axios'; // Uncomment if using real API

const GraphAndStats = () => {
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

    // ------------------------------
    // 1. Fetch (or mock) data
    // ------------------------------
    useEffect(() => {
        // Example of fetching from API with axios:
        /*
        axios.get('/api/dashboard-data')
          .then((res) => {
            setDashboardData(res.data);
          })
          .catch((err) => console.error(err));
        */

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

        setDashboardData(mockData);
    }, []);

    // ------------------------------
    // 2. Prepare chart data
    // ------------------------------

    // Blood stock data for BarChart
    const bloodStockChartData = dashboardData.bloodStock.map((item) => ({
        name: item.bloodGroup,
        quantity: item.quantity,
    }));

    // Requests data for PieChart
    const requestsData = [
        { name: 'Pending', value: dashboardData.pendingRequests },
        { name: 'Accepted', value: dashboardData.acceptedRequests },
        { name: 'Rejected', value: dashboardData.rejectedRequests },
    ];
    const pieColors = ['#FFBB28', '#00C49F', '#FF8042'];

    // Donations over time for LineChart
    const donationsLineData = dashboardData.donationsOverTime.map((item) => ({
        date: item.date,
        donations: item.donations,
    }));

    // ------------------------------
    // 3. Render
    // ------------------------------
    return (
        <div style={{ padding: '1rem' }}>
            <h2>Admin Dashboard</h2>
            {/* 
        --------------------------
        Top Summary Cards
        --------------------------
      */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div style={cardStyle}>
                    <h4>Total Donors</h4>
                    <p>{dashboardData.donorsCount}</p>
                </div>
                <div style={cardStyle}>
                    <h4>Total Recipients</h4>
                    <p>{dashboardData.recipientsCount}</p>
                </div>
                <div style={cardStyle}>
                    <h4>Total Donations</h4>
                    <p>{dashboardData.totalDonations}</p>
                </div>
            </div>

            {/* 
        --------------------------
        Charts Section
        --------------------------
      */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                {/* Blood Stock Bar Chart */}
                <div style={{ flex: 1, minWidth: '400px', height: '350px' }}>
                    <h3>Blood Stock by Group</h3>
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

                {/* Requests Status Pie Chart */}
                <div style={{ flex: 1, minWidth: '400px', height: '350px' }}>
                    <h3>Requests Status</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={requestsData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {requestsData.map((entry, index) => (
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

        {/* 
        --------------------------
        Recent Activities Table
        --------------------------
        */}
            <div style={{ marginTop: '2rem' }}>
                <h3>Recent Activities</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', backgroundColor: '#f0f0f0' }}>
                            <th style={thTdStyle}>ID</th>
                            <th style={thTdStyle}>Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardData.recentActivities.map((activity) => (
                            <tr key={activity.id}>
                                <td style={thTdStyle}>{activity.id}</td>
                                <td style={thTdStyle}>{activity.activity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Simple inline styles for the cards and table
const cardStyle = {
    flex: 1,
    border: '1px solid #ccc',
    padding: '1rem',
    textAlign: 'center',
    borderRadius: '8px',
};

const thTdStyle = {
    border: '1px solid #ccc',
    padding: '8px',
};

export default GraphAndStats;
