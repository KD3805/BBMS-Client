import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import useDonationApi from "../../../hooks/useDonationApi";
import { IconButton, Tooltip } from "@mui/material";
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material';
import { FaCheck } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { MdCancelPresentation } from "react-icons/md";
import { format } from 'date-fns'; // Importing date-fns library for date formatting

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

const Donations = () => {
  const { fetchAllDonationsApi, updateDonationStatusApi, deleteDonationApi } = useDonationApi();
  const [donations, setDonations] = useState([]);
  const [tab, setTab] = useState('1');

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await fetchAllDonationsApi();
        setDonations(data);
      } catch (error) {
        console.error("Failed to fetch donation records:", error);
      }
    };
    fetchDonations();
  }, []);

  // Initialize DataTables on the table after data is loaded
  useEffect(() => {
    if (donations.length > 0) {
      $(".data-table").DataTable();
    }
  }, [donations, tab]);

  const handleUpdateStatus = async (donationID, status) => {
    if (!status) {
      return; // Do not proceed if the status is null or empty
    }
    try {
      // Show success or warning notification based on the status
      if (status === "Approved") {
        await updateDonationStatusApi(donationID, status);

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'You have approved the donation request.',
        });
      } else if (status === "Rejected") {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: true
        });
        swalWithBootstrapButtons.fire({
          title: "Are you sure want?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, Reject it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true
        }).then(async (result) => {
          if (result.isConfirmed) {
            await updateDonationStatusApi(donationID, status);

            swalWithBootstrapButtons.fire({
              title: "Rejected!",
              text: "Donation request has been rejected.",
              icon: "success"
            });

          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Donation request is still pending.",
              icon: "error"
            });
          }
        });
      }

      // Refresh the donations list
      const updatedData = await fetchAllDonationsApi();
      setDonations(updatedData);
    } catch (error) {
      console.error("Failed to update status:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update status. Please try again.',
      });
    }
  };

  const handleDeleteDonation = async (donationID) => {
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
          await deleteDonationApi(donationID);

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Donation request has been deleted.",
            icon: "success"
          });

          // Refresh the donations list
          const updatedData = await fetchAllDonationsApi();
          setDonations(updatedData);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Donation request is safe :)",
            icon: "error"
          });
        }
      });
    } catch (error) {
      console.error("Error deleting donation:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to delete donation. Please try again.',
      });
    }
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', margin: '20px 30px 10px 30px' }}>
          <StyledTabs className="relative" centered onChange={handleTabChange} aria-label="Donation API tabs">
            <StyledTab label="Donation Requests" value="1" />
            <StyledTab label="Donation History" value="2" />
          </StyledTabs>
        </Box>

        {/* Donation Requests Tab */}
        <TabPanel value="1">
          <div className="container mx-auto p-6 border rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table
                className="data-table border-separate border min-w-full table-auto divide-y divide-gray-200 text-sm text-gray-600"
              >
                <thead style={{ backgroundColor: "#fce7f3", color: "#852B2D" }}>
                  <tr className="table-row">
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Sr.</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Donor Name</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Blood Group</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Quantity</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Weight</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Last Donation Date</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Disease</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Status</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Date of Donation</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Approve / Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.filter(donation => donation.status === "Pending").map((donation, index) => (
                    <tr key={donation.donationID} className="text-base font-semibold text-black">
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{donation.donorName}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{donation.bloodGroupName}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{donation.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{donation.weight}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-right">
                        {donation.lastDonationDate ? format(new Date(donation.lastDonationDate), 'dd MMM, yyyy') : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{donation.disease || "N/A"}</td>
                      <td className={`px-6 py-4 whitespace-nowrap border border-gray-300`}>
                        <span className={`py-1 px-3 text-sm rounded-full gradient-pending`}>
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-right">
                        {donation.dateOfDonation ? format(new Date(donation.dateOfDonation), 'dd MMM, yyyy') : "N/A"}
                      </td>
                      <td className="whitespace-nowrap border border-gray-300">
                        <div className="flex justify-center items-center">
                          <Tooltip title="Approve">
                            <IconButton onClick={() => handleUpdateStatus(donation.donationID, "Approved")}>
                              <div className="px-2 py-1 flex justify-around items-center gap-1 border gradient-approve rounded-full text-base text-white">
                                <FaCheck />
                              </div>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton onClick={() => handleUpdateStatus(donation.donationID, "Rejected")}>
                              <div className="px-2 py-1 flex justify-around items-center gap-1 border gradient-reject rounded-full text-lg text-white">
                                <TiCancel />
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

        {/* Donation History Tab */}
        <TabPanel value="2">
          <div className="container mx-auto p-6 border rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table
                className="data-table border-separate border min-w-full table-auto divide-y divide-gray-200 text-sm text-gray-600"
              >
                <thead style={{ backgroundColor: "#fce7f3", color: "#852B2D" }}>
                  <tr className="table-row">
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Sr.</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Donor Name</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Blood Group</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Quantity</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Weight</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Last Donation Date</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Disease</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Status</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Date of Donation</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation, index) => (
                    <tr key={donation.donationID} className="text-base font-semibold text-black">
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{donation.donorName}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{donation.bloodGroupName}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{donation.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{donation.weight}</td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-right">
                        {donation.lastDonationDate ? format(new Date(donation.lastDonationDate), 'dd MMM, yyyy') : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{donation.disease || "N/A"}</td>
                      <td className={`px-6 py-4 whitespace-nowrap border border-gray-300`}>
                        <span className={`py-1 px-3 text-sm rounded-full ${donation.status === "Pending" ? "gradient-pending" : donation.status === "Approved" ? "gradient-approve text-white" : "gradient-reject text-white"}`}>
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-right">
                        {donation.dateOfDonation ? format(new Date(donation.dateOfDonation), 'dd MMM, yyyy') : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                        <div className="flex justify-center items-center">
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDeleteDonation(donation.donationID)}>
                              <MdCancelPresentation className="text-rose-600" />
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
      </TabContext>
    </Box>
  );
};

export default Donations;
