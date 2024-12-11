import express from "express";
import {
	signup,
	checkEmail,
	checkPhone,
	handleSocialAuth,
} from "../controllers/authController";
import passport from "passport";

const router = express.Router();
router.post("/signup", signup);
router.post("/check-email", checkEmail);
router.post("/check-phone", checkPhone);

router.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/auth/github", passport.authenticate("github"));
router.get("/auth/microsoft", passport.authenticate("microsoft"));

// Add callback routes for each provider
router.get(
	"/auth/google/callback",
	passport.authenticate("google"),
	handleSocialAuth
);
router.get(
	"/auth/github/callback",
	passport.authenticate("github"),
	handleSocialAuth
);
router.get(
	"/auth/microsoft/callback",
	passport.authenticate("microsoft"),
	handleSocialAuth
);
export default router;
