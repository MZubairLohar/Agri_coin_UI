"use client";

import { useState } from "react";
import { postHarvestInvestments } from "@/app/content/data";
import FarmerLayout from "@/components/maincomp/FarmerLayout";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaTractor,
  FaSearch,
  FaFilter,
  FaWarehouse,
  FaBoxes,
  FaTruck
} from "react-icons/fa";

export default function PostHarvest() {
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Calculate summary data
  const totalRequests = postHarvestInvestments.length;
  const totalRequested = postHarvestInvestments.reduce(
    (sum, investment) => sum + investment.totalRequested,
    0
  );
  const totalApproved = postHarvestInvestments.reduce(
    (sum, investment) => sum + (investment.approvedAmount || 0),
    0
  );
  const approvalRate =
    totalRequested > 0 ? Math.round((totalApproved / totalRequested) * 100) : 0;

  // Filter investments based on search and filters
  const filteredInvestments = postHarvestInvestments.filter((investment) => {
    const matchesSearch =
      investment.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investment.facilityType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || investment.status === statusFilter;

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "recent" &&
        new Date(investment.date) >
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
      (dateFilter === "upcoming" && new Date(investment.date) > new Date());

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Status colors and icons
  const statusConfig = {
    approved: {
      color: "bg-green-100 text-green-800",
      icon: <FaCheckCircle className="text-[#6f9d7e]" />,
    },
    partial: {
      color: "bg-blue-100 text-blue-800",
      icon: <FaCheckCircle className="text-blue-500" />,
    },
    pending: {
      color: "bg-yellow-100 text-yellow-800",
      icon: <FaClock className="text-[#FFE990]" />,
    },
    rejected: {
      color: "bg-red-100 text-red-800",
      icon: <FaTimesCircle className="text-red-500" />,
    },
  };

  return (
    <FarmerLayout>
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-6 flex items-center text-[#6f9d7e]">
          <FaWarehouse className="mr-2" /> Post-Harvest Investment Status
        </h1>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <label className="block text-sm text-gray-500 mb-1">Search Text</label>
              <div className="justify-between absolute inset-y-0 left-0 top-7 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search crops or facility type..."
                className="pl-10 w-full border p-2 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm text-gray-500 mb-1">Status</label>
              <select
                className="w-full border p-2 rounded"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="partial">Partially Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm text-gray-500 mb-1">Date</label>
              <select
                className="w-full border p-2 rounded"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="recent">Last 30 Days</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-gray-500 text-sm">Total Requests</h3>
            <p className="text-2xl font-bold">{totalRequests}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-gray-500 text-sm">Total Requested</h3>
            <p className="text-2xl font-bold">
              ${totalRequested.toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-gray-500 text-sm">Total Approved</h3>
            <p className="text-2xl font-bold">
              ${totalApproved.toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h3 className="text-gray-500 text-sm">Approval Rate</h3>
            <p className="text-2xl font-bold">{approvalRate}%</p>
          </div>
        </div>

        {/* Investment Cards - 4 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredInvestments.map((investment) => (
            <div
              key={investment.id}
              className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-semibold">{investment.cropName}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    statusConfig[investment.status].color
                  } flex items-center`}
                >
                  {statusConfig[investment.status].icon}
                  <span className="ml-1 capitalize">{investment.status}</span>
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Harvest Quantity:</span>
                  <span className="font-medium">
                    {investment.bushels.toLocaleString()} bushels
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Requested:</span>
                  <span className="font-medium">
                    ${investment.totalRequested.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Approved:</span>
                  <span className="font-medium">
                    {investment.approvedAmount
                      ? `$${investment.approvedAmount.toLocaleString()}`
                      : "N/A"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Facility Type:</span>
                  <span className="text-right text-sm">
                    {investment.facilityType}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Storage Capacity:</span>
                  <span className="text-sm">
                    {investment.storageCapacity} bushels
                  </span>
                </div>

                <div className="flex justify-between text-sm mt-3 pt-2 border-t">
                  <span className="text-gray-500">Request Date:</span>
                  <span>{new Date(investment.date).toLocaleDateString()}</span>
                </div>
              </div>

              <button className="mt-3 w-full py-1 bg-[#6f9d7e] text-white rounded text-sm hover:bg-[#5a8a6a] transition">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredInvestments.length === 0 && (
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Icon */}
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                <FaFilter className="text-gray-400 text-2xl" />
              </div>

              {/* Text Content */}
              <div className="text-center md:text-left">
                <h3 className="text-lg font-medium text-gray-900">
                  No matching investments found
                </h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search criteria or filters
                </p>
              </div>

              {/* Reset Button */}
              <button
                className="px-4 py-2 bg-[#6f9d7e] text-white rounded-md hover:bg-[#5a8a6a] transition-colors whitespace-nowrap"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setDateFilter("all");
                }}
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </FarmerLayout>
  );
}