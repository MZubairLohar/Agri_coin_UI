// "use client";
// import { useState } from "react";
// import { postHarvestInvestments } from "@/app/content/data";
// import {
//   FaCheckCircle,
//   FaClock,
//   FaTimesCircle,
//   FaTractor,
//   FaSearch,
//   FaFilter,
//   FaWarehouse,
//   FaBoxes,
//   FaTruck
// } from "react-icons/fa";
// import AdminLayout from "@/components/maincomp/AdminLayout";

// export default function PostHarvest() {
//   // State for filters
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("approved"); // Default to approved only
//   const [dateFilter, setDateFilter] = useState("all");

//   // Filter only approved investments
//   const approvedInvestments = postHarvestInvestments.filter(
//     (investment) => investment.status === "approved"
//   );

//   // Calculate summary data for approved investments only
//   const totalRequests = approvedInvestments.length;
//   const totalRequested = approvedInvestments.reduce(
//     (sum, investment) => sum + investment.totalRequested,
//     0
//   );
//   const totalApproved = approvedInvestments.reduce(
//     (sum, investment) => sum + (investment.approvedAmount || 0),
//     0
//   );
//   const approvalRate =
//     totalRequested > 0 ? Math.round((totalApproved / totalRequested) * 100) : 0;

//   // Calculate totals by facility type (category)
//   const categoryTotals = approvedInvestments.reduce((acc, investment) => {
//     const type = investment.facilityType;
//     if (!acc[type]) {
//       acc[type] = {
//         count: 0,
//         totalRequested: 0,
//         totalApproved: 0,
//       };
//     }
//     acc[type].count += 1;
//     acc[type].totalRequested += investment.totalRequested;
//     acc[type].totalApproved += investment.approvedAmount || 0;
//     return acc;
//   }, {});

//   // Filter investments based on search and filters
//   const filteredInvestments = approvedInvestments.filter((investment) => {
//     const matchesSearch =
//       investment.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       investment.facilityType.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesDate =
//       dateFilter === "all" ||
//       (dateFilter === "recent" &&
//         new Date(investment.date) >
//           new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
//       (dateFilter === "upcoming" && new Date(investment.date) > new Date());

//     return matchesSearch && matchesDate;
//   });

//   // Status colors and icons
//   const statusConfig = {
//     approved: {
//       color: "bg-green-100 text-green-800",
//       icon: <FaCheckCircle className="text-[#6f9d7e]" />,
//     },
//     partial: {
//       color: "bg-blue-100 text-blue-800",
//       icon: <FaCheckCircle className="text-blue-500" />,
//     },
//     pending: {
//       color: "bg-yellow-100 text-yellow-800",
//       icon: <FaClock className="text-[#FFE990]" />,
//     },
//     rejected: {
//       color: "bg-red-100 text-red-800",
//       icon: <FaTimesCircle className="text-red-500" />,
//     },
//   };

//   return (
//     <AdminLayout>
//       <div className="p-2 text-black">
//         <h1 className="text-2xl font-bold mb-4 flex items-center text-[#6f9d7e]">
//           <FaWarehouse className="mr-2" /> Post-Harvest Categories
//         </h1>

//         <div className="flex flex-col gap-4">
//           {/* Summary Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-[#6F9D7E]">
//             <div className="bg-[#FFE990] p-4 rounded-lg shadow border border-[#6F9D7E]">
//               <h3 className="text-gray-500 text-sm">Total Approved Requests</h3>
//               <p className="text-2xl font-bold">{totalRequests}</p>
//             </div>
//             <div className="bg-[#FFE990] p-4 rounded-lg shadow border border-[#6F9D7E]">
//               <h3 className="text-gray-500 text-sm">Total Requested</h3>
//               <p className="text-2xl font-bold">
//                 ${totalRequested.toLocaleString()}
//               </p>
//             </div>
//             <div className="bg-[#FFE990] p-4 rounded-lg shadow border border-[#6F9D7E]">
//               <h3 className="text-gray-500 text-sm">Total Approved Amount</h3>
//               <p className="text-2xl font-bold">
//                 ${totalApproved.toLocaleString()}
//               </p>
//             </div>
//             <div className="bg-[#FFE990] p-4 rounded-lg shadow border border-[#6F9D7E]">
//               <h3 className="text-gray-500 text-sm">Approval Rate</h3>
//               <p className="text-2xl font-bold">{approvalRate}%</p>
//             </div>
//           </div>

