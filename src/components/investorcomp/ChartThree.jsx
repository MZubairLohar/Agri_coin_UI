"use client";

import React from "react";

const ChartThree = ({ selected }) => {
  const renderCard = (heading) => {
    switch (heading) {
      case "DAO Token":
        return (
          <div className="col-span-12 w-full mt-6 rounded-xl border border-gray-300 bg-white p-3 pt-6 shadow-default xl:col-span-4">
            <div className="mb-4">
              <h4 className="text-xl font-lora text-center font-semibold text-black">DAO Token</h4>
            </div>
            <div className="flex">
              <div className="w-1/2 pr-4 border-r border-gray-300">
                <div className="font-semibold text-black text-center mb-2">Pre-harvist</div>
                <div className="flex flex-col items-center text-md text-gray-400 font-medium gap-2">
                  <div>43$</div>
                  <div>32$</div>
                  <div>76$</div>
                  <div>40$</div>
                  <div>92$</div>
                  <div>55$</div>
                  <div>57$</div>
                  <div>38$</div>
                </div>
              </div>
              <div className="w-1/2 pl-4">
                <div className="font-semibold text-black text-center mb-2">Post-harvist</div>
                <div className="flex flex-col text-[#6F9D7E] font-medium text-md items-center gap-2">
                  <div>33$</div>
                  <div>21$</div>
                  <div>42$</div>
                  <div>55$</div>
                  <div>12$</div>
                  <div>36$</div>
                  <div>13$</div>
                  <div>40$</div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Corn":
        return (
          <div className="col-span-12 w-full mt-6 rounded-xl border border-gray-300 bg-white p-3 pt-6 shadow-default xl:col-span-4">
            <div className="mb-4">
              <h4 className="text-xl font-lora text-center font-semibold text-black">Corn</h4>
            </div>
            <div className="flex">
              <div className="w-1/2 pr-4 border-r border-gray-300">
                <div className="font-semibold text-black text-center mb-2">Pre-harvist</div>
                <div className="flex flex-col items-center text-md text-gray-400 font-medium gap-2">
                  <div>73$</div>
                  <div>74$</div>
                  <div>34$</div>
                  <div>63$</div>
                  <div>74$</div>
                  <div>44$</div>
                  <div>57$</div>
                  <div>38$</div>
                </div>
              </div>
              <div className="w-1/2 pl-4">
                <div className="font-semibold text-black text-center mb-2">Post-harvist</div>
                <div className="flex flex-col text-[#6F9D7E] font-medium text-md items-center gap-2">
                  <div>13$</div>
                  <div>75$</div>
                  <div>53$</div>
                  <div>41$</div>
                  <div>77$</div>
                  <div>48$</div>
                  <div>64$</div>
                  <div>40$</div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Wheat":
        return (
          <div className="col-span-12 w-full mt-6 rounded-xl border border-gray-300 bg-white p-3 pt-6 shadow-default xl:col-span-4">
            <div className="mb-4">
              <h4 className="text-xl font-lora text-center font-semibold text-black">Wheat</h4>
            </div>
            <div className="flex">
              <div className="w-1/2 pr-4 border-r border-gray-300">
                <div className="font-semibold text-black text-center mb-2">Pre-harvist</div>
                <div className="flex flex-col items-center text-md text-gray-400 font-medium gap-2">
                  <div>82$</div>
                  <div>22$</div>
                  <div>31$</div>
                  <div>18$</div>
                  <div>59$</div>
                  <div>60$</div>
                  <div>41$</div>
                  <div>26$</div>
                </div>
              </div>
              <div className="w-1/2 pl-4">
                <div className="font-semibold text-black text-center mb-2">Post-harvist</div>
                <div className="flex flex-col text-[#6F9D7E] font-medium text-md items-center gap-2">
                  <div>53$</div>
                  <div>27$</div>
                  <div>17$</div>
                  <div>48$</div>
                  <div>94$</div>
                  <div>22$</div>
                  <div>43$</div>
                  <div>42$</div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Rice":
        return (
          <div className="col-span-12 w-full mt-6 rounded-xl border border-gray-300 bg-white p-3 pt-6 shadow-default xl:col-span-4">
            <div className="mb-4">
              <h4 className="text-xl font-lora text-center font-semibold text-black">Rice</h4>
            </div>
            <div className="flex">
              <div className="w-1/2 pr-4 border-r border-gray-300">
                <div className="font-semibold text-black text-center mb-2">Pre-harvist</div>
                <div className="flex flex-col items-center text-md text-gray-400 font-medium gap-2">
                  <div>43$</div>
                  <div>63$</div>
                  <div>22$</div>
                  <div>27$</div>
                  <div>97$</div>
                  <div>65$</div>
                  <div>33$</div>
                  <div>66$</div>
                </div>
              </div>
              <div className="w-1/2 pl-4">
                <div className="font-semibold text-black text-center mb-2">Post-harvist</div>
                <div className="flex flex-col text-[#6F9D7E] font-medium text-md items-center gap-2">
                  <div>32$</div>
                  <div>77$</div>
                  <div>45$</div>
                  <div>73$</div>
                  <div>15$</div>
                  <div>85$</div>
                  <div>44$</div>
                  <div>40$</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderCard(selected)}</>;
};

export default ChartThree;
