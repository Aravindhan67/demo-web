
import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Loader from './components/Loader';
import PageLoader from './components/PageLoader';
import './index.css';

// Lazy-loaded page components for code-splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Services = lazy(() => import('./pages/Services'));
const GraphicDesign = lazy(() => import('./pages/GraphicDesign'));
const AppDevelopment = lazy(() => import('./pages/AppDevelopment'));
const WebsiteDevelopment = lazy(() => import('./pages/WebsiteDevelopment'));
const SeoMarketing = lazy(() => import('./pages/SeoMarketing'));
const UiUxDesign = lazy(() => import('./pages/UiUxDesign'));
const DigitalMarketing = lazy(() => import('./pages/DigitalMarketing'));
const SocialMediaManagement = lazy(() => import('./pages/SocialMediaManagement'));
const CmsServiceDetail = lazy(() => import('./pages/CmsServiceDetail'));
const Programs = lazy(() => import('./pages/Programs'));
const InternshipDetails = lazy(() => import('./pages/InternshipDetails'));
const Contact = lazy(() => import('./pages/Contact'));
const Careers = lazy(() => import('./pages/Careers'));
const CareerOpening = lazy(() => import('./pages/CareerOpening'));
const TalentNetwork = lazy(() => import('./pages/TalentNetwork'));
const More = lazy(() => import('./pages/More'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Routes that should render without Navbar / Footer */
const FULLSCREEN_ROUTES = ['/careers/talent-network'];

function Layout() {
  const { pathname } = useLocation();
  const isFullscreen = FULLSCREEN_ROUTES.includes(pathname);

  return (
    <>
      <GoogleAnalytics />
      <FloatingWhatsApp />
      <ScrollToTop />
      {!isFullscreen && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/graphic-design" element={<GraphicDesign />} />
          <Route path="/services/app-development" element={<AppDevelopment />} />
          <Route path="/services/website-development" element={<WebsiteDevelopment />} />
          <Route path="/services/seo-marketing" element={<SeoMarketing />} />
          <Route path="/services/ui-ux-design" element={<UiUxDesign />} />
          <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/services/social-media" element={<SocialMediaManagement />} />
          <Route path="/services/:slug" element={<CmsServiceDetail />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/internship" element={<InternshipDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/talent-network" element={<TalentNetwork />} />
          <Route path="/careers/:slug" element={<CareerOpening />} />
          <Route path="/more" element={<More />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isFullscreen && <Footer />}
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onFinished={() => setLoading(false)} />;
  }

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
