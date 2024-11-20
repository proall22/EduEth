import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
	{
		name: "Sarah Johnson",
		role: "Student",
		quote:
			"The virtual labs have completely transformed my learning experience. I can now perform experiments anytime, anywhere!",
		avatar: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Dr. Michael Lee",
		role: "Professor",
		quote:
			"As an educator, I've seen a significant improvement in student engagement and understanding since using this platform.",
		avatar: "/placeholder.svg?height=100&width=100",
	},
	{
		name: "Emily Chen",
		role: "High School Teacher",
		quote:
			"The analytics tools have helped me identify and address my students' learning gaps more effectively.",
		avatar: "/placeholder.svg?height=100&width=100",
	},
];

export default function Testimonials() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextTestimonial = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
	};

	const prevTestimonial = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
		);
	};

	return (
		<section className="py-16 bg-gray-50 dark:bg-gray-900">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					What Our Users Say
				</h2>
				<div className="relative max-w-3xl mx-auto">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.5 }}
							className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
						>
							<img
								src={testimonials[currentIndex].avatar}
								alt={testimonials[currentIndex].name}
								className="w-24 h-24 rounded-full mx-auto mb-4"
							/>
							<p className="text-lg mb-4 italic">
								{testimonials[currentIndex].quote}
							</p>
							<p className="font-semibold">{testimonials[currentIndex].name}</p>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								{testimonials[currentIndex].role}
							</p>
						</motion.div>
					</AnimatePresence>
					<button
						onClick={prevTestimonial}
						className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md"
					>
						<ChevronLeft className="w-6 h-6" />
					</button>
					<button
						onClick={nextTestimonial}
						className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md"
					>
						<ChevronRight className="w-6 h-6" />
					</button>
				</div>
			</div>
		</section>
	);
}
