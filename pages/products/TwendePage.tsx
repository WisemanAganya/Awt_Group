import React from 'react';
import { Link } from 'react-router-dom';

const TwendePage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="lg:w-1/2">
            <h1 className="hero-title text-gradient mb-6">Twende House Hunting</h1>
            <p className="hero-subtitle mx-0 mb-8">
              Your trusted companion for finding the perfect home. Browse, compare, and secure your next rental or purchase with absolute confidence.
            </p>
            <div className="flex gap-4">
              <button className="btn-aurora">Browse Properties</button>
              <Link to="/contact" className="glass-panel px-6 py-3 flex items-center hover:bg-white/10 transition rounded-full">List Your Property</Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="glass-panel p-2 rounded-2xl animate-float">
              <div className="aspect-video rounded-xl bg-gray-800 overflow-hidden relative">
                {/* Placeholder for actual app demo or image */}
                <div className="absolute inset-0 bg-gradient-aurora opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <svg className="w-16 h-16 text-white opacity-80 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                  <span className="text-xl font-medium text-white/90">Interactive Map View</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Twende House Hunting?</h2>
          <div className="w-24 h-1 bg-aurora-primary mx-auto rounded-full bg-gradient-aurora"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Verified Listings', desc: 'Every property is physically verified by our team to prevent fraud.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { title: 'Virtual Tours', desc: 'Explore homes from your couch with our immersive 3D virtual tours.', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
            { title: 'Direct Contact', desc: 'Chat directly with landlords and property managers without middlemen.', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
            { title: 'Secure Payments', desc: 'Pay your deposit and rent securely through our integrated platform.', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-6 hover:-translate-y-2 transition duration-300">
              <svg className="w-10 h-10 text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={feature.icon}></path>
              </svg>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwendePage;
