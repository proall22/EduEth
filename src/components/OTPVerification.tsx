import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function OTPVerification() {
	const [otp, setOtp] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [isChangingPhone, setIsChangingPhone] = useState(false);
	const [newPhone, setNewPhone] = useState("");
	const navigate = useNavigate();

	const handleChangePhone = async () => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/verify/change-phone",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-Browser-Token": localStorage.getItem("verificationToken")!,
					},
					body: JSON.stringify({ phoneNumber: newPhone }),
				}
			);

			const data = await response.json();
			if (response.ok) {
				setPhoneNumber(newPhone);
				setIsChangingPhone(false);
				alert("Phone number updated successfully. New OTP sent.");
			} else {
				alert(data.message);
			}
		} catch (error) {
			alert("Failed to change phone number");
		}
	};

	const handleVerifyOTP = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const browserToken = localStorage.getItem("verificationToken");
			const response = await fetch("http://localhost:5000/api/verify/phone", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Browser-Token": browserToken!,
				},
				body: JSON.stringify({ otp }),
			});

			const data = await response.json();
			if (response.ok) {
				navigate("/verification-success");
			} else {
				alert(data.message);
			}
		} catch (error) {
			alert("Verification failed");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-6">
				<h2 className="text-2xl font-bold text-center">
					Enter Phone Verification Code
				</h2>
				<form onSubmit={handleVerifyOTP} className="mt-8 space-y-6">
					<input
						type="text"
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
						placeholder="Enter OTP"
						className="w-full px-3 py-2 border rounded-md"
						maxLength={6}
					/>
					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
					>
						Verify OTP
					</button>
				</form>
				{isChangingPhone ? (
					<div className="mt-4">
						<input
							type="tel"
							value={newPhone}
							onChange={(e) => setNewPhone(e.target.value)}
							placeholder="New Phone Number"
							className="w-full px-3 py-2 border rounded-md"
						/>
						<button
							onClick={handleChangePhone}
							className="mt-2 w-full bg-primary text-white py-2 rounded-md"
						>
							Update Phone Number
						</button>
					</div>
				) : (
					<button
						onClick={() => setIsChangingPhone(true)}
						className="mt-4 text-primary underline"
					>
						Change Phone Number
					</button>
				)}
			</div>
		</div>
	);
}
