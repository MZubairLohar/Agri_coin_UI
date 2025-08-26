"use client";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useEffect, useState } from "react";

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

function Navbar() {
  const router = useRouter();
  function Route() {
    router.push("../signup");
  }
  const ButtonWrapper = () => {
    return (
      <div className="bg-slate-100 flex items-center justify-center">
        <NeumorphismButton />
      </div>
    );
  };

  const NeumorphismButton = () => {
    return (
      <button
        className={`
            px-8 py-2 rounded-full 
            flex items-center gap-2 
            text-[#FFE990]
            bg-[#6F9D7E]
            transition-all

            hover:shadow-[-1px_-1px_5px_rgba(255,_255,_0,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_0,_0.8),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
            hover:text-[#FFE990]
          `}
      >
        <span>Donate</span>
      </button>
    );
  };
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);

  // const connectWallet = async () => {
  //   console.log("connectting");
  //       try {
  //         const web3Modal = new Web3Modal({
  //           cacheProvider: false,
  //           providerOptions,
  //           themeVariables: {
  //             '--w3m-color-mix': '#00BB7F',
  //             '--w3m-color-mix-strength': 40
  //           }
  //         });

  //         const web3modalInstance = await web3Modal.connect();
  //         const web3modalProvider = new ethers.providers.Web3Provider(
  //           web3modalInstance
  //         );
  //         let provider;
  //         if (window.safepalProvider) {
  //           provider = new ethers.providers.Web3Provider(getProvider()); // SafePal provider
  //         } else {
  //           // Fallback to Web3Modal provider
  //           provider = new ethers.providers.Web3Provider(web3modalInstance);
  //         }
  //         const signer = web3modalProvider.getSigner();
  //         console.log(signer);
  //                    // Update state with wallet details
  //                    const address = await signer.getAddress();

  //   setSigner(signer);
  //   setAccount(address);
  //         return true;
  //       } catch (error) {
  //         console.log("Error connecting wallet:", error);

  //       }
  // };
  // const disconnectWallet = async () => {
  //   try {
  //     const web3Modal = new Web3Modal({
  //       cacheProvider: false,
  //       providerOptions,
  //     });

  //     // Clear cache
  //     web3Modal.clearCachedProvider();

  //     // If the provider has a disconnect method, call it
  //     if (window.ethereum?.disconnect) {
  //       await window.ethereum.disconnect();
  //     }

  //     // Reset state
  //     setAccount(null);
  //     setSigner(null);

  //     console.log("Wallet disconnected");
  //   } catch (error) {
  //     console.log("Error disconnecting wallet:", error);
  //   }
  // };

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
                <button
                  // onClick={disconnectWallet}
                  className="btn bg-red-500 text-white"
                >
                  Disconnect: {account.slice(0, 3)}...{account.slice(-2)}
                </button>
              ) : (
                <button
                  // onClick={connectWallet}
                  className="btn bg-[#6F9D7E] border border-[#FFE990] text-[#FFE990]"
                >
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
