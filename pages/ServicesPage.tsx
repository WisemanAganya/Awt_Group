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

import { services as fallbackServices, industries } from '../constants';
import { BusinessIcon, MobileIcon, EcommerceIcon } from '../components/icons';

const iconMap: { [key: string]: React.ComponentType } = {
  Business: BusinessIcon,
  Mobile: MobileIcon,
  Ecommerce: EcommerceIcon,
};

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
      <section className="relative z-10 mb-40">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <div key={index} className="glass-card p-12 group reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-16 h-16 glass-card bg-blue-500/10 text-blue-400 flex items-center justify-center mb-8 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                    {Icon ? <Icon /> : <BusinessIcon />}
                  </div>
                  <h2 className="text-3xl font-extrabold text-white mb-6 tracking-tight group-hover:text-blue-400 transition-colors">{service.name}</h2>
                  <p className="text-awt-text-secondary mb-10 leading-relaxed text-lg">{service.description}</p>
                  <button className="btn-secondary px-8 py-3">Explore Solution</button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="relative z-10 bg-white/[0.02] py-32">
        <div className="container-premium">
          <div className="text-center mb-24 reveal">
            <h2 className="text-5xl font-extrabold text-white mb-6">Industries We <span className="text-blue-500 italic">Serve</span></h2>
            <p className="text-awt-text-secondary max-w-2xl mx-auto">We specialize in building custom applications and enterprise systems that solve real business challenges across key sectors.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => {
              const Icon = iconMap[industry.icon];
              return (
                <div key={index} className="glass-card p-10 hover:border-blue-500/30 transition-all group reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 mb-8 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    {Icon ? <Icon /> : <BusinessIcon />}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{industry.name}</h3>
                  <p className="text-awt-text-secondary text-sm leading-relaxed">{industry.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;