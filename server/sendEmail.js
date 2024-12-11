import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

async function sendEmail(recipientEmail) {
	try {
		const transport = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD, // Use the app password here
			},
		});

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: recipientEmail,
			subject: "Confirm Your Email",
			text: "Please confirm your email by clicking the link below.",
			html: '<h1>Hello!</h1><p>Please confirm your email by clicking the link below.</p><a href="http://localhost:5173/confirm-email">Confirm Email</a>',
		};

		const result = await transport.sendMail(mailOptions);
		console.log("Email sent:", result);
	} catch (error) {
		console.error("Error sending email:", error);
		throw error; // Re-throw the error to be caught by the caller
	}
}
app.post("/register", (req, res) => {
	const { email } = req.body;
	sendEmail(email)
		.then(() => res.send("Registration email sent"))
		.catch((err) => res.status(500).send("Error sending email: " + err));
});

const port = 3000;
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
