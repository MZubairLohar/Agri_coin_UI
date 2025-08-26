// utils/auth.js
import { jwtDecode } from "jwt-decode";

export function getDecodedAuthToken() {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return null;
    console.log("token", token);

    const decoded = jwtDecode(token);
    console.log("decoded token", decoded);
    return decoded; // this will contain the payload (user data)
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return null;
  }
}
