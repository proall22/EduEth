import { motion } from "framer-motion";

export default function VirtualLabsSection() {
	return (
		<section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<div className="md:w-1/2 mb-8 md:mb-0">
						<h2 className="text-3xl font-bold mb-4">
							Experience Our Virtual Labs
						</h2>
						<p className="text-xl mb-6">
							Immerse yourself in cutting-edge simulations and conduct
							experiments from anywhere in the world.
						</p>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-100 transition duration-300"
						>
							Try a Demo Lab Now!
						</motion.button>
					</div>
					<div className="md:w-1/2">
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="relative w-full h-96"
						>
							{/* Replace this with an actual 3D animation or AR/VR preview */}
							<div className="absolute inset-0 bg-white bg-opacity-20 rounded-lg shadow-lg overflow-hidden">
								<div className="w-full h-full flex items-center justify-center">
									<span className="text-2xl font-bold">3D Lab Animation</span>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
