import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: "",
		phoneNumber: "",
		agreeToTerms: false,
	});
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const validateForm = () => {
		let newErrors = {};
		if (!formData.fullName) newErrors.fullName = "Full name is required";
		if (!formData.email) newErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(formData.email))
			newErrors.email = "Email is invalid";
		if (!formData.password) newErrors.password = "Password is required";
		else if (formData.password.length < 8)
			newErrors.password = "Password must be at least 8 characters";
		if (formData.password !== formData.confirmPassword)
			newErrors.confirmPassword = "Passwords do not match";
		if (!formData.role) newErrors.role = "Please select a role";
		if (!formData.agreeToTerms)
			newErrors.agreeToTerms = "You must agree to the terms";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			// Submit the form data
			console.log("Form submitted:", formData);
			// Here you would typically send the data to your backend
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
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
						</div>
						<div className="relative">
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								autoComplete="new-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
								placeholder="Password"
								value={formData.password}
								onChange={handleChange}
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 pr-3 flex items-center"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<EyeOff className="h-5 w-5 text-gray-400" />
								) : (
									<Eye className="h-5 w-5 text-gray-400" />
								)}
							</button>
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
							htmlFor="role"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Role
						</label>
						<select
							id="role"
							name="role"
							className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
							value={formData.role}
							onChange={handleChange}
						>
							<option value="">Select a role</option>
							<option value="student">Student</option>
							<option value="teacher">Teacher</option>
							<option value="admin">Admin</option>
						</select>
						{errors.role && (
							<p className="text-red-500 text-xs mt-1">{errors.role}</p>
						)}
					</div>

					<div>
						<label
							htmlFor="phone-number"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Phone Number (optional)
						</label>
						<input
							id="phone-number"
							name="phoneNumber"
							type="tel"
							autoComplete="tel"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
							placeholder="Phone Number"
							value={formData.phoneNumber}
							onChange={handleChange}
						/>
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
								<a
									href="#"
									className="font-medium text-primary hover:text-primary-dark"
								>
									Terms of Service
								</a>{" "}
								and{" "}
								<a
									href="#"
									className="font-medium text-primary hover:text-primary-dark"
								>
									Privacy Policy
								</a>
							</label>
						</div>
					</div>
					{errors.agreeToTerms && (
						<p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>
					)}

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
						>
							Sign up
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
							<a
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
							</a>
						</div>

						<div>
							<a
								href="#"
								className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
							>
								<span className="sr-only">Sign up with Apple</span>
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
							</a>
						</div>

						<div>
							<a
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
							</a>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
