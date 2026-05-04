import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { BusinessIcon } from '../components/icons';

interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  features: string[];
}

import { services as fallbackServices } from '../constants';

const ServicesPage: React.FC = () => {
  // Use the specific services provided by the user
  const services = fallbackServices;

  return (
    <div className="min-h-screen pt-48 pb-32 relative overflow-hidden">
      <div className="bg-mesh"></div>

      {/* Page Header */}
      <section className="relative z-10 mb-24">
        <div className="container-premium text-center reveal">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8">
            Our Expertise
          </div>
          <h1 className="hero-title text-gradient mb-8">Next-Gen Solutions</h1>
          <p className="hero-subtitle text-xl max-w-3xl mx-auto">
            Empowering the modern economy through state-of-the-art digital architecture and innovative engineering.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div key={index} className="glass-card p-10 group reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 glass-card bg-blue-500/10 text-blue-400 flex items-center justify-center mb-8 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                  <BusinessIcon />
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">{service.name}</h2>
                <p className="text-awt-text-secondary mb-8 leading-relaxed">{service.description}</p>
                <button className="btn-secondary w-full py-4">Explore Solution</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;