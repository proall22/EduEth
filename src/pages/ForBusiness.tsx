import { motion } from "framer-motion";
import {
	TrendingUp,
	Users,
	Target,
	Briefcase,
	PieChart,
	Layers,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getInitialTheme, setThemeToStorage } from "../utils/theme";

const features = [
	{
		icon: TrendingUp,
		title: "Skill Development",
		description:
			"Upskill your workforce with tailored learning paths and courses.",
	},
	{
		icon: Users,
		title: "Team Collaboration",
		description: "Foster teamwork and knowledge sharing across departments.",
	},
	{
		icon: Target,
		title: "Performance Tracking",
		description:
			"Monitor employee progress and identify areas for improvement.",
	},
	{
		icon: Briefcase,
		title: "Industry-Specific Content",
		description:
			"Access courses and resources relevant to your business sector.",
	},
	{
		icon: PieChart,
		title: "Analytics & Reporting",
		description:
			"Gain insights into learning trends and ROI with advanced analytics.",
	},
	{
		icon: Layers,
		title: "Customization & Branding",
		description:
			"Tailor the platform to match your company's branding and needs.",
	},
];

const caseStudies = [
	{
		id: 1,
		company: "TechCorp Inc.",
		title: "Accelerating Employee Onboarding",
		description:
			"TechCorp reduced new employee onboarding time by 30% and improved retention rates by 25% using our customized learning platform.",
	},
	{
		id: 2,
		company: "Global Innovations Ltd.",
		title: "Driving Innovation Through Continuous Learning",
		description:
			"Global Innovations saw a 40% increase in employee-driven innovation projects after implementing our skill development programs.",
	},
];

export default function ForBusinesses() {
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

	const changeLanguage = (lang: string) => setLanguage(lang);

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
						Empower Your Workforce with Continuous Learning
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
						Drive business growth and innovation through our advanced corporate
						learning platform. Develop your team's skills, foster collaboration,
						and achieve measurable results.
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
									{study.company}
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
						Customization & Branding
					</h2>
					<div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							Make our platform your own with extensive customization options:
						</p>
						<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
							<li>Custom branding and white-labeling</li>
							<li>Tailored user interfaces and dashboards</li>
							<li>Integration with your existing corporate systems</li>
							<li>Custom content creation and curation</li>
							<li>
								Personalized learning paths for different roles and departments
							</li>
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
						Measurable Outcomes & ROI
					</h2>
					<div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							Our platform provides clear metrics to demonstrate the impact of
							your learning initiatives:
						</p>
						<ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
							<li>Comprehensive analytics dashboard</li>
							<li>Employee engagement and completion rates</li>
							<li>Skill acquisition and proficiency tracking</li>
							<li>Performance improvement metrics</li>
							<li>Cost savings on training and development</li>
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
						Ready to Transform Your Corporate Learning?
					</h2>
					<p className="text-xl mb-6">
						Join leading businesses in leveraging our platform to drive growth,
						innovation, and employee satisfaction. Let's discuss how we can
						tailor our solution to your company's unique needs.
					</p>
					<button className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
						Schedule a Consultation
					</button>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
