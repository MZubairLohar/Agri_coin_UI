"use client";

import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#828185", "#F1BE11"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#E22D2C", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    labels: {
      style: {
        colors: "#6B7280",
        fontSize: "12px",
      },
    },
    categories: [
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#6B7280",
        fontSize: "12px",
      },
    },
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 100,
  },
};

const ChartOne = () => {
  const series = [
    {
      name: "Product Two",
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
    },
  ];

  return (
    <div className="col-span-12 font-lora rounded-xl pb-5 mt-6 shadow-default xl:col-span-8 bg-white">

  {/* Card Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Card 1 */}
    <div className="card bg-[#FFE990] border border-[#FFE990] text-black shadow-md rounded-xl overflow-hidden">
      <div className="card-body p-5">
        <h2 className="text-xl font-bold">Corn</h2>
        <p className="text-gray-600 mt-2">
          A card component has a figure, a body part, and inside body there are
          title and actions parts.
        </p>
      </div>
      <div className="flex justify-between items-center border-t border-[#659375] px-5 py-3">
        <h2 className="text-lg font-semibold">Price:</h2>
        <h2 className="text-lg text-gray-700">$35</h2>
      </div>
    </div>

    {/* Card 2 */}
    <div className="card bg-[#FFE990] border border-gray-300 text-black shadow-md rounded-xl overflow-hidden">
      <div className="card-body p-5">
        <h2 className="text-xl font-bold">Wheat</h2>
        <p className="text-gray-600 mt-2">
          A card component has a figure, a body part, and inside body there are
          title and actions parts.
        </p>
      </div>
      <div className="flex justify-between items-center border-t border-[#659375] px-5 py-3">
        <h2 className="text-lg font-semibold">Price:</h2>
        <h2 className="text-lg text-gray-700">$35</h2>
      </div>
    </div>

    {/* Card 3 */}
    <div className="card bg-[#FFE990] border border-gray-300 text-black shadow-md rounded-xl overflow-hidden">
      <div className="card-body p-5">
        <h2 className="text-xl font-bold">Rice</h2>
        <p className="text-gray-600 mt-2">
          A card component has a figure, a body part, and inside body there are
          title and actions parts.
        </p>
      </div>
      <div className="flex justify-between items-center border-t border-[#659375] px-5 py-3">
        <h2 className="text-lg font-semibold">Price:</h2>
        <h2 className="text-lg text-gray-700">$35</h2>
      </div>
    </div>
  </div>
</div>

  );
};

export default ChartOne;
