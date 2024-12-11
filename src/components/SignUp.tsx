import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export default function SignUp() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phoneNumber: "",
		agreeToTerms: false,
	});
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});

	const [passwordStrength, setPasswordStrength] = useState({
		score: 0,
		color: "bg-gray-200",
		label: "",
	});

	const checkPasswordStrength = (password) => {
		let score = 0;
		if (password.length >= 8) score++;
		if (/[A-Z]/.test(password)) score++;
		if (/[a-z]/.test(password)) score++;
		if (/[0-9]/.test(password)) score++;
		if (/[^A-Za-z0-9]/.test(password)) score++;

		let strengthColor = "bg-gray-200";
		let strengthLabel = "";

		if (score === 0) {
			strengthColor = "bg-gray-200";
			strengthLabel = "";
		} else if (score <= 2) {
			strengthColor = "bg-red-500";
			strengthLabel = "Weak";
		} else if (score <= 3) {
			strengthColor = "bg-yellow-500";
			strengthLabel = "Medium";
		} else {
			strengthColor = "bg-green-500";
			strengthLabel = "Strong";
		}

		return { score, color: strengthColor, label: strengthLabel };
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));

		if (name === "password") {
			setPasswordStrength(checkPasswordStrength(value));
		}
	};

	const validateForm = () => {
		const phoneRegex = /^(\+251[0-9]{9}|0[97][0-9]{8})$/;
		const emailRegex =
			/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com|aol\.com|protonmail\.com)$/i;
		const newErrors = {};
		if (!formData.fullName) newErrors.fullName = "Full name is required";
		if (!formData.email) newErrors.email = "Email is required";
		else if (!emailRegex.test(formData.email))
			newErrors.email =
				"Please use a valid email address from a trusted provider (Gmail, Yahoo, Outlook, etc.)";
		if (!formData.password) newErrors.password = "Password is required";
		else if (formData.password.length < 8)
			newErrors.password = "Password must be at least 8 characters";
		else if (passwordStrength.score < 3)
			newErrors.password =
				"Password must be at least medium strength (include uppercase, lowercase, numbers, and special characters)";
		if (formData.password !== formData.confirmPassword)
			newErrors.confirmPassword = "Passwords do not match";
		if (!formData.phoneNumber) {
			newErrors.phoneNumber = "Please add a phone number";
		} else if (!phoneRegex.test(formData.phoneNumber)) {
			newErrors.phoneNumber =
				"Phone number must start with +251 followed by 9 digits, or 09/07 followed by 8 digits";
		}
		if (!formData.agreeToTerms)
			newErrors.agreeToTerms = "You must agree to the terms";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const [isSubmitting, setIsSubmitting] = useState(false);

	const checkEmailExists = async (email: string) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/auth/check-email`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email }),
				}
			);
			const data = await response.json();
			return data.exists;
		} catch (error) {
			return false;
		}
	};

	const checkPhoneUsage = async (phoneNumber: string) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/auth/check-phone`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ phoneNumber }),
				}
			);
			const data = await response.json();
			return { used: data.used, count: data.count };
		} catch (error) {
			return { used: false, count: 0 };
		}
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validateForm()) {
			return;
		}
		setIsSubmitting(true);

		try {
			// Step 1: Check email existence
			const emailResponse = await fetch(
				"http://localhost:5000/api/auth/check-email",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: formData.email }),
				}
			);
			const emailData = await emailResponse.json();

			if (emailData.exists) {
				setErrors((prev) => ({
					...prev,
					email: "This email is already registered",
				}));
				setIsSubmitting(false);
				return;
			}

			// Step 2: Check phone number usage
			const phoneResponse = await fetch(
				"http://localhost:5000/api/auth/check-phone",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ phoneNumber: formData.phoneNumber }),
				}
			);
			const phoneData = await phoneResponse.json();

			if (phoneData.count >= 3) {
				setErrors((prev) => ({
					...prev,
					phoneNumber: `This phone number has been used ${phoneData.count} times. Please use a different number.`,
				}));
				setIsSubmitting(false);
				return;
			}

			// Step 3: Generate browser token for verification tracking
			const browserToken = generateBrowserToken();
			localStorage.setItem("verificationToken", browserToken);

			// Step 4: Submit registration
			const response = await fetch("http://localhost:5000/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Browser-Token": browserToken,
				},
				body: JSON.stringify({
					fullName: formData.fullName,
					email: formData.email,
					password: formData.password,
					phoneNumber: formData.phoneNumber,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				// Step 5: Show success message and redirect
				toast.success(
					"Registration successful! Please check your email to verify your account."
				);
				navigate("/verification-pending", {
					state: {
						email: formData.email,
						message:
							"Please check your email for verification link. Use the same browser to complete verification.",
					},
				});
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Registration failed"
			);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
			<Toaster position="top-right" />
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-md w-full space-y-8"
			>
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
						Create your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="full-name" className="sr-only">
								Full Name
							</label>
							<input
								id="full-name"
								name="fullName"
								type="text"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
								placeholder="Full Name"
								value={formData.fullName}
								onChange={handleChange}
							/>
							{errors.fullName && (
								<p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
							)}
						</div>
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
								placeholder="Email address"
								value={formData.email}
								onChange={handleChange}
							/>
							{errors.email && (
								<p className="text-red-500 text-xs mt-1">{errors.email}</p>
							)}
						</div>{" "}
						<div className="relative">
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<div className="relative">
								<input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									autoComplete="new-password"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-[1] sm:text-sm pr-10"
									placeholder="Password"
									value={formData.password}
									onChange={handleChange}
								/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 z-10">
									<button
										type="button"
										className="flex items-center justify-center w-5 h-5"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOff className="h-5 w-5 text-gray-400" />
										) : (
											<Eye className="h-5 w-5 text-gray-400" />
										)}
									</button>
								</div>
							</div>
							{formData.password && (
								<div className="mt-1 mb-2">
									<div className="h-1 w-full bg-gray-200 rounded-full">
										<div
											className={`h-full ${passwordStrength.color} rounded-full transition-all duration-300`}
											style={{
												width: `${(passwordStrength.score / 5) * 100}%`,
											}}
										></div>
									</div>
									{passwordStrength.label && (
										<p className="text-xs mt-1">
											Password Strength:{" "}
											<span className="font-medium">
												{passwordStrength.label}
											</span>
										</p>
									)}
								</div>
							)}
							{errors.password && (
								<p className="text-red-500 text-xs mt-1">{errors.password}</p>
							)}
						</div>
						<div>
							<label htmlFor="confirm-password" className="sr-only">
								Confirm Password
							</label>
							<input
								id="confirm-password"
								name="confirmPassword"
								type="password"
								autoComplete="new-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
								placeholder="Confirm Password"
								value={formData.confirmPassword}
								onChange={handleChange}
							/>
							{errors.confirmPassword && (
								<p className="text-red-500 text-xs mt-1">
									{errors.confirmPassword}
								</p>
							)}
						</div>
					</div>
					<div>
						<label
							htmlFor="phone-number"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Phone Number
						</label>
						<input
							id="phone-number"
							name="phoneNumber"
							type="tel"
							autoComplete="tel"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
							placeholder="Phone Number"
							value={formData.phoneNumber}
							onChange={handleChange}
						/>
						{errors.phoneNumber && (
							<p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
						)}
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="agree-to-terms"
								name="agreeToTerms"
								type="checkbox"
								className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
								checked={formData.agreeToTerms}
								onChange={handleChange}
							/>
							<label
								htmlFor="agree-to-terms"
								className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
							>
								I agree to the{" "}
								<Link
									href="#"
									className="font-medium text-primary hover:text-primary-dark"
								>
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link
									href="#"
									className="font-medium text-primary hover:text-primary-dark"
								>
									Privacy Policy
								</Link>
							</label>
						</div>
					</div>
					{errors.agreeToTerms && (
						<p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>
					)}{" "}
					<div>
						<button
							type="submit"
							disabled={isSubmitting}
							className={`group relative w-full flex justify-center py-2 px-4 border border-transparent 
    text-sm font-medium rounded-md text-white bg-primary 
    ${isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:bg-primary-dark"} 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
						>
							{isSubmitting ? (
								<>
									<span className="absolute left-0 inset-y-0 flex items-center pl-3">
										<svg
											className="animate-spin h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
									</span>
									Processing...
								</>
							) : (
								"Sign up"
							)}
						</button>
					</div>
				</form>

				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500">
								Or continue with
							</span>
						</div>
					</div>

					<div className="mt-6 grid grid-cols-3 gap-3">
						<div>
							<Link
								href="#"
								className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
							>
								<span className="sr-only">Sign up with Google</span>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M12 2C6.477 2 2 6.477 2 12c0 4.43 2.865 8.198 6.839 9.503.5.09.682-.217.682-.48 0-.238-.009-.868-.014-1.703-2.782.603-3.369-1.338-3.369-1.338-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.196 22 16.428 22 12c0-5.523-4.477-10-10-10z"
										clipRule="evenodd"
									/>
								</svg>
							</Link>
						</div>

						<div>
							<Link
								href="#"
								className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
							>
								<span className="sr-only">Sign up with Github</span>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M12 2C6.477 2 2 6.477 2 12c0 4.43 2.865 8.198 6.839 9.503.5.09.682-.217.682-.48 0-.238-.009-.868-.014-1.703-2.782.603-3.369-1.338-3.369-1.338-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.196 22 16.428 22 12c0-5.523-4.477-10-10-10z"
										clipRule="evenodd"
									/>
								</svg>
							</Link>
						</div>

						<div>
							<Link
								href="#"
								className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
							>
								<span className="sr-only">Sign up with Microsoft</span>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M12 2C6.477 2 2 6.477 2 12c0 4.43 2.865 8.198 6.839 9.503.5.09.682-.217.682-.48 0-.238-.009-.868-.014-1.703-2.782.603-3.369-1.338-3.369-1.338-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.196 22 16.428 22 12c0-5.523-4.477-10-10-10z"
										clipRule="evenodd"
									/>
								</svg>
							</Link>
						</div>
					</div>
				</div>
				<div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
					<Link
						to="/"
						className="text-primary hover:text-primary-dark hover:underline transition-colors duration-200"
					>
						← Return to Home
					</Link>
					<span className="mx-2">•</span>
					<span>Don't have an account?</span>{" "}
					<Link
						to="/signup"
						className="text-primary hover:text-primary-dark font-semibold hover:underline transition-colors duration-200"
					>
						Sign up now!
					</Link>
				</div>
			</motion.div>
		</div>
	);
}

const generateBrowserToken = () => {
	const timestamp = new Date().getTime();
	const random = Math.random().toString(36).substring(2);
	const userAgent = navigator.userAgent;
	return btoa(`${timestamp}-${random}-${userAgent}`);
};
