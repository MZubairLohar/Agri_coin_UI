"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {

const router = useRouter();
  function Route () {
    router.push("../farmerdashboard")
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
      <Card className="w-full max-w-md mx-4 bg-white">
        <CardHeader className="space-y-1 flex flex-col text-black items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold">AgriCoin</span>
          </div>
          <CardTitle className="text-2xl mt-2 font-medium">Welcome back</CardTitle>
          <CardDescription className="text-gray-500">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-black">
            <div className="space-y-2">
             <h1>Email</h1>
             <input type="text" placeholder="Enter your email" className="input input-success bg-white w-full" />
            </div>
            <div className="space-y-2">
              <h1>Password</h1>
              <div className="relative">
              <input type="password" placeholder="Enter your password" className="input input-success bg-white w-full" />
                <button onClick={Route} className="btn btn-success bg-[#16A34A] text-white btn-block mt-4">Sign in</button>
              </div>
            </div>
        </div>

          <div className="mt-4 text-center text-black text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-green-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;