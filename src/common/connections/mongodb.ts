import mongoose from "mongoose";

export class MongoDB {
  public async connect() {
    try {
      mongoose.set("strictQuery", true);
      await mongoose.connect(`${process.env.MONGODB_CONNECT as string}`);
      console.log("🔗 Connect MONGOOSE database success ".green.bgBlack);
    } catch (err) {
      console.error("❌ Connect database fail, error".red, err);
    }
  }
}
