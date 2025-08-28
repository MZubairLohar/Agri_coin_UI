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
// import { useState } from "react";

// const Signup = () => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const router = useRouter();

//   async function handleSubmit() {
//     const formData = { fullName, email, password, role };
//     console.log("formData", formData);
//     try {
//       const res = await fetch("/api/auth/signUp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       console.log("API Response:", data);
//       localStorage.setItem("authToken", data?.token);
//       if (data.user.role === "Admin") {
//         router.push("/admindashboard");
//       } else if (data.user.role === "Farmer") {
//         router.push("/farmerdashboard");
//       } else if (data.user.role === "Investor") {
//         router.push("/investordash");
//       } else {
//         router.push("/"); // default
//       }
//       if (res.ok) {
//         alert("✅ Account Created Successfully!");
//       } else {
//         alert("❌ " + data.error);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
//       <Card className="w-full max-w-sm mx-4 bg-white shadow-lg rounded-2xl border border-gray-100">
//         <CardHeader className="space-y-1 flex flex-col text-black items-center">
//           <div className="flex items-center gap-2">
//             <Leaf className="h-7 w-7 text-green-600" />
//             <span className="text-xl font-bold">AgriCoin</span>
//           </div>
//           <CardTitle className="text-xl mt-2 font-semibold">
//             Create Account
//           </CardTitle>
//           <CardDescription className="text-gray-500 text-sm">
//             Enter your details to get started
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-2 text-black">
//             {/* Full Name */}
//             <div className="space-y-1">
//               <label className="text-sm font-medium">Full Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 className="input input-success bg-white w-full h-12 text-sm"
//               />
//             </div>

//             {/* Email */}
//             <div className="space-y-1">
//               <label className="text-sm font-medium">Email</label>
//               <input
//                 type="text"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="input input-success bg-white w-full h-12 text-sm"
//               />
//             </div>

//             {/* Password */}
//             <div className="space-y-1">
//               <label className="text-sm font-medium">Password</label>
//               <input
//                 type="password"
//                 placeholder="Create a password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="input input-success bg-white w-full h-12 text-sm"
//               />
//             </div>

//             {/* Role Dropdown */}
//             <div className="space-y-1">
//               <label className="text-sm font-medium">Select Role</label>
//               <select
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 className="select select-success bg-white w-full h-12 text-sm"
//               >
//                 <option disabled value="">
//                   Select Role
//                 </option>
//                 {/* <option value="Admin">Admin</option> */}
//                 <option value="Farmer">Farmer</option>
//                 <option value="Investor">Investor</option>
//               </select>
//             </div>

//             {/* Submit Button */}
//             <button
//               onClick={handleSubmit}
//               className="btn btn-success bg-[#16A34A] text-white w-full h-12 rounded-lg text-sm mt-2 shadow-md hover:shadow-lg"
//             >
//               Create Account
//             </button>
//           </div>

//           {/* Signin Link */}
//           <div className="mt-4 text-center text-black text-xs">
//             Already have an account?{" "}
//             <Link href="/signin" className="text-green-600 hover:underline">
//               Sign in
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
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
import { Leaf, Eye, EyeOff, User, Mail, Lock, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-amber-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-500 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-amber-300 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-emerald-400 rounded-full"></div>
        <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-lime-300 rounded-full"></div>
      </div>
      
      <div className="absolute top-5 left-5 flex items-center gap-2">
        <Leaf className="h-8 w-8 text-green-600" />
        <span className="text-2xl font-bold text-green-800">AgriConnect</span>
      </div>

      <Card className="w-full max-w-md mx-4 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border border-green-100 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 w-full"></div>
        
        <CardHeader className="space-y-1 flex flex-col items-center pt-6 pb-2">
          <div className="p-3 bg-green-100 rounded-full mb-2">
            <Leaf className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-gray-600 text-center">
            Join our agricultural community and grow with us
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <User className="h-4 w-4 mr-1" />
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-gray-700 px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                  required
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-gray-700 px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Lock className="h-4 w-4 mr-1" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-gray-700 px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Select Your Role
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full text-gray-700 px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 appearance-none outline-none bg-white"
                  required
                >
                  <option disabled value="">Select your role</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Investor">Investor</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-2"
            >
              Create Account
            </button>
          </form>

          {/* Signin Link */}
          <div className="mt-6 text-center text-sm text-gray-600 pb-4">
            Already part of our community?{" "}
            <Link 
              href="/signin" 
              className="text-green-600 font-medium hover:text-green-700 hover:underline transition-colors duration-200"
            >
              Sign in here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;