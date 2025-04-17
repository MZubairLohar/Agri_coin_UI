import DefaultLayout from "@/components/maincomp/DefaultLayout";
import ECommerce from "@/components/ecommerce/Ecommerce";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <div className="flex justify-between items-center">
        <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            </div>
            </div>
            <ECommerce />
      </DefaultLayout>
    </>
  );
}
