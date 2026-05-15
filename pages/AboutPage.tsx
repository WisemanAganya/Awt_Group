import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { usePageContent } from '../hooks/usePageContent';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
}

import { VisionIcon, MissionIcon } from '../components/icons';
import { teamMembers } from '../constants';


const AboutPage: React.FC = () => {
  const { content: aboutContent, loading: aboutLoading } = usePageContent('about_content');

  // We use the specific team members provided in constants.ts for "The Vanguard"
  const team = teamMembers;

  return (
    <div className="min-h-screen pt-48 pb-32 relative">
      <div className="bg-mesh"></div>
      
      {/* Hero Section */}
      <section className="relative z-10 mb-32">
        <div className="container-premium text-center reveal">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8">
            Behind the Systems
          </div>
          <h1 className="hero-title text-gradient mb-8">Architecting the <br />Digital Future</h1>
          <p className="hero-subtitle text-xl max-w-3xl mx-auto">
            AWT Group is a collective of visionary engineers, designers, and strategists committed to transforming the business landscape through state-of-the-art innovation.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section - Overhauled */}
      <section className="relative z-10 mb-40">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="glass-card p-12 md:p-16 group hover:bg-blue-500/[0.02] transition-all reveal">
              <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-10 text-blue-500 shadow-[0_0_30px_rgba(0,87,184,0.2)] group-hover:shadow-[0_0_50px_rgba(0,87,184,0.4)] transition-all">
                <MissionIcon />
              </div>
              <h2 className="text-4xl font-extrabold mb-8 text-white tracking-tight">Our Mission</h2>
              <p className="text-awt-text-secondary leading-relaxed text-lg">
                "To build innovative digital solutions that empower businesses, create opportunities, and drive sustainable economic growth while operating with integrity, excellence, and purpose."
              </p>
            </div>

            
            <div className="glass-card p-12 md:p-16 group hover:bg-cyan-500/[0.02] transition-all reveal" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-10 text-cyan-500 shadow-[0_0_30px_rgba(0,163,224,0.2)] group-hover:shadow-[0_0_50px_rgba(0,163,224,0.4)] transition-all">
                <VisionIcon />
              </div>
              <h2 className="text-4xl font-extrabold mb-8 text-white tracking-tight">Our Vision</h2>
              <p className="text-awt-text-secondary leading-relaxed text-lg italic">
                "Transforming Businesses and Lives through Innovation."
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Team Section - State-of-the-Art Cards */}
      <section className="relative z-10">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 reveal">
            <div>
              <h2 className="text-5xl font-extrabold text-white mb-6">The Vanguard</h2>
              <p className="text-awt-text-secondary max-w-xl">Meet the innovators driving the technological revolution at AWT Group.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="glass-card group reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative h-96 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-awt-bg via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">{member.role}</p>
                  
                  <div className="flex gap-4">
                    {['twitter', 'linkedin'].map(social => (
                      <a key={social} href="#" className="text-awt-text-secondary hover:text-white transition-colors">
                        <span className="text-[10px] font-bold uppercase tracking-widest">{social}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Footer (Fallback) */}
      <section className="mt-20">
        <div className="container-premium flex flex-col md:flex-row gap-12 justify-center">
            <div className="flex items-start group">
              <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
                <MailIcon />
              </div>
              <div className="ml-6">
                <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
                <p className="text-gray-400 text-lg">{loading ? 'Loading...' : (contactInfo?.email || 'awtgroup.co.ke')}</p>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="w-14 h-14 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                <PhoneIcon />
              </div>
              <div className="ml-6">
                <h3 className="text-lg font-bold text-white mb-1">Call Us</h3>
                <p className="text-gray-400 text-lg">{loading ? 'Loading...' : (contactInfo?.phone || '+254 714 441 312')}</p>
              </div>
            </div>
        </div>
      </section>
    </div>
  );

};

export default AboutPage;