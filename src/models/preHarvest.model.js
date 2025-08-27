import mongoose from "mongoose";

const LoanApplicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
    tokenId: {
      type: String,
      default: "",
    },
    fullName: String,
    ssn: String,
    dob: String,
    phone: String,
    email: String,
    residentialAddress: String,
    mailingAddress: String,
    citizenshipStatus: String,
    businessName: String,
    entityType: String,
    ein: String,
    usdaFarmNumber: String,
    farmLocation: String,
    yearsInOperation: String,
    annualIncome: String,
    previousLoans: String,
    landStatus: String,
    landSize: String,
    crops: [String],
    areaPerCrop: String,
    irrigationType: String,
    equipmentOwned: String,
    soilType: String,
    practices: String,
    loanAmount: String,
    loanPurpose: String,
    loanTerm: String,
    loanType: String,
    disbursementDate: String,
    expectedYield: String,
    repaymentSource: String,
    cropInsurance: String,
    bankName: String,
    accountNumber: String,
    routingNumber: String,
    creditScore: String,
    agree: Boolean,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// export default mongoose.models.LoanApplication ||
//   mongoose.model("LoanApplication", LoanApplicationSchema);
const PreHarvestModel =
  mongoose.models.preHarvest ||
  mongoose.model("preHarvest", LoanApplicationSchema);
export default PreHarvestModel;
