"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Signin from "../auth/SignIn";

const Signup = () => {
  const router = useRouter();
  const route = () => {
    router.push("../../signin");
  }
  return (
    // <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
    //   <Card className="w-full max-w-md mx-4 bg-white">
    //     <CardHeader className="space-y-1 flex flex-col text-black items-center">
    //       <div className="flex items-center gap-2">
    //         <Leaf className="h-8 w-8 text-green-600" />
    //         <span className="text-2xl font-bold">AgriCoin</span>
    //       </div>
    //       <CardTitle className="text-2xl mt-2 font-medium">Create an account</CardTitle>
    //       <CardDescription className="text-gray-500">Enter your details to get started</CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <form className="space-y-4 text-black">
    //         <div className="space-y-2">
    //          <h1>Full Name</h1>
    //          <input type="text" placeholder="Enter your full name" className="input input-success bg-white w-full" />
    //         </div>
    //         <div className="space-y-2">
    //           <h1>Email</h1>
    //           <input type="text" placeholder="Enter your email" className="input input-success bg-white w-full" />
    //         </div>
    //         <div className="space-y-2">
    //           <h1>Password</h1>
    //           <div className="relative">
    //           <input type="password" placeholder="Create a password" className="input input-success bg-white w-full" />
    //             <button onClick={route} className="btn btn-success bg-[#16A34A] text-white btn-block mt-4">Create Acoount</button>
    //           </div>
    //         </div>

    //       </form>
    //       <div className="mt-4 text-center text-black text-sm">
    //         Already have an account?{" "}
    //         <Link href="/signin" className="text-green-600 hover:underline">
    //           Sign in
    //         </Link>
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
    <Signin />
  );
};

export default Signup;