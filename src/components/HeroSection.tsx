import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

function AnimatedSphere() {
	return (
		<Sphere visible args={[1, 100, 200]} scale={2}>
			<MeshDistortMaterial
				color="#8352FD"
				attach="material"
				distort={0.3}
				speed={1.5}
				roughness={0}
			/>
		</Sphere>
	);
}

export default function HeroSection() {
	return (
		<section className="relative min-h-screen flex items-center">
			<div className="container mx-auto px-4 py-32 flex flex-col lg:flex-row items-center">
				<div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
					>
						Revolutionizing Education: Learn, Experiment, Innovate
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="text-xl mb-8 text-gray-600 dark:text-gray-300"
					>
						Empowering schools, universities, and learners globally with virtual
						labs and advanced interactive learning tools.
					</motion.p>
					<motion.button
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
					>
						Start Learning Now
					</motion.button>
				</div>
				<div className="lg:w-1/2 h-64 lg:h-auto">
					<Canvas>
						<OrbitControls enableZoom={false} />
						<ambientLight intensity={0.5} />
						<directionalLight position={[-2, 5, 2]} intensity={1} />
						<AnimatedSphere />
					</Canvas>
				</div>
			</div>
		</section>
	);
}
