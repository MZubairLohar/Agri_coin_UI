"use client";
import React, { useEffect, useState } from "react";

function Postharvest() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      setLoading(true);
      // ✅ API ko call karo
      const res = await fetch("/api/farmer/postHarvest", {
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
      console.error("❌ Error fetching preHarvest data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-black text-3xl font-bold">Market Post-Harvest</h1>
      <h1 className="text-gray-500 mt-2">
        Monitor your farm's performance and market trends
      </h1>
    </>
  );
}

export default Postharvest;
