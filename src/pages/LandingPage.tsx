import { useState, useEffect } from "react";

import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeatureCards from "../components/FeatureCards";
import Testimonials from "../components/Testimonials";
import CoursePreview from "../components/CoursePreview";
import VirtualLabsSection from "../components/VirtualLabsSection";
import SectorSection from "../components/SectorSection";
import Footer from "../components/Footer";
import { getInitialTheme, setThemeToStorage } from "../utils/theme";

import "../App.css";

export default function App() {
	const [isDarkMode, setIsDarkMode] = useState(getInitialTheme());
	const [language, setLanguage] = useState("en");

	const toggleDarkMode = () => {
		const newDarkMode = !isDarkMode;
		setIsDarkMode(newDarkMode);
		setThemeToStorage(newDarkMode);
	};

	const changeLanguage = (lang: string) => setLanguage(lang);

	useEffect(() => {
		setThemeToStorage(isDarkMode);
	}, [isDarkMode]);

	return (
		<div className={`min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
			<Header
				isDarkMode={isDarkMode}
				toggleDarkMode={toggleDarkMode}
				language={language}
				changeLanguage={changeLanguage}
			/>
			<main className="flex-grow pt-16 sm:pt-20 md:pt-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="max-w-full sm:max-w-[90%] md:max-w-[85%] lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<HeroSection />
					<FeatureCards />
					<CoursePreview />
					<VirtualLabsSection />
					<Testimonials />
					<SectorSection />
				</div>
			</main>
			<Footer />
		</div>
	);
}
