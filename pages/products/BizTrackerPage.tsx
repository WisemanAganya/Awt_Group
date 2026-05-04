import React from 'react';
import { Link } from 'react-router-dom';

const BizTrackerPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <div className="text-center mb-16 animate-float">
          <h1 className="hero-title text-gradient">BizTracker Pro</h1>
          <p className="hero-subtitle mt-6">
            The ultimate management solution for MSMEs. Track, manage, and scale your business processes with ease.
          </p>
          <div className="mt-8">
            <button className="btn-aurora pulse-glow text-lg px-8 py-3">Start Free Trial</button>
            <Link to="/contact" className="ml-4 text-gray-300 hover:text-white transition">Contact Sales</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="glass-panel p-8">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Financial Tracking</h3>
            <p className="text-gray-400">Keep a close eye on your revenue, expenses, and overall financial health in real-time.</p>
          </div>
          
          <div className="glass-panel p-8">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Inventory Management</h3>
            <p className="text-gray-400">Automate stock levels, receive low inventory alerts, and manage suppliers seamlessly.</p>
          </div>

          <div className="glass-panel p-8">
            <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">CRM Included</h3>
            <p className="text-gray-400">Build better relationships with your customers through integrated tracking and communication tools.</p>
          </div>
        </div>

        <div className="mt-24 glass-panel p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your business?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Join thousands of MSMEs who are already using BizTracker Pro to streamline their operations and boost profitability.</p>
          <button className="btn-aurora text-lg px-8 py-3">Get Started Today</button>
        </div>
      </div>
    </div>
  );
};

export default BizTrackerPage;
