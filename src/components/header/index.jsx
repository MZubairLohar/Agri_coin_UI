"use client";
import Link from "next/link";
import React, { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Web3Modal from "web3modal";
import { BrowserProvider } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { WalletContext } from "@/context/WalletContext";
import { useState } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { getDecodedAuthToken } from "@/content/data";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "AGUA Coin",
      infuraId: "https://rpc.testnet.fantom.network",
    },
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        4002: "https://rpc.testnet.fantom.network",
      },
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
    },
  },
};

const Header = (props) => {
  const router = useRouter();

  function Route() {
    localStorage.clear();
    router.push("/");
  }
  const { walletAddress, setWalletAddress, signer, setSigner } =
    useContext(WalletContext);

  const [account, setAccount] = useState(null);
  const [data, setData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuRef = useRef();
  const web3ModalRef = useRef(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  useEffect(() => {
    const userData = getDecodedAuthToken();
    if (userData) {
      console.log("User Info:", userData);
      setData(userData);
    } else {
      console.log("No valid token found");
    }
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const connectWallet = async () => {
    try {
      if (!web3ModalRef.current) {
        web3ModalRef.current = new Web3Modal({
          cacheProvider: false,
          providerOptions,
        });
      }

      const instance = await web3ModalRef.current.connect();
      const provider = new BrowserProvider(instance);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      console.log("address", address);
      setAccount(address);
      setSigner(signer);
      console.log("signer", signer);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };
  
  const disconnectWallet = async () => {
    try {
      if (web3ModalRef.current) {
        await web3ModalRef.current.clearCachedProvider();
      }

      setWalletAddress(null);
      setAccount(null);
      setSigner(null);

      console.log("Wallet disconnected successfully");
    } catch (err) {
      console.error("Wallet disconnection failed:", err);
    }
  };

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
              className="object-contain max-h-12 scale-125"
            />
          </Link>
        </div>

        {/* Wallet Button - Responsive */}
        <div className="flex items-center justify-center mt-3 lg:mt-0 lg:ml-auto lg:mr-6">
          {account ? (
            <button
              onClick={disconnectWallet}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              Disconnect: {account.slice(0, 3)}...{account.slice(-2)}
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="px-4 py-2 text-sm font-medium bg-[#6F9D7E] border border-[#FFE990] text-[#FFE990] rounded-lg hover:bg-[#5d8a6d] transition-colors duration-200"
            >
              Connect Wallet
            </button>
          )}
        </div>

        {/* Enhanced User Dropdown */}
        <div className="flex items-center gap-3 mt-3 lg:mt-0" ref={menuRef}>
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#6F9D7E] to-[#5d8a6d] text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6F9D7E] transition-all duration-200 hover:shadow-md"
            >
              <span className="font-semibold text-sm">
                {data?.fullName?.charAt(0)?.toUpperCase() || 'N'}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-30">
                {/* Dropdown Header */}
                <div className="p-4 bg-gradient-to-r from-[#6F9D7E] to-[#5d8a6d] text-white">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-20">
                      <span className="font-semibold text-lg text-[#5d8a6d]">
                        {data?.fullName?.charAt(0)?.toUpperCase() || 'N'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm truncate">{data?.name || 'Name'}</h3>
                      <p className="text-xs opacity-90 truncate">{data?.email || 'No email'}</p>
                    </div>
                  </div>
                </div>
                
                {/* User Info */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-xs font-medium text-gray-500">Role</span>
                    <span className="text-sm font-medium text-[#6F9D7E] bg-[#f0f7f3] px-2 py-1 rounded-full">
                      {data?.role || 'User'}
                    </span>
                  </div>
                  
                  {account && (
                    <div className="flex items-center justify-between py-1 mt-2">
                      <span className="text-xs font-medium text-gray-500">Wallet</span>
                      <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {account.slice(0, 6)}...{account.slice(-4)}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Dropdown Footer */}
                <div className="p-3 bg-gray-50">
                  <button
                    onClick={Route}
                    className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#FFE990] to-[#f5de84] text-gray-800 rounded-lg font-medium hover:from-[#f5de84] hover:to-[#ecd275] transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;