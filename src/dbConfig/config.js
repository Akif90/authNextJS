import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database connected");
    });
    connection.on("error", (err) => {
      console.log("Error", err);
      process.exit();
    });
  } catch (error) {
    console.log("Database connection failure");
    console.log(error);
  }
}
