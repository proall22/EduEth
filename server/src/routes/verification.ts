import express from "express";
import {
	verifyEmail,
	verifyPhone,
	changePhone,
	resendOTP,
} from "../controllers/verificationController";
import { checkVerificationStatus } from "../middleware/auth";

const router = express.Router();

router.post("/verify/email/:token", verifyEmail);
router.post("/verify/phone", checkVerificationStatus, verifyPhone);
router.post("/verify/change-phone", checkVerificationStatus, changePhone);
router.post("/verify/resend-otp", checkVerificationStatus, resendOTP);

export default router;
