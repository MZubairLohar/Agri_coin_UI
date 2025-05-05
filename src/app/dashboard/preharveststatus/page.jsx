"use client";
import { preharveststatus, tableHeaders } from "@/app/content/data";
import FarmerLayout from "@/components/maincomp/FarmerLayout";

function PreHarvestStatus() {
  return (
    <FarmerLayout>
      <div className="overflow-x-auto">
        <div className="w-full flex flex-col gap-1">
            {preharveststatus.map((data, ind)=>
              <ul key={data.ein} className={`border flex justify-between items-center px-4 py-2 rounded-lg ${ind % 2 == 0 ? "bg-[#FFE990]" : "bg-white"}`}>
                <li className="w-1/12 text-sm">{ind+1}</li>
                <li className="w-3/12 text-sm">{data.farmLocation}</li>
                <li className="w-2/12 text-sm">{data.landStatus}</li>
                <li className="w-1/12 text-sm">{data.landSize}</li>
                <li className="w-2/12 text-sm">{data.crops}</li>
                <li className="w-1/12 text-sm">{data.loanAmount}</li>
                <li className="w-2/12 text-sm">{data.crops}</li>
             </ul>
            )}            
        </div>
      </div>
    </FarmerLayout>
  );
}

export default PreHarvestStatus;
