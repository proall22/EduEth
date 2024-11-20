// import { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import Header from "./components/Header";
// import HeroSection from "./components/HeroSection";
// import FeatureCards from "./components/FeatureCards";
// import Testimonials from "./components/Testimonials";
// import CoursePreview from "./components/CoursePreview";
// import VirtualLabsSection from "./components/VirtualLabsSection";
// import SectorSection from "./components/SectorSection";
// import Footer from "./components/Footer";
// import SignUp from "./components/SignUp";
// import SignIn from "./components/SignIn";
// import "./App.css";

// export default function App() {
// 	const [isDarkMode, setIsDarkMode] = useState(false);
// 	const [language, setLanguage] = useState("en");
// 	const [currentPage, setCurrentPage] = useState("home");

// 	const toggleDarkMode = () => {
// 		setIsDarkMode(!isDarkMode);
// 		if (isDarkMode) {
// 			document.documentElement.classList.remove("dark");
// 		} else {
// 			document.documentElement.classList.add("dark");
// 		}
// 	};

// 	const changeLanguage = (lang: string) => setLanguage(lang);

// 	useEffect(() => {
// 		if (
// 			window.matchMedia &&
// 			window.matchMedia("(prefers-color-scheme: dark)").matches
// 		) {
// 			setIsDarkMode(true);
// 			document.documentElement.classList.add("dark");
// 		}
// 	}, []);

// 	const pageVariants = {
// 		initial: { opacity: 0, y: 20 },
// 		in: { opacity: 1, y: 0 },
// 		out: { opacity: 0, y: -20 },
// 	};

// 	const pageTransition = {
// 		type: "tween",
// 		ease: "anticipate",
// 		duration: 0.5,
// 	};

// 	const renderPage = () => {
// 		switch (currentPage) {
// 			case "home":
// 				return (
// 					<>
// 						<HeroSection />
// 						<FeatureCards />
// 						<CoursePreview />
// 						<VirtualLabsSection />
// 						<Testimonials />
// 						<SectorSection />
// 					</>
// 				);
// 			case "signup":
// 				return <SignUp />;
// 			case "signin":
// 				return <SignIn />;
// 			default:
// 				return null;
// 		}
// 	};

// 	return (
// 		<div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
// 			<Header
// 				isDarkMode={isDarkMode}
// 				toggleDarkMode={toggleDarkMode}
// 				language={language}
// 				changeLanguage={changeLanguage}
// 				setCurrentPage={setCurrentPage}
// 			/>
// 			<main className="pt-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
// 				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// 					<AnimatePresence mode="wait">
// 						<motion.div
// 							key={currentPage}
// 							initial="initial"
// 							animate="in"
// 							exit="out"
// 							variants={pageVariants}
// 							transition={pageTransition}
// 						>
// 							{renderPage()}
// 						</motion.div>
// 					</AnimatePresence>
// 				</div>
// 			</main>
// 			<Footer />
// 		</div>
// 	);
// }
