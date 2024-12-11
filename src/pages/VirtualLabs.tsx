import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Info, Users, Globe } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getInitialTheme, setThemeToStorage } from "../utils/theme";

const virtualLabs = [
	{
		id: 1,
		title: "Chemistry Lab",
		description:
			"Conduct virtual experiments in a fully equipped chemistry laboratory.",
		image: "/placeholder.svg?height=200&width=300",
	},
	{
		id: 2,
		title: "Physics Simulator",
		description:
			"Explore physics concepts through interactive simulations and experiments.",
		image: "/placeholder.svg?height=200&width=300",
	},
	{
		id: 3,
		title: "Biology Microscope",
		description:
			"Examine cellular structures and organisms with a virtual microscope.",
		image: "/placeholder.svg?height=200&width=300",
	},
	{
		id: 4,
		title: "Computer Science IDE",
		description:
			"Write, compile, and run code in various programming languages.",
		image: "/placeholder.svg?height=200&width=300",
	},
	{
		id: 5,
		title: "Electrical Circuit Builder",
		description:
			"Design and test electrical circuits in a safe, virtual environment.",
		image: "/placeholder.svg?height=200&width=300",
	},
	{
		id: 6,
		title: "Astronomy Observatory",
		description:
			"Observe celestial bodies and phenomena using a virtual telescope.",
		image: "/placeholder.svg?height=200&width=300",
	},
];

export default function VirtualLabs() {
	const [selectedLab, setSelectedLab] = useState(null);
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
			className={`min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col ${
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
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
					Virtual Labs
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
					<div>
						<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
							Experience Hands-On Learning
						</h2>
						<p className="text-gray-600 dark:text-gray-300 mb-6">
							Our virtual labs provide a safe, accessible, and interactive
							environment for students to conduct experiments, explore complex
							concepts, and gain practical skills across various scientific
							disciplines.
						</p>
						<ul className="space-y-4">
							<li className="flex items-center text-gray-600 dark:text-gray-300">
								<Globe className="mr-2 text-primary" size={24} />
								Access from anywhere, anytime
							</li>
							<li className="flex items-center text-gray-600 dark:text-gray-300">
								<Users className="mr-2 text-primary" size={24} />
								Collaborate with peers in real-time
							</li>
							<li className="flex items-center text-gray-600 dark:text-gray-300">
								<Info className="mr-2 text-primary" size={24} />
								Instant feedback and guidance
							</li>
						</ul>
					</div>
					<div className="relative h-64 md:h-auto">
						<img
							src="/placeholder.svg?height=300&width=400"
							alt="Virtual Lab Demo"
							className="rounded-lg shadow-lg object-cover w-full h-full"
						/>
						<div className="absolute inset-0 flex items-center justify-center">
							<button className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-dark transition-colors duration-300">
								<Play size={32} />
							</button>
						</div>
					</div>
				</div>

				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
					Available Virtual Labs
				</h2>
				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					{virtualLabs.map((lab) => (
						<motion.div
							key={lab.id}
							className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
							whileHover={{ scale: 1.03 }}
							transition={{ duration: 0.2 }}
							onClick={() => setSelectedLab(lab)}
						>
							<img
								src={lab.image}
								alt={lab.title}
								className="w-full h-48 object-cover"
							/>
							<div className="p-6">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
									{lab.title}
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
									{lab.description}
								</p>
								<button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors duration-300">
									Launch Lab
								</button>
							</div>
						</motion.div>
					))}
				</motion.div>
			</main>

			{selectedLab && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
					onClick={() => setSelectedLab(null)}
				>
					<motion.div
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0.9 }}
						className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full"
						onClick={(e) => e.stopPropagation()}
					>
						<h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
							{selectedLab.title}
						</h3>
						<p className="text-gray-600 dark:text-gray-300 mb-6">
							{selectedLab.description}
						</p>
						<div className="flex justify-end">
							<button
								className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors duration-300"
								onClick={() => setSelectedLab(null)}
							>
								Close
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
			<Footer />
		</div>
	);
}
