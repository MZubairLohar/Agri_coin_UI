"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Navbar() {
  const router = useRouter();
  function Route() {
    router.push("../signup");
  }
  const [account, setAccount] = useState(null);
  return (
    <>
      <div className="navbar z-10 -mt-10">
        <div className="navbar-start">
          <div className="dropdown z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-[#6F9D7E] hover:text-[#FFE990] hover:bg-[#6F9D7E] border hover:border-[#FFE990] lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm bg-[#6F9D7E] dropdown-content rounded-box z-20 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Register</a>
              </li>
              <li>
                <a>Donation</a>
              </li>
              <li>
                <a>Programs</a>
              </li>
              <li>
                <a>Blog</a>
              </li>
              <li>
                <a>Contact Us</a>
              </li>
              <li>
                {account
                  ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
                  : "Connect Wallet"}
              </li>
            </ul>
          </div>
          <img
            className="sm:w-32 sm:h-32 w-24 h-24 mt-2 sm:mt-0 -ml-8 sm:-ml-0"
            src="/agri-logo.png"
          />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-3 text-black">
            <li>
              <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">
                Register
              </button>
            </li>
            <li>
              <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">
                Donation
              </button>
            </li>
            <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">
              Programs
            </button>
            <li>
              <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">
                Blog
              </button>
            </li>
            <li>
              <button className="btn btn-accent px-6 py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]">
                Contact Us
              </button>
            </li>
            <li>
              {account ? (
                <button className="btn bg-red-500 text-white">
                  Disconnect: {account.slice(0, 3)}...{account.slice(-2)}
                </button>
              ) : (
                <button className="btn bg-[#6F9D7E] border border-[#FFE990] text-[#FFE990]">
                  Connect Wallet
                </button>
              )}
            </li>
          </ul>
        </div>
        <div className="navbar-end z-10 mt-2 sm:mt-0">
          <button
            onClick={Route}
            className="btn btn-accent sm:px-6 sm:py-2 rounded-lg bg-[#6F9D7E] text-[#FFE990]"
          >
            SignUp
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
