import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, GraduationCap, HeartHandshake, MapPin, Clock, ArrowRight } from 'lucide-react';
import { jobOpenings } from '../constants';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const CareersPage: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-brand-mist opacity-30 z-0 pointer-events-none" />

      {/* Page Header */}
      <section className="relative z-10 pt-40 pb-24 lg:pt-56 lg:pb-32 bg-brand-mist border-b border-black/[0.04]">
        <div className="wrap text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
            <motion.div variants={fadeIn} className="div-line justify-center mb-[24px]">
              <div className="bar"></div>
              <div className="txt">Careers</div>
              <div className="bar"></div>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-[clamp(38px,5.6vw,64px)] font-display font-bold text-brand-black leading-[1.06] mb-[26px]">
              Join Our <span className="text-brand-blue italic">Team</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-[17px] text-black/70 leading-[1.65] max-w-[520px] mx-auto">
              Be a part of a visionary team that's building state-of-the-art technological solutions and shaping the digital future of Africa.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Why Work With Us */}
      <section className="py-[120px] relative z-10 bg-white">
        <div className="wrap">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center max-w-[600px] mx-auto mb-[64px]">
            <div className="div-line justify-center"><div className="bar"></div><div className="txt">Benefits</div><div className="bar"></div></div>
            <h2 className="text-[36px] font-semibold mt-[16px] mb-[12px] text-brand-black">Why Work at AWT Group?</h2>
            <p className="text-[16px] text-black/70 leading-[1.65]">
              We are a community of passionate individuals dedicated to excellence. We offer a dynamic work environment, opportunities for professional growth, and a chance to work on impactful projects.
            </p>
          </motion.div>
            
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid md:grid-cols-3 gap-[28px]"
          >
            <motion.div variants={fadeIn} className="bg-brand-mist border border-black/[0.04] p-[40px] rounded-[16px] relative overflow-hidden group hover:-translate-y-[6px] transition-transform duration-300">
              <div className="w-16 h-16 rounded-[12px] bg-white text-brand-blue border border-black/[0.04] flex items-center justify-center mb-[24px] shadow-sm">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-[20px] font-bold mb-[12px] text-brand-black group-hover:text-brand-blue transition-colors">Innovative Projects</h3>
              <p className="text-black/70 text-[15px] leading-[1.65]">Work with cutting-edge technologies on state-of-the-art applications that solve real-world problems.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-brand-mist border border-black/[0.04] p-[40px] rounded-[16px] relative overflow-hidden group hover:-translate-y-[6px] transition-transform duration-300">
              <div className="w-16 h-16 rounded-[12px] bg-white text-brand-gold border border-black/[0.04] flex items-center justify-center mb-[24px] shadow-sm">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-[20px] font-bold mb-[12px] text-brand-black group-hover:text-brand-gold transition-colors">Professional Growth</h3>
              <p className="text-black/70 text-[15px] leading-[1.65]">We invest heavily in our team's development through continuous training, mentorship, and challenging opportunities.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-brand-mist border border-black/[0.04] p-[40px] rounded-[16px] relative overflow-hidden group hover:-translate-y-[6px] transition-transform duration-300">
              <div className="w-16 h-16 rounded-[12px] bg-white text-[#4C7BFF] border border-black/[0.04] flex items-center justify-center mb-[24px] shadow-sm">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <h3 className="text-[20px] font-bold mb-[12px] text-brand-black group-hover:text-[#4C7BFF] transition-colors">Collaborative Culture</h3>
              <p className="text-black/70 text-[15px] leading-[1.65]">Join a highly supportive and collaborative team where your ideas are valued and your voice drives innovation.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-[120px] relative z-10 bg-brand-mist border-y border-black/[0.04]">
        <div className="wrap">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-[64px]">
            <h2 className="text-[36px] font-semibold text-brand-black mb-[16px]">Current Openings</h2>
            <div className="div-line justify-center"><div className="bar"></div></div>
          </motion.div>
          
          <div className="max-w-[800px] mx-auto">
            {jobOpenings.length === 0 ? (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-white border border-black/[0.04] p-[40px] text-center rounded-[16px]">
                <p className="text-black/70 text-[15px]">There are currently no open positions. Please check back later.</p>
              </motion.div>
            ) : (
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
                className="space-y-[16px]"
              >
                {jobOpenings.map((job, index) => (
                  <motion.div key={index} variants={fadeIn} className="bg-white border border-black/[0.04] hover:-translate-y-[2px] transition-transform duration-300 p-[32px] rounded-[16px] flex flex-col md:flex-row justify-between items-start md:items-center gap-[24px] group shadow-sm hover:shadow-md">
                    <div className="flex-1">
                      <h3 className="text-[20px] font-bold text-brand-black mb-[12px] group-hover:text-brand-blue transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap gap-[12px]">
                        <span className="px-[12px] py-[4px] rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-[0.1em] border border-brand-blue/20">
                          {job.department}
                        </span>
                        <span className="px-[12px] py-[4px] rounded-full bg-brand-mist text-black/60 text-[10px] font-bold uppercase tracking-[0.1em] border border-black/10 flex items-center">
                          <MapPin className="w-3 h-3 mr-[6px]" />
                          {job.location}
                        </span>
                        <span className="px-[12px] py-[4px] rounded-full bg-brand-mist text-black/60 text-[10px] font-bold uppercase tracking-[0.1em] border border-black/10 flex items-center">
                          <Clock className="w-3 h-3 mr-[6px]" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="w-full md:w-auto">
                      <a href={`mailto:careers@awtgroup.co.ke?subject=Application for ${job.title}`} className="cta-btn w-full md:w-auto !py-[12px] !px-[24px] !text-[13px] flex justify-center items-center">
                        Apply Now <ArrowRight className="w-4 h-4 ml-[8px]" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;




