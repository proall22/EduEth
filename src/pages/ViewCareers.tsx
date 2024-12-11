import { motion } from "framer-motion";
import { Briefcase, Users, Heart, Send } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getInitialTheme, setThemeToStorage } from "../utils/theme";
import { useEffect, useState } from "react";

const jobOpenings = [
	{
		title: "Senior Full Stack Developer",
		department: "Engineering",
		location: "Remote",
		type: "Full-time",
	},
	{
		title: "UX/UI Designer",
		department: "Design",
		location: "New York, NY",
		type: "Full-time",
	},
	{
		title: "Content Marketing Specialist",
		department: "Marketing",
		location: "Remote",
		type: "Contract",
	},
	{
		title: "Data Scientist",
		department: "Data & Analytics",
		location: "San Francisco, CA",
		type: "Full-time",
	},
	{
		title: "Customer Success Manager",
		department: "Customer Support",
		location: "Remote",
		type: "Full-time",
	},
];

export default function ViewCareers() {
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
	const changeLanguage = (lang: string) => {
		setLanguage(lang);
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
						Join Our Team
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300">
						Help us shape the future of education and make a lasting impact on
						learners worldwide.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mb-16"
				>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
						Why Work With Us?
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
							<Users className="text-primary mb-4" size={32} />
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
								Collaborative Environment
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								Work with passionate individuals dedicated to transforming
								education through technology.
							</p>
						</div>
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
							<Heart className="text-primary mb-4" size={32} />
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
								Meaningful Impact
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								Contribute to projects that empower learners and educators
								around the globe.
							</p>
						</div>
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
							<Briefcase className="text-primary mb-4" size={32} />
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
								Growth Opportunities
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								Develop your skills and advance your career in a rapidly
								evolving industry.
							</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
						Current Openings
					</h2>
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
						<table className="w-full">
							<thead className="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Position
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Department
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Location
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Type
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
										Action
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 dark:divide-gray-600">
								{jobOpenings.map((job, index) => (
									<tr key={index}>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
											{job.title}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
											{job.department}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
											{job.location}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
											{job.type}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<a
												href="#"
												className="text-primary hover:text-primary-dark"
											>
												Apply
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="mt-16 text-center"
				>
					<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
						Don't See a Perfect Fit?
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mb-6">
						We're always looking for talented individuals to join our team. Send
						us your resume, and we'll keep you in mind for future opportunities.
					</p>
					<a
						href="#"
						className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-300"
					>
						<Send className="mr-2" size={20} />
						Submit Your Resume
					</a>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
