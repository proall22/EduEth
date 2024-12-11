import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Send, ChevronDown, ChevronUp } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getInitialTheme, setThemeToStorage } from "../utils/theme";

const faqs = [
	{
		question: "How do I reset my password?",
		answer:
			"To reset your password, click on the 'Forgot Password' link on the login page. Follow the instructions sent to your email to create a new password.",
	},
	{
		question: "How can I enroll in a course?",
		answer:
			"To enroll in a course, navigate to the course page and click the 'Enroll' button. If it's a paid course, you'll be directed to the payment page.",
	},
	{
		question: "What payment methods do you accept?",
		answer:
			"We accept major credit cards, PayPal, and bank transfers for course payments. Specific payment options may vary by region.",
	},
	{
		question: "How do I get a refund?",
		answer:
			"Our refund policy allows for full refunds within 30 days of purchase if you're unsatisfied with the course. Contact our support team to initiate the refund process.",
	},
];

export default function ContactSupport() {
	const [openFaqs, setOpenFaqs] = useState<number[]>([]);
	const [ticketData, setTicketData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
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

	const toggleFaq = (index: number) => {
		setOpenFaqs((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setTicketData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Handle ticket submission logic here
		console.log("Ticket submitted:", ticketData);
		// Reset form after submission
		setTicketData({ name: "", email: "", subject: "", message: "" });
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
						Contact Support
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300">
						Need help? Check our FAQs or submit a support ticket.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
							Frequently Asked Questions
						</h2>
						<div className="space-y-4">
							{faqs.map((faq, index) => (
								<div
									key={index}
									className="bg-white dark:bg-gray-800 rounded-lg shadow-md"
								>
									<button
										className="w-full text-left px-6 py-4 focus:outline-none"
										onClick={() => toggleFaq(index)}
									>
										<div className="flex justify-between items-center">
											<span className="text-lg font-medium text-gray-900 dark:text-white">
												{faq.question}
											</span>
											{openFaqs.includes(index) ? (
												<ChevronUp className="text-primary" size={20} />
											) : (
												<ChevronDown className="text-primary" size={20} />
											)}
										</div>
									</button>
									{openFaqs.includes(index) && (
										<div className="px-6 pb-4">
											<p className="text-gray-600 dark:text-gray-300">
												{faq.answer}
											</p>
										</div>
									)}
								</div>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
							Submit a Support Ticket
						</h2>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
								>
									Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={ticketData.name}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
								>
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={ticketData.email}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
								/>
							</div>
							<div>
								<label
									htmlFor="subject"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
								>
									Subject
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									value={ticketData.subject}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
								/>
							</div>
							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
								>
									Message
								</label>
								<textarea
									id="message"
									name="message"
									value={ticketData.message}
									onChange={handleChange}
									required
									rows={4}
									className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
								></textarea>
							</div>
							<button
								type="submit"
								className="w-full bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center"
							>
								<Send className="mr-2" size={20} />
								Submit Ticket
							</button>
						</form>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="mt-12 text-center"
				>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
						Need More Help?
					</h3>
					<p className="text-gray-600 dark:text-gray-300 mb-6">
						Check out our comprehensive help center for more detailed guides and
						tutorials.
					</p>
					<a
						href="/help"
						className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
					>
						<HelpCircle className="mr-2" size={20} />
						Visit Help Center
					</a>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
