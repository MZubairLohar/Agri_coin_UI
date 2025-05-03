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
    <div className="col-span-12 font-lora rounded-xl border border-gray-300 bg-[#6F9D7E] px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4  items-center justify-center rounded-full border border-[#6F9D7E]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full"></span>
            </span>
            <div className="w-full font-lora">
              <p className="font-semibold text-[#FFE990] text-xl">Investment</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            {/* <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#F1BE11]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full"></span>
            </span> */}
            {/* <div className="w-full">
              <p className="font-semibold text-black font-lora">Total Sales</p>
              <p className="text-sm font-medium text-[#F1BE11]">12.04.2022 - 12.05.2022</p>
            </div> */}
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 border border-[#6F9D7E]">
            <button className="rounded bg-white px-3 py-1 text-xs font-medium shadow-card hover:bg-white hover:shadow-card text-[#FFE990]">
              Day
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium hover:bg-white hover:shadow-card text-[#FFE990]">
              Week
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium hover:bg-white hover:shadow-card text-[#FFE990]">
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
