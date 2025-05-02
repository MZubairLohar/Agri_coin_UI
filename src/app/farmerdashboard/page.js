// import PreHarvestRequest from "@/components/farmercomponents/PreHarvestRequest";
import Link from "next/link";

function FarmerDashboard() {
  return (
    <div className="bg-gradient-to-l from-[#FFE990] to-[#6f9d7e] min-h-screen flex justify-center items-center px-4 py-4 gap-x-12">
   
      <Link
        href="farmerdashboard/preharvesttoken"
        className="text-blue-600 underline mb-4 inline-block"
      >
        Go to Pre-Harvest Token
      </Link>

      <Link
        href="auth/login"
        className="text-blue-600 underline mb-4 inline-block"
      >
        Signin
      </Link>
    </div>
  );
}

export default FarmerDashboard;
