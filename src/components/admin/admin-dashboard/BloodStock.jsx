import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import Swal from 'sweetalert2';
import { FaEdit } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import { format } from 'date-fns';
import useBloodStockApi from "../../../hooks/useBloodStockApi";
import { Box, IconButton, Modal, Tooltip } from "@mui/material";
import useFormValidation from "../../../hooks/useFormValidation";
import { InputField } from "../../custom/CustomComponents";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const BloodStock = () => {
  const { fetchAllBloodStocksApi, updateBloodStockApi, deleteBloodStockApi } = useBloodStockApi();
  const [bloodStocks, setBloodStocks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { formData, setFormData, errors, handleInputChange } = useFormValidation({
    StockID: 0,
    BloodGroupName: "",
    Quantity: 0,
  });

  function onCloseModal() {
    setOpenModal(false);
    setFormData({
      StockID: 0,
      BloodGroupName: "",
      Quantity: 0,
    });
  }

  useEffect(() => {
    const fetchBloodStocks = async () => {
      try {
        const data = await fetchAllBloodStocksApi();
        setBloodStocks(data);
      } catch (error) {
        console.error("Failed to fetch blood stock records:", error);
      }
    };
    fetchBloodStocks();
  }, []);

  // Initialize DataTables safely
  useEffect(() => {
    if (bloodStocks.length > 0) {
      if ($.fn.DataTable.isDataTable('.data-table')) {
        $('.data-table').DataTable().destroy();
      }
      $(".data-table").DataTable();
    }
  }, [bloodStocks]);

  const handleDeleteBloodStock = async (stockID) => {
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
          await deleteBloodStockApi(stockID);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Blood stock record has been deleted.",
            icon: "success"
          });
          const updatedData = await fetchAllBloodStocksApi();
          setBloodStocks(updatedData);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Blood stock record is safe :)",
            icon: "error"
          });
        }
      });
    } catch (error) {
      console.error("Error deleting bloodStock:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to delete blood stock record. Please try again.',
      });
    }
  };

  // Handle update form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const quantity = parseInt(formData.Quantity, 10);
      const payload = {
        // The StockID in the payload will be overridden by the controller using the URL parameter.
        StockID: formData.StockID,
        BloodGroupName: formData.BloodGroupName,
        Quantity: quantity
      };
      await updateBloodStockApi(formData.StockID, payload);
      Swal.fire("Success!", "Blood stock updated successfully!", "success");
      const updatedData = await fetchAllBloodStocksApi();
      setBloodStocks(updatedData);
    } catch (error) {
      console.error("Error in handleFormSubmit:", error);
      Swal.fire("Oops!", error.message || "Error processing blood stock. Please try again.", "error");
    } finally {
      onCloseModal();
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 border rounded-lg shadow-lg">
      <div className="overflow-x-auto">
        <table className="data-table border-separate border min-w-full table-auto divide-y divide-gray-200 text-sm text-gray-600">
          <thead style={{ backgroundColor: "#fce7f3", color: "#852B2D" }}>
            <tr className="table-row">
              <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Sr.</th>
              <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Blood Group</th>
              <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Quantity</th>
              <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Last Updated Date</th>
              <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bloodStocks.map((bloodStock, index) => (
              <tr key={bloodStock.stockID || bloodStock.StockID} className="text-base font-semibold text-black">
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                  {bloodStock.bloodGroupName || bloodStock.BloodGroupName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                  {bloodStock.quantity || bloodStock.Quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                  {(bloodStock.lastUpdated || bloodStock.LastUpdated)
                    ? format(new Date(bloodStock.lastUpdated || bloodStock.LastUpdated), 'dd MMM, yyyy')
                    : "N/A"}
                </td>
                <td className="whitespace-nowrap border border-gray-300">
                  <div className="flex justify-center items-center">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => {
                        setFormData({
                          StockID: bloodStock.stockID || bloodStock.StockID,
                          BloodGroupName: bloodStock.bloodGroupName || bloodStock.BloodGroupName,
                          Quantity: bloodStock.quantity || bloodStock.Quantity,
                        });
                        setOpenModal(true);
                      }}>
                        <div className="px-2 py-1 flex justify-around items-center border gradient-approve rounded-full text-lg text-white">
                          <FaEdit />
                        </div>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteBloodStock(bloodStock.stockID || bloodStock.StockID)}>
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

        <Modal
          open={openModal}
          onClose={onCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-red-700 text-center">Update blood stock</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 mb-4 text-lg">
                  <div className="flex flex-col gap-6">
                    <InputField
                      label="Blood Group"
                      id="BloodGroupName"
                      value={formData.BloodGroupName}
                      readOnly={true}
                    />
                    <InputField
                      label="Stock Quantity (units)"
                      id="Quantity"
                      type="number"
                      placeholder="Enter Quantity"
                      value={formData.Quantity}
                      error={errors.Quantity}
                      onChange={handleInputChange}
                    />
                    <button
                      type="submit"
                      className={`flex items-center font-bold justify-center w-full h-10 px-6 py-2 rounded shadow focus:outline-none transition-all duration-300 ${
                        loading
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-white border-2 border-red-700 text-red-700 hover:bg-red-400 hover:text-white hover:border-none"
                      }`}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default BloodStock;
