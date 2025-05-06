// "use client";

// import React from "react";
// import Image from "next/image";
// export default function Loader() {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
//       <Image
//         src="/agri-logo.png" // Path to your loader image
//         alt="Loading..."
//         width={400} // Set the width of the image
//         height={400} // Set the height of the image
//       />
//     </div>
//   );
// }
"use client";

import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Logo GIF */}
      <img src="/agri-logo.gif" alt="Logo" className="w-60 h-60" />

      {/* Three Dots Loader */}
      <div className="flex space-x-4 ml-4 -mt-8">
        <span
          className="w-3 h-3 bg-[#6F9D7E] rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></span>
        <span
          className="w-3 h-3 bg-[#6F9D7E] rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>
        <span
          className="w-3 h-3 bg-[#6F9D7E] rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>
      </div>
    </div>
  );
};

export default Loader;
