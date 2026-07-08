import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShieldCheck, Video, MessageSquare, CreditCard, ArrowRight, MapPin } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const TwendePage: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-brand-mist opacity-30 z-0 pointer-events-none" />

      {/* Page Header */}
      <section className="relative z-10 pt-40 pb-24 lg:pt-56 lg:pb-32 border-b border-ui-line bg-white">
        <div className="wrap text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-5xl mx-auto">
            <motion.div variants={fadeIn} className="inline-flex items-center space-x-2 bg-brand-yellow/10 border border-brand-yellow/20 px-4 py-2 rounded-full mb-8">
              <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest">Real Estate Tech</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-display font-extrabold text-content-primary leading-[1.1] mb-8">
              Twende <span className="text-brand-yellow italic">House Hunting</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-content-secondary leading-relaxed max-w-3xl mx-auto mb-12">
              Your trusted companion for finding the perfect home. Browse, compare, and secure your next rental or purchase with absolute confidence.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <button className="btn-primary w-full sm:w-auto px-10 py-4 flex justify-center items-center bg-brand-yellow hover:bg-brand-yellow/90 text-background">
                Browse Properties <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <Link to="/contact" className="bg-white border border-ui-line rounded-lg shadow-sm px-10 py-4 flex items-center justify-center hover:bg-brand-mist/50 transition-colors rounded-full font-bold uppercase tracking-widest text-xs border-ui-line hover:border-brand-yellow/30 text-content-primary">
                List Your Property
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Preview */}
      <section className="py-24 relative z-10">
        <div className="wrap">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
             className="bg-white border border-ui-line rounded-lg shadow-sm p-4 md:p-6 rounded-[2.5rem] relative overflow-hidden group border-brand-yellow/20"
           >
              <div className="aspect-[21/9] rounded-[2rem] bg-background overflow-hidden relative border border-ui-line">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <div className="w-20 h-20 rounded-full bg-brand-yellow/20 flex items-center justify-center mb-6 text-brand-yellow backdrop-blur-md border border-brand-yellow/30 animate-pulse">
                    <MapPin className="w-10 h-10" />
                  </div>
                  <span className="text-3xl font-display font-bold text-content-primary shadow-sm">Interactive Map View</span>
                  <span className="text-brand-yellow font-bold uppercase tracking-widest text-xs mt-4">Coming Soon</span>
                </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Why Choose Twende */}
      <section className="py-24 lg:py-32 relative z-10 bg-brand-mist/30 border-y border-ui-line">
        <div className="wrap">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-display font-extrabold text-content-primary mb-6">Why Choose <span className="text-brand-yellow italic">Twende?</span></h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-brand-yellow to-brand-blue mx-auto rounded-full mt-10" />
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {[
              { title: 'Verified Listings', desc: 'Every property is physically verified by our team to prevent fraud.', icon: ShieldCheck },
              { title: 'Virtual Tours', desc: 'Explore homes from your couch with our immersive 3D virtual tours.', icon: Video },
              { title: 'Direct Contact', desc: 'Chat directly with landlords and property managers without middlemen.', icon: MessageSquare },
              { title: 'Secure Payments', desc: 'Pay your deposit and rent securely through our integrated platform.', icon: CreditCard }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div key={i} variants={fadeIn} className="bg-white border border-ui-line rounded-lg shadow-sm hover:border-brand-blue hover:-translate-y-1 transition-all duration-300 p-8 lg:p-10 rounded-3xl group flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-brand-yellow/10 flex items-center justify-center mb-6 text-brand-yellow border border-brand-yellow/20 group-hover:bg-brand-yellow group-hover:text-background transition-colors duration-500 shadow-xl">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-content-primary group-hover:text-brand-yellow transition-colors">{feature.title}</h3>
                  <p className="text-content-secondary leading-relaxed text-sm">{feature.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default TwendePage;




