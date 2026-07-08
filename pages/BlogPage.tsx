import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../constants';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const BlogPage: React.FC = () => {
  const featuredPost = blogPosts[0];
  const formatDate = (date: string) => date;

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
              <div className="txt">Insights & News</div>
              <div className="bar"></div>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-[clamp(38px,5.6vw,64px)] font-display font-bold text-brand-black leading-[1.06] mb-[26px]">
              Latest <span className="text-brand-blue italic">Thinking</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-[17px] text-black/70 leading-[1.65] max-w-[520px] mx-auto">
              Explore our latest perspectives on technology, business strategy, and industry trends shaping the digital landscape.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-[120px] relative z-10 bg-white">
          <div className="wrap">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-[48px]">
              <div className="div-line"><div className="bar"></div><div className="txt">Featured Article</div><div className="bar"></div></div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn}
              className="bg-brand-mist border border-black/[0.04] rounded-[16px] overflow-hidden group hover:-translate-y-[6px] transition-transform duration-300"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative h-[300px] lg:h-auto overflow-hidden">
                  <div className="absolute inset-0 bg-brand-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={featuredPost.image || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2426"} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
                  />
                  <div className="absolute top-6 left-6 z-20 bg-white border border-black/[0.04] px-[12px] py-[4px] rounded-full text-[10px] font-bold text-brand-black uppercase tracking-[0.1em] shadow-sm">
                    {featuredPost.category || 'Technology'}
                  </div>
                </div>
                
                <div className="p-[48px] flex flex-col justify-center">
                  <div className="flex items-center space-x-[16px] text-[12px] text-black/60 font-bold uppercase tracking-[0.1em] mb-[24px]">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-[6px] mb-[2px]" />{formatDate(featuredPost.date)}</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-[6px] mb-[2px]" />{'5 min read'}</span>
                  </div>
                  
                  <h2 className="text-[32px] font-bold mb-[16px] text-brand-black leading-tight group-hover:text-brand-blue transition-colors">
                    <Link to={`/blog/${featuredPost.title}`}>{featuredPost.title}</Link>
                  </h2>
                  <p className="text-black/70 text-[15px] leading-[1.65] mb-[32px]">{featuredPost.excerpt || 'Read our latest insights...'}</p>
                  
                  <div>
                    <Link to={`/blog/${featuredPost.title}`} className="text-[13px] font-bold text-brand-black uppercase tracking-[0.1em] flex items-center gap-[8px] hover:text-brand-blue transition-colors group/btn inline-flex">
                      Read Article <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-[120px] relative z-10 bg-brand-mist border-y border-black/[0.04]">
        <div className="wrap">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-[48px]">
            <div className="div-line"><div className="bar"></div><div className="txt">Recent Insights</div><div className="bar"></div></div>
          </motion.div>

          {blogPosts.length === 0 ? (
            <div className="bg-white border border-black/[0.04] p-[40px] text-center rounded-[16px]">
                <p className="text-black/70 text-[15px]">No posts available yet. Please check back later.</p>
            </div>
          ) : (
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-[28px]"
            >
              {blogPosts.map((post, index) => (
                <motion.article key={index} variants={fadeIn} className="bg-white border border-black/[0.04] rounded-[16px] overflow-hidden hover:-translate-y-[6px] transition-transform duration-300 flex flex-col h-full group">
                  <Link to={`/blog/${post.title}`} className="block relative h-[220px] overflow-hidden">
                    <div className="absolute inset-0 bg-brand-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                      src={post.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2426"} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4 z-20 bg-white border border-black/[0.04] px-[12px] py-[4px] rounded-full text-[10px] font-bold text-brand-black uppercase tracking-[0.1em] shadow-sm">
                      {post.date}
                    </div>
                  </Link>
                  
                  <div className="p-[32px] flex flex-col flex-grow">
                    <h3 className="text-[20px] font-bold mb-[12px] text-brand-black leading-tight group-hover:text-brand-blue transition-colors">
                      <Link to={`/blog/${post.title}`}>{post.title}</Link>
                    </h3>
                    
                    <div className="flex items-center mt-auto mb-[24px]">
                      <div className="w-[32px] h-[32px] rounded-full bg-brand-mist border border-black/[0.04] flex items-center justify-center text-brand-blue font-bold text-[11px] mr-[12px]">
                        {post.author.charAt(0)}
                      </div>
                      <p className="text-[11px] font-bold text-black/60 uppercase tracking-[0.1em]">
                        {post.author}
                      </p>
                    </div>
                    
                    <div>
                      <Link to={`/blog/${post.title}`} className="ghost-btn !text-brand-black !border-black/10 hover:!border-brand-blue hover:!text-brand-blue !px-[16px] !py-[8px] !text-[11px] uppercase tracking-[0.1em] font-bold inline-flex items-center">
                        Read Article <ArrowRight className="w-3 h-3 ml-[6px] mb-[1px] transform group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-[110px] relative z-10 bg-brand-black text-white text-center">
        <div className="wrap">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="max-w-[600px] mx-auto"
          >
            <div className="div-line"><div className="bar"></div><div className="txt !text-brand-gold">Stay Updated</div><div className="bar"></div></div>
            <h2 className="text-[clamp(30px,4vw,44px)] font-semibold mt-[20px] mb-[16px]">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-[16px] text-white/70 mb-[32px]">
              Get the latest insights, tech news, and company updates delivered directly to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-[16px] max-w-md mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow p-[16px] bg-white/10 border border-white/20 rounded-[8px] focus:ring-1 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all text-white placeholder-white/30 text-[15px]"
                required
              />
              <button type="submit" className="cta-btn !bg-brand-blue hover:!bg-brand-gold whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;




