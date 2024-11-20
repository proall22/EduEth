import { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import Testimonials from "./components/Testimonials";
import CoursePreview from "./components/CoursePreview";
import VirtualLabsSection from "./components/VirtualLabsSection";
import SectorSection from "./components/SectorSection";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [language, setLanguage] = useState("en");

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		if (isDarkMode) {
			document.documentElement.classList.remove("dark");
		} else {
			document.documentElement.classList.add("dark");
		}
	};

	const changeLanguage = (lang: string) => setLanguage(lang);

	useEffect(() => {
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			setIsDarkMode(true);
			document.documentElement.classList.add("dark");
		}
	}, []);

	return (
		<div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
			<Header
				isDarkMode={isDarkMode}
				toggleDarkMode={toggleDarkMode}
				language={language}
				changeLanguage={changeLanguage}
			/>
			<main className="pt-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
