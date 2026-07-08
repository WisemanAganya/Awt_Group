import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { services as fallbackServices, industries } from '../constants';

import { 
  BusinessIcon, MobileIcon, EcommerceIcon,
  SMEIcon, RealEstateIcon, TransportIcon, FinanceIcon
} from '../components/icons';

const iconMap: { [key: string]: React.ComponentType } = {
  Business: BusinessIcon, Mobile: MobileIcon, Ecommerce: EcommerceIcon,
  SME: SMEIcon, RealEstate: RealEstateIcon, Transport: TransportIcon, Finance: FinanceIcon,
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const ServicesPage: React.FC = () => {
  // Use the specific services provided by the user
  const services = fallbackServices;

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
              <div className="txt">Our Expertise</div>
              <div className="bar"></div>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-[clamp(38px,5.6vw,64px)] font-display font-bold text-brand-black leading-[1.06] mb-[26px]">
              Next-Gen <span className="text-brand-blue italic">Solutions</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-[17px] text-black/70 leading-[1.65] max-w-[520px] mx-auto">
              Empowering the modern economy through state-of-the-art digital architecture and innovative engineering.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-[120px] relative z-10 bg-white">
        <div className="wrap">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid md:grid-cols-2 gap-[28px]"
          >
            {services.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div key={index} variants={fadeIn} className="bg-brand-mist border border-black/[0.04] p-[40px] rounded-[16px] group relative overflow-hidden flex flex-col h-full hover:-translate-y-[6px] transition-transform duration-300">
                  <div className="w-16 h-16 rounded-[12px] bg-white border border-black/[0.04] flex items-center justify-center mb-[24px] text-brand-blue shadow-sm">
                    {Icon ? <Icon /> : <Zap className="w-8 h-8" />}
                  </div>
                  
                  <h2 className="text-[24px] font-semibold text-brand-black mb-[16px] tracking-tight group-hover:text-brand-blue transition-colors">{service.name}</h2>
                  <p className="text-black/70 mb-[32px] leading-[1.65] text-[15px] flex-grow">{service.description}</p>
                  
                  <div className="mt-auto">
                    <button className="text-[13px] font-bold text-brand-black uppercase tracking-[0.1em] flex items-center gap-[8px] hover:text-brand-blue transition-colors group/btn">
                      Explore Solution <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Our Solutions */}
      <section className="py-[120px] relative z-10 bg-brand-mist border-y border-black/[0.04]">
        <div className="wrap">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center max-w-[600px] mx-auto mb-[64px]">
            <div className="div-line justify-center"><div className="bar"></div><div className="txt">Industries We Serve</div><div className="bar"></div></div>
            <h2 className="text-[36px] font-semibold mt-[16px] mb-[12px] text-brand-black">Our <span className="text-brand-blue italic">Solutions</span></h2>
            <p className="text-[16px] text-black/70 leading-[1.65]">We specialize in building custom applications and enterprise systems that solve real business challenges across key sectors.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid md:grid-cols-2 gap-[28px]"
          >
            {industries.map((industry, index) => {
              const Icon = iconMap[industry.icon];
              return (
                <motion.div key={index} variants={fadeIn} className="bg-white border border-black/[0.04] rounded-[16px] hover:-translate-y-[6px] transition-transform duration-300 p-[40px] group flex flex-col h-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[20px] mb-[24px]">
                    <div className="w-[56px] h-[56px] shrink-0 rounded-[12px] bg-brand-mist flex items-center justify-center text-brand-blue">
                      {Icon ? <Icon /> : <BusinessIcon />}
                    </div>
                    <div>
                      <h3 className="text-[20px] font-bold text-brand-black mb-[4px]">{industry.name}</h3>
                      <p className="text-brand-gold text-[11px] font-bold uppercase tracking-[0.1em]">{industry.tagline}</p>
                    </div>
                  </div>
                  
                  <p className="text-black/70 mb-[32px] leading-[1.65] text-[15px] flex-grow">{industry.description}</p>
                  
                  <ul className="grid sm:grid-cols-2 gap-[12px] mt-auto">
                    {industry.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-black/70 text-[14px]">
                        <CheckCircle2 className="w-[16px] h-[16px] text-brand-blue mr-[8px] shrink-0 mt-[2px]" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
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
            <div className="div-line"><div className="bar"></div><div className="txt !text-brand-gold">Custom Engineering</div><div className="bar"></div></div>
            <h2 className="text-[clamp(30px,4vw,44px)] font-semibold mt-[20px] mb-[30px]">
              Need a Custom Solution for Your Business?
            </h2>
            <div className="flex justify-center">
              <a href="/contact" className="cta-btn !bg-brand-blue hover:!bg-brand-gold">
                Schedule a Strategy Call →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;



