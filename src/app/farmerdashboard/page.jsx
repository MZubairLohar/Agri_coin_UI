import FarmerLayout from "@/components/maincomp/FarmerLayout";
import ECommerce from "@/components/ecommerce/Ecommerce";

export default function Home() {
  return (
    <>
      <FarmerLayout>
        <div className="flex justify-between items-center">
          <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse"></div>
        </div>
        <ECommerce />
      </FarmerLayout>
    </>
  );
}
