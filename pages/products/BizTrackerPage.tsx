import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Package, Users, ArrowRight } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const BizTrackerPage: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-brand-mist opacity-30 z-0 pointer-events-none" />

      {/* Page Header */}
      <section className="relative z-10 pt-40 pb-24 lg:pt-56 lg:pb-32 border-b border-ui-line bg-white">
        <div className="wrap text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
            <motion.div variants={fadeIn} className="inline-flex items-center space-x-2 bg-brand-blue/10 border border-brand-blue/20 px-4 py-2 rounded-full mb-8">
              <span className="text-[10px] font-bold text-brand-blue-light uppercase tracking-widest">Enterprise SaaS</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-display font-extrabold text-content-primary leading-[1.1] mb-8">
              BizTracker <span className="text-brand-blue italic">Pro</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-content-secondary leading-relaxed max-w-3xl mx-auto mb-10">
              The ultimate management solution for MSMEs. Track, manage, and scale your business processes with ease.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <button className="btn-primary w-full sm:w-auto px-10 py-4 flex justify-center items-center">
                Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <Link to="/contact" className="text-content-secondary hover:text-content-primary transition-colors font-semibold uppercase tracking-wider text-sm">
                Contact Sales
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 lg:py-32 relative z-10">
        <div className="wrap">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 lg:gap-10"
          >
            <motion.div variants={fadeIn} className="bg-white border border-ui-line rounded-lg shadow-sm p-10 lg:p-12 rounded-3xl relative overflow-hidden group border-brand-blue/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center mb-8 text-brand-blue border border-brand-blue/20 group-hover:bg-brand-blue group-hover:text-content-primary transition-colors duration-500 shadow-xl">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-content-primary group-hover:text-brand-blue-light transition-colors">Financial Tracking</h3>
              <p className="text-content-secondary leading-relaxed">Keep a close eye on your revenue, expenses, and overall financial health in real-time.</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white border border-ui-line rounded-lg shadow-sm p-10 lg:p-12 rounded-3xl relative overflow-hidden group border-brand-yellow/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-brand-yellow/10 flex items-center justify-center mb-8 text-brand-yellow border border-brand-yellow/20 group-hover:bg-brand-yellow group-hover:text-background transition-colors duration-500 shadow-xl">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-content-primary group-hover:text-brand-yellow transition-colors">Inventory Management</h3>
              <p className="text-content-secondary leading-relaxed">Automate stock levels, receive low inventory alerts, and manage suppliers seamlessly.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white border border-ui-line rounded-lg shadow-sm p-10 lg:p-12 rounded-3xl relative overflow-hidden group border-brand-blue-light/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue-light/10 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-brand-blue-light/10 flex items-center justify-center mb-8 text-brand-blue-light border border-brand-blue-light/20 group-hover:bg-brand-blue-light group-hover:text-background transition-colors duration-500 shadow-xl">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-content-primary group-hover:text-brand-blue-light transition-colors">CRM Included</h3>
              <p className="text-content-secondary leading-relaxed">Build better relationships with your customers through integrated tracking and communication tools.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="wrap">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="bg-white border border-ui-line rounded-lg shadow-sm p-12 lg:p-24 rounded-[3rem] text-center relative overflow-hidden group border-brand-blue/20"
          >
             <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-brand-blue/10 blur-[100px] rounded-full pointer-events-none" />
             <div className="relative z-10">
               <h2 className="text-4xl lg:text-5xl font-display font-extrabold text-content-primary mb-6">Ready to <span className="text-brand-blue italic">Transform</span> your business?</h2>
               <p className="text-xl text-content-secondary mb-10 max-w-2xl mx-auto">Join thousands of MSMEs who are already using BizTracker Pro to streamline their operations and boost profitability.</p>
               <div className="flex justify-center">
                 <button className="btn-primary text-lg px-10 py-4 shadow-[0_0_40px_rgba(0,87,184,0.2)]">
                   Get Started Today
                 </button>
               </div>
             </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BizTrackerPage;




