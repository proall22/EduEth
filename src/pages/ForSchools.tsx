import { motion } from "framer-motion";
import { Book, Users, BarChart, Clock, CheckCircle } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getInitialTheme, setThemeToStorage } from "../utils/theme";

const features = [
	{
		icon: Book,
		title: "Comprehensive Curriculum",
		description:
			"Access a wide range of subjects aligned with national standards.",
	},
	{
		icon: Users,
		title: "Collaborative Learning",
		description:
			"Foster teamwork and peer-to-peer learning with built-in collaboration tools.",
	},
	{
		icon: BarChart,
		title: "Progress Tracking",
		description:
			"Monitor student performance and identify areas for improvement.",
	},
	{
		icon: Clock,
		title: "Flexible Scheduling",
		description:
			"Adapt to various learning paces and accommodate different schedules.",
	},
];

const testimonials = [
	{
		id: 1,
		name: "Sarah Johnson",
		role: "Principal, Westfield High School",
		content:
			"This platform has revolutionized how we approach education. Our students are more engaged, and teachers have powerful tools at their fingertips.",
	},
	{
		id: 2,
		name: "Michael Chen",
		role: "IT Director, Oakridge School District",
		content:
			"The ease of implementation and robust features have made this platform an invaluable asset to our schools. It's truly a game-changer.",
	},
];

export default function ForSchools() {
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
			<main className="flex-grow pt-16 sm:pt-20 md:pt-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
						Empower Your School with Advanced Learning Solutions
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
						Transform your educational institution with our cutting-edge
						platform designed specifically for schools. Enhance student
						engagement, streamline administrative tasks, and deliver
						personalized learning experiences.
					</p>
				</motion.div>

				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
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
						What Schools Say About Us
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{testimonials.map((testimonial) => (
							<div
								key={testimonial.id}
								className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
							>
								<p className="text-gray-600 dark:text-gray-300 mb-4">
									"{testimonial.content}"
								</p>
								<div className="flex items-center">
									<div className="rounded-full bg-primary text-white p-2 mr-4">
										<Users size={24} />
									</div>
									<div>
										<p className="font-semibold text-gray-900 dark:text-white">
											{testimonial.name}
										</p>
										<p className="text-sm text-gray-600 dark:text-gray-300">
											{testimonial.role}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</motion.div>

				<motion.div
					className="bg-primary text-white rounded-lg p-8 shadow-lg"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.6 }}
				>
					<h2 className="text-3xl font-bold mb-4">
						Ready to Transform Your School?
					</h2>
					<p className="text-xl mb-6">
						Join thousands of schools already benefiting from our platform. Get
						started today and see the difference in your students' engagement
						and performance.
					</p>
					<button className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
						Schedule a Demo
					</button>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
