import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Mail, Phone, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageContent } from '../hooks/usePageContent';
import { teamMembers } from '../constants';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const AboutPage: React.FC = () => {
  const { content: aboutContent, loading: aboutLoading } = usePageContent('about_content');

  // We use the specific team members provided in constants.ts for "The Vanguard"
  const team = teamMembers;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-brand-mist opacity-30 z-0 pointer-events-none" />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-24 lg:pt-56 lg:pb-32 bg-brand-mist border-b border-black/[0.04]">
        <div className="wrap text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
            <motion.div variants={fadeIn} className="div-line justify-center mb-[24px]">
              <div className="bar"></div>
              <div className="txt">Behind the Systems</div>
              <div className="bar"></div>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-[clamp(38px,5.6vw,64px)] font-display font-bold text-brand-black leading-[1.06] mb-[26px]">
              Architecting the <br /> <span className="text-brand-blue italic">Digital Future</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-[17px] text-black/70 leading-[1.65] max-w-[520px] mx-auto">
              AWT Group is a collective of visionary engineers, designers, and strategists committed to transforming the business landscape through state-of-the-art innovation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 lg:py-[120px] relative z-10 bg-white">
        <div className="wrap">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid md:grid-cols-2 gap-[28px]"
          >
            <motion.div variants={fadeIn} className="bg-brand-mist border border-black/[0.04] p-[40px] rounded-[16px] group relative overflow-hidden hover:-translate-y-[6px] transition-transform duration-300">
              <div className="w-2 h-2 rounded-full bg-brand-blue mb-[24px]"></div>
              <h2 className="text-[28px] font-display font-semibold mb-[16px] text-brand-black tracking-tight">Our Mission</h2>
              <p className="text-black/70 leading-[1.65] text-[15px]">
                "To build innovative digital solutions that empower businesses, create opportunities, and drive sustainable economic growth while operating with integrity, excellence, and purpose."
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-brand-mist border border-black/[0.04] p-[40px] rounded-[16px] group relative overflow-hidden hover:-translate-y-[6px] transition-transform duration-300">
              <div className="w-2 h-2 rounded-full bg-brand-gold mb-[24px]"></div>
              <h2 className="text-[28px] font-display font-semibold mb-[16px] text-brand-black tracking-tight">Our Vision</h2>
              <p className="text-black/70 leading-[1.65] text-[15px] italic">
                "Transforming Businesses and Lives through Innovation."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-[120px] relative z-10 bg-brand-mist border-y border-black/[0.04]">
        <div className="wrap">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center max-w-[560px] mx-auto mb-[64px]">
            <div className="div-line"><div className="bar"></div><div className="txt">Our Team</div><div className="bar"></div></div>
            <h2 className="text-[36px] font-semibold mt-[16px]">The Vanguard</h2>
            <p className="text-[16px] leading-[1.65] text-black/70 mt-[12px]">Meet the innovators driving the technological revolution at AWT Group.</p>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-[28px]"
          >
            {team.map((member, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-white border border-black/[0.04] rounded-[16px] overflow-hidden group hover:-translate-y-[6px] transition-transform duration-300">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                    <h3 className="text-[22px] font-semibold text-white mb-1 group-hover:text-brand-gold transition-colors">{member.name}</h3>
                    <p className="text-brand-blue-light text-[11px] font-bold uppercase tracking-[0.15em]">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="py-[110px] relative z-10 bg-brand-black text-white text-center">
        <div className="wrap">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="max-w-[600px] mx-auto"
          >
            <div className="div-line"><div className="bar"></div><div className="txt !text-brand-gold">Join the Revolution</div><div className="bar"></div></div>
            <h2 className="text-[clamp(30px,4vw,44px)] font-semibold mt-[20px] mb-[30px]">
              We're looking for ambitious partners to build the next generation of digital systems.
            </h2>
            <div className="flex justify-center">
              <Link to="/contact" className="cta-btn !bg-brand-blue hover:!bg-brand-gold">
                Contact Us →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;



