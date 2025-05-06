"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = (props) => {
    const router = useRouter();
  function Route () {
    router.push("../")
  }
  return (
    <header className="sticky top-0 z-20 flex w-full bg-[#FFE990] drop-shadow-1 dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            className="z-99999 block rounded-sm border border-white bg-white p-1.5 shadow-sm lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={32}
              height={32}
              src={"/images/logo/agua-logo.png"}
              alt="Logo"
            />
          </Link>
        </div>
        <button className="btn btn-success bg-[#6F9D7E] text-[#FFE990]">Connect Wallet</button>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
          <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="avatar">
    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
      <img src="https://www.shutterstock.com/image-vector/profile-picture-vector-260nw-404138239.jpg" />
    </div>
  </div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu -space-y-2 shadow text-black border border-gray-400 bg-white rounded-box w-52">
    <li><span className="font-bold">John Doe</span></li>
    <li><span>johndoe@gmail.com</span></li>
    <li><button onClick={Route} className="btn btn-sm btn-success bg-[#FFE990] text-black mt-2">Logout</button></li>
  </ul>
</div>

          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
