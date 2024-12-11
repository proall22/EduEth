import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getInitialTheme, setThemeToStorage } from "../utils/theme";
import { Link } from "react-router-dom";

const termsContent = [
	{
		title: "Acceptance of Terms",
		content: `
      By accessing or using our educational platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
    `,
	},
	{
		title: "User Accounts",
		content: `
      - You are responsible for maintaining the confidentiality of your account and password.
      - You agree to accept responsibility for all activities that occur under your account.
      - You must be at least 18 years old to create an account or have parental consent.
    `,
	},
	{
		title: "Course Enrollment and Access",
		content: `
      - Course access is granted upon successful payment or enrollment.
      - Access duration may vary depending on the specific course or subscription plan.
      - We reserve the right to modify, suspend, or discontinue any course with reasonable notice.
    `,
	},
	{
		title: "Intellectual Property",
		content: `
      - All content provided on the platform is owned by us or our content providers and is protected by copyright laws.
      - You may not reproduce, distribute, or create derivative works without our express permission.
      - You retain ownership of any content you submit, but grant us a license to use, modify, and distribute it on the platform.
    `,
	},
	{
		title: "User Conduct",
		content: `
      You agree not to:
      - Use the platform for any unlawful purpose or in violation of these terms
      - Impersonate any person or entity
      - Interfere with or disrupt the platform or servers
      - Attempt to gain unauthorized access to any part of the platform
      - Post or transmit any harmful or offensive content
    `,
	},
	{
		title: "Payment and Refunds",
		content: `
      - Payments are processed securely through our authorized payment providers.
      - Refunds are subject to our refund policy, which may vary depending on the course or subscription plan.
      - We reserve the right to modify pricing with reasonable notice.
    `,
	},
	{
		title: "Limitation of Liability",
		content: `
      - We strive to provide accurate and up-to-date content, but we do not warrant its completeness or accuracy.
      - We are not liable for any indirect, incidental, special, or consequential damages resulting from the use of our platform.
    `,
	},
	{
		title: "Modifications to Terms",
		content: `
      We reserve the right to modify these Terms of Service at any time. We will notify users of any significant changes. Your continued use of the platform after changes constitutes acceptance of the modified terms.
    `,
	},
];

export default function TermsOfService() {
	const [openSections, setOpenSections] = useState<number[]>([]);
	const [isDarkMode, setIsDarkMode] = useState(getInitialTheme());
	const [language, setLanguage] = useState("en");

	const toggleDarkMode = () => {
		const newTheme = !isDarkMode;
		setIsDarkMode(newTheme);
		setThemeToStorage(newTheme);
	};
	useEffect(() => {
		setThemeToStorage(isDarkMode);
	}, [isDarkMode]);

	const changeLanguage = () => {
		setLanguage(language === "en" ? "ar" : "en");
	};

	const toggleSection = (index: number) => {
		setOpenSections((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	return (
		<div
			className={`min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 ${
				isDarkMode ? "dark" : ""
			}`}
		>
			<Header
				isDarkMode={isDarkMode}
				toggleDarkMode={toggleDarkMode}
				language={language}
				changeLanguage={changeLanguage}
			/>
			<main className=" flex-grow pt-16 sm:pt-20 md:pt-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Terms of Service
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300">
						Please read these terms carefully before using our educational
						platform.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{termsContent.map((section, index) => (
						<div key={index} className="mb-6">
							<button
								className="w-full text-left bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none"
								onClick={() => toggleSection(index)}
							>
								<div className="flex justify-between items-center">
									<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
										{section.title}
									</h2>
									{openSections.includes(index) ? (
										<ChevronUp className="text-primary" size={20} />
									) : (
										<ChevronDown className="text-primary" size={20} />
									)}
								</div>
							</button>
							{openSections.includes(index) && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.3 }}
									className="bg-white dark:bg-gray-800 rounded-b-lg px-4 py-3 shadow-md mt-1"
								>
									<p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
										{section.content}
									</p>
								</motion.div>
							)}
						</div>
					))}
				</motion.div>

				<motion.div
					className="mt-12 text-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						By using our platform, you agree to these Terms of Service. If you
						have any questions, please contact us.
					</p>
					<Link to="/contact" className="mr-4">
						<button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors duration-300">
							Contact Us
						</button>
					</Link>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
