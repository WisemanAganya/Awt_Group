
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
// const SignupPage = lazy(() => import('./pages/SignupPage'));
const BizTrackerPage = lazy(() => import('./pages/products/BizTrackerPage'));
const TwendePage = lazy(() => import('./pages/products/TwendePage'));

const AdminLayout = lazy(() => import('./components/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const ServicesManager = lazy(() => import('./pages/admin/ServicesManager'));
const PortfolioManager = lazy(() => import('./pages/admin/PortfolioManager'));
const TeamManager = lazy(() => import('./pages/admin/TeamManager'));
const MessagesPage = lazy(() => import('./pages/admin/MessagesPage'));
const UsersPage = lazy(() => import('./pages/admin/UsersPage'));
const AuditLogsPage = lazy(() => import('./pages/admin/AuditLogsPage'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));
const ContentEditor = lazy(() => import('./pages/admin/ContentEditor'));
const HeroManager = lazy(() => import('./pages/admin/HeroManager'));
const ReportsDashboard = lazy(() => import('./pages/admin/ReportsDashboard'));
const ProductsManager = lazy(() => import('./pages/admin/ProductsManager'));



const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-awt-bg font-sans text-awt-text-primary">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" /></div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/vanguard-access" element={<LoginPage />} />
              {/* <Route path="/signup" element={<SignupPage />} /> */}
              <Route path="/products/biztracker-pro" element={<BizTrackerPage />} />
              <Route path="/products/twende" element={<TwendePage />} />

              {/* Admin Routes - Secured with ProtectedRoute */}
              <Route path="/hq" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="services" element={<ServicesManager />} />
                <Route path="portfolio" element={<PortfolioManager />} />
                <Route path="team" element={<TeamManager />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="logs" element={<AuditLogsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="content" element={<ContentEditor />} />
                <Route path="hero" element={<HeroManager />} />
                <Route path="reports" element={<ReportsDashboard />} />
                <Route path="products" element={<ProductsManager />} />
              </Route>

              {/* Redirect any old admin links or unauthorized access attempts */}
              <Route path="/admin" element={<Navigate to="/hq" replace />} />
              <Route path="/login" element={<Navigate to="/vanguard-access" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;




