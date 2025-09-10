import ChartOne from "./Chartone";
import ChartTwo from "./ChartTwo";
import ChartThree from "./ChartThree";

function Investdash() {
  return (
    <>
      <div className="flex">
        <div className="w-full">
          <h1 className="text-black text-3xl font-bold">Investor Dashboard</h1>
          <h1 className="text-gray-500 mt-2">
            Monitor your farm's performance and market trends
          </h1>
        </div>
        <div className="flex h-2/4 w-full justify-end">
          <div className="inline-flex items-center rounded-md bg-[#FFE990] p-1.5 border border-[#6F9D7E]">
            <button className="px-3 py-1 text-md font-medium shadow-card hover:shadow-card text-[#6F9D7E]">
              Total Amount
            </button>
            <button className="px-3 py-1 text-md font-medium hover:shadow-card text-[#6F9D7E]">
              153$
            </button>
          </div>
        </div>
      </div>
      <ChartOne />
      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"> */}
      {/* <ChartOne /> */}
      <ChartTwo />
      {/* </div> */}
      {/* <ChartThree /> */}
    </>
  );
}

export default Investdash;
