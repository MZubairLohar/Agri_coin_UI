"use client";
import React from "react";
import ChartOne from "./Chartone";
import ChartTwo from "./ChartTwo";
import Card from "./Card";

const AdminDash = () => {
  return (
    <>
      <div className="" >
        <div className="flex gap-4 h-full overflow-hidden flex-col lg:flex-row ">
          <div className="lg:w-8/12 w-full flex flex-col items-center gap-4 mt-4 lg:items-start">
            <div className="sm:flex justify-between space-y-4 sm:space-y-0 items-center gap-4 w-full">
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
      <div></div>
      
    </>
  );
};

export default AdminDash;
