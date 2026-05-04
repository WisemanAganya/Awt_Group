import React from 'react';
import { jobOpenings } from '../constants';

const CareersPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      {/* Page Header */}
      <section className="relative z-10 mb-24">
        <div className="container-custom text-center animate-float">
          <h1 className="hero-title text-gradient mb-6">Join Our Team</h1>
          <p className="hero-subtitle text-xl max-w-3xl mx-auto">
            Be a part of a visionary team that's building state-of-the-art technological solutions and shaping the digital future of Africa.
          </p>
        </div>
      </section>
      
      {/* Why Work With Us */}
      <section className="relative z-10 mb-32">
        <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Work at AWT Group?</h2>
              <p className="max-w-3xl mx-auto text-gray-400 text-lg">
                  We are more than just a company; we are a community of passionate individuals dedicated to excellence. We offer a dynamic work environment, opportunities for professional growth, and a chance to work on impactful projects.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="glass-panel p-10 hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-aurora flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-500/20">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Innovative Projects</h3>
                    <p className="text-gray-400 leading-relaxed">Work with cutting-edge technologies on state-of-the-art applications that solve real-world problems.</p>
                </div>
                <div className="glass-panel p-10 hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-aurora flex items-center justify-center mb-6 text-white shadow-lg shadow-cyan-500/20">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Professional Growth</h3>
                    <p className="text-gray-400 leading-relaxed">We invest heavily in our team's development through continuous training, mentorship, and challenging opportunities.</p>
                </div>
                <div className="glass-panel p-10 hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-aurora flex items-center justify-center mb-6 text-white shadow-lg shadow-purple-500/20">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Collaborative Culture</h3>
                    <p className="text-gray-400 leading-relaxed">Join a highly supportive and collaborative team where your ideas are valued and your voice drives innovation.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="relative z-10">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Current Openings</h2>
            <div className="w-24 h-1 bg-gradient-aurora mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {jobOpenings.length === 0 ? (
              <div className="glass-panel p-10 text-center text-gray-400">There are currently no open positions. Please check back later.</div>
            ) : (
              <div className="space-y-6">
                {jobOpenings.map((job, index) => (
                  <div key={index} className="glass-panel p-8 flex flex-col sm:flex-row justify-between items-center hover:border-blue-500/50 transition-colors duration-300 group">
                    <div className="text-center sm:text-left mb-6 sm:mb-0">
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-sm font-semibold">{job.department}</span>
                        <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-sm font-semibold flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          {job.location}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-sm font-semibold flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <div>
                      <a href={`mailto:careers@awtgroup.com?subject=Application for ${job.title}`} className="btn-aurora px-8 py-3 whitespace-nowrap">
                        Apply Now
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
