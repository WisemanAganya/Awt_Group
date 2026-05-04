import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { MailIcon, PhoneIcon, MapPinIcon } from '../components/icons';
import { usePageContent } from '../hooks/usePageContent';

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
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      {/* Contact Header */}
      <section className="relative z-10 mb-20">
        <div className="container-custom text-center animate-float">
          <h1 className="hero-title text-gradient mb-6">Let's Connect</h1>
          <p className="hero-subtitle text-xl max-w-3xl mx-auto">
            Ready to start your next big project or need more information about our state-of-the-art products? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="relative z-10">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-panel p-10 hover:-translate-y-2 transition-transform duration-500">
              <h2 className="text-3xl font-bold mb-8 text-white">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="w-14 h-14 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                    <MapPinIcon />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-white mb-1">Our Headquarters</h3>
                    <p className="text-gray-400 text-lg">{loading ? 'Loading...' : (contactInfo?.address || 'Kampala, Uganda')}</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
                    <MailIcon />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
                    <p className="text-gray-400 text-lg">{loading ? 'Loading...' : (contactInfo?.email || 'info@awtgroup.com')}</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="w-14 h-14 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                    <PhoneIcon />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-white mb-1">Call Us</h3>
                    <p className="text-gray-400 text-lg">{loading ? 'Loading...' : (contactInfo?.phone || '+256 700 000 000')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <div className="glass-panel h-64 relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-900/30 flex items-center justify-center z-10 group-hover:bg-blue-900/10 transition-colors duration-500">
                 <span className="text-white font-bold tracking-widest uppercase">Interactive Map Loading...</span>
              </div>
              <div className="w-full h-full bg-[#051124] bg-[url('https://picsum.photos/seed/map/800/400')] bg-cover opacity-50"></div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel p-10 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full"></div>
            
            <h2 className="text-3xl font-bold mb-8 text-white relative z-10">Send a Message</h2>
            
            {status === 'success' && (
              <div className="mb-8 p-4 bg-green-500/20 border border-green-500/50 text-green-300 rounded-lg backdrop-blur-sm relative z-10">
                Message sent successfully! We'll get back to you shortly.
              </div>
            )}
            {status === 'error' && (
              <div className="mb-8 p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg backdrop-blur-sm relative z-10">
                Something went wrong. Please try again.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">Name</label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange} required 
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">Email</label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange} required 
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500" 
                  placeholder="john@example.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">Subject</label>
                <input 
                  type="text" name="subject" value={formData.subject} onChange={handleChange} required 
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500" 
                  placeholder="How can we help?" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">Message</label>
                <textarea 
                  name="message" value={formData.message} onChange={handleChange} required 
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500 resize-none" 
                  rows={5} placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button type="submit" disabled={submitting} className="btn-aurora w-full py-4 text-lg mt-4 disabled:opacity-50">
                {submitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
