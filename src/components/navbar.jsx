// "use client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// function Navbar() {
//   const router = useRouter();
//   function Route() {
//     router.push("../signup");
//   }
//   const [account, setAccount] = useState(null);
//   return (
//     <>
//       <div className="navbar z-10 -mt-10">
//         <div className="navbar-start">
//           <div className="dropdown z-50">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost text-[#6F9D7E] hover:text-[#FFE990] hover:bg-[#6F9D7E] border hover:border-[#FFE990] lg:hidden"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {" "}
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h8m-8 6h16"
//                 />{" "}
//               </svg>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm bg-[#6F9D7E] dropdown-content rounded-box z-20 mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <a>Register</a>
//               </li>
//               <li>
//                 <a>Donation</a>
//               </li>
//               <li>
//                 <a>Programs</a>
//               </li>
//               <li>
//                 <a>Blog</a>
//               </li>
//               <li>
//                 <a>Contact Us</a>
//               </li>
//               <li>
//                 {account
//                   ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
//                   : "Connect Wallet"}
//               </li>
//             </ul>
//           </div>
//           <img
//             className="sm:w-32 sm:h-32 w-24 h-24 mt-2 sm:mt-0 -ml-8 sm:-ml-0"
//             src="/agri-logo.png"
//           />
//         </div>
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1 gap-3 text-black">
//             <li>
//               <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">
//                 Register
//               </button>
//             </li>
//             <li>
//               <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">
//                 Donation
//               </button>
//             </li>
//             <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">
//               Programs
//             </button>
//             <li>
//               <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">
//                 Blog
//               </button>
//             </li>
//             <li>
//               <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">
//                 Contact Us
//               </button>
//             </li>
//             <li>
//               {account ? (
//                 <button className="btn bg-red-500 text-white">
//                   Disconnect: {account.slice(0, 3)}...{account.slice(-2)}
//                 </button>
//               ) : (
//                 <button className="btn bg-[#6F9D7E] border border-[#FFE990] text-[#FFE990]">
//                   Connect Wallet
//                 </button>
//               )}
//             </li>
//           </ul>
//         </div>
//         <div className="navbar-end z-10 mt-2 sm:mt-0">
//           <button
//             onClick={Route}
//             className="btn btn-accent sm:px-6 sm:py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]"
//           >
//             SignUp
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Navbar;






"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaWallet, FaUserPlus, FaSignInAlt } from "react-icons/fa";

function Navbar() {
  const router = useRouter();
  function Route() {
    router.push("../signup");
  }
  function RouteLogin() {
    router.push("../signin");
  }
  const [account, setAccount] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock function for wallet connection
  const connectWallet = () => {
    // This would be your actual wallet connection logic
    setAccount("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  return (
    <>
      <div className="navbar h-20 w-full z-50 top-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-[#6F9D7E] hover:text-[#FFE990] hover:bg-[#6F9D7E] border hover:border-[#FFE990] lg:hidden p-3 rounded-xl transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h8m-8 6h16"}
                />
              </svg>
            </div>
            {isMenuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-md bg-[#6F9D7E] dropdown-content rounded-box z-50 mt-3 w-64 p-4 shadow-xl space-y-2"
              >
                <li>
                  <a className="text-[#FFE990] hover:bg-[#FFE990] hover:text-[#6F9D7E] rounded-lg transition-all duration-300">
                    <FaUserPlus className="text-lg" /> Register
                  </a>
                </li>
                <li>
                  <a className="text-[#FFE990] hover:bg-[#FFE990] hover:text-[#6F9D7E] rounded-lg transition-all duration-300">
                    Donation
                  </a>
                </li>
                <li>
                  <a className="text-[#FFE990] hover:bg-[#FFE990] hover:text-[#6F9D7E] rounded-lg transition-all duration-300">
                    Programs
                  </a>
                </li>
                <li>
                  <a className="text-[#FFE990] hover:bg-[#FFE990] hover:text-[#6F9D7E] rounded-lg transition-all duration-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a className="text-[#FFE990] hover:bg-[#FFE990] hover:text-[#6F9D7E] rounded-lg transition-all duration-300">
                    Contact Us
                  </a>
                </li>
                <li>
                  <button 
                    onClick={RouteLogin}
                    className="bg-white text-[#6F9D7E] rounded-lg py-2 px-4 hover:bg-[#6F9D7E] hover:text-white transition-all duration-300 flex items-center gap-2 mt-2"
                  >
                    <FaSignInAlt className="text-lg" /> Login
                  </button>
                </li>
              </ul>
            )}
          </div>
          <img
            className="sm:w-32 sm:h-32 w-24 h-24 mt-2 sm:mt-0 -ml-4 sm:-ml-0 cursor-pointer hover:scale-105 transition-transform duration-300"
            src="/agri-logo.png"
            alt="AgriConnect Logo"
            onClick={() => router.push("/")}
          />
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 text-black items-center">
            <li>
              <button className="px-4 py-2 rounded-xl bg-[#6F9D7E] text-[#FFE990] hover:bg-[#FFE990] hover:text-[#6F9D7E] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 border-2 border-transparent hover:border-[#6F9D7E]">
                Register
              </button>
            </li>
            <li>
              <button className="px-4 py-2 rounded-xl bg-[#6F9D7E] text-[#FFE990] hover:bg-[#FFE990] hover:text-[#6F9D7E] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 border-2 border-transparent hover:border-[#6F9D7E]">
                Donation
              </button>
            </li>
            <li>
              <button className="px-4 py-2 rounded-xl bg-[#6F9D7E] text-[#FFE990] hover:bg-[#FFE990] hover:text-[#6F9D7E] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 border-2 border-transparent hover:border-[#6F9D7E]">
                Programs
              </button>
            </li>
            <li>
              <button className="px-4 py-2 rounded-xl bg-[#6F9D7E] text-[#FFE990] hover:bg-[#FFE990] hover:text-[#6F9D7E] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 border-2 border-transparent hover:border-[#6F9D7E]">
                Blog
              </button>
            </li>
            <li>
              <button className="px-4 py-2 rounded-xl bg-[#6F9D7E] text-[#FFE990] hover:bg-[#FFE990] hover:text-[#6F9D7E] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 border-2 border-transparent hover:border-[#6F9D7E]">
                Contact Us
              </button>
            </li>
          </ul>
        </div>
        
        <div className="navbar-end gap-4 z-10 mt-2 sm:mt-0">
          <button
            onClick={RouteLogin}
            className="btn hidden md:flex bg-white text-[#6F9D7E] border-2 border-[#6F9D7E] hover:bg-[#6F9D7E] hover:text-white transition-all duration-300 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <FaSignInAlt className="mr-2" /> Login
          </button>
          <button
            onClick={Route}
            className="btn px-6 py-3 rounded-xl bg-[#6F9D7E] text-[#FFE990] hover:bg-[#FFE990] hover:text-[#6F9D7E] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 border-2 border-transparent hover:border-[#6F9D7E] flex items-center gap-2"
          >
            <FaUserPlus className="text-lg" /> Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;