// "use client";
// import { useEffect, useState } from "react";
// import { preHarvestInvestments } from "@/app/content/data";
// import FarmerLayout from "@/components/maincomp/FarmerLayout";
// import {
//   FaCheckCircle,
//   FaClock,
//   FaTimesCircle,
//   FaFilter,
//   FaWarehouse,
// } from "react-icons/fa";
// import { getDecodedAuthToken } from "@/content/data";

// export default function PostHarvest() {
//   // State for filters
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [dateFilter, setDateFilter] = useState("all");
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState("");
//   const fetchData = async (userId) => {
//     try {
//       setLoading(true);
//       // ✅ API ko call karo
//       const res = await fetch(`/api/farmer/preHarvest?userId=${userId}`, {
//         cache: "no-store",
//       });

//       if (!res.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const result = await res.json();
//       console.log("result", result);
//       // ✅ Sirf pending data filter karo

//       setData(result.data);
//     } catch (error) {
//       console.error("❌ Error fetching postharvest data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     const userData = getDecodedAuthToken();
//     // console.log("userData", userData);
//     if (userData) {
//       console.log("User Info:", userData);

//       setUserId(userData?._id || userData?.id);
//       fetchData(userData?._id || userData?.id);
//     } else {
//       console.log("No valid token found");
//     }
//   }, []);
//   // Calculate summary data
//   const totalRequests = preHarvestInvestments.length;
//   const totalRequested = preHarvestInvestments.reduce(
//     (sum, investment) => sum + investment.totalRequested,
//     0
//   );
//   const totalApproved = preHarvestInvestments.reduce(
//     (sum, investment) => sum + (investment.approvedAmount || 0),
//     0
//   );
//   const approvalRate =
//     totalRequested > 0 ? Math.round((totalApproved / totalRequested) * 100) : 0;

//   // Filter investments based on search and filters
//   const filteredInvestments = preHarvestInvestments.filter((investment) => {
//     const matchesSearch =
//       investment.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       investment.facilityType.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       statusFilter === "all" || investment.status === statusFilter;

//     const matchesDate =
//       dateFilter === "all" ||
//       (dateFilter === "recent" &&
//         new Date(investment.date) >
//           new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
//       (dateFilter === "upcoming" && new Date(investment.date) > new Date());

//     return matchesSearch && matchesStatus && matchesDate;
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
//     <FarmerLayout>
//       <div className="p-2 text-black">
//         <h1 className="text-2xl font-bold mb-4 flex items-center text-[#6f9d7e]">
//           <FaWarehouse className="mr-2" /> Pre-Harvest Status
//         </h1>

//         <div className="flex flex-col gap-4">
//           {/* Summary Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4  text-[#6F9D7E]">
//             <div className="bg-[#FFE990] p-4 rounded-lg shadow border border-[#6F9D7E]">
//               <h3 className="text-gray-500 text-sm">Total Requests</h3>
//               <p className="text-2xl font-bold">{totalRequests}</p>
//             </div>
//             <div className="bg-[#FFE990] p-4 rounded-lg shadow border border-[#6F9D7E]">
//               <h3 className="text-gray-500 text-sm">Total Requested</h3>
//               <p className="text-2xl font-bold">
//                 ${totalRequested.toLocaleString()}
//               </p>
//             </div>
//             <div className="bg-[#FFE990] p-4 rounded-lg shadow border border-[#6F9D7E]">
//               <h3 className="text-gray-500 text-sm">Total Approved</h3>
//               <p className="text-2xl font-bold">
//                 ${totalApproved.toLocaleString()}
//               </p>
//             </div>
//             <div className="bg-[#FFE990] p-4 rounded-lg shadow border border-[#6F9D7E]">
//               <h3 className="text-gray-500 text-sm">Approval Rate</h3>
//               <p className="text-2xl font-bold">{approvalRate}%</p>
//             </div>
//           </div>

