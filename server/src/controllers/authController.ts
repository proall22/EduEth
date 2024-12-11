import { Request, Response } from "express";
import User from "../models/User";
import { sendVerificationEmail } from "../utils/email";
import crypto from "crypto";

export const signup = async (req: Request, res: Response) => {
	try {
		const { fullName, email, password, phoneNumber } = req.body;
		const browserToken = req.headers["x-browser-token"] as string;

		// Generate verification tokens
		const phoneCount = await User.countDocuments({ phoneNumber });
		if (phoneCount >= 3) {
			return res.status(400).json({
				success: false,
				message:
					"This phone number has been used too many times. Please use a different number.",
			});
		}

		// Generate email verification token
		const emailToken = crypto.randomBytes(32).toString("hex");

		const user = new User({
			fullName,
			email,
			password,
			phoneNumber,
			browserToken,
			emailVerificationToken: emailToken,
			verificationExpires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
		});

		await user.save();

		try {
			await sendVerificationEmail(email, emailToken);
		} catch (emailError) {
			console.error("Email error:", emailError);
			await User.findByIdAndDelete(user._id);
			throw new Error("Failed to send verification email. Please try again.");
		}

		res.status(201).json({
			success: true,
			message:
				"Registration successful! Please check your email for verification.",
		});
	} catch (error) {
		console.error("Signup Error:", error);
		res.status(500).json({
			success: false,
			message: "Registration failed. Please try again.",
		});
	}
};
export const checkEmail = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const exists = await User.exists({ email });
		res.json({ exists: !!exists });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

export const checkPhone = async (req: Request, res: Response) => {
	try {
		const { phoneNumber } = req.body;
		const count = await User.countDocuments({ phoneNumber });
		res.json({ used: count > 0, count });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

export const handleSocialAuth = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.redirect("/login?error=auth_failed");
		}

		// Generate JWT token or handle session
		const token = generateToken(req.user);

		// Redirect to frontend with token
		res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
	} catch (error) {
		console.error("Social auth error:", error);
		res.redirect("/login?error=server_error");
	}
};
