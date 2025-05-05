'use client';
import { useState } from "react";
import FarmerLayout from "@/components/maincomp/FarmerLayout";

function Prehistory() {
  const tokens = [
    { crop: 'Wheat', quantity: '500 bushel', amount: '$25,000', type: 'Pre-Harvest', date: 'Apr 1, 2025', status: 'Requested' },
    { crop: 'Rice', quantity: '800 bushel', amount: '$40,000', type: 'Pre-Harvest', date: 'Mar 28, 2025', status: 'Created' },
    { crop: 'Corn', quantity: '1200 bushel', amount: '$60,000', type: 'Post-Harvest', date: 'Mar 25, 2025', status: 'Approved' },
    { crop: 'Soybean', quantity: '600 bushel', amount: '$35,000', type: 'Pre-Harvest', date: 'Mar 10, 2025', status: 'Rejected' },
    { crop: 'Barley', quantity: '400 bushel', amount: '$20,000', type: 'Post-Harvest', date: 'Mar 5, 2025', status: 'Created' },
    { crop: 'Potato', quantity: '2000 bushel', amount: '$30,000', type: 'Post-Harvest', date: 'Feb 15, 2025', status: 'Completed' },
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
    <FarmerLayout>
      <div className="p-6 text-[#FFE990]">
        <h1 className="text-3xl font-bold text-black mb-4">Pre-Harvest Overview of History</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 ml-4 gap-8">
          <div className="bg-[#6F9D7E] p-4 shadow rounded-xl border">
            <h2 className="text-xl font-semibold mb-2">Crop Planning</h2>
            <p className="text-gray-200">Details about planned crops, timelines, and expected yield.</p>
          </div>

          <div className="bg-[#6F9D7E] p-4 shadow rounded-xl border">
            <h2 className="text-xl font-semibold mb-2">Investment Allocation</h2>
            <p className="text-gray-200">Information on where the investor's money is being used in the pre-harvest phase.</p>
          </div>

          <div className="bg-[#6F9D7E] p-4 shadow rounded-xl border">
            <h2 className="text-xl font-semibold mb-2">Farmer Updates</h2>
            <p className="text-gray-200">Updates from the farmers related to seeding, soil preparation, and equipment usage.</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-[#6F9D7E] max-w-6xl mx-auto text-black border border-[#FFE990] rounded-lg shadow">
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
                <th className="py-3 px-4 font-semibold text-lg">Crop</th>
                <th className="py-3 px-4 font-semibold text-lg">Quantity</th>
                <th className="py-3 px-4 font-semibold text-lg">Amount</th>
                <th className="py-3 px-4 font-semibold text-lg">Type</th>
                <th className="py-3 px-4 font-semibold text-lg">Date</th>
                <th className="py-3 px-4 font-semibold text-lg">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 text-gray-200">
              {filteredTokens.map((token, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 font-semibold">{token.crop}</td>
                  <td className="py-3 px-4">{token.quantity}</td>
                  <td className="py-3 px-4">{token.amount}</td>
                  <td className="py-3 px-4">{token.type}</td>
                  <td className="py-3 px-4">{token.date}</td>
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
    </FarmerLayout>
  );
}

export default Prehistory;
