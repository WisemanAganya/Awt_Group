import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { MailIcon, PhoneIcon, MapPinIcon } from '../components/icons';
import { usePageContent } from '../hooks/usePageContent';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const ContactPage: React.FC = () => {
  const { content: contactInfo, loading } = usePageContent('contact_info');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');

    try {
      const { error } = await supabase.from('messages').insert([formData]);
      if (error) throw error;
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting message:', error);
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-brand-mist opacity-30 z-0 pointer-events-none" />

      {/* Contact Header */}
      <section className="relative z-10 pt-40 pb-24 lg:pt-56 lg:pb-32 bg-brand-mist border-b border-black/[0.04]">
        <div className="wrap text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
            <motion.div variants={fadeIn} className="div-line justify-center mb-[24px]">
              <div className="bar"></div>
              <div className="txt">Connect</div>
              <div className="bar"></div>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-[clamp(38px,5.6vw,64px)] font-display font-bold text-brand-black leading-[1.06] mb-[26px]">
              Let's <span className="text-brand-gold italic">Connect</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-[17px] text-black/70 leading-[1.65] max-w-[520px] mx-auto">
              Ready to start your next big project or need more information about our state-of-the-art products? We'd love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-[120px] relative z-10 bg-white">
        <div className="wrap">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-[48px] items-start"
          >
            {/* Contact Info */}
            <motion.div variants={fadeIn} className="space-y-[32px]">
              <div className="bg-brand-mist border border-black/[0.04] p-[40px] rounded-[16px] h-full">
                <h2 className="text-[28px] font-semibold mb-[40px] text-brand-black">Get in Touch</h2>
                
                <div className="space-y-[32px]">
                  <div className="flex items-start group">
                    <div className="w-[56px] h-[56px] rounded-[12px] bg-white text-brand-blue flex items-center justify-center flex-shrink-0 shadow-sm border border-black/[0.04]">
                      <MapPinIcon />
                    </div>
                    <div className="ml-[24px]">
                      <h3 className="text-[12px] font-bold text-brand-black mb-[4px] uppercase tracking-[0.1em]">Our Headquarters</h3>
                      <p className="text-black/70 text-[15px]">{loading ? 'Loading...' : (contactInfo?.address || "Nyayo Highrise, Lang'ata Nairobi, Kenya")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="w-[56px] h-[56px] rounded-[12px] bg-white text-brand-gold flex items-center justify-center flex-shrink-0 shadow-sm border border-black/[0.04]">
                      <MailIcon />
                    </div>
                    <div className="ml-[24px]">
                      <h3 className="text-[12px] font-bold text-brand-black mb-[4px] uppercase tracking-[0.1em]">Email Us</h3>
                      <p className="text-black/70 text-[15px]">{loading ? 'Loading...' : (contactInfo?.email || 'info@awtgroup.co.ke')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="w-[56px] h-[56px] rounded-[12px] bg-white text-brand-blue-light flex items-center justify-center flex-shrink-0 shadow-sm border border-black/[0.04]">
                      <PhoneIcon />
                    </div>
                    <div className="ml-[24px]">
                      <h3 className="text-[12px] font-bold text-brand-black mb-[4px] uppercase tracking-[0.1em]">Call Us</h3>
                      <p className="text-black/70 text-[15px]">{loading ? 'Loading...' : (contactInfo?.phone || '+254 714 441 312')}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-[48px] pt-[48px] border-t border-black/10">
                  {/* Interactive Map Placeholder */}
                  <div className="bg-white border border-black/[0.04] rounded-[12px] h-[240px] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-brand-black/40 flex items-center justify-center z-10 transition-colors duration-500 backdrop-blur-sm group-hover:backdrop-blur-none">
                       <span className="text-white font-bold tracking-[0.2em] uppercase text-[11px]">Interactive Map Loading...</span>
                    </div>
                    <div className="w-full h-full bg-[url('https://picsum.photos/seed/map/800/400')] bg-cover opacity-50 transition-transform duration-1000 group-hover:scale-105" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeIn} className="bg-white border border-black/[0.04] p-[40px] rounded-[16px] relative overflow-hidden h-full">
              <h2 className="text-[28px] font-semibold mb-[32px] text-brand-black relative z-10">Send a Message</h2>
              
              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-[32px] p-[16px] bg-green-50 text-[#1E4FD6] text-[14px] font-medium rounded-[8px] flex items-center relative z-10">
                  <CheckCircle2 className="w-5 h-5 mr-[12px] shrink-0" />
                  Message sent successfully! We'll get back to you shortly.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-[32px] p-[16px] bg-red-50 text-red-600 text-[14px] font-medium rounded-[8px] flex items-center relative z-10">
                  <AlertCircle className="w-5 h-5 mr-[12px] shrink-0" />
                  Something went wrong. Please try again.
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-[24px] relative z-10">
                <div className="grid md:grid-cols-2 gap-[24px]">
                  <div>
                    <label className="block text-[11px] font-bold text-brand-black mb-[8px] uppercase tracking-[0.1em]">Name</label>
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleChange} required 
                      className="w-full p-[16px] bg-brand-mist border border-black/[0.04] rounded-[8px] focus:ring-1 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all text-brand-black placeholder-black/30 text-[15px]" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-brand-black mb-[8px] uppercase tracking-[0.1em]">Email</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleChange} required 
                      className="w-full p-[16px] bg-brand-mist border border-black/[0.04] rounded-[8px] focus:ring-1 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all text-brand-black placeholder-black/30 text-[15px]" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-brand-black mb-[8px] uppercase tracking-[0.1em]">Subject</label>
                  <input 
                    type="text" name="subject" value={formData.subject} onChange={handleChange} required 
                    className="w-full p-[16px] bg-brand-mist border border-black/[0.04] rounded-[8px] focus:ring-1 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all text-brand-black placeholder-black/30 text-[15px]" 
                    placeholder="How can we help?" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-brand-black mb-[8px] uppercase tracking-[0.1em]">Message</label>
                  <textarea 
                    name="message" value={formData.message} onChange={handleChange} required 
                    className="w-full p-[16px] bg-brand-mist border border-black/[0.04] rounded-[8px] focus:ring-1 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all text-brand-black placeholder-black/30 text-[15px] resize-none" 
                    rows={6} placeholder="Tell us about your project..."
                  />
                </div>
                <button type="submit" disabled={submitting} className="cta-btn w-full !py-[16px] mt-2 disabled:opacity-50 flex justify-center items-center">
                  {submitting ? 'Sending...' : (
                    <>Send Message <Send className="w-4 h-4 ml-[8px] mb-[2px]" /></>
                  )}
                </button>
              </form>
            </motion.div>
            
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;




