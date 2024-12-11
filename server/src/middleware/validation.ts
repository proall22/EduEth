import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { sendVerificationEmail } from "../utils/email.js";
import { sendOTP } from "../utils/sms.js";
import crypto from "crypto";
import { sanitizeInput } from "../utils/security";

export const validateSignupData = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const sanitizedData = sanitizeInput(req.body);

	// Check for SQL injection patterns
	const sqlInjectionPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION)\b)/i;
	if (sqlInjectionPattern.test(JSON.stringify(sanitizedData))) {
		return res.status(400).json({ error: "Invalid input detected" });
	}

	// Add CSRF token validation
	const csrfToken = req.headers["x-csrf-token"];
	if (!csrfToken || csrfToken !== req.session?.csrfToken) {
		return res.status(403).json({ error: "Invalid CSRF token" });
	}

	// Add expiration date for verification
	sanitizedData.verificationExpires = new Date(
		Date.now() + 3 * 24 * 60 * 60 * 1000
	); // 3 days

	req.body = sanitizedData;
	next();
};

export const signup = async (req: Request, res: Response) => {
	try {
		const { fullName, email, password, phoneNumber } = req.body;

		const emailToken = crypto.randomBytes(32).toString("hex");
		const phoneOTP = Math.floor(100000 + Math.random() * 900000).toString();

		const user = new User({
			fullName,
			email,
			password,
			phoneNumber,
			emailVerificationToken: emailToken,
			phoneOTP,
			otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
		});

		await user.save();
		await sendVerificationEmail(email, emailToken);
		await sendOTP(phoneNumber, phoneOTP);

		res.status(201).json({
			success: true,
			message:
				"Registration successful! Please check your email for verification.",
		});
	} catch (error) {
		res.status(500).json({ success: false, message: "Registration failed" });
	}
};
