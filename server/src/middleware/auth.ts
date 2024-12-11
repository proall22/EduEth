import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import crypto from "crypto";

export const checkVerificationStatus = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const browserToken = req.headers["x-browser-token"];
		const user = await User.findOne({ browserToken });

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		(req as any).user = user;
		next();
	} catch (error) {
		res.status(500).json({ success: false, message: "Server error" });
	}
};

export const configureSocialAuth = () => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID!,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
				callbackURL: "/auth/google/callback",
			},
			handleSocialAuthCallback
		)
	);

	passport.use(
		new GithubStrategy(
			{
				clientID: process.env.GITHUB_CLIENT_ID!,
				clientSecret: process.env.GITHUB_CLIENT_SECRET!,
				callbackURL: "/auth/github/callback",
			},
			handleSocialAuthCallback
		)
	);

	passport.use(
		new MicrosoftStrategy(
			{
				clientID: process.env.MICROSOFT_CLIENT_ID!,
				clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
				callbackURL: "/auth/microsoft/callback",
			},
			handleSocialAuthCallback
		)
	);
};

const handleSocialAuthCallback = async (
	accessToken: string,
	refreshToken: string,
	profile: any,
	done: any
) => {
	try {
		let user = await User.findOne({
			socialId: profile.id,
			socialProvider: profile.provider,
		});

		if (!user) {
			user = await User.create({
				fullName: profile.displayName,
				email: profile.emails[0].value,
				socialId: profile.id,
				socialProvider: profile.provider,
				isEmailVerified: true,
				password: crypto.randomBytes(32).toString("hex"),
			});
		}

		return done(null, user);
	} catch (error) {
		return done(error, null);
	}
};
