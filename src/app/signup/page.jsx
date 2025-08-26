// "use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Leaf } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Signin from "../auth/SignIn";

// const Signup = () => {
//   const router = useRouter();

//   function Route() {
//     router.push("../farmerdashboard");
//   }
//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
//       <Card className="w-full max-w-md mx-4 bg-white">
//         <CardHeader className="space-y-1 flex flex-col text-black items-center">
//           <div className="flex items-center gap-2">
//             <Leaf className="h-8 w-8 text-green-600" />
//             <span className="text-2xl font-bold">AgriCoin</span>
//           </div>
//           <CardTitle className="text-2xl mt-2 font-medium">
//             Create an account
//           </CardTitle>
//           <CardDescription className="text-gray-500">
//             Enter your details to get started
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4 text-black">
//             <div className="space-y-2">
//               <h1>Full Name</h1>
//               <input
//                 type="text"
//                 placeholder="Enter your full name"
//                 className="input input-success bg-white w-full"
//               />
//             </div>
//             <div className="space-y-2">
//               <h1>Email</h1>
//               <input
//                 type="text"
//                 placeholder="Enter your email"
//                 className="input input-success bg-white w-full"
//               />
//             </div>
//             <div className="space-y-2">
//               <h1>Password</h1>
//               <div className="relative">
//                 <input
//                   type="password"
//                   placeholder="Create a password"
//                   className="input input-success bg-white w-full"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="mt-4 text-center text-black text-sm">
//             Already have an account?{" "}
//             <Link href="/signin" className="text-green-600 hover:underline">
//               Sign in
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//     // <Signin />
//   );
// };

// export default Signup;
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    const formData = { fullName, email, password, role };
    console.log("formData", formData);
    try {
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("API Response:", data);
      localStorage.setItem("authToken", data?.token);
      if (data.user.role === "Admin") {
        router.push("/admindashboard");
      } else if (data.user.role === "Farmer") {
        router.push("/farmerdashboard");
      } else if (data.user.role === "Investor") {
        router.push("/investordash");
      } else {
        router.push("/"); // default
      }
      if (res.ok) {
        alert("✅ Account Created Successfully!");
      } else {
        alert("❌ " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
      <Card className="w-full max-w-sm mx-4 bg-white shadow-lg rounded-2xl border border-gray-100">
        <CardHeader className="space-y-1 flex flex-col text-black items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-7 w-7 text-green-600" />
            <span className="text-xl font-bold">AgriCoin</span>
          </div>
          <CardTitle className="text-xl mt-2 font-semibold">
            Create Account
          </CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            Enter your details to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-black">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input input-success bg-white w-full h-12 text-sm"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-success bg-white w-full h-12 text-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-success bg-white w-full h-12 text-sm"
              />
            </div>

            {/* Role Dropdown */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Select Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="select select-success bg-white w-full h-12 text-sm"
              >
                <option disabled value="">
                  Select Role
                </option>
                {/* <option value="Admin">Admin</option> */}
                <option value="Farmer">Farmer</option>
                <option value="Investor">Investor</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="btn btn-success bg-[#16A34A] text-white w-full h-12 rounded-lg text-sm mt-2 shadow-md hover:shadow-lg"
            >
              Create Account
            </button>
          </div>

          {/* Signin Link */}
          <div className="mt-4 text-center text-black text-xs">
            Already have an account?{" "}
            <Link href="/signin" className="text-green-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
