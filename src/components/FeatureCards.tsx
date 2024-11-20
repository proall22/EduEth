import { motion } from "framer-motion";
import { Beaker, Globe, BarChart2, Users } from "lucide-react";

const features = [
	{
		title: "Interactive Virtual Labs",
		description:
			"Experience hands-on learning with our state-of-the-art virtual laboratories.",
		icon: Beaker,
	},
	{
		title: "Global Classroom Access",
		description: "Connect with learners and educators from around the world.",
		icon: Globe,
	},
	{
		title: "Advanced Analytics",
		description:
			"Track progress and gain insights with our powerful analytics tools.",
		icon: BarChart2,
	},
	{
		title: "Real-Time Collaboration",
		description:
			"Work together seamlessly with integrated communication tools.",
		icon: Users,
	},
];

export default function FeatureCards() {
	return (
		<section className="py-16 bg-gray-100 dark:bg-gray-800">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					Our Key Features
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
						>
							<div className="p-6">
								<feature.icon className="w-12 h-12 text-primary dark:text-primary-dark mb-4" />
								<h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
								<p className="text-gray-600 dark:text-gray-300">
									{feature.description}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
