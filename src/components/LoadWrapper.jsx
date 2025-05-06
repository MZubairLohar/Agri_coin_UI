// 'use client';

// import { useEffect, useState } from "react";

// const Loader = () => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
//     <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//   </div>
// );

// export default function LoaderWrapper({ children }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const handleLoad = () => setLoading(false);

//     if (document.readyState === "complete") {
//       handleLoad();
//     } else {
//       window.addEventListener("load", handleLoad);
//       return () => window.removeEventListener("load", handleLoad);
//     }
//   }, []);

//   return (
//     <>
//       {loading && <Loader />}
//       {children}
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Loader from "./loader/loader";

export default function LoaderWrapper({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader on initial mount
    setLoading(true);

    // Simulate slight delay (fake loading duration)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // adjust time as needed

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && <Loader />}
      {!loading && children}
    </>
  );
}
