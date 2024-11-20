import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const allCategories = [
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
	"Psychology",
	"Economics",
	"History",
	"Literature",
];

const degreeTypes = ["All", "Bachelor", "Master", "Certificate", "Diploma"];

const courses = [
	{
		id: 1,
		title: "Introduction to Computer Science",
		category: "Computer Science",
		image: "/placeholder.svg?height=200&width=300",
		popularity: 95,
		trending: true,
		featured: true,
		degreeType: "Bachelor",
	},
	{
		id: 2,
		title: "Data Science Fundamentals",
		category: "Data Science",
		image: "/placeholder.svg?height=200&width=300",
		popularity: 98,
		trending: true,
		featured: true,
		degreeType: "Master",
	},
	{
		id: 3,
		title: "Business Strategy",
		category: "Business",
		image: "/placeholder.svg?height=200&width=300",
		popularity: 92,
		trending: false,
		featured: true,
		degreeType: "Certificate",
	},
	{
		id: 4,
		title: "UX/UI Design Principles",
		category: "Design",
		image: "/placeholder.svg?height=200&width=300",
		popularity: 88,
		trending: true,
		featured: false,
		degreeType: "Diploma",
	},
	{
		id: 5,
		title: "Digital Marketing",
		category: "Marketing",
		image: "/placeholder.svg?height=200&width=300",
		popularity: 96,
		trending: true,
		featured: true,
		degreeType: "Certificate",
	},
	{
		id: 6,
		title: "Machine Learning",
		category: "Computer Science",
		image: "/placeholder.svg?height=200&width=300",
		popularity: 97,
		trending: true,
		featured: true,
		degreeType: "Master",
	},
	{
		id: 7,
		title: "Web Development Bootcamp",
		category: "Computer Science",
		image: "/placeholder.svg?height=200&width=300",
		popularity: 94,
		trending: true,
		featured: false,
		degreeType: "Certificate",
	},
	{
		id: 8,
		title: "Financial Management",
		category: "Business",
		image: "/placeholder.svg?height=200&width=300",
		popularity: 91,
		trending: false,
		featured: true,
		degreeType: "Bachelor",
	},
	{
		id: 9,
		title: "Artificial Intelligence Ethics",
		category: "Computer Science",
		image: "/placeholder.svg?height=200&width=300",
		popularity: 89,
		trending: true,
		featured: true,
		degreeType: "Master",
	},
	{
		id: 10,
		title: "Sustainable Business Practices",
		category: "Business",
		image: "/placeholder.svg?height=200&width=300",
		popularity: 87,
		trending: true,
		featured: false,
		degreeType: "Certificate",
	},
];

export default function CoursePreview() {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedDegreeType, setSelectedDegreeType] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [showAllPopular, setShowAllPopular] = useState(false);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);

	const filteredCourses = courses.filter(
		(course) =>
			(selectedCategory === "All" || course.category === selectedCategory) &&
			(selectedDegreeType === "All" ||
				course.degreeType === selectedDegreeType) &&
			(searchQuery === "" ||
				course.title.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	const trendingCourses = courses.filter((course) => course.trending);
	const popularCourses = [...courses].sort(
		(a, b) => b.popularity - a.popularity
	);

	const searchSuggestions = [
		"Popular: Web Development",
		"Trending: Machine Learning",
		"New: Blockchain Technology",
		"Top Rated: Data Science",
	];

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Searching for:", searchQuery);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<section className="py-16 bg-white dark:bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold text-center mb-8">
					Explore Our Courses
				</h2>

				<div className="mb-8" ref={searchRef}>
					<form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
						<input
							type="text"
							placeholder="Search courses..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onFocus={() => setShowSuggestions(true)}
							className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
						/>
						<Search
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={20}
						/>
						{showSuggestions && (
							<div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 mt-2 rounded-md shadow-lg z-10">
								{searchQuery === ""
									? searchSuggestions.map((suggestion, index) => (
											<button
												key={index}
												className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
												onClick={() =>
													setSearchQuery(suggestion.split(": ")[1])
												}
											>
												{suggestion}
											</button>
									  ))
									: filteredCourses.map((course) => (
											<button
												key={course.id}
												className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
												onClick={() => setSearchQuery(course.title)}
											>
												{course.title}
											</button>
									  ))}
							</div>
						)}
					</form>
				</div>

				<div className="flex flex-wrap justify-center gap-4 mb-8">
					{degreeTypes.map((type) => (
						<button
							key={type}
							onClick={() => setSelectedDegreeType(type)}
							className={`px-4 py-2 rounded-full ${
								selectedDegreeType === type
									? "bg-primary text-white"
									: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
							}`}
						>
							{type}
						</button>
					))}
				</div>

				<div className="flex flex-wrap justify-center gap-4 mb-8">
					{allCategories.map((category) => (
						<button
							key={category}
							onClick={() => setSelectedCategory(category)}
							className={`px-4 py-2 rounded-full ${
								selectedCategory === category
									? "bg-primary text-white"
									: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
							}`}
						>
							{category}
						</button>
					))}
				</div>

				<motion.div
					layout
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					<AnimatePresence>
						{filteredCourses.map((course) => (
							<motion.div
								key={course.id}
								layout
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
							>
								<img
									src={course.image}
									alt={course.title}
									className="w-full h-48 object-cover"
								/>
								<div className="p-4">
									<h3 className="text-xl font-semibold mb-2">{course.title}</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{course.category}
									</p>
									<p className="text-sm text-primary mt-2">
										{course.degreeType}
									</p>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>

				<h3 className="text-2xl font-bold mt-16 mb-8">Trending Courses</h3>
				<div className="flex flex-wrap justify-center gap-4 mb-8">
					{allCategories.map((category) => (
						<button
							key={category}
							onClick={() => setSelectedCategory(category)}
							className={`px-4 py-2 rounded-full ${
								selectedCategory === category
									? "bg-primary text-white"
									: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
							}`}
						>
							{category}
						</button>
					))}
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{trendingCourses
						.filter(
							(course) =>
								selectedCategory === "All" ||
								course.category === selectedCategory
						)
						.map((course) => (
							<motion.div
								key={course.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
							>
								<img
									src={course.image}
									alt={course.title}
									className="w-full h-48 object-cover"
								/>
								<div className="p-4">
									<h4 className="text-lg font-semibold mb-2">{course.title}</h4>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{course.category}
									</p>
									<p className="text-sm text-primary mt-2">
										{course.degreeType}
									</p>
								</div>
							</motion.div>
						))}
				</div>

				<h3 className="text-2xl font-bold mt-16 mb-8">Popular Courses</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{popularCourses
						.slice(0, showAllPopular ? undefined : 6)
						.map((course) => (
							<motion.div
								key={course.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
							>
								<img
									src={course.image}
									alt={course.title}
									className="w-full h-48 object-cover"
								/>
								<div className="p-4">
									<h4 className="text-lg font-semibold mb-2">{course.title}</h4>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{course.category}
									</p>
									<span className="inline-block bg-primary text-white text-xs px-2 py-1 rounded-full mt-2">
										{course.category}
									</span>
								</div>
							</motion.div>
						))}
				</div>

				{popularCourses.length > 6 && (
					<div className="text-center mt-8">
						<button
							onClick={() => setShowAllPopular(!showAllPopular)}
							className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition duration-300"
						>
							{showAllPopular ? "Show Less" : "Show More"}
						</button>
					</div>
				)}
			</div>
		</section>
	);
}
