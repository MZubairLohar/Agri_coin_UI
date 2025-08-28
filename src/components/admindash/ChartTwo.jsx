"use client";

import React from "react";
import dynamic from "next/dynamic";
import { farmingName } from "/src/app/content/data";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options = {
  colors: ["#DFDFDF", "#F1BE11"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["M", "T", "W", "T", "F", "S", "S"],
    labels: {
      style: {
        colors: "#6B7280",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#6B7280",
        fontSize: "12px",
      },
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",
    labels: {
      colors: "#6B7280",
    },
  },
  fill: {
    opacity: 1,
  },
};

const ChartTwo = () => {
  const series = [
    {
      name: "Sales",
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
      data: [44, 55, 41, 67, 22, 43, 65],
    },
    {
      name: "Revenue",
      data: [13, 23, 20, 8, 13, 27, 15],
    },
  ];

  return (
    <div className="w-full rounded-xl border border-gray-300 mt-4 px-2 py-4 shadow-default xl:col-span-4 bg-[#6F9D7E]">
      <div className="mb-4">
        <h4 className="text-xl font-lora text-center font-semibold text-[#FFE990]">
          Minting Update
        </h4>
      </div>

      <div className="flex">
        {/* Left Column */}
        <div className="w-full p">
          <div className="flex w-full justify-between items-center px-6 font-semibold text-gray-200 mb-2 text-center">
            <span>Who Minted</span>
            <span>Minted Amount</span>
          </div>
          <div className="flex flex-col items-center text-md text-[#FFE990] font-medium gap-2">
            <ul className="w-full px-4 flex flex-col gap-4 sm:gap-1">
              {farmingName
                .filter((data) => data.id <= 11)
                .map((data) => (
                  <li
                    className="w-full flex justify-between border py-2 px-4 rounded-md hover:bg-[#FFE990] hover:text-[#6F9D7E]"
                    key={data.id}
                  >
                    <div className="flex gap-6">
                      <span>{data.id}</span>
                      <span>{data.name}</span>
                    </div>
                    <span>{data.number}</span>
                  </li>
                ))}
            </ul>

            {/* <div>John</div>
            <div>Alice</div>
            <div>James</div>
            <div>Bob</div>
            <div>Martin</div>
            <div>Josh</div>
            <div>Luke</div>
            <div>Steve</div> */}
          </div>
        </div>

        {/* Right Column */}
        {/* <div className="w-1/2 pl-4">
          <div className="font-semibold text-gray-200 mb-2 text-center underline">
            Minted amount
          </div>
          <div className="flex flex-col text-[#FFE990] font-medium text-md items-center gap-2">
            <div>33</div>
            <div>21</div>
            <div>42</div>
            <div>55</div>
            <div>12</div>
            <div>36</div>
            <div>13</div>
            <div>40</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ChartTwo;