//           {/* Category Breakdown */}
//           <div className="bg-white p-4 rounded-lg shadow border border-[#6f9d7e]">
//             <h2 className="text-lg font-semibold text-[#6F9D7E] mb-4">Approved by Facility Type</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {Object.entries(categoryTotals).map(([type, totals]) => (
//                 <div key={type} className="bg-[#6F9D7E] p-4 rounded-lg shadow border border-[#FFE990]">
//                   <h3 className="text-lg font-semibold text-[#FFE990]">{type}</h3>
//                   <div className="mt-2 space-y-1">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-200">Requests:</span>
//                       <span className="text-[#FFE990]">{totals.count}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-200">Requested:</span>
//                       <span className="text-[#FFE990]">${totals.totalRequested.toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-200">Approved:</span>
//                       <span className="text-[#FFE990]">${totals.totalApproved.toLocaleString()}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Filter Section */}
//           <div className="bg-white p-4 rounded-lg shadow border border-[#6f9d7e]">
//             <div className="flex justify-between items-center gap-4 w-full">
//               {/* Search Input */}
//               <div className="w-full flex flex-col">
//                 <label className="text-sm text-[#6F9D7E] mb-1">Search Text</label>
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search crops or facility type..."
//                   className="input input-success bg-white w-full"
//                 />
//               </div>

//               {/* Date Filter */}
//               <div className="w-full flex flex-col">
//                 <label className="text-sm text-[#6F9D7E] mb-1">Date</label>
//                 <select
//                   value={dateFilter}
//                   onChange={(e) => setDateFilter(e.target.value)}
//                   className="select text-gray-500 select-success bg-white w-full"
//                 >
//                   <option value="all">All Dates</option>
//                   <option value="recent">Last 30 Days</option>
//                   <option value="upcoming">Upcoming</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Investment Cards - 3 per row */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredInvestments.map((investment) => (
//               <div
//                 key={investment.id}
//                 className="bg-[#6F9D7E] p-4 rounded-lg shadow border border-[#FFE990] hover:shadow-md transition-shadow"
//               >
//                 <div className="flex justify-between items-start mb-3">
//                   <h2 className="text-lg font-semibold text-[#FFE990]">{investment.cropName}</h2>
//                   <span
//                     className={`text-xs px-2 py-1 rounded-full ${statusConfig[investment.status].color
//                       } flex items-center`}
//                   >
//                     {statusConfig[investment.status].icon}
//                     <span className="ml-1 capitalize">{investment.status}</span>
//                   </span>
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-200 font-semibold">Harvest Quantity:</span>
//                     <span className="font-medium text-[#FFE990]">
//                       {investment.bushels.toLocaleString()} bushels
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-200 font-semibold">Requested:</span>
//                     <span className="font-medium text-[#FFE990]">
//                       ${investment.totalRequested.toLocaleString()}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-200 font-semibold">Approved:</span>
//                     <span className="font-medium text-[#FFE990]">
//                       {investment.approvedAmount
//                         ? `$${investment.approvedAmount.toLocaleString()}`
//                         : "N/A"}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-200 font-semibold">Facility Type:</span>
//                     <span className="text-right text-[#FFE990] text-sm">
//                       {investment.facilityType}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-200 font-semibold">Storage Capacity:</span>
//                     <span className="text-sm text-[#FFE990]">
//                       {investment.storageCapacity} bushels
//                     </span>
//                   </div>

