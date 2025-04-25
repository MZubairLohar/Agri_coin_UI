import ChartOne from "./Chartone";
import ChartTwo from "./ChartTwo";
import ChartThree from "./ChartThree";

function Investdash () {
    return(
        <>
        <h1 className="text-black text-3xl font-bold">Investor Dashboard</h1>
        <h1 className="text-gray-500 mt-2">Monitor your farm's performance and market trends</h1>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        </div>
        <ChartThree />
        </>
    )
}

export default Investdash;