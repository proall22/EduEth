import { useState, useEffect } from "react";
import { Sun, Moon, Globe, Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
	language: string;
	changeLanguage: (lang: string) => void;
}

export default function Header({
	isDarkMode,
	toggleDarkMode,
	language,
	changeLanguage,
}: HeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const navItems = [
		{ name: "Home", href: "/" },
		{ name: "Courses", href: "/courses" },
		{ name: "VirtualLabs", href: "/virtual-labs" },
		{ name: "ForSchools", href: "/for-schools" },
		{ name: "ForUniversities", href: "/for-universities" },
		{ name: "ForBusinesses", href: "/for-businesses" },
	];

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between py-4">
					<Link to="/">
						<span className="text-2xl font-bold text-primary dark:text-primary-dark">
							EduPlatform
						</span>
					</Link>
					<div className="hidden lg:flex items-center space-x-8">
						<nav className="flex space-x-6">
							{navItems.map((item) => (
								<Link key={item.name} to={item.href}>
									<span className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition duration-300">
										{item.name}
									</span>
								</Link>
							))}
						</nav>
						<div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
						<div className="flex items-center space-x-4">
							<Link to="/login">
								<span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">
									Login
								</span>
							</Link>
							<Link to="/signup">
								<span className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full transition duration-300">
									Signup
								</span>
							</Link>
						</div>
						<div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
						<div className="flex items-center space-x-4">
							<button
								onClick={toggleDarkMode}
								className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
							>
								{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
							</button>
							<div className="relative">
								<select
									value={language}
									onChange={(e) => changeLanguage(e.target.value)}
									className="appearance-none bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 pl-3 pr-8 rounded-full"
								>
									<option value="en">EN</option>
									<option value="es">ES</option>
									<option value="fr">FR</option>
								</select>
								<Globe
									size={20}
									className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
								/>
							</div>
						</div>
					</div>
					<button
						onClick={toggleMenu}
						className="lg:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>
			<AnimatePresence>
				{isMenuOpen && (
					<motion.nav
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="lg:hidden bg-white dark:bg-gray-900 shadow-lg"
					>
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
							{navItems.map((item) => (
								<Link key={item.name} to={item.href}>
									<a className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition duration-300">
										{item.name}
									</a>
								</Link>
							))}
							<div className="flex space-x-4">
								<Link to="/login">
									<a className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 text-center">
										Login
									</a>
								</Link>
								<Link to="/signup">
									<a className="flex-1 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full transition duration-300 text-center">
										Signup
									</a>
								</Link>
							</div>
							<div className="flex justify-between items-center">
								<button
									onClick={toggleDarkMode}
									className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
								>
									{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
								</button>
								<div className="relative">
									<select
										value={language}
										onChange={(e) => changeLanguage(e.target.value)}
										className="appearance-none bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 pl-3 pr-8 rounded-full"
									>
										<option value="en">EN</option>
										<option value="es">ES</option>
										<option value="fr">FR</option>
									</select>
									<Globe
										size={20}
										className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
									/>
								</div>
							</div>
						</div>
					</motion.nav>
				)}
			</AnimatePresence>
		</header>
	);
}
