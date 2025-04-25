"use client";

import React, { useState } from "react";
import ChartThree from "./ChartThree";
const ChartTwo = () => {
  const [selected, setSelected] = useState("");

  const handleClick = (heading) => {
    setSelected(heading);
  };

  return (
    <div className="col-span-12 rounded-xl border border-gray-300 bg-white p-5 shadow-default xl:col-span-4">
      <div className="mb-5">
        <h4 className="text-xl font-lora text-center font-semibold text-black">Invested Details</h4>
      </div>

      <div className="space-y-3">
        <div
          onClick={() => handleClick("DAO Token")}
          className={`hover:bg-[#0CA5E9] hover:text-white text-gray-500 border border-gray-300 font-medium text-center py-2 rounded-lg shadow-sm transition-colors duration-200 ${selected === "DAO Token" ? "bg-[#0CA5E9] text-white" : ""}`}
        >
          DAO Token
        </div>
        <div
          onClick={() => handleClick("Corn")}
          className={`hover:bg-[#2ED4BF] hover:text-white text-gray-500 border border-gray-300 font-medium text-center py-2 rounded-lg shadow-sm transition-colors duration-200 ${selected === "Corn" ? "bg-[#2ED4BF] text-white" : ""}`}
        >
          Corn
        </div>
        <div
          onClick={() => handleClick("Wheat")}
          className={`hover:bg-[#EFCA86] hover:text-white text-gray-500 border border-gray-300 font-medium text-center py-2 rounded-lg shadow-sm transition-colors duration-200 ${selected === "Wheat" ? "bg-[#EFCA86] text-white" : ""}`}
        >
          Wheat
        </div>
        <div
          onClick={() => handleClick("Rice")}
          className={`hover:bg-gray-400 hover:text-white text-gray-500 border border-gray-300 font-medium text-center py-2 rounded-lg shadow-sm transition-colors duration-200 ${selected === "Rice" ? "bg-gray-400 text-white" : ""}`}
        >
          Rice
        </div>
      </div>

      <ChartThree selected={selected} />
    </div>
  );
};

export default ChartTwo;
