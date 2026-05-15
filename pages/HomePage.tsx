import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { services, portfolioProjects, industries, keyValues } from '../constants';
import { 
  BusinessIcon, 
  MobileIcon, 
  EcommerceIcon, 
  SMEIcon, 
  RealEstateIcon, 
  TransportIcon, 
  FinanceIcon,
  VisionIcon,
  MissionIcon,
  TailoredIcon,
  InnovationIcon,
  ClientIcon,
  ResultsIcon
} from '../components/icons';
import { usePageContent } from '../hooks/usePageContent';

const iconMap: { [key: string]: React.ComponentType } = {
  Business: BusinessIcon,
  Mobile: MobileIcon,
  Ecommerce: EcommerceIcon,
  SME: SMEIcon,
  RealEstate: RealEstateIcon,
  Transport: TransportIcon,
  Finance: FinanceIcon,
  Tailored: TailoredIcon,
  Innovation: InnovationIcon,
  Client: ClientIcon,
  Results: ResultsIcon,
};


interface Project {
  id: string;
  title: string;
  category: string;
  image_url: string;
  link?: string;
}

interface HeroBanner {
  title: string;
  subtitle: string;
  image_url: string;
}

const HomePage: React.FC = () => {
  const { content: statsContent } = usePageContent('home_stats');
  const [recentProjects, setRecentProjects] = React.useState<Project[]>([]);
  const [heroBanner, setHeroBanner] = React.useState<HeroBanner | null>(null);

  React.useEffect(() => {
    const fetchHero = async () => {
      const { data } = await supabase
        .from('hero_banners')
        .select('*')
        .eq('is_active', true)
        .single();
      if (data) setHeroBanner(data);
    };
    fetchHero();

    const fetchProjects = async () => {
      const { data } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      const mappedStatic = portfolioProjects.slice(0, 3).map((p, idx) => ({
        id: `static-${idx}`,
        title: p.title,
        category: p.category,
        image_url: p.image,
        link: p.link
      }));

      if (data && data.length > 0) {
        // Merge and take the most recent 3
        const combined = [...mappedStatic, ...data].slice(0, 3);
        setRecentProjects(combined);
      } else {
        setRecentProjects(mappedStatic);
      }
    };
    fetchProjects();
  }, []);


  return (
    <div className="min-h-screen relative">
      <div className="bg-mesh"></div>

      {/* Hero Section - State-of-the-Art */}
      <section className="pt-48 pb-32 relative overflow-hidden">
        <div className="container-premium relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="reveal">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Transforming Businesses and Lives through innovation</span>
            </div>
            <h1 className="hero-title text-gradient leading-[0.9]">
              {heroBanner?.title || 'INNOVATIVE DIGITAL SOLUTIONS'}
            </h1>
            <p className="hero-subtitle mb-12">
              {heroBanner?.subtitle || 'We design and build powerful web applications and enterprise systems that streamline operations, enhance efficiency, and drive business growth.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/contact" className="btn-primary px-10 py-4 text-lg">
                Start a Project
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
              <Link to="/services" className="btn-secondary px-10 py-4 text-lg">
                Explore Tech
              </Link>
            </div>
          </div>
          
          <div className="relative reveal" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-3xl opacity-50 animate-pulse"></div>
            <div className="glass-card p-4 rotate-2 hover:rotate-0 transition-all duration-700">
              <img
                src={heroBanner?.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"}
                alt="Digital Innovation"
                className="rounded-xl shadow-2xl object-cover w-full h-[500px]"
              />
              <div className="absolute bottom-10 -left-10 glass-card p-6 animate-float hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">99%</div>
                  <div>
                    <div className="text-xs font-bold text-white">Client Satisfaction</div>
                    <div className="text-[10px] text-awt-text-secondary">Global standards met</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section - NEW */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="container-premium">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 reveal">
              <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">Our Core Purpose <span className="text-blue-500">_</span></h2>
              <p className="text-awt-text-secondary leading-relaxed">
                At AWT Group, we don't just build software; we architect the future of business through innovation and purpose-driven technology.
              </p>
            </div>
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              <div className="glass-card p-10 hover:bg-white/5 transition-all group reveal" style={{ animationDelay: '0.3s' }}>
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform">
                  <VisionIcon />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-awt-text-secondary text-sm leading-relaxed italic">
                  "Transforming Businesses and Lives through Innovation."
                </p>
              </div>
              <div className="glass-card p-10 hover:bg-white/5 transition-all group reveal" style={{ animationDelay: '0.4s' }}>
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-8 group-hover:scale-110 transition-transform">
                  <MissionIcon />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-awt-text-secondary text-sm leading-relaxed">
                  "To build innovative digital solutions that empower businesses, create opportunities, and drive sustainable economic growth while operating with integrity, excellence, and purpose."
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Stats Bento Box - Revamped */}
      <section className="py-32 relative z-10">
        <div className="container-premium">
          <div className="bento-grid">
            <div className="bento-item-large glass-card p-12 flex flex-col justify-between group reveal">
              <div className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4">Performance Metrics</div>
              <h2 className="text-5xl font-extrabold text-white mb-8 group-hover:text-blue-400 transition-colors">Empowering Global Enterprises</h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-extrabold text-white mb-1">1</div>
                  <div className="text-[10px] text-awt-text-secondary uppercase tracking-widest font-bold">Year Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-white mb-1">5+</div>
                  <div className="text-[10px] text-awt-text-secondary uppercase tracking-widest font-bold">Systems Built</div>
                </div>
              </div>
            </div>
            
            <div className="bento-item-wide glass-card p-8 group flex items-center gap-8 reveal" style={{ animationDelay: '0.1s' }}>
              <div className="w-24 h-24 rounded-2xl bg-white/5 flex items-center justify-center text-blue-500 text-3xl font-bold group-hover:bg-blue-500 group-hover:text-white transition-all">
                5+
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Happy Clients</h3>
                <p className="text-xs text-awt-text-secondary leading-relaxed">Trusted by industry leaders across Africa and beyond for scalable digital architecture.</p>
              </div>
            </div>

            <div className="glass-card p-8 flex flex-col justify-center items-center text-center group reveal" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl font-extrabold text-white mb-2 group-hover:scale-110 transition-transform">5+</div>
              <div className="text-[10px] text-awt-text-secondary uppercase tracking-widest font-bold">Tech Experts</div>
            </div>

            <div className="glass-card p-8 flex flex-col justify-center items-center text-center group reveal" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl font-extrabold text-white mb-2 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-[10px] text-awt-text-secondary uppercase tracking-widest font-bold">Active Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 relative z-10">
        <div className="container-premium">
          <div className="text-center mb-20 reveal">
            <h2 className="text-5xl font-extrabold text-white mb-6">What We <span className="text-blue-500">Do</span></h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <div key={service.name} className="glass-card p-8 group cursor-pointer hover:border-blue-500/30 reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                    {Icon ? <Icon /> : <div className="w-8 h-8 rounded-full bg-blue-400" />}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{service.name}</h3>
                  <p className="text-awt-text-secondary text-xs leading-relaxed mb-6">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions We Offer - NEW */}
      <section className="py-32 relative z-10 bg-white/[0.02]">
        <div className="container-premium">
          <div className="text-center mb-20 reveal">
            <h2 className="text-5xl font-extrabold text-white mb-6">Solutions We <span className="text-blue-500">Offer</span></h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {industries.map((industry, index) => {
              const Icon = iconMap[industry.icon];
              return (
                <div key={industry.name} className="glass-card p-10 group reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      {Icon ? <Icon /> : <BusinessIcon />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{industry.name}</h3>
                      <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">{industry.tagline}</p>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {industry.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-awt-text-secondary text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Values - NEW */}
      <section className="py-32 relative z-10">
        <div className="container-premium">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {keyValues.map((value, index) => {
              const Icon = iconMap[value.icon];
              return (
                <div key={value.title} className="text-center group reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-20 h-20 rounded-full bg-white/5 mx-auto flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-xl">
                    {Icon ? <Icon /> : <div className="w-8 h-8 bg-blue-500 rounded-full" />}
                  </div>
                  <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">{value.title}</h4>
                  <p className="text-[10px] text-awt-text-secondary leading-relaxed max-w-[150px] mx-auto">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Featured Portfolio - Reveal On Scroll Concept */}
      <section className="py-32 relative z-10 bg-white/[0.01]">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 reveal">
            <div>
              <h2 className="text-5xl font-extrabold text-white mb-6">Digital Portfolio</h2>
              <p className="text-awt-text-secondary max-w-xl">A showcase of our most impactful digital transformations and high-performance application systems.</p>
            </div>
            <Link to="/portfolio" className="btn-secondary px-8 py-3 mb-2">
              View All Work
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {recentProjects.map((project, index) => (
              <div key={index} className="glass-card group reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-900/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-6 right-6 z-20 glass-card !rounded-full px-4 py-1.5 text-[10px] font-bold text-white uppercase tracking-widest backdrop-blur-xl border-white/20">
                    {project.category}
                  </div>
                </div>
                <div className="p-8 relative z-20">
                  <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <div className="flex justify-between items-center">
                    <Link to="/portfolio" className="text-xs font-bold text-awt-text-secondary hover:text-white transition-colors uppercase tracking-widest">
                      Case Study
                    </Link>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-blue-500 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 relative z-10">
        <div className="container-premium">
          <div className="glass-card p-16 md:p-32 text-center relative overflow-hidden group reveal">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full group-hover:bg-blue-500/20 transition-all duration-1000"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full group-hover:bg-cyan-500/20 transition-all duration-1000"></div>
            
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-8 relative z-10 leading-[0.9]">Ready to Architect Your <span className="text-blue-500 italic">Success?</span></h2>
            <p className="text-xl text-awt-text-secondary max-w-3xl mx-auto mb-12 relative z-10">
              Let's build smart, scalable, and sustainable digital systems that define the next generation of your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <Link to="/contact" className="btn-primary text-xl px-12 py-5 shadow-[0_0_50px_rgba(0,87,184,0.3)] hover:shadow-[0_0_80px_rgba(0,87,184,0.5)] transition-all">
                Initiate Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

};

export default HomePage;