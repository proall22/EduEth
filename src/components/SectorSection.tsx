import { motion } from "framer-motion";
import { User, School, GraduationCap, Briefcase } from "lucide-react";

const sectors = [
	{
		title: "For Individuals",
		description:
			"Enhance your skills and knowledge with our diverse range of courses and virtual labs.",
		icon: User,
		link: "/for-individuals",
	},
	{
		title: "For Schools",
		description:
			"Empower your students with cutting-edge educational tools and interactive learning experiences.",
		icon: School,
		link: "/for-schools",
	},
	{
		title: "For Universities",
		description:
			"Revolutionize higher education with advanced virtual labs and collaborative research platforms.",
		icon: GraduationCap,
		link: "/for-universities",
	},
	{
		title: "For Businesses",
		description:
			"Upskill your workforce and stay ahead of the curve with our tailored corporate learning solutions.",
		icon: Briefcase,
		link: "/for-businesses",
	},
];

export default function SectorSection() {
	return (
		<section className="py-16 bg-gray-100 dark:bg-gray-800">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					EduPlatform for Every Sector
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{sectors.map((sector, index) => (
						<motion.div
							key={sector.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
						>
							<sector.icon className="w-16 h-16 text-primary dark:text-primary-dark mb-4" />
							<h3 className="text-xl font-semibold mb-2">{sector.title}</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-4">
								{sector.description}
							</p>
							<a
								href={sector.link}
								className="mt-auto bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition duration-300"
							>
								Learn More
							</a>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
