import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { portfolioProjects } from '../constants';


interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  link: string;
  github?: string;
}

const PortfolioPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('portfolio_projects').select('*').order('created_at', { ascending: false });
      
      const mappedStatic = portfolioProjects.map((p, idx) => ({
        id: `static-${idx}`,
        title: p.title,
        description: p.description,
        category: p.category,
        image_url: p.image,
        link: p.link,
        github: p.github
      }));

      if (error) {
        console.error('Error fetching projects:', error);
        setProjects(mappedStatic);
      } else {
        const dbProjects = (data || []).map(p => ({
            ...p,
            github: p.github_url || '' // Handling potential field naming differences
        }));
        setProjects([...mappedStatic, ...dbProjects]);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen pt-48 pb-32 relative">
      <div className="bg-mesh"></div>

      {/* Portfolio Header */}
      <section className="relative z-10 mb-20">
        <div className="container-premium text-center reveal">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8">
            Our Legacy
          </div>
          <h1 className="hero-title text-gradient mb-8">Digital Masterpieces</h1>
          <p className="hero-subtitle text-xl max-w-3xl mx-auto">
            A curated collection of high-performance systems and transformative digital experiences built for industry leaders.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10">
        <div className="container-premium">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="glass-card p-20 text-center text-awt-text-secondary text-lg reveal">No projects found.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((project, idx) => (
                <div key={project.id} className="glass-card group reveal flex flex-col" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="relative h-72 overflow-hidden w-full">
                    <div className="absolute inset-0 bg-blue-900/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img 
                      src={project.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute top-6 left-6 z-20 glass-card !rounded-full px-4 py-1.5 text-[10px] font-bold text-white uppercase tracking-widest backdrop-blur-xl border-white/20">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h2 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">{project.title}</h2>
                    <p className="text-awt-text-secondary text-sm leading-relaxed mb-8 flex-grow">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-6 mt-auto">
                        {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-white hover:text-blue-400 uppercase tracking-widest transition-all group/link">
                            Live Demo
                            <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </a>
                        )}
                        {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-awt-text-secondary hover:text-white uppercase tracking-widest transition-all group/link">
                            GitHub
                            <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* CTA Section */}
      <section className="mt-40 relative z-10">
        <div className="container-premium">
          <div className="glass-card p-16 md:p-24 text-center relative overflow-hidden group reveal">
             <div className="absolute inset-0 bg-blue-500/[0.02] pointer-events-none"></div>
             <h2 className="text-5xl font-extrabold text-white mb-8 relative z-10">Build the Next <span className="text-blue-500">Benchmark</span></h2>
             <p className="text-xl text-awt-text-secondary mb-12 max-w-2xl mx-auto relative z-10">Join our legacy of technological excellence. Let's engineer something extraordinary for your business.</p>
             <Link to="/contact" className="btn-primary text-lg px-12 py-4 relative z-10 shadow-[0_0_40px_rgba(0,87,184,0.2)]">Initiate Proposal</Link>
          </div>
        </div>
      </section>
    </div>
  );

};

export default PortfolioPage;
