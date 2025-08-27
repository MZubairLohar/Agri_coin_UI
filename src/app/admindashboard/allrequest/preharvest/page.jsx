"use client";
import { useContext, useEffect, useState } from "react";
import AdminLayout from "@/components/maincomp/AdminLayout";
import { WalletContext } from "@/context/WalletContext";
import { ethers } from "ethers";
import {
  adminAddress,
  preHarvestAbi,
  preHarvestNFT,
} from "@/content/tokenData";

function Prereq() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { walletAddress, setWalletAddress, signer, setSigner } =
    useContext(WalletContext);
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
        (item) => item.status === "pending"
      );

      setData(pendingData);
    } catch (error) {
      console.error("❌ Error fetching preharvest data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); // empty dependency → sirf 1 bar run hoga

  const tokens = [
    {
      id: "1",
      farmer: "John Doe",
      crop: "Wheat",
      quantity: "500 bushel",
      amount: "$25,000",
      date: "Apr 1, 2025",
    },
    {
      id: "2",
      farmer: "Alice Smith",
      crop: "Rice",
      quantity: "800 bushel",
      amount: "$40,000",
      date: "Mar 28, 2025",
    },
    {
      id: "3",
      farmer: "Bob Johnson",
      crop: "Corn",
      quantity: "1200 bushel",
      amount: "$60,000",
      date: "Mar 25, 2025",
    },
    {
      id: "4",
      farmer: "Emily Brown",
      crop: "Soybean",
      quantity: "600 bushel",
      amount: "$35,000",
      date: "Mar 10, 2025",
    },
    {
      id: "5",
      farmer: "David Wilson",
      crop: "Barley",
      quantity: "400 bushel",
      amount: "$20,000",
      date: "Mar 5, 2025",
    },
    {
      id: "6",
      farmer: "Joe Denly",
      crop: "Potato",
      quantity: "2000 bushel",
      amount: "$30,000",
      date: "Feb 15, 2025",
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

  // const mintNFT = async () => {
  //   try {
  //     if (!signer || !walletAddress) alert("connect Wallet");

  //     const contract = new ethers.Contract(
  //       preHarvestNFT,
  //       preHarvestAbi,
  //       signer
  //     );

  //     // Admin ke address par NFT mint hoga
  //     const tx = await contract.mint(adminAddress);
  //     const receipt = await tx.wait();

  //     // Transfer event se tokenId nikal lo
  //     const transferEvent = receipt.logs
  //       .map((log) => {
  //         try {
  //           return contract.interface.parseLog(log);
  //         } catch {
  //           return null;
  //         }
  //       })
  //       .filter((e) => e && e.name === "Transfer")[0];

  //     const tokenId = transferEvent?.args?.tokenId?.toString();

  //     console.log("Minted Token ID:", tokenId);
  //     return tokenId;
  //   } catch (err) {
  //     console.error("Minting failed:", err);
  //     throw err;
  //   }
  // };
  const mintNFT = async () => {
    try {
      if (!signer || !walletAddress) {
        alert("Connect Wallet first!");
        return null;
      }

      const contract = new ethers.Contract(
        preHarvestNFT,
        preHarvestAbi,
        signer
      );

      const tx = await contract.mint(adminAddress);
      const receipt = await tx.wait();

      console.log("Tx Receipt:", receipt);

      // Find Transfer event
      const transferEvent = receipt.logs
        .map((log) => {
          try {
            return contract.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .find((e) => e && e.name === "Transfer");

      const tokenId = transferEvent?.args?.tokenId?.toString();
      console.log("✅ Minted Token ID:", tokenId);

      return tokenId;
    } catch (err) {
      console.error("❌ Minting failed:", err);
      throw err;
    }
  };

  // const updateStatus = async (recordId, newStatus) => {
  //   try {
  //     const res = await fetch("/api/farmer/preHarvest/updateRequest", {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ recordId, status: newStatus }),
  //     });

  //     const data = await res.json();
  //     console.log("Status Update Response:", data);
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //   }
  // };
  // const updateStatus = async (recordId, newStatus) => {
  //   try {
  //     console.log("working");
  //     let tokenId = "";
  //     console.log(recordId, newStatus);
  //     if (newStatus === "accepted") {
  //       tokenId = await mintNFT(); // minting admin ke address pe hogi
  //       if (tokenId) {
  //         const res = await fetch("/api/farmer/preHarvest/updateRequest", {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ recordId, status: newStatus, tokenId }),
  //         });

  //         const data = await res.json();
  //         console.log("Status Update Response:", data);
  //       }
  //     } else if (newStatus === "rejected") {
  //       const res = await fetch("/api/farmer/preHarvest/updateRequest", {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ recordId, status: newStatus }),
  //       });

  //       const data = await res.json();
  //       console.log("Status Update Response:", data);
  //     }
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //   }
  // };
  const updateStatus = async (recordId, newStatus) => {
    try {
      console.log("Updating:", recordId, newStatus);
      let tokenId = null;

      if (newStatus === "approved") {
        tokenId = await mintNFT();
      }

      const res = await fetch("/api/farmer/preHarvest/updateRequest", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId, status: newStatus, tokenId }),
      });

      if (!res.ok) {
        throw new Error(`Failed to update: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("✅ Status Update Response:", data);

      return data;
    } catch (error) {
      console.error("❌ Error updating status:", error);
      throw error;
    }
  };

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
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => updateStatus(token?._id, "approved")}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => updateStatus(token?._id, "rejected")}
                      >
                        Reject
                      </button>
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
          <p className="py-6 text-center text-white">
            No tokens found for selected status.
          </p>
        )}
      </div>
    </AdminLayout>
  );
}

export default Prereq;
