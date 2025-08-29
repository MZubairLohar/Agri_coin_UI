"use client";
import { getDecodedAuthToken } from "@/content/data";
import React from "react";
import { useState, useEffect } from "react";


function HistorypreHarvest() {
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
// const[userId,setUserId] = useState(null)
 const fetchNFTData = async (userId) => {
      try {
        setLoading(true);
        const res = await fetch(`/api/investor/buyNFT?userId=${userId}`);
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || "Failed to fetch data");
        }
        console.log("✅ Fetched NFT data:", json);
        setNftData(json.data); // ✅ This will be your single user record
      } catch (err) {
        console.error("❌ Error fetching NFT data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };


useEffect(() => {
 const userData = getDecodedAuthToken();
    // console.log("userData", userData);
    if (userData) {
      console.log("User Info:", userData);
      // setUserId(userData?._id || userData?.id);
    } else {
      console.log("No valid token found");
    }
     // ✅ Prevents API call if userId is not available

   
    fetchNFTData(userData?._id || userData?.id);
  }, []); 
  return (
    <>
      <h1 className="text-black text-3xl font-bold">Purchase Post-Harvest</h1>
      <h1 className="text-gray-500 mt-2">
        Monitor your farm's performance and market trends
      </h1>
    </>
  );
}

export default HistorypreHarvest;
