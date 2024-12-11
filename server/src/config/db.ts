import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		if (!process.env.MONGODB_URI) {
			throw new Error("MONGODB_URI is not defined in environment variables");
		}

		const connection = await mongoose.connect(process.env.MONGODB_URI);
		console.log("MongoDB Connected");
		return connection;
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	}
};
