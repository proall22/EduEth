import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
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
								<Link
									to="/about"
									className="hover:text-primary transition duration-300"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									to="/courses"
									className="hover:text-primary transition duration-300"
								>
									Courses
								</Link>
							</li>
							<li>
								<Link
									to="/virtual-labs"
									className="hover:text-primary transition duration-300"
								>
									Virtual Labs
								</Link>
							</li>
							<li>
								<Link
									to="/contact"
									className="hover:text-primary transition duration-300"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Support</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/faqs"
									className="hover:text-primary transition duration-300"
								>
									FAQs
								</Link>
							</li>
							<li>
								<Link
									to="/help"
									className="hover:text-primary transition duration-300"
								>
									Help Center
								</Link>
							</li>
							<li>
								<Link
									to="/privacy"
									className="hover:text-primary transition duration-300"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									to="/terms"
									className="hover:text-primary transition duration-300"
								>
									Terms of Service
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
						<p className="text-gray-400 mb-4">
							Subscribe to our newsletter for the latest updates.
						</p>
						<form className="flex flex-col md:flex-row max-w-full">
							<input
								type="email"
								placeholder="Your email"
								className="bg-gray-800 text-white px-3 py-1 text-sm rounded-md md:rounded-r-none focus:outline-none focus:ring-2 focus:ring-primary mb-2 md:mb-0 w-full md:w-auto md:max-w-[240px] lg:max-w-[280px]"
							/>
							<button
								type="submit"
								className="bg-primary hover:bg-primary-dark px-3 py-1 text-sm rounded-md md:rounded-l-none transition duration-300 whitespace-nowrap w-full md:w-auto lg:max-w-[120px]"
							>
								Subscribe
							</button>
						</form>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
					<p className="text-gray-400 text-sm">
						© 2024 EduPlatform. All rights reserved.
					</p>
					<div className="flex space-x-4 mt-4 md:mt-0">
						<Link
							to="#"
							className="text-gray-400 hover:text-white transition duration-300"
						>
							<Facebook size={20} />
						</Link>
						<Link
							to="#"
							className="text-gray-400 hover:text-white transition duration-300"
						>
							<Twitter size={20} />
						</Link>
						<Link
							to="#"
							className="text-gray-400 hover:text-white transition duration-300"
						>
							<Instagram size={20} />
						</Link>
						<Link
							to="#"
							className="text-gray-400 hover:text-white transition duration-300"
						>
							<Linkedin size={20} />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
