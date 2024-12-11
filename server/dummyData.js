import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

// Dummy Users
export const users = [
	{
		_id: new ObjectId(),
		name: "Alice Johnson",
		email: "alice.johnson@example.com",
		password: "password123",
		role: "student",
		profilePicture: "https://example.com/profiles/alice.jpg",
		bio: "Aspiring data scientist.",
		enrolledCourses: [],
		createdCourses: [],
		createdAt: new Date(),
	},
	{
		_id: new ObjectId(),
		name: "Bob Smith",
		email: "bob.smith@example.com",
		password: "password456",
		role: "student",
		profilePicture: "https://example.com/profiles/bob.jpg",
		bio: "Web developer enthusiast.",
		enrolledCourses: [],
		createdCourses: [],
		createdAt: new Date(),
	},
	{
		_id: new ObjectId(),
		name: "Carol White",
		email: "carol.white@example.com",
		password: "password789",
		role: "instructor",
		profilePicture: "https://example.com/profiles/carol.jpg",
		bio: "Experienced data scientist and AI researcher.",
		enrolledCourses: [],
		createdCourses: [],
		createdAt: new Date(),
	},
	{
		_id: new ObjectId(),
		name: "David Brown",
		email: "david.brown@example.com",
		password: "password000",
		role: "admin",
		profilePicture: "https://example.com/profiles/david.jpg",
		bio: "Platform administrator with over 10 years of experience.",
		enrolledCourses: [],
		createdCourses: [],
		createdAt: new Date(),
	},
];

