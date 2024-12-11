import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, token: string) => {
	try {
		// Create transporter using regular Gmail authentication
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;

		await transporter.sendMail({
			from: `"Your App" <${process.env.EMAIL_USER}>`,
			to: email,
			subject: "Verify Your Email",
			html: `
				<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
					<h1>Verify Your Email</h1>
					<p>Click the button below to verify your email address:</p>
					<a href="${verificationLink}" 
					   style="background: #4F46E5; color: white; padding: 12px 30px; 
							  text-decoration: none; border-radius: 5px; display: inline-block;">
						Verify Email
					</a>
					<p>This link will expire in 3 days and must be used in the same browser.</p>
				</div>
			`,
		});
	} catch (error) {
		console.error("Email sending failed:", error);
		throw error;
	}
};