//                   <div className="flex justify-between text-sm mt-3 pt-2 border-[#FFE990] border-t">
//                     <span className="text-gray-200 font-semibold">Request Date:</span>
//                     <span className="text-[#FFE990]">{new Date(investment.date).toLocaleDateString()}</span>
//                   </div>
//                 </div>

//                 <button className="mt-3 w-full py-1 bg-[#6f9d7e] text-[#FFE990] border border-[#FFE990] rounded text-sm hover:bg-[#5a8a6a] transition">
//                   View Details
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Empty State */}
//           {filteredInvestments.length === 0 && (
//             <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//               <div className="flex flex-col md:flex-row items-center justify-center gap-6">
//                 {/* Icon */}
//                 <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
//                   <FaFilter className="text-gray-400 text-2xl" />
//                 </div>

//                 {/* Text Content */}
//                 <div className="text-center md:text-left">
//                   <h3 className="text-lg font-medium text-gray-900">
//                     No matching approved investments found
//                   </h3>
//                   <p className="mt-1 text-gray-500">
//                     Try adjusting your search criteria or filters
//                   </p>
//                 </div>

//                 {/* Reset Button */}
//                 <button
//                   className="px-4 py-2 bg-[#6f9d7e] text-white rounded-md hover:bg-[#5a8a6a] transition-colors whitespace-nowrap"
//                   onClick={() => {
//                     setSearchTerm("");
//                     setDateFilter("all");
//                   }}
//                 >
//                   Reset All Filters
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }













"use client";
import { useState } from "react";
import { postHarvestInvestments } from "@/app/content/data";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaWarehouse,
  FaSearch,
  FaFilter
} from "react-icons/fa";
import AdminLayout from "@/components/maincomp/AdminLayout";

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
      (investment.facilityType && investment.facilityType.toLowerCase().includes(searchTerm.toLowerCase()));

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
      <div className="p-2 text-black">
        <h1 className="text-2xl font-bold mb-4 flex items-center text-[#6f9d7e]">
          <FaWarehouse className="mr-2" /> Post-Harvest Categories
        </h1>

        <div className="flex flex-col gap-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-[#6F9D7E]">
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


          {/* Filter Section */}
          <div className="bg-white p-4 rounded-lg shadow border border-[#6f9d7e]">
            <div className="flex justify-between items-center gap-4 w-full">
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

              <div className="w-full flex flex-col">
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

          {/* Investments Table */}
          <div className="rounded-lg shadow border bg-[#6F9D7E] border-[#6f9d7e] overflow-hidden">
            <div className="overflow-x-auto bg-[#6F9D7E] ">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#6F9D7E]">
                  <tr>
                    
                    
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#FFE990] uppercase tracking-wider">
                      S.No
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#FFE990] uppercase tracking-wider">
                      Crop Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#FFE990] uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#FFE990] uppercase tracking-wider">
                      Requested
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#FFE990] uppercase tracking-wider">
                      Approved
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#FFE990] uppercase tracking-wider">
                      Facility Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#FFE990] uppercase tracking-wider">
                      Date
                    </th>
                   
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200 ">
                  {filteredInvestments.length > 0 ? (
                    filteredInvestments.map((investment, ind) => (
                      <tr key={investment.id} className="">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-200">{ind + 1}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-200">{investment.cropName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusConfig[investment.status].color}`}>
                            <span className="flex items-center">
                              {statusConfig[investment.status].icon}
                              <span className="ml-1 capitalize">{investment.status}</span>
                            </span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                          ${investment.totalRequested.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                          {investment.approvedAmount ? `$${investment.approvedAmount.toLocaleString()}` : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                          {investment.facilityType || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                          {new Date(investment.date).toLocaleDateString()}
                        </td>
                       
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                            <FaFilter className="text-gray-400 text-2xl" />
                          </div>
                          <div className="text-center md:text-left">
                            <h3 className="text-lg font-medium text-gray-900">
                              No matching investments found
                            </h3>
                            <p className="mt-1 text-gray-500">
                              Try adjusting your search criteria or filters
                            </p>
                          </div>
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