//           {/* Filter Section */}
//           <div className="bg-white p-4 rounded-lg shadow border border-[#6f9d7e]">
//             <div className="flex justify-between items-center gap-4 w-full">
//               {/* Search Input */}
//               <div className="w-full flex flex-col">
//                 <label className="text-sm text-[#6F9D7E] mb-1">
//                   Search Text
//                 </label>
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search crops or facility type..."
//                   className="input input-success bg-white w-full"
//                 />
//               </div>

//               {/* Status Filter */}
//               <div className="w-full flex flex-col ">
//                 <label className="block text-sm text-[#6F9D7E] mb-1">
//                   Status
//                 </label>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="select select-success text-gray-500 bg-white w-full"
//                 >
//                   <option value="all">All Statuses</option>
//                   <option value="approved">Approved</option>
//                   <option value="partial">Partially Approved</option>
//                   <option value="pending">Pending</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
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

//           {/* Investment Cards - 4 per row */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredInvestments.map((investment) => (
//               <div
//                 key={investment.id}
//                 className="bg-[#6F9D7E] p-4 rounded-lg shadow border border-[#FFE990] hover:shadow-md transition-shadow"
//               >
//                 <div className="flex justify-between items-start mb-3">
//                   <h2 className="text-lg font-semibold text-[#FFE990]">
//                     {investment.cropName}
//                   </h2>
//                   <span
//                     className={`text-xs px-2 py-1 rounded-full ${
//                       statusConfig[investment.status].color
//                     } flex items-center`}
//                   >
//                     {statusConfig[investment.status].icon}
//                     <span className="ml-1 capitalize">{investment.status}</span>
//                   </span>
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-200 font-semibold">
//                       Harvest Quantity:
//                     </span>
//                     <span className="font-medium text-[#FFE990]">
//                       {investment.bushels.toLocaleString()} bushels
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-200 font-semibold">
//                       Requested:
//                     </span>
//                     <span className="font-medium text-[#FFE990]">
//                       ${investment.totalRequested.toLocaleString()}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-200 font-semibold">
//                       Approved:
//                     </span>
//                     <span className="font-medium text-[#FFE990]">
//                       {investment.approvedAmount
//                         ? `$${investment.approvedAmount.toLocaleString()}`
//                         : "N/A"}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-200 font-semibold">
//                       Facility Type:
//                     </span>
//                     <span className="text-right text-[#FFE990] text-sm">
//                       {investment.facilityType}
//                     </span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-200 font-semibold">
//                       Storage Capacity:
//                     </span>
//                     <span className="text-sm text-[#FFE990]">
//                       {investment.storageCapacity} bushels
//                     </span>
//                   </div>

//                   <div className="flex justify-between text-sm mt-3 pt-2 border-[#FFE990] border-t">
//                     <span className="text-gray-200 font-semibold">
//                       Request Date:
//                     </span>
//                     <span className="text-[#FFE990]">
//                       {new Date(investment.date).toLocaleDateString()}
//                     </span>
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
//                     No matching investments found
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
//                     setStatusFilter("all");
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
//     </FarmerLayout>
//   );
// }
















"use client";
import { useEffect, useState } from "react";
import { preHarvestInvestments } from "@/app/content/data";
import FarmerLayout from "@/components/maincomp/FarmerLayout";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaFilter,
  FaWarehouse,
  FaTimes,
} from "react-icons/fa";
import { getDecodedAuthToken } from "@/content/data";

