// "use client";

// import React, { useState } from "react";
// import ChartThree from "./ChartThree";
// const ChartTwo = () => {
//   const [selected, setSelected] = useState("");

//   const handleClick = (heading) => {
//     setSelected(heading);
//   };

//   return (
//     <div className="col-span-12 rounded-xl border border-gray-300 bg-[#6F9D7E] p-5 shadow-default xl:col-span-4">
//       <div className="mb-5">
//         <h4 className="text-xl font-lora text-center font-semibold text-[#FFE990]">Invested Details</h4>
//       </div>

//       <div className="space-y-3">
//         <div
//           onClick={() => handleClick("DAO Token")}
//           className={`hover:bg-[#FFE990] hover:text-gray-500 text-gray-200 border border-gray-300 font-medium text-center py-2 rounded-lg shadow-sm transition-colors duration-200 ${selected === "DAO Token" ? "bg-[#FFE990] text-gray-500" : ""}`}
//         >
//           DAO Token
//         </div>
//         <div
//           onClick={() => handleClick("Corn")}
//           className={`hover:bg-[#FFE990] hover:text-gray-500 text-gray-200 border border-gray-300 font-medium text-center py-2 rounded-lg shadow-sm transition-colors duration-200 ${selected === "Corn" ? "bg-[#FFE990] text-gray-500" : ""}`}
//         >
//           Corn
//         </div>
//         <div
//           onClick={() => handleClick("Wheat")}
//           className={`hover:bg-[#FFE990] hover:text-gray-500 text-gray-200 border border-gray-300 font-medium text-center py-2 rounded-lg shadow-sm transition-colors duration-200 ${selected === "Wheat" ? "bg-[#FFE990] text-gray-500" : ""}`}
//         >
//           Wheat
//         </div>
//         <div
//           onClick={() => handleClick("Rice")}
//           className={`hover:bg-[#FFE990] hover:text-gray-500 text-gray-200 border border-gray-300 font-medium text-center py-2 rounded-lg shadow-sm transition-colors duration-200 ${selected === "Rice" ? "bg-[#FFE990] text-gary-500" : ""}`}
//         >
//           Rice
//         </div>
//       </div>

//       <ChartThree selected={selected} />
//     </div>
//   );
// };

// export default ChartTwo;



"use client";

import React, { useState } from "react";

// Product data - moved to a separate object for better maintainability
const productData = {
  "DAO Token": {
    name: "DAO Token",
    description: "Governance token for platform decision-making",
    preHarvest: [43, 32, 76, 40, 92, 55, 57, 38],
    postHarvest: [33, 21, 42, 55, 12, 36, 13, 40],
    roi: "18.5%",
    risk: "Medium",
    duration: "12 months"
  },
  "Corn": {
    name: "Corn",
    description: "Staple crop with consistent market demand",
    preHarvest: [73, 74, 34, 63, 74, 44, 57, 38],
    postHarvest: [13, 75, 53, 41, 77, 48, 64, 40],
    roi: "22.3%",
    risk: "Low",
    duration: "8 months"
  },
  "Wheat": {
    name: "Wheat",
    description: "Essential grain with global market presence",
    preHarvest: [82, 22, 31, 18, 59, 60, 41, 26],
    postHarvest: [53, 27, 17, 48, 94, 22, 43, 42],
    roi: "15.8%",
    risk: "Low",
    duration: "10 months"
  },
  "Rice": {
    name: "Rice",
    description: "High-demand cereal grain with stable returns",
    preHarvest: [43, 63, 22, 27, 97, 65, 33, 66],
    postHarvest: [32, 77, 45, 73, 15, 85, 44, 40],
    roi: "20.1%",
    risk: "Medium",
    duration: "9 months"
  }
};

const ChartTwo = () => {
  const [selectedProduct, setSelectedProduct] = useState("DAO Token");

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Product Selection Panel */}
      <div className="w-full lg:w-1/3 bg-gradient-to-br from-[#6F9D7E] to-[#5d8a6d] rounded-2xl p-5 shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center text-[#FFE990] font-lora">
            Investment Portfolio
          </h2>
          <p className="text-sm text-gray-100 text-center mt-2">
            Select an asset to view detailed performance metrics
          </p>
        </div>

        <div className="space-y-3">
          {Object.keys(productData).map((product) => (
            <div
              key={product}
              onClick={() => setSelectedProduct(product)}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-300 transform ${
                selectedProduct === product
                  ? "bg-[#FFE990] scale-105 shadow-lg"
                  : "bg-white bg-opacity-15 hover:bg-opacity-25 hover:scale-[1.02]"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className={`font-semibold ${
                  selectedProduct === product ? "text-gray-800" : "text-black"
                }`}>
                  {product}
                </h3>
                <div className={`w-2 h-2 rounded-full ${
                  productData[product].risk === "Low" ? "bg-green-400" : 
                  productData[product].risk === "Medium" ? "bg-yellow-400" : "bg-red-400"
                }`}></div>
              </div>
              {selectedProduct === product && (
                <p className="text-xs text-gray-600 mt-1">
                  {productData[product].description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Product Details Panel */}
      <div className="w-full lg:w-2/3 bg-[#FFE990] rounded-2xl p-6 shadow-lg">
        {selectedProduct ? (
          <ProductDetails product={productData[selectedProduct]} />
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">Select an investment product to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductDetails = ({ product }) => {
  if (!product) return null;

  return (
    <div className="space-y-6 bg-[#FFE990]">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 font-lora">{product.name}</h2>
        <p className="text-gray-600 mt-1">{product.description}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500">Expected ROI</p>
          <p className="text-2xl font-bold text-[#6F9D7E]">{product.roi}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500">Risk Level</p>
          <p className="text-2xl font-bold text-gray-800">{product.risk}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500">Duration</p>
          <p className="text-2xl font-bold text-gray-800">{product.duration}</p>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pre-Harvest Performance */}
        <div className="border border-[#649173] rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 text-center mb-4">Pre-Harvest Investment</h3>
          <div className="space-y-2">
            {product.preHarvest.map((amount, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Investor {index + 1}</span>
                <span className="font-medium text-gray-700">${amount}</span>
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-[#649173]">
              <div className="flex items-center justify-between font-semibold">
                <span className="text-gray-800">Total</span>
                <span className="text-[#6F9D7E]">
                  ${product.preHarvest.reduce((a, b) => a + b, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Post-Harvest Performance */}
        <div className="border border-[#649173] rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 text-center mb-4">Post-Harvest Investment</h3>
          <div className="space-y-2">
            {product.postHarvest.map((amount, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Investor {index + 1}</span>
                <span className="font-medium text-[#6F9D7E]">${amount}</span>
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-[#649173]">
              <div className="flex items-center justify-between font-semibold">
                <span className="text-gray-800">Total</span>
                <span className="text-[#6F9D7E]">
                  ${product.postHarvest.reduce((a, b) => a + b, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center pt-4">
        <button className="bg-gradient-to-r from-[#6F9D7E] to-[#5d8a6d] text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow duration-300">
          Invest in {product.name}
        </button>
      </div>
    </div>
  );
};

export default ChartTwo;