"use client";
import { useEffect, useState } from "react";
import { postHarvestInvestments } from "@/app/content/data";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaWarehouse,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaCopy,
} from "react-icons/fa";
import AdminLayout from "@/components/maincomp/AdminLayout";

export default function PreHarvest() {
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchPayments = async () => {
  //     try {
  //       setLoading(true);

  //       // Build API URL with optional userId query
  //       let url = "/api/investor/buyNFT";

  //       const res = await fetch(url);
  //       const json = await res.json();

  //       if (!res.ok) {
  //         throw new Error(json.error || "Failed to fetch data");
  //       }
  //       console.log("json.data", json.data);
  //       // ✅ Ensure always an array
  //       setData(Array.isArray(json.data) ? json.data : [json.data]);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPayments();
  // }, []);
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);

        // Build API URL
        let url = "/api/investor/buyNFT";

        const res = await fetch(url);
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || "Failed to fetch data");
        }

        console.log("json.data", json.data);

        // ✅ Ensure always an array + filter for type === "preHarvest"
        const filteredData = (
          Array.isArray(json.data) ? json.data : [json.data]
        ).filter((item) => item.type === "preHarvest");

        setData(filteredData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const updateStatus = async (tokenId, newStatus) => {
    let statusToUpdate;
    if (newStatus === "investmentRejected") {
      statusToUpdate = "rejected";
    } else if (newStatus === "investmentApproved") {
      statusToUpdate = "approved";
    }

    try {
      console.log("Updating:", tokenId, newStatus, statusToUpdate);

      if (newStatus === "investmentApproved") {
        const response = await fetch("/api/investor/buyNFT/updateStatus", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tokenId,
            status: statusToUpdate || "approved",
          }),
        });
        if (response.ok) {
          const res = await fetch("/api/farmer/preHarvest/updateRequest", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tokenId, status: newStatus }),
          });
          if (!res.ok) {
            throw new Error(`Failed to update: ${res.statusText}`);
          }

          const data = await res.json();
          console.log("✅ Status Update Response:", data);

          return data;
        }
      }
    } catch (error) {
      console.error("❌ Error updating status:", error);
      throw error;
    }
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // You can add a toast notification here if needed
      console.log("Copied to clipboard:", text);
    });
  };

  // Function to truncate long text
  const truncateText = (text, maxLength = 20) => {
    if (!text) return "N/A";
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

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
      (investment.facilityType &&
        investment.facilityType
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

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
    <AdminLayout>
      <div className="p-4 text-black">
        <h1 className="text-2xl font-bold mb-6 flex items-center text-[#6f9d7e]">
          <FaWarehouse className="mr-2" /> Pre-Harvest Buy Requests
        </h1>

        <div className="flex flex-col gap-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-[#6F9D7E]">
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

          {/* Filter Section */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
              <div className="w-full md:w-1/3 flex flex-col">
                <label className="text-sm text-gray-600 mb-1 flex items-center">
                  <FaSearch className="mr-1" /> Search
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search requests..."
                  className="input input-bordered bg-white w-full"
                />
              </div>

              <div className="w-full md:w-1/3 flex flex-col">
                <label className="block text-sm text-gray-600 mb-1 items-center">
                  <FaFilter className="mr-1" /> Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="select select-bordered text-gray-500 bg-white w-full"
                >
                  <option value="all">All Statuses</option>
                  <option value="approved">Approved</option>
                  <option value="partial">Partially Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="w-full md:w-1/3 flex flex-col">
                <label className="text-sm text-gray-600 mb-1 flex items-center">
                  <FaCalendarAlt className="mr-1" /> Date
                </label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="select select-bordered text-gray-500 bg-white w-full"
                >
                  <option value="all">All Dates</option>
                  <option value="recent">Last 30 Days</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      From
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Type
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tx Hash
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="9" className="text-center p-8">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#6f9d7e]"></div>
                          <span className="ml-2">Loading requests...</span>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="9" className="text-center p-8 text-red-600">
                        <div className="flex flex-col items-center">
                          <FaTimesCircle className="text-2xl mb-2" />
                          Error: {error}
                        </div>
                      </td>
                    </tr>
                  ) : data.length > 0 ? (
                    data.map((item, ind) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                          {ind + 1}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 max-w-[120px]">
                          <div className="flex items-center group">
                            <span className="truncate" title={item.from}>
                              {truncateText(item.from, 15)}
                            </span>
                            <button
                              onClick={() => copyToClipboard(item.from)}
                              className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Copy address"
                            >
                              <FaCopy className="text-xs text-gray-400 hover:text-gray-600" />
                            </button>
                          </div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 font-medium whitespace-nowrap">
                          ${item.amount}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {item.paymentType}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                          {item.type}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : item.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.status || "pending"}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 max-w-[120px]">
                          <div className="flex items-center group">
                            <span className="truncate" title={item.hash}>
                              {truncateText(item.hash, 12)}
                            </span>
                            {item.hash && (
                              <button
                                onClick={() => copyToClipboard(item.hash)}
                                className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Copy transaction hash"
                              >
                                <FaCopy className="text-xs text-gray-400 hover:text-gray-600" />
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                          <div className="flex flex-col sm:flex-row gap-2">
                            <button
                              onClick={() =>
                                updateStatus(item.tokenId, "investmentApproved")
                              }
                              className="px-3 py-1 bg-green-600 text-white rounded-md text-xs hover:bg-green-700 transition-colors whitespace-nowrap"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(item.tokenId, "investmentRejected")
                              }
                              className="px-3 py-1 bg-red-600 text-white rounded-md text-xs hover:bg-red-700 transition-colors whitespace-nowrap"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center p-8 text-gray-500">
                        <div className="flex flex-col items-center">
                          <FaSearch className="text-2xl mb-2" />
                          No records found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
