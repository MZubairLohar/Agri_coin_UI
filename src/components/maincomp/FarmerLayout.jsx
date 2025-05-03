"use client";
import React, { useState } from "react";
import Farmersidebar from "../Sidebar/FarmerSidebar";
import Header from "../header";

export default function FarmerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex bg-white">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Farmersidebar className="xl:flex lg:flex hidden"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative  flex flex-1 flex-col lg:ml-72.5">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          {/* <main className=""> */}
          <div className="mx-auto  max-w-screen-2xl p-4 w-full">{children}</div>
          {/* </main> */}
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
    </>
  );
}
