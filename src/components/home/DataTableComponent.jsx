// src/DataTableComponent.jsx
import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';

const DataTableComponent = () => {
    useEffect(() => {
        $('#data-table').DataTable();
    }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table id='data-table' className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Office</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Tiger Nixon</td>
              <td className="px-6 py-4 whitespace-nowrap">System Architect</td>
              <td className="px-6 py-4 whitespace-nowrap">Edinburgh</td>
              <td className="px-6 py-4 whitespace-nowrap">61</td>
              <td className="px-6 py-4 whitespace-nowrap">2011/04/25</td>
              <td className="px-6 py-4 whitespace-nowrap">$320,800</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Garrett Winters</td>
              <td className="px-6 py-4 whitespace-nowrap">Accountant</td>
              <td className="px-6 py-4 whitespace-nowrap">Tokyo</td>
              <td className="px-6 py-4 whitespace-nowrap">63</td>
              <td className="px-6 py-4 whitespace-nowrap">2011/07/25</td>
              <td className="px-6 py-4 whitespace-nowrap">$170,750</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Ashton Cox</td>
              <td className="px-6 py-4 whitespace-nowrap">Junior Technical Author</td>
              <td className="px-6 py-4 whitespace-nowrap">San Francisco</td>
              <td className="px-6 py-4 whitespace-nowrap">66</td>
              <td className="px-6 py-4 whitespace-nowrap">2009/01/12</td>
              <td className="px-6 py-4 whitespace-nowrap">$86,000</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Cedric Kelly</td>
              <td className="px-6 py-4 whitespace-nowrap">Senior Javascript Developer</td>
              <td className="px-6 py-4 whitespace-nowrap">Edinburgh</td>
              <td className="px-6 py-4 whitespace-nowrap">22</td>
              <td className="px-6 py-4 whitespace-nowrap">2012/03/29</td>
              <td className="px-6 py-4 whitespace-nowrap">$433,060</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTableComponent;
