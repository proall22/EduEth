import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function VerificationPending() {
	const location = useLocation();
	const email = location.state?.email;

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center"
			>
				<h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
				<p className="text-gray-600 mb-4">
					We've sent a verification link to:
					<br />
					<span className="font-semibold">{email}</span>
				</p>
				<p className="text-sm text-gray-500">
					Please check your email and click the verification link to complete
					your registration. Make sure to use the same browser for verification.
				</p>
			</motion.div>
		</div>
	);
}
