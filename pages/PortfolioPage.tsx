import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Loader2 } from 'lucide-react';
import { GithubIcon } from '../components/icons';
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

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-brand-mist opacity-30 z-0 pointer-events-none" />

      {/* Portfolio Header */}
      <section className="relative z-10 pt-40 pb-24 lg:pt-56 lg:pb-32 bg-brand-mist border-b border-black/[0.04]">
        <div className="wrap text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
            <motion.div variants={fadeIn} className="div-line justify-center mb-[24px]">
              <div className="bar"></div>
              <div className="txt">Our Legacy</div>
              <div className="bar"></div>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-[clamp(38px,5.6vw,64px)] font-display font-bold text-brand-black leading-[1.06] mb-[26px]">
              Digital <span className="text-brand-blue italic">Masterpieces</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-[17px] text-black/70 leading-[1.65] max-w-[520px] mx-auto">
              A curated collection of high-performance systems and transformative digital experiences built for industry leaders.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-[120px] relative z-10 bg-white">
        <div className="wrap">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-12 h-12 text-brand-blue animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-brand-mist border border-black/[0.04] rounded-[16px] p-20 text-center text-black/70 text-lg">No projects found.</div>
          ) : (
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-[28px]"
            >
              {projects.map((project, idx) => (
                <motion.div key={project.id} variants={fadeIn} className="bg-white border border-black/[0.04] rounded-[16px] overflow-hidden hover:-translate-y-[6px] transition-transform duration-300 flex flex-col h-full">
                  <div className="relative h-[220px] overflow-hidden w-full">
                    <div className="absolute inset-0 bg-brand-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                      src={project.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4 z-20 bg-white border border-black/[0.04] px-[12px] py-[4px] rounded-full text-[10px] font-bold text-brand-black uppercase tracking-[0.1em] shadow-sm">
                      {project.category}
                    </div>
                  </div>
                  
                  <div className="p-[32px] flex flex-col flex-grow">
                    <h2 className="text-[20px] font-bold mb-[12px] text-brand-black transition-colors">{project.title}</h2>
                    <p className="text-black/70 text-[14px] leading-[1.65] mb-[32px] flex-grow">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-[12px] mt-auto">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="ghost-btn !text-brand-black !border-black/10 hover:!border-brand-blue hover:!text-brand-blue !px-[16px] !py-[8px] !text-[11px] uppercase tracking-[0.1em] font-bold inline-flex items-center">
                            Live Demo
                            <ExternalLink className="w-3 h-3 ml-[6px] mb-[1px]" />
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="ghost-btn !text-black/60 !border-black/10 hover:!border-brand-black hover:!text-brand-black !px-[16px] !py-[8px] !text-[11px] uppercase tracking-[0.1em] font-bold inline-flex items-center">
                            <GithubIcon className="w-3 h-3 mr-[6px] mb-[1px]" />
                            GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[110px] relative z-10 bg-brand-black text-white text-center">
        <div className="wrap">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="max-w-[600px] mx-auto"
          >
            <div className="div-line"><div className="bar"></div><div className="txt !text-brand-gold">Let's Build</div><div className="bar"></div></div>
            <h2 className="text-[clamp(30px,4vw,44px)] font-semibold mt-[20px] mb-[30px]">
              Build the Next Benchmark
            </h2>
            <div className="flex justify-center">
              <Link to="/contact" className="cta-btn !bg-brand-blue hover:!bg-brand-gold">
                Initiate Proposal →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;




