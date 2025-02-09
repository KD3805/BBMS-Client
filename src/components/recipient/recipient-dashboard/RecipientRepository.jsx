import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import useBloodRequestApi from "../../../hooks/useBloodRequestApi";
import { IconButton, Tooltip } from "@mui/material";
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material';
import { MdCancelPresentation } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { format } from 'date-fns'; 
import { useRecipientStore } from "../../../zustand/store";
import { useNavigate } from "react-router-dom";

const StyledTabs = styled((props) => (
  <TabList
    {...props}
    TabIndicatorProps={{ children: <div className="triangle-bg-xxs"></div> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

const StyledTab = styled((props) => <Tab {...props} />)( 
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '6px 6px 0px 0px',
    '&.Mui-selected': {
      color: '#fff',
      background: 'linear-gradient(270deg, #ec008c, #fc6767)',
    },
    '&:hover': {
      backgroundColor: '#f4f4f4',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

const RecipientRepository = () => {
  const { getBloodRequestHistoryByRecipientIDApi, deleteBloodRequestApi, getBloodRequestByIdApi } = useBloodRequestApi();
  const [bloodRequests, setBloodRequests] = useState([]);
  const [tab, setTab] = useState('1');
  const navigate = useNavigate();
  const loggedRecipient = useRecipientStore((state) => state.loggedRecipient)

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    const fetchBloodRequests = async () => {
      try {
        const data = await getBloodRequestHistoryByRecipientIDApi(loggedRecipient.recipientID);
        setBloodRequests(data);
      } catch (error) {
        console.error("Failed to fetch bloodRequest records:", error);
      }
    };
    fetchBloodRequests();
  }, []);

  // Initialize DataTables on the table after data is loaded
  useEffect(() => {
    if (bloodRequests.length > 0) {
      $(".data-table").DataTable();
    }
  }, [bloodRequests, tab]);

  const handleDeleteBloodRequest = async (requestID) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "bg-green-500 text-white",
          cancelButton: "bg-red-500 text-white"
        },
        buttonsStyling: true
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteBloodRequestApi(requestID);

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Blood request has been deleted.",
            icon: "success"
          });

          // Refresh the bloodRequests list
          const updatedData = await getBloodRequestHistoryByRecipientIDApi(loggedRecipient.recipientID);
          setBloodRequests(updatedData);
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Blood request is safe :)",
            icon: "error"
          });
        }
      });
    } catch (error) {
      console.error("Error deleting bloodRequest:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to delete bloodRequest. Please try again.',
      });
    }
  };

  const handleUpdateBloodRequest = async (requestID) => {
    try {
      const bloodRequestDetails = await getBloodRequestByIdApi(requestID);
      // Redirect to BloodRequestForm with the bloodRequest details
      navigate(`/RecipientDashboard/?layout=1&BloodRequestID=${requestID}`, { state: { bloodRequest: bloodRequestDetails } });
    } catch (error) {
      console.error("Error fetching bloodRequest details:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to fetch blood request details. Please try again.',
      });
    }
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', margin: '20px 30px 10px 30px' }}>
          <StyledTabs className="relative" centered onChange={handleTabChange} aria-label="BloodRequest API tabs">
            <StyledTab label="Blood Requests" value="1" />
            <StyledTab label="Request History" value="2" />
          </StyledTabs>
        </Box>

        {/* BloodRequest Requests Tab */}
        <TabPanel value="1">
          <div className="container mx-auto p-6 border rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table
                className="data-table border-separate border min-w-full table-auto divide-y divide-gray-200 text-sm text-gray-600"
              >
                <thead style={{ backgroundColor: "#fce7f3", color: "#852B2D" }}>
                  <tr className="table-row">
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Sr.</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Recipient Name</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Blood Group</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Quantity</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Reason</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Status</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Date of BloodRequest</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bloodRequests.filter(bloodRequest => bloodRequest.status === "Pending").map((bloodRequest, index) => (
                    <tr key={bloodRequest.requestID} className="text-base font-semibold text-black">
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{bloodRequest.recipientName}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{bloodRequest.bloodGroupName}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{bloodRequest.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{bloodRequest.reason || "N/A"}</td>
                      <td className={`px-6 py-4 whitespace-nowrap border border-gray-300`}>
                        <span className={`py-1 px-3 text-sm rounded-full gradient-pending`}>
                          {bloodRequest.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-right">
                        {bloodRequest.requestDate ? format(new Date(bloodRequest.requestDate), 'dd MMM, yyyy') : "N/A"}
                      </td>
                      <td className="whitespace-nowrap border border-gray-300">
                        <div className="flex justify-center items-center">
                          <Tooltip title="Edit">
                            <IconButton onClick={() => handleUpdateBloodRequest(bloodRequest.requestID)}>
                              <div className="px-2 py-1 flex justify-around items-center border gradient-approve rounded-full text-lg text-white">
                                <FaEdit />
                              </div>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDeleteBloodRequest(bloodRequest.requestID)}>
                              <div className="px-2 py-1 flex justify-around items-center border gradient-reject rounded-full text-lg text-white">
                                <MdCancelPresentation />
                                </div>
                              </IconButton>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabPanel>

        {/* BloodRequest History Tab */}
        <TabPanel value="2">
          <div className="container mx-auto p-6 border rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table
                className="data-table border-separate border min-w-full table-auto divide-y divide-gray-200 text-sm text-gray-600"
              >
                <thead style={{ backgroundColor: "#fce7f3", color: "#852B2D" }}>
                  <tr className="table-row">
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Sr.</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Recipient Name</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Blood Group</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Quantity</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Reason</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Status</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Date of BloodRequest</th>
                  </tr>
                </thead>
                <tbody>
                  {bloodRequests.map((bloodRequest, index) => (
                    <tr key={bloodRequest.requestID} className="text-base font-semibold text-black">
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{bloodRequest.recipientName}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{bloodRequest.bloodGroupName}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{bloodRequest.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{bloodRequest.reason || "N/A"}</td>
                      <td className={`px-6 py-4 whitespace-nowrap border border-gray-300`}>
                        <span className={`py-1 px-3 text-sm rounded-full ${bloodRequest.status === "Pending" ? "gradient-pending" : bloodRequest.status === "Approved" ? "gradient-approve text-white" : "gradient-reject text-white"}`}>
                          {bloodRequest.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-right">
                        {bloodRequest.requestDate ? format(new Date(bloodRequest.requestDate), 'dd MMM, yyyy') : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default RecipientRepository;