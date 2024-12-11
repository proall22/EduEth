import { motion } from "framer-motion";
import { BookOpen, Users, DollarSign, Star, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getInitialTheme, setThemeToStorage } from "../utils/theme";
import { useState, useEffect } from "react";

const steps = [
	{
		title: "Create Your Instructor Profile",
		description:
			"Fill out your profile with your expertise, qualifications, and teaching style.",
		icon: <Users className="text-primary" size={24} />,
	},
	{
		title: "Design Your Course",
		description:
			"Develop your course content, including video lectures, quizzes, and assignments.",
		icon: <BookOpen className="text-primary" size={24} />,
	},
	{
		title: "Submit for Review",
		description:
			"Our team will review your course to ensure it meets our quality standards.",
		icon: <Star className="text-primary" size={24} />,
	},
	{
		title: "Launch and Earn",
		description:
			"Once approved, publish your course and start earning as students enroll.",
		icon: <DollarSign className="text-primary" size={24} />,
	},
];

const testimonials = [
	{
		name: "Dr. Emily Chen",
		role: "Data Science Instructor",
		image: "/placeholder.svg?height=100&width=100",
		quote:
			"Teaching on this platform has allowed me to reach students globally and make a real impact in their careers.",
	},
	{
		name: "Michael Rodriguez",
		role: "Web Development Instructor",
		image: "/placeholder.svg?height=100&width=100",
		quote:
			"The support from the platform team and the engaged student community make teaching here a rewarding experience.",
	},
];

export default function BecomeInstructor() {
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
						Become an Instructor
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300">
						Share your knowledge, inspire learners, and earn income by creating
						courses on our platform.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mb-16"
				>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
						Why Teach With Us?
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
							<Users className="text-primary mb-4" size={32} />
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
								Global Reach
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								Connect with millions of learners from around the world and make
								a lasting impact.
							</p>
						</div>
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
							<DollarSign className="text-primary mb-4" size={32} />
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
								Earn Income
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								Generate revenue through course sales and our competitive
								instructor compensation program.
							</p>
						</div>
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
							<Star className="text-primary mb-4" size={32} />
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
								Support and Resources
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								Access tools, guidelines, and support to create high-quality
								courses and grow your audience.
							</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="mb-16"
				>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
						How to Become an Instructor
					</h2>
					<div className="space-y-8">
						{steps.map((step, index) => (
							<div key={index} className="flex items-start">
								<div className="flex-shrink-0 bg-primary rounded-full p-3 mr-4">
									{step.icon}
								</div>
								<div>
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
										{step.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-300">
										{step.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="mb-16"
				>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
						Instructor Testimonials
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{testimonials.map((testimonial, index) => (
							<div
								key={index}
								className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
							>
								<div className="flex items-center mb-4">
									<img
										src={testimonial.image}
										alt={testimonial.name}
										className="w-16 h-16 rounded-full mr-4"
									/>
									<div>
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
											{testimonial.name}
										</h3>
										<p className="text-gray-600 dark:text-gray-300">
											{testimonial.role}
										</p>
									</div>
								</div>
								<p className="text-gray-600 dark:text-gray-300 italic">
									"{testimonial.quote}"
								</p>
							</div>
						))}
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.8 }}
					className="text-center"
				>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
						Ready to Share Your Expertise?
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mb-6">
						Join our community of instructors and start creating impactful
						courses today.
					</p>
					<a
						href="#"
						className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
					>
						Apply as an Instructor
						<ChevronRight className="ml-2" size={20} />
					</a>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
