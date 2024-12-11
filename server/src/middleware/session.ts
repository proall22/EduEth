import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
	throw new Error("MONGODB_URI is not defined in environment variables");
}

export const sessionMiddleware = session({
	secret: process.env.SESSION_SECRET || "fallback_secret",
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({
		mongoUrl: process.env.MONGODB_URI,
		collectionName: "sessions",
		ttl: 14 * 24 * 60 * 60, // 14 days
		autoRemove: "native",
	}),
	cookie: {
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
	},
});
