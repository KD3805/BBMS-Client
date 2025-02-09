import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import Swal from 'sweetalert2';
import { MdCancelPresentation } from "react-icons/md";
import { format } from 'date-fns';
import useRecipientApi from "../../../hooks/useRecipientApi";
import { IconButton, Tooltip } from "@mui/material";


const RecipientsDetail = () => {

  const { fetchAllRecipientsApi, deleteRecipientApi } = useRecipientApi();
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const data = await fetchAllRecipientsApi();
        setRecipients(data);
      } catch (error) {
        console.error("Failed to fetch recipient records:", error);
      }
    };
    fetchRecipients();
  }, []);

  // Initialize DataTables on the table after data is loaded
  useEffect(() => {
    if (recipients.length > 0) {
      $(".data-table").DataTable();
    }
  }, [recipients]);

  const handleDeleteRecipient = async (recipientID) => {
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
          await deleteRecipientApi(recipientID);

          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Recipient has been deleted.",
            icon: "success"
          });

          // Refresh the recipients list
          const updatedData = await fetchAllRecipientsApi();
          setRecipients(updatedData);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Recipient is safe :)",
            icon: "error"
          });
        }
      });
    } catch (error) {
      console.error("Error deleting recipient:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to delete recipient. Please try again.',
      });
    }
  };

  return (
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
              <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Email</th>
              <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">DOB</th>
              <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Age</th>
              <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Gender</th>
              <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Phone</th>
              <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Address</th>
              <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Registration Date</th>
              <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Actions</th> {/* Added Actions column to match the number of columns in the table body */}
            </tr>
          </thead>
          <tbody>
            {recipients.map((recipient, index) => (
              <tr key={recipient.recipientID} className="text-base font-semibold text-black">
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{recipient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{recipient.bloodGroupName}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{recipient.email}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{format(new Date(recipient.dob), 'dd MMM, yyyy')}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{recipient.age}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{recipient.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{recipient.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{recipient.address}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{recipient.createdAt ? format(new Date(recipient.createdAt), 'dd MMM, yyyy') : "N/A"}</td>
                <td className="whitespace-nowrap border border-gray-300">
                  <div className="flex justify-center items-center">
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteRecipient(recipient.recipientID)}>
                        <div className="px-2 py-1 flex justify-around items-center gap-1 border gradient-reject rounded-full text-lg text-white">
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
  )
}

export default RecipientsDetail
