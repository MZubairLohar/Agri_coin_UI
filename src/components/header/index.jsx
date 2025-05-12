"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = (props) => {
  const router = useRouter();

  function Route() {
    router.push("../");
  }

  return (
    <header className="sticky top-0 z-20 w-full bg-[#FFE990] drop-shadow-md">
      <div className="flex flex-wrap items-center justify-between px-4 py-3 md:px-6 lg:px-11">
        {/* Sidebar Toggle + Logo for Mobile */}
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={() => props.setSidebarOpen(!props.sidebarOpen)}
            className="block rounded-sm border border-white bg-white p-1.5 shadow-sm lg:hidden"
          >
            <span className="relative block h-5 w-5">
              <span className="absolute block w-full h-0.5 bg-black transition-all duration-200 ease-in-out top-1" />
              <span className="absolute block w-full h-0.5 bg-black transition-all duration-200 ease-in-out top-2" />
              <span className="absolute block w-full h-0.5 bg-black transition-all duration-200 ease-in-out top-3" />
            </span>
          </button>
        <Link href="/" className="block lg:hidden">
  <Image
    src="/agri-logo.png"
    alt="Logo"
    width={72}
    height={72}
    className="object-contain max-h-12 scale-125" // scale logo but restrict max height
  />
</Link>

        </div>

        {/* Wallet Button - Responsive */}
        <div className="flex items-center justify-center mt-3 lg:mt-0 lg:ml-auto lg:mr-6">
          <button className="text-sm sm:text-base px-4 py-2 rounded bg-[#6F9D7E] text-[#FFE990]">
            Connect Wallet
          </button>
        </div>

        {/* User Dropdown */}
        <div className="flex items-center gap-3 mt-3 lg:mt-0">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src="https://www.shutterstock.com/image-vector/profile-picture-vector-260nw-404138239.jpg"
                  alt="user"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow text-black border border-gray-400 bg-white rounded-box w-52 space-y-2"
            >
              <li>
                <span className="font-bold">John Doe</span>
              </li>
              <li>
                <span>johndoe@gmail.com</span>
              </li>
              <li>
                <button
                  onClick={Route}
                  className="btn btn-sm bg-[#FFE990] text-black mt-2"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
