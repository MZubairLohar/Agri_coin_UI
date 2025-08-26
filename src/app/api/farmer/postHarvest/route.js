import connectDB from "@/lib/db";
import PostHarvestModel from "@/models/postHarvest.model"; // Assuming the model is defined in the same file
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const {
      userId,
      fullName,
      usdaFarmNumber,
      farmLocation,
      totalAcres,
      primaryCommodity,

      // Section 2: Harvest Details
      harvestDate,
      totalYield,
      yieldUnit, // default
      currentStorageMethod,

      // Section 3: Post-Harvest Needs
      investmentType, // multi-select
      coldStorageRequired,
      coldStorageCapacity,
      processingType,
      packagingNeeds,
      transportationDistance,
      marketingChannels,

      // Section 4: Financial Requirements
      totalInvestmentRequired,
      fundingSources,
      existingFacilities,
      expectedROI,

      // Section 5: Business Plan
      targetMarkets,
      valueAddedProducts,
      sustainabilityPractices,

      // Section 6: Supporting Documents
      hasBusinessPlan,
      hasFeasibilityStudy,
      agreeTerms,
    } = body;
    console.log(
      "PostHarvestData",
      userId,
      fullName,
      usdaFarmNumber,
      farmLocation,
      totalAcres,
      primaryCommodity,

      // Section 2: Harvest Details
      harvestDate,
      totalYield,
      yieldUnit, // default
      currentStorageMethod,

      // Section 3: Post-Harvest Needs
      investmentType, // multi-select
      coldStorageRequired,
      coldStorageCapacity,
      processingType,
      packagingNeeds,
      transportationDistance,
      marketingChannels,

      // Section 4: Financial Requirements
      totalInvestmentRequired,
      fundingSources,
      existingFacilities,
      expectedROI,

      // Section 5: Business Plan
      targetMarkets,
      valueAddedProducts,
      sustainabilityPractices,

      // Section 6: Supporting Documents
      hasBusinessPlan,
      hasFeasibilityStudy,
      agreeTerms
    );
    const postHarvestData = PostHarvestModel.create({
      userId,
      fullName,
      usdaFarmNumber,
      farmLocation,
      totalAcres,
      primaryCommodity,
      // Section 2: Harvest Details
      harvestDate,
      totalYield,
      yieldUnit, // default
      currentStorageMethod,
      // Section 3: Post-Harvest Needs
      investmentType, // multi-select
      coldStorageRequired,
      coldStorageCapacity,
      processingType,
      packagingNeeds,
      transportationDistance,
      marketingChannels,

      // Section 4: Financial Requirements
      totalInvestmentRequired,
      fundingSources,
      existingFacilities,
      expectedROI,

      // Section 5: Business Plan
      targetMarkets,
      valueAddedProducts,
      sustainabilityPractices,

      // Section 6: Supporting Documents
      hasBusinessPlan,
      hasFeasibilityStudy,
      agreeTerms,
      status: "pending",
    });
    return new Response(
      JSON.stringify({
        message: "PostHarvest Data sent",
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

    let postHarvestData;

    if (userId) {
      postHarvestData = await PostHarvestModel.find({ userId });
    } else {
      // Return all records (admin use-case)
      postHarvestData = await PostHarvestModel.find({});
    }

    return NextResponse.json({ data: postHarvestData }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching payment details:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment details" },
      { status: 500 }
    );
  }
}
