'use client';
import { useState } from "react";
import AdminLayout from "@/components/maincomp/AdminLayout";

function Postreq() {
    const tokens = [
        { id: '1', farmer: 'John Doe', crop: 'Wheat', quantity: '100 kg', amount: '5000 Bushels', date: "Apr 1, 2025", action: 'Accept' },
        { id: '2', farmer: 'Alice Smith', crop: 'Corn', quantity: '150 kg', amount: '4000 Bushels', date: "Mar 28, 2025", action: 'Reject' },
        { id: '3', farmer: 'Bob Johnson', crop: 'Rice', quantity: '130 kg', amount: '2000 Bushels', date: "Mar 25, 2025", action: 'Reject' },
        { id: '4', farmer: 'Emily Brown', crop: 'Soybeans', quantity: '110 kg', amount: '6000 Bushels', date: "Mar 10, 2025", action: 'Accept' },
        { id: '5', farmer: 'David Wilson', crop: 'Barley', quantity: '160 kg', amount: '4000 Bushels', date: "Mar 5, 2025", action: 'Reject' },
        { id: '6', farmer: 'Joe Denly', crop: 'Potato', quantity: '190 kg', amount: '3000 Bushels', date: "Feb 10, 2025", action: 'Reject' },
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
        <h1 className="text-3xl font-bold text-[#6f9d7e] mb-4">Post-Harvest Requests</h1>
      </div>

      <div className="p-6 bg-[#6F9D7E] w-full  mx-auto text-black border border-[#FFE990] rounded-lg shadow">
        

        <div className="overflow-x-auto">
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
                  <td className="py-3 px-8 font-semibold">{token.id}</td>
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

export default Postreq;