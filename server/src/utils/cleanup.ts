import User from "../models/User";

export const cleanupUnverifiedUsers = async () => {
	try {
		await User.deleteMany({
			isVerified: false,
			verificationExpires: { $lt: new Date() },
		});
	} catch (error) {
		console.error("Cleanup failed:", error);
	}
};
