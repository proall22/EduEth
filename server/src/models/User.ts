import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
	fullName: string;
	email: string;
	password: string;
	phoneNumber: string;
	isEmailVerified: boolean;
	emailVerificationToken?: string;
	browserToken?: string;
	verificationExpires: Date;
	profilePicture?: string;
	role: "student" | "instructor" | "admin";
	socialProvider?: "google" | "github" | "microsoft";
	socialId?: string;
}

const userSchema: Schema = new Schema({
	fullName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	phoneNumber: { type: String },
	isEmailVerified: { type: Boolean, default: false },
	emailVerificationToken: { type: String },
	browserToken: String,
	verificationExpires: {
		type: Date,
		default: () => new Date(+new Date() + 3 * 24 * 60 * 60 * 1000),
	},
	profilePicture: String,
	role: {
		type: String,
		enum: ["student", "instructor", "admin"],
		default: "student",
	},
	socialProvider: {
		type: String,
		enum: ["google", "github", "microsoft"],
	},
	socialId: String,
	createdAt: { type: Date, default: Date.now },
});

// Password hashing middleware
userSchema.pre<IUser>("save", async function (next) {
	if (this.isModified("password") && this.password) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

// Clean up unverified users after expiration
userSchema.index({ verificationExpires: 1 }, { expireAfterSeconds: 0 });

const User = mongoose.model<IUser>("User", userSchema);
export default User;
