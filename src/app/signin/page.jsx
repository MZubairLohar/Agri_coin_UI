// "use client";

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Leaf } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const Signup = () => {

// const router = useRouter();
//   function Route () {
//     router.push("../farmerdashboard")
//   }

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
//       <Card className="w-full max-w-md mx-4 bg-white">
//         <CardHeader className="space-y-1 flex flex-col text-black items-center">
//           <div className="flex items-center gap-2">
//             <Leaf className="h-8 w-8 text-green-600" />
//             <span className="text-2xl font-bold">AgriCoin</span>
//           </div>
//           <CardTitle className="text-2xl mt-2 font-medium">Welcome back</CardTitle>
//           <CardDescription className="text-gray-500">Enter your credentials to access your account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4 text-black">
//             <div className="space-y-2">
//              <h1>Email</h1>
//              <input type="text" placeholder="Enter your email" className="input input-success bg-white w-full" />
//             </div>
//             <div className="space-y-2">
//               <h1>Password</h1>
//               <div className="relative">
//               <input type="password" placeholder="Enter your password" className="input input-success bg-white w-full" />
//                 <button onClick={Route} className="btn btn-success bg-[#16A34A] text-white btn-block mt-4">Sign in</button>
//               </div>
//             </div>
//         </div>

//           <div className="mt-4 text-center text-black text-sm">
//             Don't have an account?{" "}
//             <Link href="/signup" className="text-green-600 hover:underline">
//               Sign up
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Signup;
"use client";
import { Eye, EyeOff } from "lucide-react"; // Add this import
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Leaf, Loader2 } from "lucide-react";

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ New state

  // Login function (unchanged)
  async function handleLogin() {
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
      <Card className="w-full max-w-sm mx-4 bg-white shadow-lg rounded-2xl">
        <CardHeader className="space-y-1 flex flex-col text-black items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold">AgriCoin</span>
          </div>
          <CardTitle className="text-xl mt-2 font-semibold">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-500">
            Sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-black">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-success bg-white w-full border rounded-lg p-2"
              />
            </div>

            {/* Password Input with Show/Hide */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-success bg-white w-full border rounded-lg p-2 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="btn btn-success bg-[#16A34A] text-white w-full mt-2 flex items-center justify-center gap-2 rounded-lg p-2"
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          <div className="mt-4 text-center text-black text-sm">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-green-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;
