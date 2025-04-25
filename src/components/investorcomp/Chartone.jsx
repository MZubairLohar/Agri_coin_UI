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
    <div className="col-span-12 h-96 font-lora rounded-xl border border-gray-300 bg-white px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <div className="w-full font-lora">
              <p className="font-semibold text-black text-2xl">Investor</p>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 border border-[#6F9D7E]">
            <button className="rounded bg-white px-3 py-1 text-md font-medium shadow-card hover:bg-white hover:shadow-card text-[#6F9D7E]">
              Total Amount
            </button>
            <button className="rounded px-3 py-1 text-md font-medium hover:bg-white hover:shadow-card text-[#6F9D7E]">
              153$
            </button>
          </div>
        </div>
      </div>
      
    <div className="flex gap-6 mt-6">  
      <div className="card w-44 bg-white border border-gray-300 text-black card-xs shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-xl">Corn</h2>
    <p className="text-gray-500">A card component has a figure, a body part, and inside body there are title and actions parts</p>
  </div>
</div>

<div className="card w-44 bg-white border border-gray-300 text-black card-xs shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-xl">Wheat</h2>
    <p className="text-gray-500">A card component has a figure, a body part, and inside body there are title and actions parts</p>
  </div>
</div>

<div className="card w-44 bg-white border border-gray-300 text-black card-xs shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-xl">Rice</h2>
    <p className="text-gray-500">A card component has a figure, a body part, and inside body there are title and actions parts</p>
  </div>
</div>
</div>

<div className="flex gap-6 mt-6">  
      <div className="card w-44 bg-white border border-gray-300 text-black card-xs shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-xl">Price :</h2>
    <h2 className="text-xl text-gray-500">35$</h2>
  </div>
</div>

<div className="card w-44 bg-white border border-gray-300 text-black card-xs shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-xl">Price :</h2>
    <h2 className="text-xl text-gray-500">57$</h2>
  </div>
</div>

<div className="card w-44 bg-white border border-gray-300 text-black card-xs shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-xl">Price :</h2>
    <h2 className="text-xl text-gray-500">31$</h2>
  </div>
</div>
</div>

    </div>
  );
};

export default ChartOne;