// Dummy Courses
export const courses = [
	{
		_id: new ObjectId(),
		title: "Introduction to JavaScript",
		category: "Programming",
		shortDescription: "Learn the basics of JavaScript programming.",
		longDescription:
			"This course covers JavaScript fundamentals including syntax, variables, and more.",
		introVideo: "https://example.com/js-intro.mp4",
		outline: ["Introduction", "Variables", "Functions", "Loops"],
		enrollmentStart: new Date(),
		enrollmentEnd: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
		instructor: users[2]._id, // Carol White
		students: [users[0]._id, users[1]._id],
		lessons: [],
		quizzes: [],
		enrollments: 50,
		ratings: {
			average: 4.2,
			count: 30,
		},
		tags: ["JavaScript", "Programming", "Basics"],
		featured: true,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_id: new ObjectId(),
		title: "Advanced Python",
		category: "Programming",
		shortDescription: "Deep dive into Python for experienced developers.",
		longDescription:
			"Advanced topics in Python, including OOP, data structures, and more.",
		introVideo: "https://example.com/python-advanced.mp4",
		outline: ["Advanced Syntax", "OOP", "Data Structures", "Libraries"],
		enrollmentStart: new Date(),
		enrollmentEnd: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
		instructor: users[2]._id, // Carol White
		students: [users[0]._id],
		lessons: [],
		quizzes: [],
		enrollments: 40,
		ratings: {
			average: 4.7,
			count: 45,
		},
		tags: ["Python", "Programming", "Advanced"],
		featured: false,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_id: new ObjectId(),
		title: "Web Development with React",
		category: "Web Development",
		shortDescription: "Learn how to build web applications using React.",
		longDescription:
			"Comprehensive guide to building modern web apps with React.",
		introVideo: "https://example.com/react-intro.mp4",
		outline: ["React Basics", "Components", "State Management", "Hooks"],
		enrollmentStart: new Date(),
		enrollmentEnd: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
		instructor: users[2]._id, // Carol White
		students: [users[1]._id],
		lessons: [],
		quizzes: [],
		enrollments: 70,
		ratings: {
			average: 4.5,
			count: 50,
		},
		tags: ["React", "Web Development", "JavaScript"],
		featured: true,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		_id: new ObjectId(),
		title: "Data Science with R",
		category: "Data Science",
		shortDescription: "Introduction to data science concepts using R.",
		longDescription:
			"Fundamentals of data science, including data analysis and visualization with R.",
		introVideo: "https://example.com/r-intro.mp4",
		outline: [
			"Data Analysis",
			"Visualization",
			"Statistics",
			"Machine Learning",
		],
		enrollmentStart: new Date(),
		enrollmentEnd: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
		instructor: users[2]._id, // Carol White
		students: [users[0]._id, users[1]._id],
		lessons: [],
		quizzes: [],
		enrollments: 60,
		ratings: {
			average: 4.6,
			count: 55,
		},
		tags: ["Data Science", "R", "Visualization"],
		featured: false,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

// Dummy Lessons
export const lessons = [
	{
		_id: new ObjectId(),
		title: "JavaScript Basics",
		content: "Introduction to JavaScript syntax and variables.",
		duration: 30,
		course: courses[0]._id, // Course ID for JavaScript
	},
	{
		_id: new ObjectId(),
		title: "Python OOP",
		content: "Exploring object-oriented programming in Python.",
		duration: 45,
		course: courses[1]._id, // Course ID for Python
	},
	{
		_id: new ObjectId(),
		title: "React Components",
		content: "Building reusable components in React.",
		duration: 40,
		course: courses[2]._id, // Course ID for React
	},
	{
		_id: new ObjectId(),
		title: "Data Visualization in R",
		content: "Basics of data visualization using ggplot2 in R.",
		duration: 50,
		course: courses[3]._id, // Course ID for R
	},
];

// Dummy Quizzes
export const quizzes = [
	{
		_id: new ObjectId(),
		title: "JavaScript Basics Quiz",
		questions: [
			{
				questionText: "What is a variable?",
				options: ["Option A", "Option B"],
				correctAnswer: "Option A",
			},
			{
				questionText: "What is an array?",
				options: ["Option C", "Option D"],
				correctAnswer: "Option D",
			},
		],
		course: courses[0]._id,
	},
	{
		_id: new ObjectId(),
		title: "Python OOP Quiz",
		questions: [
			{
				questionText: "What is a class?",
				options: ["Option A", "Option B"],
				correctAnswer: "Option A",
			},
			{
				questionText: "What is inheritance?",
				options: ["Option C", "Option D"],
				correctAnswer: "Option C",
			},
		],
		course: courses[1]._id,
	},
	{
		_id: new ObjectId(),
		title: "React Components Quiz",
		questions: [
			{
				questionText: "What is JSX?",
				options: ["Option A", "Option B"],
				correctAnswer: "Option A",
			},
			{
				questionText: "What is a prop?",
				options: ["Option C", "Option D"],
				correctAnswer: "Option D",
			},
		],
		course: courses[2]._id,
	},
	{
		_id: new ObjectId(),
		title: "Data Science Basics Quiz",
		questions: [
			{
				questionText: "What is data visualization?",
				options: ["Option A", "Option B"],
				correctAnswer: "Option B",
			},
			{
				questionText: "What is ggplot2?",
				options: ["Option C", "Option D"],
				correctAnswer: "Option C",
			},
		],
		course: courses[3]._id,
	},
];

// Dummy Assignments
export const assignments = [
	{
		_id: new ObjectId(),
		title: "JavaScript Project",
		description: "Create a simple JavaScript project.",
		instructions:
			"1. Define the project scope and objectives.\n2. Write JavaScript code to implement the features.\n3. Test your code thoroughly.\n4. Submit your project files through the online portal.",
		dueDate: new Date(),
		course: courses[0]._id,
	},
	{
		_id: new ObjectId(),
		title: "Python OOP Assignment",
		description: "Create a Python class representing a library.",
		instructions:
			"1. Design a class representing a library system.\n2. Implement methods for adding, removing, and listing books.\n3. Use inheritance to create specialized book categories.\n4. Document your code with appropriate comments.",
		dueDate: new Date(),
		course: courses[1]._id,
	},
	{
		_id: new ObjectId(),
		title: "React Components Assignment",
		description: "Build a React app with multiple components.",
		instructions:
			"1. Set up a new React project using Create React App.\n2. Create reusable components for the project.\n3. Implement state management using hooks.\n4. Submit your source code to the provided Git repository.",
		dueDate: new Date(),
		course: courses[2]._id,
	},
	{
		_id: new ObjectId(),
		title: "Data Science Visualization Assignment",
		description: "Create data visualizations using ggplot2.",
		instructions:
			"1. Load the provided dataset into R.\n2. Perform data cleaning and preprocessing.\n3. Create visualizations using ggplot2.\n4. Write a report explaining your findings and submit it.",
		dueDate: new Date(),
		course: courses[3]._id,
	},
];
