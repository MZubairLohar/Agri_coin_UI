"use client";

import { useState } from "react";
import { preHarvestInvestments } from "@/app/content/data";
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
  FaTruck,
} from "react-icons/fa";

export default function PreHarvest() {
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Calculate summary data
  const totalRequests = preHarvestInvestments.length;
  const totalRequested = preHarvestInvestments.reduce(
    (sum, investment) => sum + investment.totalRequested,
    0
  );
  const totalApproved = preHarvestInvestments.reduce(
    (sum, investment) => sum + (investment.approvedAmount || 0),
    0
  );
  const approvalRate =
    totalRequested > 0 ? Math.round((totalApproved / totalRequested) * 100) : 0;

  // Filter investments based on search and filters
  const filteredInvestments = preHarvestInvestments.filter((investment) => {
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
      <div className="p-2 text-black">
        <h1 className="text-2xl font-bold mb-6 flex items-center text-[#6f9d7e]">
          <FaWarehouse className="mr-2" /> Pre-Harvest Investment Status
        </h1>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow border border-[#6f9d7e] mb-6">
          <div className="flex justify-between items-center gap-4 w-full">
            {/* Search Input */}
            <div className="w-full flex flex-col">
              <label className="text-sm text-[#6F9D7E] mb-1">Search Text</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search crops or facility type..."
                className="input input-success bg-white w-full"
              />
            </div>

            {/* Status Filter */}
            <div className="w-full flex flex-col ">
              <label className="block text-sm text-[#6F9D7E] mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="select select-success text-gray-500 bg-white w-full"
              >
                <option value="all">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="partial">Partially Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="w-full flex flex-col">
              <label className="text-sm text-[#6F9D7E] mb-1">Date</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="select text-gray-500 select-success bg-white w-full"
              >
                <option value="all">All Dates</option>
                <option value="recent">Last 30 Days</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-[#6F9D7E]">
          <div className="bg-[#FFE990] p-4 rounded-lg shadow border border-[#6F9D7E]">
            <h3 className="text-gray-500 text-sm">Total Requests</h3>
            <p className="text-2xl font-bold">{totalRequests}</p>
          </div>
          <div className="bg-[#FFE990] p-4 rounded-lg shadow border border-[#6F9D7E]">
            <h3 className="text-gray-500 text-sm">Total Requested</h3>
            <p className="text-2xl font-bold">
              ${totalRequested.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#FFE990] p-4 rounded-lg shadow border border-[#6F9D7E]">
            <h3 className="text-gray-500 text-sm">Total Approved</h3>
            <p className="text-2xl font-bold">
              ${totalApproved.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#FFE990] p-4 rounded-lg shadow border border-[#6F9D7E]">
            <h3 className="text-gray-500 text-sm">Approval Rate</h3>
            <p className="text-2xl font-bold">{approvalRate}%</p>
          </div>
        </div>

        {/* Investment Cards - 4 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInvestments.map((investment) => (
            <div
              key={investment.id}
              className="bg-[#6F9D7E] p-4 rounded-lg shadow border border-[#FFE990] hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-semibold text-[#FFE990]">
                  {investment.cropName}
                </h2>
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
                  <span className="text-gray-200 font-semibold">
                    Harvest Quantity:
                  </span>
                  <span className="font-medium text-[#FFE990]">
                    {investment.bushels.toLocaleString()} bushels
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-200 font-semibold">
                    Requested:
                  </span>
                  <span className="font-medium text-[#FFE990]">
                    ${investment.totalRequested.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-200 font-semibold">Approved:</span>
                  <span className="font-medium text-[#FFE990]">
                    {investment.approvedAmount
                      ? `$${investment.approvedAmount.toLocaleString()}`
                      : "N/A"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-200 font-semibold">
                    Facility Type:
                  </span>
                  <span className="text-right text-[#FFE990] text-sm">
                    {investment.facilityType}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-200 font-semibold">
                    Storage Capacity:
                  </span>
                  <span className="text-sm text-[#FFE990]">
                    {investment.storageCapacity} bushels
                  </span>
                </div>

                <div className="flex justify-between text-sm mt-3 pt-2 border-[#FFE990] border-t">
                  <span className="text-gray-200 font-semibold">
                    Request Date:
                  </span>
                  <span className="text-[#FFE990]">
                    {new Date(investment.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <button className="mt-3 w-full py-1 bg-[#6f9d7e] text-[#FFE990] border border-[#FFE990] rounded text-sm hover:bg-[#5a8a6a] transition">
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
