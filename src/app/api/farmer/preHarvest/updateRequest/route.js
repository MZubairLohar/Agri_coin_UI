// app/api/farmer/preHarvest/route.js
import connectDB from "@/lib/db";
import PreHarvestModel from "@/models/preHarvest.model";
import { NextResponse } from "next/server";

// ✅ Update Status API
export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { recordId, status } = body;

    if (!recordId || !status) {
      return NextResponse.json(
        { error: "recordId and status are required" },
        { status: 400 }
      );
    }

    // Update record by ID
    const updatedRecord = await PreHarvestModel.findByIdAndUpdate(
      recordId,
      { status },
      { new: true } // return updated doc
    );

    if (!updatedRecord) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Status updated successfully", data: updatedRecord },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error updating status:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}
