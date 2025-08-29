"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "./sidebaritem";
import ClickOutside from "./Clickoutside";
import useLocalStorage from "./useLocalstorage";
import { IoHomeOutline } from "react-icons/io5";
import { IoStatsChartOutline } from "react-icons/io5";
import { Leaf, BarChart2, CloudRain, Users, Settings, HelpCircle, Home,History } from "lucide-react";

const menuGroups = [
  {
    name: "MENU INVENTORY",
    menuItems: [
      {
        icon: <Leaf />,
        label: "Market",
        route: "/investordash",
        children: [
          {
            label: "Pre-harvest",
            route: "/investordash/market/pre-harvest",
          },
          {
            label: "Post-harvest",
            route: "/investordash/market/post-harvest",
          },
        ],
      },      
      {
        icon: <BarChart2 />,
        label: "Purchased",
        route: "/investordash",
        children: [
          {
            label: "Pre-harvest",
            route: "/investordash/purchase/pre-harvest",
          },
          {
            label: "Post-harvest",
            route: "/investordash/purchase/post-harvest",
          },
        ],
      },  
      {
        icon: <History />,
        label: "History",
        route: "/investordash",
        children: [
          {
            label: "Pre-harvest",
            route: "/investordash/history/pre-harvest",
          },
          {
            label: "Post-harvest",
            route: "/investordash/history/post-harvest",
          },
        ],
      },  
      // {
      //   icon: (
      //     <Users />
      //   ),
      //   label: "Team",
      //   route: "/mint",
      // },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-60 flex-col overflow-y-hidden bg-[#6F9D7E] duration-300 ease-linear lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center pl-12 pt-4">
            <Image
              width={180}
              height={100}
              src={"/agri-logo.png"}
              alt="Logo"
              priority
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="px-4">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 font-lora text-sm bg-[#6F9D7E] font-normal text-white">
                  {group.name}
                </h3>

                <ul className="mb-6 flex  flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
