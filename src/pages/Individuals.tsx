import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Book, Rocket, Users, Award, Search } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getInitialTheme, setThemeToStorage } from "../utils/theme";
import { use } from "framer-motion/client";

const features = [
	{
		icon: Book,
		title: "Diverse Course Catalog",
		description: "Access thousands of courses across various disciplines.",
	},
	{
		icon: Rocket,
		title: "Self-Paced Learning",
		description: "Learn at your own pace with flexible schedules.",
	},
	{
		icon: Users,
		title: "Expert Instructors",
		description: "Learn from industry professionals and academic experts.",
	},
	{
		icon: Award,
		title: "Recognized Certifications",
		description: "Earn certificates valued by top employers worldwide.",
	},
];

const popularCategories = [
	"Computer Science",
	"Business",
	"Data Science",
	"Language Learning",
	"Arts & Humanities",
	"Personal Development",
	"Health & Fitness",
	"Marketing",
];

export default function Individuals() {
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
			className={`min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 ${
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
					className="text-center mb-16"
				>
					<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Empower Your Learning Journey
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						Discover a world of knowledge at your fingertips. Whether you're
						looking to advance your career, explore new interests, or gain
						cutting-edge skills, we have the perfect learning path for you.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mb-16"
				>
					<div className="relative max-w-xl mx-auto">
						<input
							type="text"
							placeholder="Search for courses, skills, or subjects"
							className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<Search
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={20}
						/>
					</div>
				</motion.div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					{features.map((feature, index) => (
						<div
							key={index}
							className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center"
						>
							<feature.icon className="text-primary mx-auto mb-4" size={40} />
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
								{feature.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								{feature.description}
							</p>
						</div>
					))}
				</motion.div>

				<motion.div
					className="mb-16"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.6 }}
				>
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
						Popular Categories
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{popularCategories.map((category, index) => (
							<motion.div
								key={index}
								className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md text-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.2 }}
							>
								<p className="text-gray-900 dark:text-white font-medium">
									{category}
								</p>
							</motion.div>
						))}
					</div>
				</motion.div>

				<motion.div
					className="bg-primary text-white rounded-lg p-8 shadow-lg text-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.8 }}
				>
					<h2 className="text-3xl font-bold mb-4">
						Start Your Learning Adventure Today
					</h2>
					<p className="text-xl mb-6">
						Join millions of learners worldwide and unlock your potential with
						our cutting-edge educational platform.
					</p>
					<button className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
						Create Free Account
					</button>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
