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
  
    
  const Card = ({ title, subtitle, value, href,tokenNme }) => {
    return (
      <a
        href={href}
        className="w-72 h-32 flex items-center rounded-xl p-2 border-[1px] border-gray-300 relative overflow-hidden group bg-white"
      >
        <div className="absolute w-full inset-0 bg-white translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
        <div>
          <h3 className="font-normal font-lora text-lg text-black relative z-10 duration-300">
            {title}
          </h3>
          <p className="text-gray-400 font-thin font-lora text-md relative z-10 duration-300">
            {subtitle}   {tokenNme}
          </p>
          <p className="text-green-600 text-2xl font-semibold relative">
            {value}
          </p>
          <progress className="progress text-green-600 w-56" value="40" max="100"></progress>
        </div>
      </a>
    );
  }; 
  return (
    <>
<div className=" ">
    <h1 className="text-black text-3xl font-bold">AgriCoin Dashboard</h1>
    <h1 className="text-gray-500 mt-2">Monitor your farm's performance and market trends</h1>
  <div className="flex flex-col lg:flex-row items-center mt-4 lg:items-start">
    <div className="flex flex-wrap justify-center gap-4 w-full">
      <Card
        title="Crop Health"
        subtitle="Overall status of your crops"
        tokenNme="AU"
        Subhed="(22 Karat)"
        href="#"
        image="/gold2.png"
        value="92%"
      />
      <Card
        title="Water Usage"
        subtitle="55"
        tokenNme="AG"
        href="#"
        image="/silver1.png"
        value="68%"
      />
      <Card
        title="Market Prices"
        subtitle="44"
        tokenNme="Agua"
        href="#"
        image="/Agua-newlogo.png"
        value="45%"
      />
    </div>
  </div>
</div>


      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
       
      </div>
    <div>
    </div>
    </>
  );
};

export default ECommerce;
