
import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
import BizTrackerPage from './pages/products/BizTrackerPage';
import TwendePage from './pages/products/TwendePage';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import ServicesManager from './pages/admin/ServicesManager';
import PortfolioManager from './pages/admin/PortfolioManager';
import TeamManager from './pages/admin/TeamManager';
import MessagesPage from './pages/admin/MessagesPage';
import UsersPage from './pages/admin/UsersPage';
import AuditLogsPage from './pages/admin/AuditLogsPage';
import SettingsPage from './pages/admin/SettingsPage';
import ContentEditor from './pages/admin/ContentEditor';
import HeroManager from './pages/admin/HeroManager';
import ReportsDashboard from './pages/admin/ReportsDashboard';
import ProductsManager from './pages/admin/ProductsManager';



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
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
