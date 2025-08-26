import connectDB from "@/lib/db";
import PreHarvestModel from "@/models/preHarvest.model"; // Assuming the model is defined in the same file
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const {
      userId,
      fullName,
      ssn,
      dob,
      phone,
      email,
      residentialAddress,
      mailingAddress,
      citizenshipStatus,
      businessName,
      entityType,
      ein,
      usdaFarmNumber,
      farmLocation,
      yearsInOperation,
      annualIncome,
      previousLoans,
      landStatus,
      landSize,
      crops,
      areaPerCrop,
      irrigationType,
      equipmentOwned,
      soilType,
      practices,
      loanAmount,
      loanPurpose,
      loanTerm,
      loanType,
      disbursementDate,
      expectedYield,
      repaymentSource,
      cropInsurance,
      bankName,
      accountNumber,
      routingNumber,
      creditScore,
      agree,
    } = body;
    console.log(
      "PreHarvestData",
      userId,
      fullName,
      ssn,
      dob,
      phone,
      email,
      residentialAddress,
      mailingAddress,
      citizenshipStatus,
      businessName,
      entityType,
      ein,
      usdaFarmNumber,
      farmLocation,
      yearsInOperation,
      annualIncome,
      previousLoans,
      landStatus,
      landSize,
      crops,
      areaPerCrop,
      irrigationType,
      equipmentOwned,
      soilType,
      practices,
      loanAmount,
      loanPurpose,
      loanTerm,
      loanType,
      disbursementDate,
      expectedYield,
      repaymentSource,
      cropInsurance,
      bankName,
      accountNumber,
      routingNumber,
      creditScore,
      agree
    );
    const preHarvestData = PreHarvestModel.create({
      userId,
      fullName,
      ssn,
      dob,
      phone,
      email,
      residentialAddress,
      mailingAddress,
      citizenshipStatus,
      businessName,
      entityType,
      ein,
      usdaFarmNumber,
      farmLocation,
      yearsInOperation,
      annualIncome,
      previousLoans,
      landStatus,
      landSize,
      crops,
      areaPerCrop,
      irrigationType,
      equipmentOwned,
      soilType,
      practices,
      loanAmount,
      loanPurpose,
      loanTerm,
      loanType,
      disbursementDate,
      expectedYield,
      repaymentSource,
      cropInsurance,
      bankName,
      accountNumber,
      routingNumber,
      creditScore,
      agree,
      status: "pending",
    });
    return new Response(
      JSON.stringify({
        message: "PreHarvest Data sent",
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

    let preHarvestData;

    if (userId) {
      preHarvestData = await PreHarvestModel.find({ userId });
    } else {
      // Return all records (admin use-case)
      preHarvestData = await PreHarvestModel.find({});
    }

    return NextResponse.json({ data: preHarvestData }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching payment details:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment details" },
      { status: 500 }
    );
  }
}
