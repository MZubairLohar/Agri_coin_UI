import connectDB from "@/lib/db";
import NFTBuyModel from "@/models/buyNFT.model"; // Assuming the model is defined in the same file
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { userId, tokenId, status, from, amount, type, paymentType, hash } =
      body;
    console.log(
      "BuyNFTData",
      userId,
      tokenId,
      status,
      from,
      amount,
      type,
      paymentType,
      hash
    );
    const buyData = await NFTBuyModel.create({
      userId,
      tokenId,
      status,
      from,
      amount,
      type,
      paymentType,
      hash: hash || "no hash For Stripe",
    });
    return new Response(
      JSON.stringify({
        message: "NFT bought request sent",
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
    console.log("userId", userId);
    let buyNFTData;

    if (userId) {
      buyNFTData = await NFTBuyModel.findOne({ userId });
    } else {
      // Return all records (admin use-case)
      buyNFTData = await NFTBuyModel.find({});
    }

    return NextResponse.json({ data: buyNFTData }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching payment details:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment details" },
      { status: 500 }
    );
  }
}
