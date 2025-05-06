'use client';
import { useState } from "react";
import AdminLayout from "@/components/maincomp/AdminLayout";

function Approvereq() {
  const tokens = [
    { id: 'ry671p7vl', farmer: 'John Doe', crop: 'Wheat', quantity: '100 kg', amount: '5000 Bushels',type: 'Pre-Harvest', status: 'Requested' },
    { id: 'ss5rb8gce', farmer: 'Alice Smith', crop: 'Corn', quantity: '150 kg', amount: '4000 Bushels',type: 'Pre-Harvest', status: 'Created' },
    { id: '1hesf8j42', farmer: 'Bob Johnson', crop: 'Rice', quantity: '130 kg', amount: '2000 Bushels',type: 'Post-Harvest', status: 'Approved' },
    { id: '9jtqugxf8', farmer: 'Emily Brown', crop: 'Soybeans', quantity: '110 kg', amount: '6000 Bushels',type: 'Post-Harvest', status: 'Rejected' },
    { id: 'pcrz0ypqu', farmer: 'David Wilson', crop: 'Barley', quantity: '160 kg', amount: '4000 Bushels',type: 'Pre-Harvest', status: 'Created' },
    { id: 'hckh147cb', farmer: 'Joe Denly', crop: 'Potato', quantity: '190 kg', amount: '3000 Bushels',type: 'Post-Harvest', status: 'Completed' },
  ];

  const statusColors = {
    Requested: 'bg-yellow-100 text-yellow-800',
    Created: 'bg-blue-100 text-blue-800',
    Approved: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
    Completed: 'bg-purple-100 text-purple-800',
  };

  const statuses = ['All', 'Requested', 'Created', 'Approved', 'Rejected', 'Completed'];
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredTokens = selectedStatus === 'All'
    ? tokens
    : tokens.filter((token) => token.status === selectedStatus);

  return (
    <AdminLayout>
      <div className=" text-[#FFE990] ">
        <h1 className="text-3xl font-bold text-[#6f9d7e] mb-4">Approved Requests</h1>

        <div className="flex gap-4 justify-between items-center mb-4 w-full ">
          <div className="bg-[#6F9D7E] p-4 shadow w-11/12 rounded-xl border">
            <h2 className="text-xl font-semibold mb-2">Crop Planning</h2>
            <p className="text-gray-200">Details about planned crops, timelines, and expected yield.</p>
          </div>

          <div className="bg-[#6F9D7E] p-4 shadow w-11/12 rounded-xl border">
            <h2 className="text-xl font-semibold mb-2">Investment Allocation</h2>
            <p className="text-gray-200">Information on where the investor's money is being used in the pre-harvest phase.</p>
          </div>

          <div className="bg-[#6F9D7E] p-4 shadow w-11/12 rounded-xl border">
            <h2 className="text-xl font-semibold mb-2 ">Farmer Updates</h2>
            <p className="text-gray-200">Updates from the farmers related to seeding, soil preparation, and equipment usage.</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-[#6F9D7E] w-full  mx-auto text-black border border-[#FFE990] rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Showing {filteredTokens.length} tokens</h2>
          <select
            className="border rounded px-3 py-2 text-sm text-black bg-white focus:outline-none"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="text-left text-[#FFE990]">
              <tr>
                <th className="py-3 px-4 font-semibold text-lg">Id</th>
                <th className="py-3 px-4 font-semibold text-lg">Farmer</th>
                <th className="py-3 px-4 font-semibold text-lg">Crop</th>
                <th className="py-3 px-4 font-semibold text-lg">Quantity</th>
                <th className="py-3 px-4 font-semibold text-lg">Amount</th>
                <th className="py-3 px-4 font-semibold text-lg">Type</th>
                <th className="py-3 px-4 font-semibold text-lg">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 text-gray-200">
              {filteredTokens.map((token, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 font-semibold">{token.id}</td>
                  <td className="py-3 px-4">{token.farmer}</td>
                  <td className="py-3 px-4">{token.crop}</td>
                  <td className="py-3 px-4">{token.quantity}</td>
                  <td className="py-3 px-4">{token.amount}</td>
                  <td className="py-3 px-4">{token.type}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[token.status]}`}>
                      {token.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredTokens.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-200">
                    No tokens found for selected status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Approvereq;