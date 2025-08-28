import React from "react";

function Card({ title, subtitle1, subtitle2, href, value, worth }) {
  return (
    <div className="w-full h-32 flex flex-col justify-between items-start pt-4  rounded-xl p-2 border-[1px] border-gray-300 relative overflow-hidden group bg-[#6F9D7E]">
      <h3 className="font-semibold font-lora text-xl text-[#FFE990] group-hover:text-[#6F9D7E] group-hover:z-10 relative duration-300">
        {title}
      </h3>
      <div className="absolute w-full inset-0 bg-[#FFE990] translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <div className="flex justify-between w-full">
        <div>
          <p className="text-gray-200 group-hover:text-gray-400 font-medium text-lg font-lora relative duration-300">
            {subtitle1}
          </p>
        </div>
        <div>
          <p className="text-gray-200 group-hover:text-gray-400 font-medium text-lg font-lora relative duration-300">
            {subtitle2}
          </p>
        </div>
      </div>

      <div className="flex justify-between w-full">
        <div>
          <p className="text-[#FFE990] group-hover:text-[#6F9D7E] font-medium text-lg font-lora relative duration-300">
            {value}
          </p>
        </div>
        <div>
          <p className="text-lg text-[#FFE990] group-hover:text-[#6F9D7E] font-normal relative duration-300">
            {worth}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
