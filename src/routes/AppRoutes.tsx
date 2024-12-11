import { Routes, Route } from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import LandingPage from "../pages/LandingPage";
import EmailVerification from "../components/EmailVerification";
import VerificationPending from "../components/VerificationPending";
import Courses from "../pages/Courses";
import VirtualLabs from "../pages/VirtualLabs";
import ForSchools from "../pages/ForSchools";
import ForUniversities from "../pages/ForUniversities";
import ForBusinesses from "../pages/ForBusiness";
import Individuals from "../pages/Individuals";
import AboutUs from "../pages/AboutUs";
import FAQs from "../pages/FAQS";
import HelpCenter from "../pages/HelpCenter";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfServices";
import Contact from "../pages/Contact";
import BecomeInstructor from "../pages/BecomeInstructor";
import ContactSupport from "../pages/ContactSupport";
import ViewCareers from "../pages/ViewCareers";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/login" element={<SignIn />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/verify-email/:token" element={<EmailVerification />} />
			<Route path="/verification-pending" element={<VerificationPending />} />
			<Route path="/courses" element={<Courses />} />
			<Route path="/virtual-labs" element={<VirtualLabs />} />
			<Route path="/for-schools" element={<ForSchools />} />
			<Route path="/for-universities" element={<ForUniversities />} />
			<Route path="/for-businesses" element={<ForBusinesses />} />
			<Route path="/for-individuals" element={<Individuals />} />
			<Route path="/about" element={<AboutUs />} />
			<Route path="/faqs" element={<FAQs />} />
			<Route path="/help" element={<HelpCenter />} />
			<Route path="/privacy" element={<PrivacyPolicy />} />
			<Route path="/terms" element={<TermsOfService />} />
			<Route path="/contact" element={<Contact />} />
			<Route path="/become-instructor" element={<BecomeInstructor />} />
			<Route path="/contact-support" element={<ContactSupport />} />
			<Route path="/view-careers" element={<ViewCareers />} />
		</Routes>
	);
};

export default AppRoutes;
