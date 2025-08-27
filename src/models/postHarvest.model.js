import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
  {
    // Section 1: Farmer & Farm Details
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
    tokenId: {
      type: String,
      default: "",
    },
    fullName: { type: String, required: true },
    usdaFarmNumber: { type: String },
    farmLocation: { type: String },
    totalAcres: { type: Number },
    primaryCommodity: { type: String },

    // Section 2: Harvest Details
    harvestDate: { type: Date },
    totalYield: { type: Number },
    yieldUnit: { type: String, default: "bushels" },
    currentStorageMethod: { type: String },

    // Section 3: Post-Harvest Needs
    investmentType: [{ type: String }], // multi-select
    coldStorageRequired: { type: Boolean, default: false },
    coldStorageCapacity: { type: String },
    processingType: { type: String },
    packagingNeeds: { type: String },
    transportationDistance: { type: String },
    marketingChannels: [{ type: String }],

    // Section 4: Financial Requirements
    totalInvestmentRequired: { type: Number },
    fundingSources: [{ type: String }],
    existingFacilities: { type: String },
    expectedROI: { type: String },

    // Section 5: Business Plan
    targetMarkets: { type: String },
    valueAddedProducts: { type: String },
    sustainabilityPractices: { type: String },

    // Section 6: Supporting Documents
    hasBusinessPlan: { type: Boolean, default: false },
    hasFeasibilityStudy: { type: Boolean, default: false },
    agreeTerms: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "bought"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// export default mongoose.models.FarmerForm ||
//   mongoose.model("FarmerForm", farmerSchema);
const PostHarvestModel =
  mongoose.models.postHarvest || mongoose.model("postHarvest", farmerSchema);
export default PostHarvestModel;
