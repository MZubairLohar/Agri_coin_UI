"use client";

import React, { useState } from "react";
import ChartThree from "./ChartThree";
const ChartTwo = () => {
  const [selected, setSelected] = useState("");

  const handleClick = (heading) => {
    setSelected(heading);
  };

  return (
    <div className="col-span-12 rounded-xl border border-gray-300 bg-[#6F9D7E] p-5 shadow-default xl:col-span-4">
      <div className="mb-5">
        <h4 className="text-xl font-lora text-center font-semibold text-[#FFE990]">Invested Details</h4>
      </div>

      <div className="space-y-3">
        <div
          onClick={() => handleClick("DAO Token")}
          className={`hover:bg-[#FFE990] hover:text-gray-500 text-gray-200 border border-gray-300 font-medium text-center py-2 rounded-lg shadow-sm transition-colors duration-200 ${selected === "DAO Token" ? "bg-[#FFE990] text-gray-500" : ""}`}
        >
          DAO Token
        </div>
        <div
          onClick={() => handleClick("Corn")}
          className={`hover:bg-[#FFE990] hover:text-gray-500 text-gray-200 border border-gray-300 font-medium text-center py-2 rounded-lg shadow-sm transition-colors duration-200 ${selected === "Corn" ? "bg-[#FFE990] text-gray-500" : ""}`}
        >
          Corn
        </div>
        <div
          onClick={() => handleClick("Wheat")}
          className={`hover:bg-[#FFE990] hover:text-gray-500 text-gray-200 border border-gray-300 font-medium text-center py-2 rounded-lg shadow-sm transition-colors duration-200 ${selected === "Wheat" ? "bg-[#FFE990] text-gray-500" : ""}`}
        >
          Wheat
        </div>
        <div
          onClick={() => handleClick("Rice")}
          className={`hover:bg-[#FFE990] hover:text-gray-500 text-gray-200 border border-gray-300 font-medium text-center py-2 rounded-lg shadow-sm transition-colors duration-200 ${selected === "Rice" ? "bg-[#FFE990] text-gary-500" : ""}`}
        >
          Rice
        </div>
      </div>

      <ChartThree selected={selected} />
    </div>
  );
};

export default ChartTwo;
