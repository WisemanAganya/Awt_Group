import React from 'react';
import { blogPosts } from '../constants';

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-40 right-10 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      {/* Page Header */}
      <section className="relative z-10 mb-24">
        <div className="container-custom text-center animate-float">
          <h1 className="hero-title text-gradient mb-6">Insights & Resources</h1>
          <p className="hero-subtitle text-xl max-w-3xl mx-auto">
            Stay updated with the latest industry trends, technological breakthroughs, and expert analysis from our state-of-the-art engineering team.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative z-10">
        <div className="container-custom">
          {blogPosts.length === 0 ? (
            <div className="glass-panel p-12 text-center text-gray-400">No insights available at the moment.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogPosts.map((post, index) => (
                <article key={index} className="glass-panel overflow-hidden flex flex-col group hover:-translate-y-2 transition-transform duration-500">
                  <div className="relative h-56 overflow-hidden w-full">
                      <div className="absolute inset-0 bg-blue-900/30 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute bottom-4 right-4 z-20 px-3 py-1 bg-[#0a1931]/80 backdrop-blur-md rounded-full text-xs font-bold text-white shadow-lg border border-white/10">
                        {post.date}
                      </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col relative bg-[#0a1931]/80 backdrop-blur-md border-t border-white/5">
                    <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h2>
                    <div className="flex items-center mt-auto">
                      <div className="w-8 h-8 rounded-full bg-gradient-aurora flex items-center justify-center text-white font-bold text-xs mr-3">
                        {post.author.charAt(0)}
                      </div>
                      <p className="text-sm font-semibold text-gray-400">
                        {post.author}
                      </p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/5">
                      <a href="#" className="inline-flex items-center font-bold text-blue-400 hover:text-white transition-colors group/link">
                        Read Full Article 
                        <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="mt-32 relative z-10">
         <div className="container-custom">
            <div className="glass-panel p-12 md:p-16 text-center">
               <h2 className="text-3xl font-bold mb-4 text-white">Subscribe to our Newsletter</h2>
               <p className="text-gray-400 mb-8 max-w-xl mx-auto">Get the latest insights, technological news, and updates delivered straight to your inbox.</p>
               <form className="max-w-md mx-auto flex gap-4">
                  <input type="email" placeholder="Enter your email address" required className="flex-grow p-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500" />
                  <button type="submit" className="btn-aurora px-6 py-4 whitespace-nowrap">Subscribe</button>
               </form>
            </div>
         </div>
      </section>
    </div>
  );
};

export default BlogPage;
