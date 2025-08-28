'use client';
import { useState } from "react";

function Posthistory() {
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
    <>
      <div className="text-[#FFE990] px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#6f9d7e] mb-6">
          Post-Harvest Overview of History
        </h1>

        {/* Responsive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#6F9D7E] p-4 shadow rounded-xl border">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Crop Planning</h2>
            <p className="text-gray-200 text-sm sm:text-base">
              Details about planned crops, timelines, and expected yield.
            </p>
          </div>

          <div className="bg-[#6F9D7E] p-4 shadow rounded-xl border">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Investment Allocation</h2>
            <p className="text-gray-200 text-sm sm:text-base">
              Information on where the investor's money is being used in the pre-harvest phase.
            </p>
          </div>

          <div className="bg-[#6F9D7E] p-4 shadow rounded-xl border">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Farmer Updates</h2>
            <p className="text-gray-200 text-sm sm:text-base">
              Updates from the farmers related to seeding, soil preparation, and equipment usage.
            </p>
          </div>
        </div>
      </div>

      
      <div className="p-4 sm:p-6 bg-[#6F9D7E] w-full mx-auto text-black border border-[#FFE990] rounded-lg shadow">
        {/* Header and Filter */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            Showing {filteredTokens.length} tokens
          </h2>
          <select
            className="w-full sm:w-auto border rounded px-3 py-2 text-sm text-black bg-white focus:outline-none"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto hidden sm:block">
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
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[token.status]}`}
                    >
                      {token.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stacked view for mobile */}
        <div className="block sm:hidden space-y-4">
          {filteredTokens.map((token, index) => (
            <div key={index} className="bg-[#5d8667] p-4 rounded-lg shadow border border-[#FFE990] text-white">
              <div><strong className="text-[#FFE990]">Crop:</strong> {token.crop}</div>
              <div><strong className="text-[#FFE990]">Quantity:</strong> {token.quantity}</div>
              <div><strong className="text-[#FFE990]">Amount:</strong> {token.amount}</div>
              <div><strong className="text-[#FFE990]">Type:</strong> {token.type}</div>
              <div><strong className="text-[#FFE990]">Date:</strong> {token.date}</div>
              <div>
                <strong className="text-[#FFE990]">Status:</strong>{" "}
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full inline-block mt-1 ${statusColors[token.status]}`}
                >
                  {token.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* No tokens case */}
        {filteredTokens.length === 0 && (
          <p className="py-6 text-center text-white">No tokens found for selected status.</p>
        )}
      </div>
      </>
  );
}

export default Posthistory;
