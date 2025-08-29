"use client";
import { getDecodedAuthToken } from "@/content/data";
import React from "react";
import { useState, useEffect } from "react";
import { FiCopy, FiExternalLink, FiRefreshCw, FiCalendar, FiClock } from "react-icons/fi";

function HistorypreHarvest() {
  const [nftData, setNftData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedHash, setCopiedHash] = useState(null);

  const fetchNFTData = async (userId) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/investor/buyNFT?userId=${userId}`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to fetch data");
      }
      console.log("✅ Fetched NFT data:", json);
      setNftData(json.data || []);

      // Filter for pre-harvest data only
      const preHarvestData = (json.data || []).filter(
        (item) => item.type === "preHarvest"
      );
      setFilteredData(preHarvestData);
    } catch (err) {
      console.error("❌ Error fetching NFT data:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    const userData = getDecodedAuthToken();
    if (userData) {
      fetchNFTData(userData?._id || userData?.id);
    }
  };

  const copyToClipboard = (text, hash) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateHash = (hash, startChars = 6, endChars = 4) => {
    if (!hash || hash.length <= startChars + endChars) return hash;
    return `${hash.substring(0, startChars)}...${hash.substring(hash.length - endChars)}`;
  };

  const truncateAddress = (address, startChars = 6, endChars = 4) => {
    if (!address || address.length <= startChars + endChars) return address;
    return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`;
  };

  useEffect(() => {
    const userData = getDecodedAuthToken();
    if (userData) {
      fetchNFTData(userData?._id || userData?.id);
    } else {
      console.log("No valid token found");
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Pre-Harvest Investments
        </h1>
        <p className="text-gray-500 mt-2">
          Monitor your pre-harvest NFT investments and track their performance
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Investments</p>
          <p className="text-2xl font-bold text-gray-800">{filteredData.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-2xl font-bold text-gray-800">
            {filteredData.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {filteredData.filter(item => item.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-blue-600">
            {filteredData.filter(item => item.status === 'completed').length}
          </p>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
            Pre-Harvest Investment History
          </h2>
          <button
            onClick={refreshData}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <FiRefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-500">
              Loading your pre-harvest investments...
            </p>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <span className="text-2xl text-red-600">⚠️</span>
            </div>
            <p className="text-red-600 mb-2">Error loading data</p>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={refreshData}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <span className="text-2xl text-gray-400">🌱</span>
            </div>
            <p className="text-gray-500">No pre-harvest investments found.</p>
            <p className="text-gray-400 text-sm mt-1">
              Your pre-harvest investments will appear here once you make them.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500 text-sm font-medium">
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Payment Type</th>
                  <th className="px-4 py-3">Token ID</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">From</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Hash</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Amount */}
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-800">
                          {item.amount || "0.00"}
                        </span>
                      </div>
                    </td>
                    
                    {/* Payment Type */}
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {item.paymentType || "N/A"}
                      </span>
                    </td>
                    
                    {/* Token ID */}
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-gray-600">
                        #{item.tokenId || "N/A"}
                      </span>
                    </td>
                    
                    {/* Type */}
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {item.type || "N/A"}
                      </span>
                    </td>
                    
                    {/* From Address */}
                    <td className="px-4 py-3">
                      <div className="flex items-center group">
                        <span className="font-mono text-sm text-gray-600">
                          {truncateAddress(item.from)}
                        </span>
                        <button 
                          onClick={() => copyToClipboard(item.from, `from-${index}`)}
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiCopy className="text-gray-400 hover:text-gray-600 text-xs" />
                        </button>
                      </div>
                    </td>
                    
                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "active"
                            ? "bg-green-100 text-green-800"
                            : item.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : item.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.status || "unknown"}
                      </span>
                    </td>
                    
                    {/* Hash */}
                    <td className="px-4 py-3">
                      <div className="flex items-center group max-w-[120px]">
                        <span className="font-mono text-sm text-gray-600 truncate">
                          {truncateHash(item.hash)}
                        </span>
                        <div className="flex ml-2 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => copyToClipboard(item.hash, `hash-${index}`)}
                            className="text-gray-400 hover:text-gray-600"
                            title="Copy hash"
                          >
                            <FiCopy className="text-xs" />
                          </button>
                          <button 
                            className="text-gray-400 hover:text-gray-600"
                            title="View transaction"
                          >
                            <FiExternalLink className="text-xs" />
                          </button>
                        </div>
                        {copiedHash === `hash-${index}` && (
                          <span className="ml-2 text-xs text-green-600">Copied!</span>
                        )}
                      </div>
                    </td>
                    
                    {/* Created At */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-800">{formatDate(item.createdAt)}</span>
                        <span className="text-xs text-gray-400 flex items-center">
                          {new Date(item.createdAt).toLocaleTimeString}
                        </span>
                      </div>
                    </td>
                    
                    {/* Updated At */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-800">{formatDate(item.updatedAt)}</span>
                        <span className="text-xs text-gray-400 flex items-center">
                          {new Date(item.updatedAt).toLocaleTimeString}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistorypreHarvest;