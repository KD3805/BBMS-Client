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
import { MdCancelPresentation } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { format } from 'date-fns'; 
import { useDonorStore } from "../../../zustand/store";
import { useNavigate } from "react-router-dom";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

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

async function generateCertificatePDF(donorName, donationDate) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const templateUrl = 'https://res.cloudinary.com/deq0hxr3t/image/upload/v1739078851/Blood_Donation_Certificate_01_im8a7y.png';
  const templateBytes = await fetch(templateUrl).then(res => res.arrayBuffer());
  const templateImage = await pdfDoc.embedPng(templateBytes);

  const fontUrl = 'https://res.cloudinary.com/deq0hxr3t/raw/upload/v1738947500/Notable-Regular_tskkqm.ttf';
  const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
  const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });
  const builtInFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([842, 595]);
  page.drawImage(templateImage, {
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight(),
  });

  const donorFontSize = 37;
  const donorTextWidth = customFont.widthOfTextAtSize(donorName, donorFontSize);
  const donorX = (page.getWidth() - donorTextWidth) / 2;
  const donorY = page.getHeight() / 2;
  page.drawText(donorName, {
    x: donorX,
    y: donorY,
    size: donorFontSize,
    font: customFont,
    color: rgb(1, 0.1, 0.1),
  });

  const dateFontSize = 17;
  const dateTextWidth = customFont.widthOfTextAtSize(donationDate, dateFontSize);
  const dateX = (page.getWidth() - dateTextWidth) / 2 + 16;
  const dateY = donorY - 88;
  page.drawText(donationDate, {
    x: dateX,
    y: dateY,
    size: dateFontSize,
    font: builtInFont,
    color: rgb(0, 0, 0),
  });

  return await pdfDoc.save();
}


const DonorRepository = () => {
  const { getDonationHistoryByDonorIDApi, deleteDonationApi, getDonationByIdApi } = useDonationApi();
  const [donations, setDonations] = useState([]);
  const [tab, setTab] = useState('1');
  const navigate = useNavigate();
  const loggedDonor = useDonorStore((state) => state.loggedDonor)

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getDonationHistoryByDonorIDApi(loggedDonor.donorID);
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
          const updatedData = await getDonationHistoryByDonorIDApi(loggedDonor.donorID);
          setDonations(updatedData);
        } else if (
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

  const handleUpdateDonationRequest = async (donationID) => {
    try {
      const donationDetails = await getDonationByIdApi(donationID);
      // Redirect to DonationForm with the donation details
      navigate(`/DonorDashboard/?layout=1&DonationID=${donationID}`, { state: { donation: donationDetails } });
    } catch (error) {
      console.error("Error fetching donation details:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to fetch donation details. Please try again.',
      });
    }
  };

  const handleGenerateCertificate = async (donorName, donationDate) => {
    try {
      const pdfBytes = await generateCertificatePDF(donorName, donationDate);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank'); // Opens the PDF in a new tab
    } catch (error) {
      console.error('Error generating certificate:', error);
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
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Action</th>
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
                        <div className="flex justify-center items-center">
                          <span className={`py-1 px-3 text-sm rounded-full gradient-pending`}>
                            {donation.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-right">
                        {donation.dateOfDonation ? format(new Date(donation.dateOfDonation), 'dd MMM, yyyy') : "N/A"}
                      </td>
                      <td className="whitespace-nowrap border border-gray-300">
                        <div className="flex justify-center items-center">
                          <Tooltip title="Edit">
                            <IconButton onClick={() => handleUpdateDonationRequest(donation.donationID)}>
                              <div className="px-2 py-1 flex justify-around items-center border gradient-approve rounded-full text-lg text-white">
                                <FaEdit />
                              </div>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDeleteDonation(donation.donationID)}>
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
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Date of Donation</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Status</th>
                    <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Certificate</th>
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
                      <td className="px-6 py-4 whitespace-nowrap border border-gray-300 text-right">
                        {donation.dateOfDonation ? format(new Date(donation.dateOfDonation), 'dd MMM, yyyy') : "N/A"}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap border border-gray-300`}>
                        <div className="flex justify-center items-center">
                          <span className={`py-1 px-3 text-sm rounded-full ${donation.status === "Pending" ? "gradient-pending" : donation.status === "Approved" ? "gradient-approve text-white" : "gradient-reject text-white"}`}>
                            {donation.status}
                          </span>
                        </div>
                      </td>
                      
                      <td className="whitespace-nowrap border border-gray-300">
                        <div className="flex justify-center items-center">
                          { donation.status === "Approved" && 
                            (<Tooltip title="Download">
                              <IconButton onClick={() => handleGenerateCertificate(donation.donorName, donation.dateOfDonation ? format(new Date(donation.dateOfDonation), 'dd MMM, yyyy') : "N/A")}>
                                <div className="px-2 py-1 flex justify-around items-center border bg-teal-500 rounded-full text-lg text-white">
                                  <IoMdDownload />
                                </div>
                              </IconButton>
                            </Tooltip>)
                          }
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

export default DonorRepository;
