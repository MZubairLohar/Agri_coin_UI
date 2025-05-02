"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar";

export default function DefaultLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
     <div className="flex ">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative  flex flex-1 flex-col bg-white lg:ml-72.5">
          {/* <!-- ===== Header Start ===== --> */}
        
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className="bg-white">
            <div className="mx-auto  max-w-screen-2xl bg-[#FFE990]">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <div className="bg-white h-auto w-6 ]">
         
        </div> */}
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
    </>
  );
}
