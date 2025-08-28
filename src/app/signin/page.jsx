// "use client";
// import { Eye, EyeOff } from "lucide-react"; // Add this import
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import Link from "next/link";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
// import { Leaf, Loader2 } from "lucide-react";

// const Signin = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // ✅ New state

//   // Login function (unchanged)
//   async function handleLogin() {
//     setLoading(true);
//     setError("");
//     console.log("Logging in with:", { email, password });
//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       console.log("loginData", data);
//       if (!res.ok) {
//         setError(data.error || "Login failed");
//         setLoading(false);
//         return;
//       }

//       localStorage.setItem("authToken", data.token);

//       if (data.user.role === "Admin") {
//         router.push("/admindashboard");
//       } else if (data.user.role === "Farmer") {
//         router.push("/farmerdashboard");
//       } else if (data.user.role === "Investor") {
//         router.push("/investordash");
//       } else {
//         router.push("/");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong. Try again!");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
//       <Card className="w-full max-w-sm mx-4 bg-white shadow-lg rounded-2xl">
//         <CardHeader className="space-y-1 flex flex-col text-black items-center">
//           <div className="flex items-center gap-2">
//             <Leaf className="h-8 w-8 text-green-600" />
//             <span className="text-2xl font-bold">AgriCoin</span>
//           </div>
//           <CardTitle className="text-xl mt-2 font-semibold">
//             Welcome Back
//           </CardTitle>
//           <CardDescription className="text-gray-500">
//             Sign in to continue
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4 text-black">
//             {/* Email Input */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Email</label>
//               <input
//                 type="text"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="input input-success bg-white w-full border rounded-lg p-2"
//               />
//             </div>

//             {/* Password Input with Show/Hide */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="input input-success bg-white w-full border rounded-lg p-2 pr-10"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {error && <p className="text-red-500 text-sm">{error}</p>}

//             <button
//               onClick={handleLogin}
//               disabled={loading}
//               className="btn btn-success bg-[#16A34A] text-white w-full mt-2 flex items-center justify-center gap-2 rounded-lg p-2"
//             >
//               {loading ? (
//                 <Loader2 className="animate-spin h-4 w-4" />
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </div>

//           <div className="mt-4 text-center text-black text-sm">
//             Don’t have an account?{" "}
//             <Link href="/signup" className="text-green-600 hover:underline">
//               Sign up
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Signin;










"use client";
import { Eye, EyeOff, Loader2, User, Mail, Lock, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("Logging in with:", { email, password });
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("loginData", data);
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("authToken", data.token);

      if (data.user.role === "Admin") {
        router.push("/admindashboard");
      } else if (data.user.role === "Farmer") {
        router.push("/farmerdashboard");
      } else if (data.user.role === "Investor") {
        router.push("/investordash");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-amber-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 right-10 w-20 h-20 bg-green-500 rounded-full"></div>
        <div className="absolute top-40 left-20 w-24 h-24 bg-amber-300 rounded-full"></div>
        <div className="absolute bottom-20 right-1/4 w-16 h-16 bg-emerald-400 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-lime-300 rounded-full"></div>
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
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-600 text-center">
            Sign in to access your agricultural dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-4">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
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
                  className="w-full px-4 text-gray-700 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            {/* Password Input with Show/Hide */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Lock className="h-4 w-4 mr-1" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-gray-700 px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 pb-4">
            Don't have an account?{" "}
            <Link 
              href="/signup" 
              className="text-green-600 font-medium hover:text-green-700 hover:underline transition-colors duration-200"
            >
              Sign up here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;