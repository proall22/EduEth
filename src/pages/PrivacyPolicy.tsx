import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getInitialTheme, setThemeToStorage } from "../utils/theme";

const policyContent = [
	{
		title: "Information We Collect",
		content: `
      We collect various types of information from our users, including:
      - Personal information (e.g., name, email address, payment information)
      - Usage data (e.g., courses accessed, time spent on platform)
      - Technical data (e.g., IP address, browser type, device information)
    `,
	},
	{
		title: "How We Use Your Information",
		content: `
      We use the collected information for various purposes, including:
      - Providing and improving our educational services
      - Processing payments and managing accounts
      - Personalizing user experience and content recommendations
      - Communicating with users about their courses and account
      - Analyzing usage patterns to enhance our platform
    `,
	},
	{
		title: "Data Security",
		content: `
      We implement robust security measures to protect your personal information, including:
      - Encryption of sensitive data
      - Regular security audits and vulnerability assessments
      - Strict access controls for employee access to user data
      - Compliance with industry-standard security protocols
    `,
	},
	{
		title: "Third-Party Services",
		content: `
      We may use third-party services to support our platform. These services may have access to your information solely to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
    `,
	},
	{
		title: "Your Rights",
		content: `
      You have certain rights regarding your personal information, including:
      - The right to access and receive a copy of your data
      - The right to rectify or update your personal information
      - The right to erase your personal data (subject to certain conditions)
      - The right to restrict processing of your personal information
      - The right to object to processing of your personal information
    `,
	},
];

export default function PrivacyPolicy() {
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
	const changeLanguage = (newLanguage: string) => {
		setLanguage(newLanguage);
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
			<main className="flex-grow pt-16 sm:pt-20 md:pt-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Privacy Policy
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300">
						Your privacy is important to us. This policy outlines how we
						collect, use, and protect your personal information.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{policyContent.map((section, index) => (
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
						If you have any questions about our Privacy Policy, please contact
						us.
					</p>
					<button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors duration-300">
						Contact Us
					</button>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
