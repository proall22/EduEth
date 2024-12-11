import axios from "axios";

export const sendOTP = async (phoneNumber: string, otp: string) => {
	try {
		const options = {
			method: "POST",
			url: "https://rapid-sms-service.p.rapidapi.com/send-sms",
			headers: {
				"content-type": "application/json",
				"X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
				"X-RapidAPI-Host": "rapid-sms-service.p.rapidapi.com",
			},
			data: {
				message: `Your verification code is: ${otp}`,
				recipient: phoneNumber,
				sender_id: "VERIFY",
			},
		};

		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error("SMS sending failed:", error);
		return null;
	}
};
