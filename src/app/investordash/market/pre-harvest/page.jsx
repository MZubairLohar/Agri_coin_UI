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

function PreHarvest() {
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
      const res = await fetch("/api/farmer/preHarvest", {
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
      console.error("❌ Error fetching preHarvest data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  const router = useRouter();
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
        type: "preHarvest",
        paymentType: "stripe",
      })
      .then((response) => {
        router.push(response?.data?.message?.url);
      })
      .catch((error) => {
        console.error("Stripe checkout error:", error);
      });
  };

  // Handle crypto payment selection
  const handleCryptoPayment = () => {
    setShowCryptoOptions(true);
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
          type: "preHarvest",
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
  // Handle specific crypto payment
  const handleCryptoOption = (cryptoType) => {
    console.log(
      `Connected with ${cryptoType} for item:`,
      selectedPaymentItem._id
    );
    setShowPaymentOptions(false);
    setShowCryptoOptions(false);
    handleUsdtEthPayment();
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
      <h1 className="text-black text-3xl font-bold">Market Pre-Harvest</h1>
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
                      {item.crops ? item.crops.join(", ") : "N/A"}
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
                        Land Size:
                      </span>
                      <span className="font-medium text-[#6F9D7E]">
                        {item.landSize || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">
                        Loan Amount:
                      </span>
                      <span className="font-medium text-[#6F9D7E]">
                        $
                        {item.loanAmount
                          ? parseFloat(item.loanAmount).toLocaleString()
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
                        Loan Purpose:
                      </span>
                      <span className="text-sm text-[#6F9D7E]">
                        {item.loanPurpose || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm mt-3 pt-3 border-t border-gray-200">
                      <span className="text-gray-600 font-medium">
                        Request Date:
                      </span>
                      <span className="text-[#6F9D7E]">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
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
                    No approved pre-harvest investments available
                  </h3>
                  <p className="mt-2 text-gray-500">
                    There are currently no approved pre-harvest investments in
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
                Application Details
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
                {/* Personal Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                    Personal Information
                  </h3>
                  <DetailRow label="Full Name" value={selectedItem.fullName} />
                  <DetailRow label="Email" value={selectedItem.email} />
                  <DetailRow label="Phone" value={selectedItem.phone} />
                  <DetailRow label="Date of Birth" value={selectedItem.dob} />
                  <DetailRow
                    label="Citizenship Status"
                    value={selectedItem.citizenshipStatus}
                  />
                  <DetailRow label="SSN" value={selectedItem.ssn} />
                </div>

                {/* Business Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                    Business Information
                  </h3>
                  <DetailRow
                    label="Business Name"
                    value={selectedItem.businessName}
                  />
                  <DetailRow
                    label="Entity Type"
                    value={selectedItem.entityType}
                  />
                  <DetailRow label="EIN" value={selectedItem.ein} />
                  <DetailRow
                    label="Years in Operation"
                    value={selectedItem.yearsInOperation}
                  />
                  <DetailRow
                    label="Annual Income"
                    value={selectedItem.annualIncome}
                  />
                  <DetailRow
                    label="USDA Farm Number"
                    value={selectedItem.usdaFarmNumber}
                  />
                </div>

                {/* Farm Details */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                    Farm Details
                  </h3>
                  <DetailRow
                    label="Farm Location"
                    value={selectedItem.farmLocation}
                  />
                  <DetailRow label="Land Size" value={selectedItem.landSize} />
                  <DetailRow
                    label="Land Status"
                    value={selectedItem.landStatus}
                  />
                  <DetailRow
                    label="Crops"
                    value={
                      selectedItem.crops ? selectedItem.crops.join(", ") : "N/A"
                    }
                  />
                  <DetailRow
                    label="Area per Crop"
                    value={selectedItem.areaPerCrop}
                  />
                  <DetailRow
                    label="Expected Yield"
                    value={selectedItem.expectedYield}
                  />
                  <DetailRow label="Soil Type" value={selectedItem.soilType} />
                  <DetailRow
                    label="Irrigation Type"
                    value={selectedItem.irrigationType}
                  />
                  <DetailRow
                    label="Crop Insurance"
                    value={selectedItem.cropInsurance}
                  />
                  <DetailRow label="Practices" value={selectedItem.practices} />
                </div>

                {/* Loan Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                    Loan Information
                  </h3>
                  <DetailRow label="Loan Type" value={selectedItem.loanType} />
                  <DetailRow
                    label="Loan Amount"
                    value={selectedItem.loanAmount}
                  />
                  <DetailRow
                    label="Loan Purpose"
                    value={selectedItem.loanPurpose}
                  />
                  <DetailRow label="Loan Term" value={selectedItem.loanTerm} />
                  <DetailRow
                    label="Disbursement Date"
                    value={selectedItem.disbursementDate}
                  />
                  <DetailRow
                    label="Repayment Source"
                    value={selectedItem.repaymentSource}
                  />
                  <DetailRow
                    label="Previous Loans"
                    value={selectedItem.previousLoans}
                  />
                  <DetailRow
                    label="Credit Score"
                    value={selectedItem.creditScore}
                  />
                  <DetailRow
                    label="Equipment Owned"
                    value={selectedItem.equipmentOwned}
                  />
                </div>

                {/* Bank Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                    Bank Information
                  </h3>
                  <DetailRow label="Bank Name" value={selectedItem.bankName} />
                  <DetailRow
                    label="Account Number"
                    value={selectedItem.accountNumber}
                  />
                  <DetailRow
                    label="Routing Number"
                    value={selectedItem.routingNumber}
                  />
                </div>

                {/* Address Information */}
                <div className="space-y-3 md:col-span-2">
                  <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                    Address Information
                  </h3>
                  <DetailRow
                    label="Mailing Address"
                    value={selectedItem.mailingAddress}
                  />
                  <DetailRow
                    label="Residential Address"
                    value={selectedItem.residentialAddress}
                  />
                </div>

                {/* Application Status */}
                <div className="space-y-3 md:col-span-2">
                  <h3 className="font-semibold text-[#6f9d7e] border-b pb-1">
                    Application Status
                  </h3>
                  <DetailRow label="Status" value={selectedItem.status} />
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
                    <span className="text-black">Pay with Stripe</span>
                  </button>

                  <button
                    onClick={handleCryptoPayment}
                    className="w-full flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaCoins className="text-yellow-500 mr-3" />
                    <span className="text-black">Pay with Crypto</span>
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
                    <span className="text-black">Ether USDT</span>
                  </button>

                  <button
                    onClick={() => handleCryptoOption("Agri Coin")}
                    className="w-full flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaCoins className="text-green-500 mr-3" />
                    <span className="text-black">Agri Coin</span>
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

export default PreHarvest;
