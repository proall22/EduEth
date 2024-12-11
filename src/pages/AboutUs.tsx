import { motion } from "framer-motion";
import { BookOpen, Users, Globe, Zap } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getInitialTheme, setThemeToStorage } from "../utils/theme";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const stats = [
	{ icon: BookOpen, value: "10,000+", label: "Courses" },
	{ icon: Users, value: "5M+", label: "Learners" },
	{ icon: Globe, value: "190+", label: "Countries" },
	{ icon: Zap, value: "300+", label: "Leading Universities" },
];

const teamMembers = [
	{
		name: "Dr. Emily Chen",
		role: "Founder & CEO",
		image: "/placeholder.svg?height=200&width=200",
	},
	{
		name: "Michael Johnson",
		role: "CTO",
		image: "/placeholder.svg?height=200&width=200",
	},
	{
		name: "Sarah Thompson",
		role: "Head of Content",
		image: "/placeholder.svg?height=200&width=200",
	},
	{
		name: "David Rodriguez",
		role: "Chief Learning Officer",
		image: "/placeholder.svg?height=200&width=200",
	},
];

export default function AboutUs() {
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
					className="text-center mb-16"
				>
					<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
						About Our Educational Platform
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
						We're on a mission to transform education and make quality learning
						accessible to everyone, everywhere. Our platform combines
						cutting-edge technology with expert-led content to create an
						unparalleled learning experience.
					</p>
				</motion.div>

				<motion.div
					className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{stats.map((stat, index) => (
						<div
							key={index}
							className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center"
						>
							<stat.icon className="text-primary mx-auto mb-4" size={40} />
							<p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
								{stat.value}
							</p>
							<p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
						</div>
					))}
				</motion.div>

				<motion.div
					className="mb-16"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
						Our Story
					</h2>
					<div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							Founded in 2015, our educational platform started with a simple
							idea: to make high-quality education accessible to everyone,
							regardless of their location or background. What began as a small
							collection of online courses has grown into a global learning
							community, connecting millions of students with world-class
							instructors and institutions.
						</p>
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							Our journey has been driven by a passion for innovation in
							education. We've pioneered the use of adaptive learning
							technologies, interactive video lessons, and peer-to-peer learning
							communities to create a truly engaging and effective online
							learning experience.
						</p>
						<p className="text-gray-600 dark:text-gray-300">
							Today, we're proud to partner with leading universities, industry
							experts, and organizations to offer a diverse range of courses,
							from academic subjects to professional skills and personal
							development. Our commitment to quality, accessibility, and
							innovation continues to guide us as we shape the future of
							education in the digital age.
						</p>
					</div>
				</motion.div>

				<motion.div
					className="mb-16"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.6 }}
				>
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
						Our Team
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{teamMembers.map((member, index) => (
							<div
								key={index}
								className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center"
							>
								<img
									src={member.image}
									alt={member.name}
									className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
								/>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
									{member.name}
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									{member.role}
								</p>
							</div>
						))}
					</div>
				</motion.div>

				<motion.div
					className="bg-primary text-white rounded-lg p-8 shadow-lg text-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.8 }}
				>
					<h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
					<p className="text-xl mb-6">
						Help us revolutionize education and empower learners worldwide.
						Explore career opportunities or become an instructor on our
						platform.
					</p>
					<div className="space-x-4">
						<Link to="/view-careers">
							<button className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
								View Careers
							</button>
						</Link>
						<Link to="/become-instructor">
							<button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors duration-300">
								Become an Instructor
							</button>
						</Link>
					</div>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
