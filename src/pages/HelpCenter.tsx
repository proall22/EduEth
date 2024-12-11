import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
	Search,
	Book,
	Video,
	BadgeIcon as Certificate,
	CreditCard,
	MessageCircle,
	Headphones,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getInitialTheme, setThemeToStorage } from "../utils/theme";
import { Link } from "react-router-dom";

const helpCategories = [
	{
		icon: Book,
		title: "Courses",
		description:
			"Find information about course enrollment, content, and completion.",
	},
	{
		icon: Video,
		title: "Video Playback",
		description: "Troubleshoot video streaming issues and playback options.",
	},
	{
		icon: Certificate,
		title: "Certificates",
		description:
			"Learn about earning, accessing, and sharing your certificates.",
	},
	{
		icon: CreditCard,
		title: "Billing & Payments",
		description:
			"Get help with payments, refunds, and subscription management.",
	},
	{
		icon: MessageCircle,
		title: "Community & Discussions",
		description: "Participate in course discussions and connect with peers.",
	},
	{
		icon: Headphones,
		title: "Technical Support",
		description: "Resolve technical issues and get platform support.",
	},
];

const popularArticles = [
	"How to Reset Your Password",
	"Downloading Course Materials for Offline Use",
	"Requesting a Refund",
	"Contacting Your Course Instructor",
	"Troubleshooting Video Playback Issues",
];

export default function HelpCenter() {
	const [searchQuery, setSearchQuery] = useState("");
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
			<main className=" flex-grow pt-16 sm:pt-20 md:pt-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Help Center
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Find answers, get support, and make the most of your learning
						experience.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mb-12"
				>
					<div className="relative max-w-2xl mx-auto">
						<input
							type="text"
							placeholder="Search for help articles..."
							className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-lg"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<Search
							className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={24}
						/>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="mb-16"
				>
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
						Help Categories
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{helpCategories.map((category, index) => (
							<motion.div
								key={index}
								className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
								whileHover={{ scale: 1.03 }}
								transition={{ duration: 0.2 }}
							>
								<category.icon className="text-primary mb-4" size={32} />
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
									{category.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									{category.description}
								</p>
							</motion.div>
						))}
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="mb-16"
				>
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
						Popular Articles
					</h2>
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
						<ul className="divide-y divide-gray-200 dark:divide-gray-700">
							{popularArticles.map((article, index) => (
								<li key={index}>
									<a
										href="#"
										className="block px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
									>
										<p className="text-lg text-gray-900 dark:text-white">
											{article}
										</p>
									</a>
								</li>
							))}
						</ul>
					</div>
				</motion.div>

				<motion.div
					className="bg-primary text-white rounded-lg p-8 shadow-lg text-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.8 }}
				>
					<h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
					<p className="text-xl mb-6">
						Our support team is here to assist you with any questions or issues.
					</p>
					<Link to="/contact-support">
						<button className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
							Contact Support
						</button>
					</Link>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
