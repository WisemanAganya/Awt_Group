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
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h2 className="text-4xl font-extrabold mb-8 text-white tracking-tight">Our Mission</h2>
              <p className="text-awt-text-secondary leading-relaxed text-lg">
                "To build innovative digital solutions that empower businesses, create opportunities, and drive sustainable economic growth while operating with integrity, excellence, and purpose."
              </p>
            </div>
            
            <div className="glass-card p-12 md:p-16 group hover:bg-cyan-500/[0.02] transition-all reveal" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-10 text-cyan-500 shadow-[0_0_30px_rgba(0,163,224,0.2)] group-hover:shadow-[0_0_50px_rgba(0,163,224,0.4)] transition-all">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <h2 className="text-4xl font-extrabold mb-8 text-white tracking-tight">Our Vision</h2>
              <p className="text-awt-text-secondary leading-relaxed text-lg italic">
                "Transforming Business and Lives through Innovation."
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
    </div>
  );

};

export default AboutPage;