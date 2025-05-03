"use client";
import React from "react";
import ChartOne from "./Chartone";
import ChartTwo from "./ChartTwo";
import { useContext } from "react";
import { Leaf } from "lucide-react";
import Card from "../Card";
// import  {WalletContext} from "./contextApiWallet";

const ECommerce = () => {
  //   const { walletAddress} =
  //   useContext(WalletContext);
  //   console.log("this is Wallet Address from useContext",walletAddress)

  return (
    <>
      <div className="" >
        <h1 className="text-black text-3xl font-bold">Farmer Dashboard</h1>
        <h1 className="text-gray-500 mt-2">
          Monitor your farm's performance and market trends
        </h1>
        <div className="flex gap-4 h-full overflow-hidden flex-col lg:flex-row ">
          <div className="lg:w-8/12 w-full flex flex-col items-center gap-4 mt-4 lg:items-start">
            <div className=" flex justify-between items-center gap-4 w-full">
              <Card
                title="DAO Token"
                subtitle1="Minted"
                subtitle2="Worth"
                value="92"
                worth="42$"
              />
              <Card title="Pre-harvest" subtitle1="No. of Tokens" value="46" />
              <Card title="Post-harvest" subtitle1="No. of Tokens" value="37" />
            </div>
            <div className=" flex justify-between items-center gap-4 w-full">
              <ChartOne />
            </div>
          </div>
          <div className="lg:w-4/12 w-full flex justify-center items-start ">
            <ChartTwo />
          </div>
        </div>
      </div>

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"> */}
      {/* </div> */}
      <div></div>
    </>
  );
};

export default ECommerce;
