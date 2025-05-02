"use client";

import Image from "next/image";

import { useState } from "react";

export default function Signin() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#6f9d7e] to-[#FFE990] px-4 relative">
    <div className="absolute -ml-8 sm:-ml-0 top-11/12 sm:top-11/12 md:top-5/6 xl:top-80 left-10 w-24 opacity-60 sm:w-28 md:w-28 xl:w-40 z-50 animate-spin-half">
        <Image
          src="/corn-anim-pic.png"
          alt="Spinning Corn"
          width={160}
          height={160}
          className="w-full h-auto"
        />
      </div>

        <div className="relative w-full max-w-4xl h-[550px]  rounded-2xl overflow-hidden shadow-2xl bg-transparent">
          <div
            className={`absolute top-0 left-0 w-[100%] h-full flex transition-transform duration-700 ease-in-out 
            ${isSignIn ? "translate-x-0" : "translate-x-1/2"}`}
          >
            {/* Sign In Form */}
            {isSignIn ? (
              <div className="w-1/2 h-full flex flex-col justify-center items-center p-10 bg-[#FFE990]">
                <h2 className="text-2xl font-bold text-[#6f9d7e] mb-6">
                  Sign In
                </h2>
                <form className="w-full max-w-sm space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 p-2 rounded bg-white"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 p-2 rounded bg-white"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#6f9d7e] text-white p-2 rounded hover:bg-[#5c896e]"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            ) : (
              // Sign Up Form
              <div className="w-1/2 h-full flex flex-col justify-center items-center p-10 bg-[#FFE990]">
                <h2 className="text-2xl font-bold text-[#6f9d7e] mb-6">
                  Sign Up
                </h2>
                <form className="w-full max-w-sm space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border border-gray-300 p-2 rounded bg-white"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 p-2 rounded bg-white"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 p-2 rounded bg-white"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#6f9d7e] text-white p-2 rounded hover:bg-[#5c896e]"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Green Sliding Panel */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-[#6f9d7e] text-white flex flex-col justify-center items-center p-10 transition-transform duration-700 ease-in-out z-20 ${
              isSignIn ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <Image
              src={"/agri-logo.png"}
              width={96}
              className="z-50 w-56 h-56 -mt-24"
              height={96}
              alt={"logo"}
            />
            <h2 className="text-3xl font-bold mb-4">
              {isSignIn ? "Hello, Friend!" : "Welcome Back!"}
            </h2>
            <p className="mb-6 text-center px-4">
              {isSignIn
                ? "Enter your details and start your journey with us."
                : "Already have an account? Sign in to stay connected."}
            </p>
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="px-6 py-2 bg-[#FFE990] text-[#6f9d7e] rounded font-semibold"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
        <div className="absolute top-14 sm:top-16 md:top-14 sm:right-1/12 w-20 sm:w-24 md:w-28 lg:w-40 opacity-60 z-0 animate-spin-half">
          <Image
            src="/corn-anim-pic.png"
            alt="Corn Animated"
            width={160}
            height={160}
            className="w-full h-auto"
          />
        </div>
    
      </div>
    </>
  );
}
