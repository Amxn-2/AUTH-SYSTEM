import mongoose from "mongoose";

export const connectDB = async () => {
      try {
            console.log("mongo_uri", process.env.MONGO_URI);
            const conn = await mongoose.connect(process.env.MONGO_URI)
            console.log(conn);
            console.log(`MongoDB Connected: ${conn.connection.host}`);
      } catch (error) {
            console.log("Error to connect,", error.message)
            process.exit(1)
      }
}