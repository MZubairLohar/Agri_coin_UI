// app/api/signup/route.js
import connectDB from "@/lib/db";
import AuthModel from "@/models/auth.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // .env me rakho

// POST (Create User)
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { fullName, email, password, role } = body;

    if (!fullName || !email || !password || !role) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await AuthModel.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already registered" }),
        { status: 400 }
      );
    }
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = await AuthModel.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    // JWT Generate
    const token = jwt.sign(
      {
        id: newUser._id,
        name: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" } // 7 din valid
    );

    return new Response(
      JSON.stringify({
        message: "User created",
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role,
        },
        token, // token frontend ko bhej rahe
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

export async function GET(request) {
  try {
    await connectDB();

    // Optional: Get userId from query string if needed
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    let UserData;

    if (userId) {
      UserData = await AuthModel.find({ userId });
    } else {
      // Return all records (admin use-case)
      UserData = await AuthModel.find();
    }

    return NextResponse.json({ data: UserData }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching payment details:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment details" },
      { status: 500 }
    );
  }
}
