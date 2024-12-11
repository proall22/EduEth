import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getInitialTheme, setThemeToStorage } from "../utils/theme";
import { Link } from "react-router-dom";

const faqs = [
	{
		question: "How do I create an account?",
		answer:
			'To create an account, click on the "Sign Up" button in the top right corner of the homepage. Fill in your details, including your name, email address, and a secure password. Once you\'ve completed the form, click "Create Account" to get started.',
	},
	{
		question: "Are the courses self-paced?",
		answer:
			"Yes, most of our courses are self-paced, allowing you to learn at your own speed and on your own schedule. Some courses may have specific start and end dates, which will be clearly indicated in the course description.",
	},
	{
		question: "How do I get a certificate after completing a course?",
		answer:
			'Upon successfully completing all required components of a course, including quizzes and assignments, you\'ll be eligible to receive a certificate. You can download your certificate directly from your course dashboard or the "Certificates" section of your account.',
	},
	{
		question: "What payment methods do you accept?",
		answer:
			"We accept various payment methods, including credit/debit cards (Visa, MasterCard, American Express), PayPal, and in some regions, bank transfers. The available payment options will be displayed at checkout.",
	},
	{
		question: "Can I access the course materials after completing the course?",
		answer:
			"Yes, once you've enrolled in a course, you'll have lifetime access to the course materials, even after you've completed the course. This allows you to revisit the content for review or reference at any time.",
	},
	{
		question: "Do you offer refunds if I'm not satisfied with a course?",
		answer:
			"We offer a 30-day money-back guarantee for most courses. If you're not satisfied with your purchase, you can request a refund within 30 days of enrollment, provided you haven't completed more than 50% of the course content.",
	},
	{
		question:
			"How can I contact an instructor if I have questions about the course content?",
		answer:
			'Most courses have a discussion forum where you can post questions and interact with instructors and fellow students. For direct communication, you can use the "Message Instructor" feature available in your course dashboard.',
	},
	{
		question: "Are the courses accessible on mobile devices?",
		answer:
			"Yes, our platform is fully responsive and optimized for mobile devices. You can access your courses through our mobile app (available for iOS and Android) or via a web browser on your smartphone or tablet.",
	},
];

export default function FAQs() {
	const [searchQuery, setSearchQuery] = useState("");
	const [openIndex, setOpenIndex] = useState<number | null>(null);
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

	const filteredFaqs = faqs.filter(
		(faq) =>
			faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
			faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
	);

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
						Frequently Asked Questions
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300">
						Find answers to common questions about our platform and courses.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mb-8"
				>
					<div className="relative">
						<input
							type="text"
							placeholder="Search FAQs..."
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
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					{filteredFaqs.map((faq, index) => (
						<motion.div
							key={index}
							className="mb-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
						>
							<button
								className="w-full text-left bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none"
								onClick={() => setOpenIndex(openIndex === index ? null : index)}
								aria-expanded={openIndex === index}
								aria-controls={`faq-answer-${index}`}
							>
								<div className="flex justify-between items-center">
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
										{faq.question}
									</h3>
									<motion.div
										animate={{ rotate: openIndex === index ? 180 : 0 }}
										transition={{ duration: 0.3 }}
									>
										{openIndex === index ? (
											<ChevronUp className="text-primary" size={20} />
										) : (
											<ChevronDown className="text-primary" size={20} />
										)}
									</motion.div>
								</div>
							</button>
							<AnimatePresence>
								{openIndex === index && (
									<motion.div
										id={`faq-answer-${index}`}
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										transition={{ duration: 0.3 }}
										className="bg-white dark:bg-gray-800 rounded-b-lg px-4 py-3 shadow-md"
									>
										<p className="text-gray-600 dark:text-gray-300">
											{faq.answer}
										</p>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</motion.div>

				{filteredFaqs.length === 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="text-center mt-8"
					>
						<p className="text-xl text-gray-600 dark:text-gray-300">
							No matching FAQs found. Please try a different search term.
						</p>
					</motion.div>
				)}

				<motion.div
					className="mt-12 text-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.6 }}
				>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Can't find the answer you're looking for?
					</p>
					<Link to="/contact-support" className="text-primary hover:underline">
						<button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors duration-300">
							Contact Support
						</button>
					</Link>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
