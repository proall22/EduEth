import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getInitialTheme, setThemeToStorage } from "../utils/theme";

const courseCategories = [
	"All",
	"Computer Science",
	"Data Science",
	"Business",
	"Design",
	"Marketing",
	"Health",
	"Engineering",
	"Mathematics",
	"Physics",
	"Chemistry",
	"Biology",
];

const courses = [
	{
		id: 1,
		title: "Introduction to Programming",
		category: "Computer Science",
		image: "/placeholder.svg?height=200&width=300",
		rating: 4.8,
		students: 10500,
	},
	{
		id: 2,
		title: "Data Analysis with Python",
		category: "Data Science",
		image: "/placeholder.svg?height=200&width=300",
		rating: 4.9,
		students: 8900,
	},
	{
		id: 3,
		title: "Digital Marketing Fundamentals",
		category: "Marketing",
		image: "/placeholder.svg?height=200&width=300",
		rating: 4.7,
		students: 7200,
	},
	{
		id: 4,
		title: "UX/UI Design Principles",
		category: "Design",
		image: "/placeholder.svg?height=200&width=300",
		rating: 4.8,
		students: 6500,
	},
	{
		id: 5,
		title: "Machine Learning Basics",
		category: "Computer Science",
		image: "/placeholder.svg?height=200&width=300",
		rating: 4.9,
		students: 9200,
	},
	{
		id: 6,
		title: "Business Strategy and Management",
		category: "Business",
		image: "/placeholder.svg?height=200&width=300",
		rating: 4.6,
		students: 5800,
	},
	{
		id: 7,
		title: "Web Development Bootcamp",
		category: "Computer Science",
		image: "/placeholder.svg?height=200&width=300",
		rating: 4.8,
		students: 11200,
	},
	{
		id: 8,
		title: "Financial Accounting",
		category: "Business",
		image: "/placeholder.svg?height=200&width=300",
		rating: 4.7,
		students: 6900,
	},
];

export default function Courses() {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [isDarkMode, setIsDarkMode] = useState(getInitialTheme());
	const [language, setLanguage] = useState("en");

	const filteredCourses = courses.filter(
		(course) =>
			(selectedCategory === "All" || course.category === selectedCategory) &&
			course.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

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
			className={`min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 ${
				isDarkMode ? "dark" : ""
			}`}
		>
			<Header
				isDarkMode={isDarkMode}
				toggleDarkMode={toggleDarkMode}
				language={language}
				changeLanguage={changeLanguage}
			/>
			<main className="flex-grow pt-16 sm:pt-20 md:pt-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
					Explore Our Courses
				</h1>

				<div className="flex flex-col md:flex-row justify-between items-center mb-8">
					<div className="relative w-full md:w-96 mb-4 md:mb-0">
						<input
							type="text"
							placeholder="Search courses..."
							className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:text-gray-900"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<Search
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={20}
						/>
					</div>

					<div className="relative w-full md:w-auto">
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							className="w-full md:w-auto px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
						>
							{courseCategories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
						<Filter
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
							size={20}
						/>
					</div>
				</div>

				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					{filteredCourses.map((course) => (
						<motion.div
							key={course.id}
							className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
							whileHover={{ scale: 1.03 }}
							transition={{ duration: 0.2 }}
						>
							<img
								src={course.image}
								alt={course.title}
								className="w-full h-48 object-cover"
							/>
							<div className="p-6">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
									{course.title}
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
									{course.category}
								</p>
								<div className="flex justify-between items-center">
									<span className="text-primary font-semibold">
										⭐ {course.rating}
									</span>
									<span className="text-gray-600 dark:text-gray-300">
										{course.students.toLocaleString()} students
									</span>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