export default function PostHarvest() {
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async (userId) => {
    try {
      setLoading(true);
      // ✅ API ko call karo
      const res = await fetch(`/api/farmer/preHarvest?userId=${userId}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await res.json();
      console.log("API Response:", result);
      
      // ✅ Check if result.data is an array, if not, convert it to an array
      if (result.data && !Array.isArray(result.data)) {
        // If data is a single object, wrap it in an array
        setData([result.data]);
      } else if (Array.isArray(result.data)) {
        setData(result.data);
      } else {
        console.error("Unexpected data format:", result);
        setData([]);
      }
    } catch (error) {
      console.error("❌ Error fetching postharvest data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const userData = getDecodedAuthToken();
    if (userData) {
      console.log("User Info:", userData);
      setUserId(userData?._id || userData?.id);
      fetchData(userData?._id || userData?.id);
    } else {
      console.log("No valid token found");
    }
  }, []);

  // Calculate summary data from API data - with safe array checks
  const totalRequests = Array.isArray(data) ? data.length : 0;
  
  const totalRequested = Array.isArray(data) 
    ? data.reduce((sum, item) => sum + (parseFloat(item.loanAmount) || 0), 0)
    : 0;
    
  const totalApproved = Array.isArray(data) 
    ? data.reduce(
        (sum, item) => sum + (item.status === "approved" ? parseFloat(item.loanAmount) || 0 : 0),
        0
      )
    : 0;
    
  const approvalRate =
    totalRequested > 0 ? Math.round((totalApproved / totalRequested) * 100) : 0;

  // Filter investments based on search and filters
  const filteredInvestments = Array.isArray(data) 
    ? data.filter((item) => {
        const matchesSearch =
          (item.crops && item.crops.join(", ").toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.loanPurpose && item.loanPurpose.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.fullName && item.fullName.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus =
          statusFilter === "all" || (item.status || "pending") === statusFilter;

        const matchesDate =
          dateFilter === "all" ||
          (dateFilter === "recent" &&
            item.createdAt &&
            new Date(item.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
          (dateFilter === "upcoming" && 
            item.disbursementDate && 
            new Date(item.disbursementDate) > new Date());

        return matchesSearch && matchesStatus && matchesDate;
      })
    : [];

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

  // Handle view details click
  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <FarmerLayout>
      <div className="p-2 text-black">
        <h1 className="text-2xl font-bold mb-4 flex items-center text-[#6f9d7e]">
          <FaWarehouse className="mr-2" /> Pre-Harvest Status
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6f9d7e]"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4  text-[#6F9D7E]">
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
                {/* Search Input */}
                <div className="w-full flex flex-col">
                  <label className="text-sm text-[#6F9D7E] mb-1">
                    Search Text
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search crops, purpose, or name..."
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
                    {/* <option value="partial">Partially Approved</option> */}
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

            {/* Investment Cards - 4 per row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInvestments.length > 0 ? (
                filteredInvestments.map((item) => (
                  <div
                    key={item._id}
                    className="bg-[#6F9D7E] p-4 rounded-lg shadow border border-[#FFE990] hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-lg font-semibold text-[#FFE990]">
                        {item.crops ? item.crops.join(", ") : "N/A"}
                      </h2>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          statusConfig[item.status]?.color || statusConfig.pending.color
                        } flex items-center`}
                      >
                        {statusConfig[item.status]?.icon || statusConfig.pending.icon}
                        <span className="ml-1 capitalize">{item.status || "pending"}</span>
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-200 font-semibold">
                          Land Size:
                        </span>
                        <span className="font-medium text-[#FFE990]">
                          {item.landSize || "N/A"}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-200 font-semibold">
                          Requested Amount:
                        </span>
                        <span className="font-medium text-[#FFE990]">
                          ${item.loanAmount ? parseFloat(item.loanAmount).toLocaleString() : "N/A"}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-200 font-semibold">
                          Farm Location:
                        </span>
                        <span className="text-right text-[#FFE990] text-sm">
                          {item.farmLocation || "N/A"}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-200 font-semibold">
                          Loan Purpose:
                        </span>
                        <span className="text-sm text-[#FFE990]">
                          {item.loanPurpose || "N/A"}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm mt-3 pt-2 border-[#FFE990] border-t">
                        <span className="text-gray-200 font-semibold">
                          Request Date:
                        </span>
                        <span className="text-[#FFE990]">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleViewDetails(item)}
                      className="mt-3 w-full py-1 bg-[#6f9d7e] text-[#FFE990] border border-[#FFE990] rounded text-sm hover:bg-[#5a8a6a] transition"
                    >
                      View Details
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full">
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
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal for detailed view */}
        {showModal && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white">
                <h2 className="text-xl font-bold text-[#6f9d7e]">
                  Application Details
                </h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Personal Information */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                      Personal Information
                    </h3>
                    <DetailRow label="Full Name" value={selectedItem.fullName} />
                    <DetailRow label="Email" value={selectedItem.email} />
                    <DetailRow label="Phone" value={selectedItem.phone} />
                    <DetailRow label="Date of Birth" value={selectedItem.dob} />
                    <DetailRow label="Citizenship Status" value={selectedItem.citizenshipStatus} />
                    <DetailRow label="SSN" value={selectedItem.ssn} />
                  </div>
                  
                  {/* Business Information */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                      Business Information
                    </h3>
                    <DetailRow label="Business Name" value={selectedItem.businessName} />
                    <DetailRow label="Entity Type" value={selectedItem.entityType} />
                    <DetailRow label="EIN" value={selectedItem.ein} />
                    <DetailRow label="Years in Operation" value={selectedItem.yearsInOperation} />
                    <DetailRow label="Annual Income" value={selectedItem.annualIncome} />
                    <DetailRow label="USDA Farm Number" value={selectedItem.usdaFarmNumber} />
                  </div>
                  
                  {/* Farm Details */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                      Farm Details
                    </h3>
                    <DetailRow label="Farm Location" value={selectedItem.farmLocation} />
                    <DetailRow label="Land Size" value={selectedItem.landSize} />
                    <DetailRow label="Land Status" value={selectedItem.landStatus} />
                    <DetailRow label="Crops" value={selectedItem.crops ? selectedItem.crops.join(", ") : "N/A"} />
                    <DetailRow label="Area per Crop" value={selectedItem.areaPerCrop} />
                    <DetailRow label="Expected Yield" value={selectedItem.expectedYield} />
                    <DetailRow label="Soil Type" value={selectedItem.soilType} />
                    <DetailRow label="Irrigation Type" value={selectedItem.irrigationType} />
                    <DetailRow label="Crop Insurance" value={selectedItem.cropInsurance} />
                    <DetailRow label="Practices" value={selectedItem.practices} />
                  </div>
                  
                  {/* Loan Information */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                      Loan Information
                    </h3>
                    <DetailRow label="Loan Type" value={selectedItem.loanType} />
                    <DetailRow label="Loan Amount" value={selectedItem.loanAmount} />
                    <DetailRow label="Loan Purpose" value={selectedItem.loanPurpose} />
                    <DetailRow label="Loan Term" value={selectedItem.loanTerm} />
                    <DetailRow label="Disbursement Date" value={selectedItem.disbursementDate} />
                    <DetailRow label="Repayment Source" value={selectedItem.repaymentSource} />
                    <DetailRow label="Previous Loans" value={selectedItem.previousLoans} />
                    <DetailRow label="Credit Score" value={selectedItem.creditScore} />
                    <DetailRow label="Equipment Owned" value={selectedItem.equipmentOwned} />
                  </div>
                  
                  {/* Bank Information */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                      Bank Information
                    </h3>
                    <DetailRow label="Bank Name" value={selectedItem.bankName} />
                    <DetailRow label="Account Number" value={selectedItem.accountNumber} />
                    <DetailRow label="Routing Number" value={selectedItem.routingNumber} />
                  </div>
                  
                  {/* Address Information */}
                  <div className="space-y-3 md:col-span-2">
                    <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                      Address Information
                    </h3>
                    <DetailRow label="Mailing Address" value={selectedItem.mailingAddress} />
                    <DetailRow label="Residential Address" value={selectedItem.residentialAddress} />
                  </div>
                  
                  {/* Application Status */}
                  <div className="space-y-3 md:col-span-2">
                    <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                      Application Status
                    </h3>
                    <DetailRow label="Status" value={selectedItem.status} />
                    <DetailRow label="Created At" value={selectedItem.createdAt ? new Date(selectedItem.createdAt).toLocaleString() : "N/A"} />
                    <DetailRow label="Updated At" value={selectedItem.updatedAt ? new Date(selectedItem.updatedAt).toLocaleString() : "N/A"} />
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-[#6f9d7e] text-white rounded-md hover:bg-[#5a8a6a] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </FarmerLayout>
  );
}

// Helper component for displaying detail rows in modal
function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600 font-medium">{label}:</span>
      <span className="text-gray-800">{value || "N/A"}</span>
    </div>
  );
}