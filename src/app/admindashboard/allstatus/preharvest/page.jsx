"use client";
import { useEffect, useState } from "react";

function Prehistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      setLoading(true);
      // ✅ API ko call karo
      const res = await fetch("/api/farmer/preHarvest", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await res.json();
      console.log("result", result);
      // ✅ Sirf pending data filter karo
      const pendingData = result.data.filter(
        (item) => item.status !== "pending"
      );

      setData(pendingData);
    } catch (error) {
      console.error("❌ Error fetching postharvest data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const tokens = [
    {
      id: "1",
      farmer: "John Doe",
      crop: "Wheat",
      quantity: "500 bushel",
      amount: "$25,000",
      date: "Apr 1, 2025",
      status: "Rejected",
    },
    {
      id: "2",
      farmer: "Alice Smith",
      crop: "Rice",
      quantity: "800 bushel",
      amount: "$40,000",
      date: "Mar 28, 2025",
      status: "Approved",
    },
    {
      id: "3",
      farmer: "Bob Johnson",
      crop: "Corn",
      quantity: "1200 bushel",
      amount: "$60,000",
      date: "Mar 25, 2025",
      status: "Approved",
    },
    {
      id: "4",
      farmer: "Emily Brown",
      crop: "Soybean",
      quantity: "600 bushel",
      amount: "$35,000",
      date: "Mar 10, 2025",
      status: "Rejected",
    },
    {
      id: "5",
      farmer: "David Wilson",
      crop: "Barley",
      quantity: "400 bushel",
      amount: "$20,000",
      date: "Mar 5, 2025",
      status: "Approved",
    },
    {
      id: "6",
      farmer: "Joe Denly",
      crop: "Potato",
      quantity: "2000 bushel",
      amount: "$30,000",
      date: "Feb 15, 2025",
      status: "Approved",
    },
  ];

  const statusColors = {
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  const statuses = ["All", "Approved", "Rejected"];
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredTokens =
    selectedStatus === "All"
      ? tokens
      : tokens.filter((token) => token.status === selectedStatus);

  return (
    <>
      <div className="text-[#FFE990] px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#6f9d7e] mb-6">
          Pre-Harvest Status
        </h1>
      </div>

      <div className="p-4 sm:p-6 bg-[#6F9D7E] w-full mx-auto text-black border border-[#FFE990] rounded-lg shadow">
        {/* Header and Filter */}
        {/* <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            Showing {filteredTokens.length} tokens
          </h2>
          <select
            className="w-full sm:w-auto border rounded px-3 py-2 text-sm text-black bg-white focus:outline-none"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div> */}

        {/* Responsive Table */}
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
                <th className="py-3 px-4 font-semibold text-lg">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 text-gray-200">
              {data.map((token, index) => (
                <tr key={index}>
                  <td className="py-3 px-8">{index + 1}</td>
                  <td className="py-3 px-4">{token.fullName}</td>
                  <td className="py-3 px-4">
                    {token?.crops?.map((c, j) => (
                      <span key={j} className="mr-2">
                        {c}
                      </span>
                    ))}
                  </td>
                  <td className="py-3 px-4">{token?.areaPerCrop}</td>
                  <td className="py-3 px-4">{token?.loanAmount}</td>
                  <td className="py-3 px-4">
                    {new Date(token.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{token?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stacked view for mobile */}
        <div className="block sm:hidden space-y-4">
          {filteredTokens.map((token, index) => (
            <div
              key={index}
              className="bg-[#5d8667] p-4 rounded-lg shadow border border-[#FFE990] text-white"
            >
              <div>
                <strong className="text-[#FFE990]">S.No:</strong> {token.id}
              </div>
              <div>
                <strong className="text-[#FFE990]">Farmer:</strong>{" "}
                {token.farmer}
              </div>
              <div>
                <strong className="text-[#FFE990]">Crop:</strong> {token.crop}
              </div>
              <div>
                <strong className="text-[#FFE990]">Quantity:</strong>{" "}
                {token.quantity}
              </div>
              <div>
                <strong className="text-[#FFE990]">Amount:</strong>{" "}
                {token.amount}
              </div>
              <div>
                <strong className="text-[#FFE990]">Date:</strong> {token.date}
              </div>
              <div>
                <strong className="text-[#FFE990]">Status:</strong>{" "}
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full inline-block mt-1 ${
                    statusColors[token.status]
                  }`}
                >
                  {token.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* No tokens case */}
        {filteredTokens.length === 0 && (
          <p className="py-6 text-center text-white">
            No tokens found for selected status.
          </p>
        )}
      </div>
    </>
  );
}

export default Prehistory;
