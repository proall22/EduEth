import { motion } from "framer-motion";
import { Microscope, Globe, BookOpen, Zap, Server, Shield } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getInitialTheme, setThemeToStorage } from "../utils/theme";

const features = [
	{
		icon: Microscope,
		title: "Advanced Research Tools",
		description:
			"Access cutting-edge research tools and databases to support academic studies.",
	},
	{
		icon: Globe,
		title: "Global Collaboration",
		description:
			"Connect with researchers and students worldwide for collaborative projects.",
	},
	{
		icon: BookOpen,
		title: "Extensive Digital Library",
		description:
			"Access a vast collection of academic journals, e-books, and publications.",
	},
	{
		icon: Zap,
		title: "AI-Powered Learning",
		description:
			"Leverage AI to personalize learning paths and enhance student outcomes.",
	},
	{
		icon: Server,
		title: "Seamless Integration",
		description:
			"Easily integrate with existing university systems and LMS platforms.",
	},
	{
		icon: Shield,
		title: "Data Security & Privacy",
		description:
			"Ensure the highest standards of data protection and user privacy.",
	},
];

const caseStudies = [
	{
		id: 1,
		university: "Stanford University",
		title: "Revolutionizing Online Learning",
		description:
			"Stanford University implemented our platform to enhance their online course offerings, resulting in a 40% increase in student engagement and a 25% improvement in course completion rates.",
	},
	{
		id: 2,
		university: "MIT",
		title: "Advancing Research Collaboration",
		description:
			"MIT utilized our advanced research tools to facilitate global collaboration, leading to a 50% increase in joint research publications and a 30% boost in research funding.",
	},
];

export default function ForUniversities() {
	const [isDarkMode, setIsDarkMode] = useState(getInitialTheme());
	const [language, setLanguage] = useState("en");

	const toggleDarkMode = () => {
		const newDarkMode = !isDarkMode;
		setIsDarkMode(newDarkMode);
		setThemeToStorage(newDarkMode);
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
				>
					<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
						Elevate Higher Education with Our Platform
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
						Empower your university with state-of-the-art tools for learning,
						research, and collaboration. Our platform is designed to meet the
						unique needs of higher education institutions and drive academic
						excellence.
					</p>
				</motion.div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{features.map((feature, index) => (
						<div
							key={index}
							className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
						>
							<feature.icon className="text-primary mb-4" size={32} />
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
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
						Success Stories
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{caseStudies.map((study) => (
							<div
								key={study.id}
								className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
							>
								<h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
									{study.university}
								</h3>
								<h4 className="text-xl font-medium text-primary mb-4">
									{study.title}
								</h4>
								<p className="text-gray-600 dark:text-gray-300">
									{study.description}
								</p>
							</div>
						))}
					</div>
				</motion.div>

				<motion.div
					className="mb-16"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.6 }}
				>
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
						Seamless Integration
					</h2>
					<div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							Our platform is designed to work seamlessly with your existing
							university systems. We offer:
						</p>
						<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
							<li>Easy integration with popular LMS platforms</li>
							<li>API access for custom integrations</li>
							<li>Single Sign-On (SSO) capabilities</li>
							<li>Data migration and onboarding support</li>
						</ul>
					</div>
				</motion.div>

				<motion.div
					className="mb-16"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.8 }}
				>
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
						Supporting Research & Innovation
					</h2>
					<div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							Our platform goes beyond traditional learning management to
							support cutting-edge research and innovation:
						</p>
						<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
							<li>Access to global research databases and journals</li>
							<li>Advanced data analysis and visualization tools</li>
							<li>Collaborative workspaces for research teams</li>
							<li>Integration with popular research management software</li>
							<li>Support for grant management and funding opportunities</li>
						</ul>
					</div>
				</motion.div>

				<motion.div
					className="bg-primary text-white rounded-lg p-8 shadow-lg"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 1 }}
				>
					<h2 className="text-3xl font-bold mb-4">
						Ready to Transform Your University?
					</h2>
					<p className="text-xl mb-6">
						Join leading universities worldwide in leveraging our platform to
						enhance learning, research, and innovation. Schedule a demo to see
						how we can tailor our solution to your institution's needs.
					</p>
					<button className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
						Request a Demo
					</button>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
