"use client"

import AdminLayout from "@/components/maincomp/AdminLayout";
import ECommerce from "@/components/ecommerce/Ecommerce";

export default function AdminDashboard({children}) {
  return (
    <AdminLayout>
       <h1 className="text-3xl font-bold text-[#6f9d7e]">Admin Dashboard</h1>
        <h1 className="text-gray-500 mt-2">
          Monitor your farm's performance and market trends
        </h1>
     <div className="flex justify-between items-center">
          <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse"></div>
        </div>
        <ECommerce />
    </AdminLayout>
  );
}
