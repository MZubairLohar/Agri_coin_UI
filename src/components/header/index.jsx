"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useState } from "react";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";

function getProvider() {
  const provider = window.safepalProvider; // Check if SafePal provider is injected
  if (!provider) {
    // If SafePal provider is not found, open the download link
    window.open("https://www.safepal.com/download");
    throw new Error(
      "Please go to our official website to download SafePal wallet."
    );
  }
  return provider;
}
const providerOptions = {
  
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web3Modal Demo",
      infuraId: "https://rpc.testnet.fantom.network", // Replace with the correct RPC URL if needed
    },
  },

  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        4002: "https://rpc.testnet.fantom.network", // Replace with the correct RPC URL
      },
      bridge: "https://bridge.walletconnect.org", // Default WalletConnect bridge
      qrcode: true, // Show QR code for connection
    },
  },
};

const Header = (props) => {
  const router = useRouter();

  function Route() {
    router.push("../");
  }

  const [account, setAccount] = useState(null);
          const [signer, setSigner] = useState(null);
            
            const connectWallet = async () => {
              console.log("connectting");
                  try {
                    const web3Modal = new Web3Modal({
                      cacheProvider: false,
                      providerOptions,
                      themeVariables: {
                        '--w3m-color-mix': '#00BB7F',
                        '--w3m-color-mix-strength': 40
                      }
                    });
              
                    const web3modalInstance = await web3Modal.connect();
                    const web3modalProvider = new ethers.providers.Web3Provider(
                      web3modalInstance
                    );
                    let provider;
                    if (window.safepalProvider) {
                      provider = new ethers.providers.Web3Provider(getProvider()); // SafePal provider
                    } else {
                      // Fallback to Web3Modal provider
                      provider = new ethers.providers.Web3Provider(web3modalInstance);
                    }
                    const signer = web3modalProvider.getSigner();
                    console.log(signer);
                               // Update state with wallet details
                               const address = await signer.getAddress();
        
              setSigner(signer);
              setAccount(address);
                    return true;
                  } catch (error) {
                    console.log("Error connecting wallet:", error);
        
                  }
            };
            const disconnectWallet = async () => {
              try {
                const web3Modal = new Web3Modal({
                  cacheProvider: false,
                  providerOptions,
                });
            
                // Clear cache
                web3Modal.clearCachedProvider();
            
                // If the provider has a disconnect method, call it
                if (window.ethereum?.disconnect) {
                  await window.ethereum.disconnect();
                }
            
                // Reset state
                setAccount(null);
                setSigner(null);
            
                console.log("Wallet disconnected");
              } catch (error) {
                console.log("Error disconnecting wallet:", error);
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
    className="object-contain max-h-12 scale-125" // scale logo but restrict max height
  />
</Link>

        </div>

        {/* Wallet Button - Responsive */}
        <div className="flex items-center justify-center mt-3 lg:mt-0 lg:ml-auto lg:mr-6">
          {account ? (
    <button onClick={disconnectWallet} className="btn bg-red-500 text-white">
      Disconnect: {account.slice(0, 3)}...{account.slice(-2)}
    </button>
  ) : (
    <button onClick={connectWallet} className="btn bg-[#6F9D7E] border border-[#FFE990] text-[#FFE990]">
      Connect Wallet
    </button>
  )}
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
