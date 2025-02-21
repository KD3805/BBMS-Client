import React, { useEffect, useState } from 'react';
import { OutlinedButton, SelectField } from '../custom/CustomComponents';
import useFormValidation from '../../hooks/useFormValidation';
import useBloodStockApi from '../../hooks/useBloodStockApi';
import { CgSpinner } from 'react-icons/cg';
import { GiDrop } from 'react-icons/gi';
import { format } from 'date-fns';
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/dataTables.dataTables.css";
import toast, { Toaster } from 'react-hot-toast';

const BloodAvailability = () => {
    const [loading, setLoading] = useState(false);
    const [availabilityData, setAvailabilityData] = useState(null);

    const { fetchBloodAvailabilityByGroupApi } = useBloodStockApi();

    // Custom hook to manage form data and validation
    const {
        formData,
        errors,
        handleInputChange,
        setFieldError
    } = useFormValidation({
        BloodGroupName: ""
    });

    // Initialize DataTables safely
    useEffect(() => {
        if (availabilityData) {
            if ($.fn.DataTable.isDataTable('.data-table')) {
                $('.data-table').DataTable().destroy();
            }
            $(".data-table").DataTable();
        }
    }, [availabilityData]);

    const handleAvailability = async () => {
        setLoading(true);
        setAvailabilityData(null)
        setFieldError("BloodGroupName", "");
        try {
            const data = await fetchBloodAvailabilityByGroupApi(formData.BloodGroupName);
            setAvailabilityData(data);
        } catch (err) {
            // setFieldError("BloodGroupName", err.message);
            toast.error(err.message);
            setAvailabilityData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">Blood Stock Availability</h2>

                <Toaster toastOptions={{ duration: 4000 }} />

                <div className="grid">
                    <div className='w-full box-border shadow-md'>
                        <h1 className="bg-pink-100 p-3 font-semibold text-lg"
                            style={{ color: "#852B2D", borderBottom: "1px solid #852B2D" }}>
                            Search Blood Stock
                        </h1>
                        <div className="flex justify-center items-end flex-grow flex-wrap gap-10 mb-4 text-lg lg:px-0 p-4">
                            {/* Blood Group */}
                            <div className='flex justify-center lg:w-3/6 w-full'>
                                <SelectField
                                    label="Blood Group"
                                    id="BloodGroupName"
                                    options={[
                                        "AB-Ve",
                                        "AB+Ve",
                                        "A-Ve",
                                        "A+Ve",
                                        "B-Ve",
                                        "B+Ve",
                                        "Oh-Ve",
                                        "Oh+Ve",
                                        "O-Ve",
                                        "O+Ve",
                                    ]}
                                    value={formData.BloodGroupName}
                                    error={errors.BloodGroupName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='flex justify-center w-48'>
                                <OutlinedButton
                                    type='button'
                                    onClick={handleAvailability}
                                    disabled={loading}
                                    loading={loading}
                                    text='Check Availability'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Render availability data only if StockDetails is defined */}
                {availabilityData && (
                    <div className="availability-result p-4 my-8">

                        {/* Availability Card */}
                        <div>
                            <div className="w-full h-fit red-bg-gradient text-white flex flex-col items-start rounded-tl-xl rounded-tr-xl shadow-sm">
                                <div className="w-full px-2">
                                    <div className="border-b py-4">
                                        <div className="flex flex-col justify-between items-center">
                                            <div className="flex gap-2 items-center justify-center">
                                                <p className="text-5xl">{availabilityData?.stockDetails.totalBloodStock || 0}</p>
                                                <span className="text-4xl"><GiDrop /></span>
                                            </div>
                                            <div className="text-end">
                                                <p className="text-xl font-semibold me-2">Total Blood Stock <span className="text-lg font-medium">(units)</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full px-4 py-6">
                                    <div className="flex justify-between items-center flex-wrap flex-grow lg:gap-0 md:gap-0 sm:gap-3">
                                        <div className="flex flex-col items-center lg:w-1/3 md:w-1/3 w-full">
                                            <p className="text-base">Blood Group</p>
                                            <p className="text-lg font-bold">{availabilityData?.stockDetails.bloodGroupName || '-'}</p>
                                        </div>
                                        <div className="flex flex-col items-center lg:w-1/3 md:w-1/3 w-full">
                                            <p className="text-base">Last Updated</p>
                                            <p className="text-lg font-bold">{availabilityData ? format(new Date(availabilityData.stockDetails.lastUpdated), 'dd MMM, yyyy') : 'NA'}</p>
                                        </div>
                                        <div className="flex flex-col items-center lg:w-1/3 md:w-1/3 w-full">
                                            <p className="text-base">Total Donors</p>
                                            <p className="text-lg font-bold text-right">{availabilityData?.stockDetails.totalDonors || 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Donor List */}
                        {availabilityData.donors && availabilityData.donors.length > 0 && (
                            <div className="container mx-auto p-6 border rounded-bl-xl rounded-br-xl shadow-lg">
                                <div className="overflow-x-auto">
                                    <h2 className="text-3xl font-bold text-red-700 text-center my-4">Donors List</h2>
                                    <table className="data-table border-separate border min-w-full table-auto divide-y divide-gray-200 text-sm text-gray-600">
                                        <thead style={{ backgroundColor: "#fce7f3", color: "#852B2D" }}>
                                            <tr className="table-row">
                                                <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Sr.</th>
                                                <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Donor Name</th>
                                                <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Phone No.</th>
                                                <th className="px-6 py-3 border border-gray-300 text-base font-bold uppercase tracking-tighter text-left">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {availabilityData.donors.map((donor, index) => (
                                                <tr key={donor.donorID} className="text-base font-semibold text-black">
                                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{index + 1}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                                                        {donor.donorName}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                                                        {donor.donorPhone}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                                                        {donor.donorEmail}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default BloodAvailability;
