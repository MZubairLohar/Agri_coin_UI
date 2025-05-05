"use client";

import { useState } from "react";

export default function SignUp() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE990]">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 shadow-xl rounded-2xl overflow-hidden">
        <div
          className="flex flex-col items-center justify-center p-10 text-white"
          style={{ backgroundColor: "#6f9d7e" }}
        >
          {isSignUp ? (
            <>
              <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
              <p className="mb-6 text-center">Sign in to your account</p>
              <button
                onClick={() => setIsSignUp(false)}
                className="px-6 py-2 bg-white text-[#6f9d7e] rounded font-semibold"
              >
                Don't have an account? Sign Up
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
              <p className="mb-6 text-center">Enter your details and join us</p>
              <button
                onClick={() => setIsSignUp(true)}
                className="px-6 py-2 bg-white text-[#6f9d7e] rounded font-semibold"
              >
                Already have an account? Sign In
              </button>
            </>
          )}
        </div>

        <div className="bg-white p-10">
          {isSignIn ? (
            <>
              <h2 className="text-2xl font-bold text-[#6f9d7e] mb-6">Sign In</h2>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-[#6f9d7e] text-white p-2 rounded hover:bg-[#5c896e]"
                >
                  Sign In
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#6f9d7e] mb-6">Sign Up</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-[#6f9d7e] text-white p-2 rounded hover:bg-[#5c896e]"
                >
                  Sign Up
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
  