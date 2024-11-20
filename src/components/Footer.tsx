import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-white py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h3 className="text-xl font-bold mb-4">EduPlatform</h3>
						<p className="text-gray-400">
							Revolutionizing education through interactive virtual learning
							experiences.
						</p>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Quick Links</h4>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="hover:text-primary transition duration-300"
								>
									About Us
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-primary transition duration-300"
								>
									Courses
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-primary transition duration-300"
								>
									Virtual Labs
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-primary transition duration-300"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Support</h4>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="hover:text-primary transition duration-300"
								>
									FAQs
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-primary transition duration-300"
								>
									Help Center
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-primary transition duration-300"
								>
									Privacy Policy
								</a>
							</li>
							<li>
								<a
									href="#"
									className="hover:text-primary transition duration-300"
								>
									Terms of Service
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
						<p className="text-gray-400 mb-4">
							Subscribe to our newsletter for the latest updates.
						</p>
						<form className="flex">
							<input
								type="email"
								placeholder="Your email"
								className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
							/>
							<button
								type="submit"
								className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-r-md transition duration-300"
							>
								Subscribe
							</button>
						</form>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
					<p className="text-gray-400 text-sm">
						&copy; 2024 EduPlatform. All rights reserved.
					</p>
					<div className="flex space-x-4 mt-4 md:mt-0">
						<a
							href="#"
							className="text-gray-400 hover:text-white transition duration-300"
						>
							<Facebook size={20} />
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-white transition duration-300"
						>
							<Twitter size={20} />
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-white transition duration-300"
						>
							<Instagram size={20} />
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-white transition duration-300"
						>
							<Linkedin size={20} />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
