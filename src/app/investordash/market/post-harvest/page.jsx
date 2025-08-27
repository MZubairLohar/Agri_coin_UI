"use client";
import { getDecodedAuthToken } from "@/content/data";
import { adminAddress, usdtAbi, usdtToken } from "@/content/tokenData";
import { WalletContext } from "@/context/WalletContext";
import axios from "axios";
import { Contract, ethers } from "ethers";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaWarehouse,
  FaTimes,
  FaMoneyBillWave,
  FaCoins,
} from "react-icons/fa";

function Postharvest() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentItem, setSelectedPaymentItem] = useState(null);
  const [showCryptoOptions, setShowCryptoOptions] = useState(false);
  const [userId, setUserId] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/farmer/postHarvest", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await res.json();
      console.log("result", result);

      // Handle different response formats
      let apiData = [];
      if (result.data && !Array.isArray(result.data)) {
        apiData = [result.data];
      } else if (Array.isArray(result.data)) {
        apiData = result.data;
      }

      // ✅ Only show approved status cards
      const approvedData = apiData.filter((item) => item.status === "approved");
      setData(approvedData);
    } catch (error) {
      console.error("❌ Error fetching postHarvest data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = getDecodedAuthToken();
    // console.log("userData", userData);
    if (userData) {
      console.log("User Info:", userData);
      setUserId(userData?._id || userData?.id);
    } else {
      console.log("No valid token found");
    }
    fetchData();
  }, []);
  const router = useRouter();
  const { walletAddress, setWalletAddress, signer, setSigner } =
    useContext(WalletContext);
  // Handle stripe payment
  const handleStripePayment = () => {
    console.log("Connected with Stripe for item:", selectedPaymentItem._id);

    if (!signer || !walletAddress) {
      return alert("Kindly connect your wallet first");
    }
    setShowPaymentOptions(false);
    setShowCryptoOptions(false);
    axios
      .post("/api/stripe/stripe-checkout", {
        userId: userId,
        tokenId: selectedPaymentItem?.tokenId,
        status: "pending",
        from: walletAddress,
        amount: selectedPaymentItem?.loanAmount,
        type: "postHarvest",
        paymentType: "stripe",
      })
      .then((response) => {
        router.push(response?.data?.message?.url);
      })
      .catch((error) => {
        console.error("Stripe checkout error:", error);
      });
  };
  const handleUsdtEthPayment = async () => {
    console.log("Processing USDT (Ethereum) payment...");

    try {
      const contract = new Contract(usdtToken, usdtAbi, signer);

      // ✅ USDT has 6 decimals
      const parsedAmount = ethers.parseUnits(
        selectedPaymentItem?.loanAmount.toString(),
        6
      );
      console.log("Parsed amount:", parsedAmount.toString());
      const tx = await contract.transfer(adminAddress, parsedAmount);
      console.log("🔁 Transaction sent to admin:", tx.hash);

      const receipt = await tx.wait();
      if (!receipt.status) {
        throw new Error("Blockchain transaction failed (reverted).");
      }

      console.log("✅ Transaction confirmed. Saving to backend...");

      const response = await fetch("/api/investor/buyNFT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          tokenId: selectedPaymentItem?.tokenId,
          status: "pending",
          from: walletAddress,
          amount: selectedPaymentItem?.loanAmount,
          type: "postHarvest",
          paymentType: "usd",
          hash: tx.hash,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save transaction to backend.");
      }

      console.log("✅ Transaction saved to DB successfully.");
    } catch (err) {
      console.error("❌ Payment failed:", err?.message || err);
    }
  };
  const statusConfig = {
    approved: {
      color: "bg-green-100 text-green-800",
      icon: <FaCheckCircle className="text-green-500" />,
    },
    partial: {
      color: "bg-blue-100 text-blue-800",
      icon: <FaCheckCircle className="text-blue-500" />,
    },
    pending: {
      color: "bg-yellow-100 text-yellow-800",
      icon: <FaClock className="text-yellow-500" />,
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

  // Handle buy now click
  const handleBuyNow = (item) => {
    setSelectedPaymentItem(item);
    setShowPaymentOptions(true);
  };

  // Handle crypto payment selection
  const handleCryptoPayment = () => {
    setShowCryptoOptions(true);
  };

  // Handle specific crypto payment
  const handleCryptoOption = (cryptoType) => {
    console.log(
      `Connected with ${cryptoType} for item:`,
      selectedPaymentItem._id
    );
    handleUsdtEthPayment();
    setShowPaymentOptions(false);
    setShowCryptoOptions(false);
  };

  // Close all modals
  const closeModals = () => {
    setShowModal(false);
    setShowPaymentOptions(false);
    setShowCryptoOptions(false);
    setSelectedItem(null);
    setSelectedPaymentItem(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-black text-3xl font-bold">Market Post-Harvest</h1>
      <h1 className="text-gray-500 mt-2">
        Monitor your farm's performance and market trends
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6f9d7e]"></div>
        </div>
      ) : (
        <div className="mt-6">
          {/* Investment Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.length > 0 ? (
              data.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-[#6F9D7E]">
                      {item.primaryCommodity || "N/A"}
                    </h2>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        statusConfig[item.status]?.color ||
                        statusConfig.pending.color
                      } flex items-center`}
                    >
                      {statusConfig[item.status]?.icon ||
                        statusConfig.pending.icon}
                      <span className="ml-1 capitalize">
                        {item.status || "pending"}
                      </span>
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">
                        Total Acres:
                      </span>
                      <span className="font-medium text-[#6F9D7E]">
                        {item.totalAcres || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">
                        Investment Required:
                      </span>
                      <span className="font-medium text-[#6F9D7E]">
                        $
                        {item.totalInvestmentRequired
                          ? parseFloat(
                              item.totalInvestmentRequired
                            ).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">
                        Farm Location:
                      </span>
                      <span className="text-right text-[#6F9D7E] text-sm">
                        {item.farmLocation || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">
                        Expected ROI:
                      </span>
                      <span className="text-sm text-[#6F9D7E]">
                        {item.expectedROI ? `${item.expectedROI}%` : "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm mt-3 pt-3 border-t border-gray-200">
                      <span className="text-gray-600 font-medium">
                        Harvest Date:
                      </span>
                      <span className="text-[#6F9D7E]">
                        {item.harvestDate
                          ? new Date(item.harvestDate).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="flex-1 py-2 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="flex-1 py-2 bg-[#6F9D7E] text-white rounded text-sm hover:bg-[#5a8a6a] transition"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <FaWarehouse className="text-gray-400 text-4xl mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">
                    No approved post-harvest investments available
                  </h3>
                  <p className="mt-2 text-gray-500">
                    There are currently no approved post-harvest investments in
                    the market.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-[#6f9d7e]">
                Post-Harvest Application Details
              </h2>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                    Basic Information
                  </h3>
                  <DetailRow label="Full Name" value={selectedItem.fullName} />
                  <DetailRow
                    label="Farm Location"
                    value={selectedItem.farmLocation}
                  />
                  <DetailRow
                    label="USDA Farm Number"
                    value={selectedItem.usdaFarmNumber}
                  />
                  <DetailRow
                    label="Primary Commodity"
                    value={selectedItem.primaryCommodity}
                  />
                  <DetailRow
                    label="Total Acres"
                    value={selectedItem.totalAcres}
                  />
                  <DetailRow
                    label="Total Yield"
                    value={selectedItem.totalYield}
                  />
                  <DetailRow
                    label="Yield Unit"
                    value={selectedItem.yieldUnit}
                  />
                </div>

                {/* Investment Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                    Investment Information
                  </h3>
                  <DetailRow
                    label="Total Investment Required"
                    value={selectedItem.totalInvestmentRequired}
                  />
                  <DetailRow
                    label="Expected ROI"
                    value={
                      selectedItem.expectedROI
                        ? `${selectedItem.expectedROI}%`
                        : "N/A"
                    }
                  />
                  <DetailRow
                    label="Investment Types"
                    value={
                      selectedItem.investmentType
                        ? selectedItem.investmentType.join(", ")
                        : "N/A"
                    }
                  />
                  <DetailRow
                    label="Funding Sources"
                    value={
                      selectedItem.fundingSources
                        ? selectedItem.fundingSources.join(", ")
                        : "N/A"
                    }
                  />
                  <DetailRow
                    label="Has Business Plan"
                    value={selectedItem.hasBusinessPlan ? "Yes" : "No"}
                  />
                  <DetailRow
                    label="Has Feasibility Study"
                    value={selectedItem.hasFeasibilityStudy ? "Yes" : "No"}
                  />
                </div>

                {/* Storage & Processing */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                    Storage & Processing
                  </h3>
                  <DetailRow
                    label="Cold Storage Required"
                    value={selectedItem.coldStorageRequired ? "Yes" : "No"}
                  />
                  <DetailRow
                    label="Cold Storage Capacity"
                    value={selectedItem.coldStorageCapacity}
                  />
                  <DetailRow
                    label="Current Storage Method"
                    value={selectedItem.currentStorageMethod}
                  />
                  <DetailRow
                    label="Existing Facilities"
                    value={selectedItem.existingFacilities}
                  />
                  <DetailRow
                    label="Processing Type"
                    value={selectedItem.processingType}
                  />
                  <DetailRow
                    label="Packaging Needs"
                    value={selectedItem.packagingNeeds}
                  />
                  <DetailRow
                    label="Transportation Distance"
                    value={selectedItem.transportationDistance}
                  />
                </div>

                {/* Marketing & Products */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                    Marketing & Products
                  </h3>
                  <DetailRow
                    label="Target Markets"
                    value={selectedItem.targetMarkets}
                  />
                  <DetailRow
                    label="Marketing Channels"
                    value={
                      selectedItem.marketingChannels
                        ? selectedItem.marketingChannels.join(", ")
                        : "N/A"
                    }
                  />
                  <DetailRow
                    label="Value Added Products"
                    value={selectedItem.valueAddedProducts}
                  />
                  <DetailRow
                    label="Sustainability Practices"
                    value={selectedItem.sustainabilityPractices}
                  />
                </div>

                {/* Dates & Status */}
                <div className="space-y-3 md:col-span-2">
                  <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                    Dates & Status
                  </h3>
                  <DetailRow
                    label="Harvest Date"
                    value={
                      selectedItem.harvestDate
                        ? new Date(
                            selectedItem.harvestDate
                          ).toLocaleDateString()
                        : "N/A"
                    }
                  />
                  <DetailRow label="Status" value={selectedItem.status} />
                  <DetailRow
                    label="Agreed to Terms"
                    value={selectedItem.agreeTerms ? "Yes" : "No"}
                  />
                  <DetailRow
                    label="Created At"
                    value={
                      selectedItem.createdAt
                        ? new Date(selectedItem.createdAt).toLocaleString()
                        : "N/A"
                    }
                  />
                  <DetailRow
                    label="Updated At"
                    value={
                      selectedItem.updatedAt
                        ? new Date(selectedItem.updatedAt).toLocaleString()
                        : "N/A"
                    }
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closeModals}
                className="px-4 py-2 bg-[#6f9d7e] text-white rounded-md hover:bg-[#5a8a6a] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Options Modal */}
      {showPaymentOptions && selectedPaymentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#6f9d7e]">
                Choose Payment Method
              </h2>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-6">
              {!showCryptoOptions ? (
                <div className="space-y-4">
                  <button
                    onClick={handleStripePayment}
                    className="w-full flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaMoneyBillWave className="text-blue-500 mr-3" />
                    <span>Pay with Stripe</span>
                  </button>

                  <button
                    onClick={handleCryptoPayment}
                    className="w-full flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaCoins className="text-yellow-500 mr-3" />
                    <span>Pay with Crypto</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Select Crypto Currency
                  </h3>

                  <button
                    onClick={() => handleCryptoOption("Ether USDT")}
                    className="w-full flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaCoins className="text-purple-500 mr-3" />
                    <span>Ether USDT</span>
                  </button>

                  <button
                    onClick={() => handleCryptoOption("Agri Coin")}
                    className="w-full flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaCoins className="text-green-500 mr-3" />
                    <span>Agri Coin</span>
                  </button>

                  <button
                    onClick={() => setShowCryptoOptions(false)}
                    className="w-full mt-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
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

export default Postharvest;
