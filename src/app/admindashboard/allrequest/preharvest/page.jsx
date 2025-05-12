'use client';
import { useState } from "react";
import AdminLayout from "@/components/maincomp/AdminLayout";

function Prereq() {
   const tokens = [
       { id: "1",farmer: "John Doe",crop: 'Wheat', quantity: '500 bushel', amount: '$25,000', date: 'Apr 1, 2025' },
       { id: "2",farmer: "Alice Smith",crop: 'Rice', quantity: '800 bushel', amount: '$40,000', date: 'Mar 28, 2025' },
       { id: "3",farmer: "Bob Johnson",crop: 'Corn', quantity: '1200 bushel', amount: '$60,000', date: 'Mar 25, 2025' },
       { id: "4",farmer: "Emily Brown",crop: 'Soybean', quantity: '600 bushel', amount: '$35,000', date: 'Mar 10, 2025' },
       { id: "5",farmer: "David Wilson",crop: 'Barley', quantity: '400 bushel', amount: '$20,000', date: 'Mar 5, 2025' },
       { id: "6",farmer: "Joe Denly",crop: 'Potato', quantity: '2000 bushel', amount: '$30,000',  date: 'Feb 15, 2025' },
     ];
   
     const statusColors = {
       Approved: 'bg-green-100 text-green-800',
       Rejected: 'bg-red-100 text-red-800',
     };
   
     const statuses = ['All', 'Approved', 'Rejected'];
     const [selectedStatus, setSelectedStatus] = useState('All');
   
     const filteredTokens = selectedStatus === 'All'
       ? tokens
       : tokens.filter((token) => token.status === selectedStatus);
   
  return (
    <AdminLayout>
      <div className="text-[#FFE990] px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#6f9d7e] mb-6">
          Pre-Harvest Requests
        </h1>
      </div>

      {/* Filter + Table */}
      <div className="p-4 sm:p-6 bg-[#6F9D7E] w-full mx-auto text-black border border-[#FFE990] rounded-lg shadow">
        <div className="overflow-x-auto hidden sm:block">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="text-left text-[#FFE990]">
              <tr>
                 <th className="py-3 px-4 font-semibold text-lg">S.No</th>
                <th className="py-3 px-4 font-semibold text-lg">Farmer</th>
                <th className="py-3 px-4 font-semibold text-lg">Crop</th>
                <th className="py-3 px-4 font-semibold text-lg">Quantity</th>
                <th className="py-3 px-4 font-semibold text-lg">Amount</th>
                <th className="py-3 px-4 font-semibold text-lg">Date</th>
                <th className="py-3 px-10 font-semibold text-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 text-gray-200">
              {filteredTokens.map((token, index) => (
                <tr key={index}>
                   <td className="py-3 px-8">{token.id}</td>
                   <td className="py-3 px-4">{token.farmer}</td>
                  <td className="py-3 px-4">{token.crop}</td>
                  <td className="py-3 px-4">{token.quantity}</td>
                  <td className="py-3 px-4">{token.amount}</td>
                  <td className="py-3 px-4">{token.date}</td>
                  <td className="py-3 px-4">
  <div className="flex gap-2">
    <button className="btn btn-success btn-sm">Accept</button>
    <button className="btn btn-error btn-sm">Reject</button>
  </div>
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
                <div><strong className="text-[#FFE990]">S.No:</strong> {token.id}</div>
               <div><strong className="text-[#FFE990]">Farmer:</strong> {token.farmer}</div>
              <div><strong className="text-[#FFE990]">Crop:</strong> {token.crop}</div>
              <div><strong className="text-[#FFE990]">Quantity:</strong> {token.quantity}</div>
              <div><strong className="text-[#FFE990]">Amount:</strong> {token.amount}</div>
              <div><strong className="text-[#FFE990]">Date:</strong> {token.date}</div>
              <div>
                <strong className="text-[#FFE990]">Actions:</strong>{" "}
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full inline-block mt-1`}
                >
                  <button className="btn btn-success btn-sm">Accept</button>
    <button className="btn btn-error btn-sm ml-2">Reject</button>
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
    </AdminLayout>
  );
}

export default Prereq;