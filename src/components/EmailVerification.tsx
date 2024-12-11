import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function EmailVerification() {
	const { token } = useParams();
	const navigate = useNavigate();
	const [status, setStatus] = useState<"loading" | "success" | "error">(
		"loading"
	);

	useEffect(() => {
		const verifyEmail = async () => {
			try {
				const browserToken = localStorage.getItem("verificationToken");
				if (!browserToken) {
					toast.error("Please use the same browser where you registered");
					setStatus("error");
					return;
				}

				const response = await fetch(
					`http://localhost:5000/api/verify/email/${token}`,
					{
						method: "POST",
						headers: {
							"X-Browser-Token": browserToken,
						},
					}
				);

				const data = await response.json();

				if (response.ok) {
					setStatus("success");
					toast.success("Email verified successfully!");
					// Redirect to login after 2 seconds
					setTimeout(() => {
						navigate("/login", {
							state: {
								message: "Email verified successfully! You can now login.",
							},
						});
					}, 2000);
				} else {
					setStatus("error");
					toast.error(data.message);
				}
			} catch (error) {
				setStatus("error");
				toast.error("Verification failed");
			}
		};

		verifyEmail();
	}, [token, navigate]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center"
			>
				{status === "loading" && (
					<div>
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
						<p className="mt-4 text-lg">Verifying your email...</p>
					</div>
				)}
				{status === "success" && (
					<div className="text-green-600">
						<svg
							className="w-16 h-16 mx-auto"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
						<h2 className="mt-4 text-2xl font-bold">
							Email Verified Successfully!
						</h2>
						<p className="mt-2">Redirecting to login page...</p>
					</div>
				)}
				{status === "error" && (
					<div className="text-red-600">
						<h2 className="text-2xl font-bold">Verification Failed</h2>
						<p className="mt-2">Please try again or contact support.</p>
					</div>
				)}
			</motion.div>
		</div>
	);
}
