"use client";
import React from "react";
import ChartOne from "./Chartone";
import ChartTwo from "./ChartTwo";
import { useContext } from "react";
import { Leaf } from "lucide-react";
// import  {WalletContext} from "./contextApiWallet";

const ECommerce = () => {
  //   const { walletAddress} =
  //   useContext(WalletContext);
  //   console.log("this is Wallet Address from useContext",walletAddress)

  const Card = ({ title, subtitle1, subtitle2, href, value, worth }) => {
    return (
      <a
        href={href}
        className="w-72 h-32 pt-4 items-center space-y-1.5 rounded-xl p-2 border-[1px] border-gray-300 relative overflow-hidden group bg-white"
      >
        <h3 className="font-semibold font-lora text-xl text-black relative z-10 duration-300">
          {title}
        </h3>
        <div className="absolute w-full inset-0 bg-white translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 font-medium text-lg font-lora relative z-10 duration-300">
              {subtitle1}
            </p>
          </div>
          <div>
            <p className="text-gray-400 font-medium text-lg font-lora relative z-10 duration-300">
              {subtitle2}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="text-[#6F9D7E] font-medium text-lg font-lora relative z-10 duration-300">
              {value}
            </p>
          </div>
          <div>
            <p className="text-lg text-[#6F9D7E] font-normal relative z-10 duration-300">
              {worth}
            </p>
          </div>
        </div>
      </a>
    );
  };
  return (
    <>
      <div className="px-2 py-4 w-full">
        <div className="border rounded-md border-gray-300 shadow-sm px-6 py-2 bg-[#d8c77d]">
        <h1 className=" text-3xl font-bold">AgriCoin Dashboard</h1>
        <h1 className="text-gray-500 mt-2">
          Monitor your farm's performance and market trends
        </h1>
        </div>
        <div className="flex flex-col lg:flex-row items-center mt-4 lg:items-start">
          <div className="flex flex-wrap justify-center gap-4 w-full">
            <Card
              title="DAO Token"
              subtitle1="Minted"
              subtitle2="Worth"
              value="92"
              worth="42$"
            />
            <Card title="Pre-harvist" subtitle1="No. of Tokens" value="46" />
            <Card title="Post-harvist" subtitle1="No. of Tokens" value="37" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div>
      <div></div>
    </>
  );
};

export default ECommerce;
