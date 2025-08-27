import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"], // you can adjust as per logic
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["preHarvest", "postHarvest"], // adjust as per use-case
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["usd", "Agri", "stripe"], // adjust as per your app
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

const NFTBuyModel =
  mongoose.models.NFTBuy || mongoose.model("NFTBuy", transactionSchema);
export default NFTBuyModel;
