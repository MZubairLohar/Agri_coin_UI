import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      //   "mongodb+srv://abdulazizbukhari11:PB9QjdLqJ9z2AYRP@cluster0.f4wr68i.mongodb.net/"
      "mongodb+srv://EmadKhan:Seemal123@khantodo.6wnfk31.mongodb.net/"
    );
    console.log(
      `mongoDB connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("mongooDB connection error..");
    process.exit(1);
  }
};
export default connectDB;
