import { Request, Response } from "express";
import User from "../models/User";

export const verifyEmail = async (req: Request, res: Response) => {
	try {
		const { token } = req.params;
		const browserToken = req.headers["x-browser-token"];

		const user = await User.findOne({
			emailVerificationToken: token,
			browserToken,
			verificationExpires: { $gt: new Date() },
		});

		if (!user) {
			return res.status(400).json({
				success: false,
				message: !browserToken
					? "Please use the same browser where you registered"
					: "Invalid or expired verification link",
			});
		}

		user.isEmailVerified = true;
		user.emailVerificationToken = undefined;
		await user.save();

		res.json({
			success: true,
			message: "Email verified successfully",
			redirect: "/verify-phone",
		});
	} catch (error) {
		res.status(500).json({ success: false, message: "Verification failed" });
	}
};

export const verifyPhone = async (req: Request, res: Response) => {
	try {
		const { otp } = req.body;
		const user = await User.findOne({
			phoneOTP: otp,
			otpExpiry: { $gt: new Date() },
		});

		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "Invalid or expired OTP" });
		}

		user.isPhoneVerified = true;
		user.phoneOTP = undefined;
		user.otpExpiry = undefined;
		await user.save();

		res.json({
			success: true,
			message: "Phone verified successfully",
			redirect: "/login",
		});
	} catch (error) {
		res.status(500).json({ success: false, message: "Verification failed" });
	}
};

export const changePhone = async (req: Request, res: Response) => {
	try {
		const { phoneNumber } = req.body;
		const user = (req as any).user;

		const phoneUsage = await User.countDocuments({ phoneNumber });
		if (phoneUsage >= 3) {
			return res.status(400).json({
				success: false,
				message: "This phone number has been used too many times",
			});
		}

		const newOTP = Math.floor(100000 + Math.random() * 900000).toString();

		user.phoneNumber = phoneNumber;
		user.phoneOTP = newOTP;
		user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
		await user.save();

		await sendOTP(phoneNumber, newOTP);

		res.json({
			success: true,
			message: "OTP sent to new number",
		});
	} catch (error) {
		res
			.status(500)
			.json({ success: false, message: "Failed to change phone number" });
	}
};

// Add this new function alongside existing ones
export const resendOTP = async (req: Request, res: Response) => {
	try {
		const user = (req as any).user;

		// Generate new OTP
		const newOTP = Math.floor(100000 + Math.random() * 900000).toString();

		// Update user with new OTP
		user.phoneOTP = newOTP;
		user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
		await user.save();

		// Send new OTP
		await sendOTP(user.phoneNumber, newOTP);

		res.json({
			success: true,
			message: "New OTP sent successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to resend OTP",
		});
	}
};
