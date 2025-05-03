import DefaultLayout from "@/components/maincomp/DefaultLayout";

function Postharvest () {
    return(
        <DefaultLayout>
  <div className="p-6 text-[#FFE990]">
      <h1 className="text-3xl font-bold text-black mb-4">Pre-Harvest Overview of History</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#6F9D7E] p-4 shadow rounded-xl border">
          <h2 className="text-xl font-semibold mb-2">Crop Planning</h2>
          <p className="text-gray-200">Details about planned crops, timelines, and expected yield.</p>
        </div>

        <div className="bg-[#6F9D7E] p-4 shadow rounded-xl border">
          <h2 className="text-xl font-semibold mb-2">Investment Allocation</h2>
          <p className="text-gray-200">Information on where the investor's money is being used in the pre-harvest phase.</p>
        </div>

        <div className="bg-[#6F9D7E] p-4 shadow rounded-xl border">
          <h2 className="text-xl font-semibold mb-2">Farmer Updates</h2>
          <p className="text-gray-200">Updates from the farmers related to seeding, soil preparation, and equipment usage.</p>
        </div>
      </div>
    </div>
        </DefaultLayout>
    )
}

export default Postharvest;