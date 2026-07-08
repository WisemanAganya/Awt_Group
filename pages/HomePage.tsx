import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Lightbulb, Users, TrendingUp } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { services, portfolioProjects, industries, keyValues } from '../constants';
import NetworkCanvas from '../components/NetworkCanvas';
import WorldGlobeCanvas from '../components/WorldGlobeCanvas';

interface HeroBanner { title: string; subtitle: string; image_url: string; }

const revealVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const getKeyValueIcon = (iconStr: string) => {
  switch (iconStr) {
    case 'Tailored': return <ShieldCheck className="w-6 h-6" />;
    case 'Innovation': return <Lightbulb className="w-6 h-6" />;
    case 'Client': return <Users className="w-6 h-6" />;
    case 'Results': return <TrendingUp className="w-6 h-6" />;
    default: return <ShieldCheck className="w-6 h-6" />;
  }
};

const HomePage: React.FC = () => {
  const [heroBanner, setHeroBanner] = React.useState<HeroBanner | null>(null);

  React.useEffect(() => {
    const fetchHero = async () => {
      const { data } = await supabase.from('hero_banners').select('*').eq('is_active', true).single();
      if (data) setHeroBanner(data);
    };
    fetchHero();
  }, []);

  return (
    <div className="relative">
      
      {/* ===== HERO ===== */}
      <section className="relative pt-[90px] pb-[120px] overflow-hidden bg-brand-black">
        {/* Animated Background Image */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center opacity-80" 
          style={{ backgroundImage: "url('/assets/img/hero-globe.png')", transformOrigin: 'center right' }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 2, 0],
            filter: ["brightness(1) contrast(1)", "brightness(1.1) contrast(1.05)", "brightness(1) contrast(1)"]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Particle Parallax Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <NetworkCanvas />
        </div>

        {/* Lighting Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/70 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-brand-black/20 z-0"></div>

        <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 font-display font-bold text-[340px] tracking-[-10px] text-[rgba(255,255,255,0.02)] whitespace-nowrap z-0 pointer-events-none select-none">
          AWT
        </div>
        
        <div className="wrap relative z-10 text-left max-w-[860px] pt-[60px]">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={revealVariant} className="div-line mb-[24px]">
              <div className="bar !bg-brand-gold"></div>
              <div className="txt !text-brand-gold tracking-[0.2em] uppercase text-[12px] font-bold">Global innovation partner</div>
            </motion.div>
            
            <motion.h1 variants={revealVariant} className="text-[clamp(44px,6.5vw,72px)] leading-[1.05] font-semibold mb-[26px] text-white text-shadow-lg">
              {heroBanner?.title ? (
                <span dangerouslySetInnerHTML={{ __html: heroBanner.title.replace('businesses', '<span class="text-brand-gold">businesses</span>').replace('lives', '<span class="text-brand-blue-light">lives</span>') }} />
              ) : (
                <>INNOVATIVE DIGITAL <br/> <span className="text-brand-gold">SOLUTIONS</span></>
              )}
            </motion.h1>
            
            <motion.p variants={revealVariant} className="text-[18px] leading-[1.65] text-white/80 max-w-[560px] mb-[42px]">
              {heroBanner?.subtitle || 'We design and build powerful web applications and enterprise systems that streamline operations, enhance efficiency, and drive business growth.'}
            </motion.p>
            
            <motion.div variants={revealVariant} className="flex gap-[16px] justify-start items-center">
              <Link to="/contact" className="cta-btn px-[28px] py-[16px] !bg-brand-gold !text-brand-black hover:!bg-white hover:!text-brand-black text-[15px]">
                Book a consultation →
              </Link>
              <Link to="/portfolio" className="ghost-btn !border-white/20 !text-white hover:!bg-white/10 hover:!border-white hover:!text-white text-[15px] px-[28px] py-[16px]">
                See our work
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== STAT ORBIT STRIP ===== */}
      <div className="bg-brand-black text-white relative z-20">
        <div className="wrap flex justify-between items-center py-[36px] flex-wrap gap-[20px]">
          <div className="flex items-baseline gap-[10px]">
            <span className="font-display text-[28px] font-semibold text-brand-gold">8+</span>
            <span className="text-[12px] text-white/55 tracking-[0.03em]">Projects delivered</span>
          </div>
          <div className="flex items-baseline gap-[10px]">
            <span className="font-display text-[28px] font-semibold text-brand-gold">1</span>
            <span className="text-[12px] text-white/55 tracking-[0.03em]">Country served</span>
          </div>
          <div className="flex items-baseline gap-[10px]">
            <span className="font-display text-[28px] font-semibold text-brand-gold">97%</span>
            <span className="text-[12px] text-white/55 tracking-[0.03em]">Client retention</span>
          </div>
          <div className="flex items-baseline gap-[10px]">
            <span className="font-display text-[28px] font-semibold text-brand-gold">02</span>
            <span className="text-[12px] text-white/55 tracking-[0.03em]">In-house products</span>
          </div>
        </div>
      </div>

      {/* ===== SERVICES — arc layout ===== */}
      <section className="py-[120px] relative overflow-hidden bg-white">
        <WorldGlobeCanvas />
        <div className="wrap relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealVariant} className="text-center max-w-[560px] mx-auto mb-[64px]">
            <div className="div-line"><div className="bar"></div><div className="txt">What we do</div><div className="bar"></div></div>
            <h2 className="text-[36px] font-semibold mt-[16px]">Three disciplines, one outcome</h2>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-[28px]"
          >
            <motion.div variants={revealVariant} className="arc-card md:translate-y-0 hover:!-translate-y-[6px]">
              <div className="w-2 h-2 rounded-full bg-brand-gold mb-[22px]"></div>
              <h3 className="text-[20px] font-semibold mb-[12px]">Digital Strategy</h3>
              <p className="text-[14px] leading-[1.65] text-content-secondary">
                Roadmaps grounded in your market position, built to be executed — not filed away.
              </p>
            </motion.div>
            
            <motion.div variants={revealVariant} className="arc-card md:-translate-y-[22px] hover:!-translate-y-[28px]">
              <div className="w-2 h-2 rounded-full bg-brand-gold mb-[22px]"></div>
              <h3 className="text-[20px] font-semibold mb-[12px]">Product & Engineering</h3>
              <p className="text-[14px] leading-[1.65] text-content-secondary">
                Full-stack teams shipping production software, from internal platforms to customer-facing apps.
              </p>
            </motion.div>
            
            <motion.div variants={revealVariant} className="arc-card md:translate-y-0 hover:!-translate-y-[6px]">
              <div className="w-2 h-2 rounded-full bg-brand-gold mb-[22px]"></div>
              <h3 className="text-[20px] font-semibold mb-[12px]">Organizational Change</h3>
              <p className="text-[14px] leading-[1.65] text-content-secondary">
                Training, tooling and culture work so your people can sustain the transformation.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="bg-brand-mist py-[120px]">
        <div className="wrap">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealVariant} className="text-center max-w-[560px] mx-auto mb-[64px]">
            <div className="div-line"><div className="bar"></div><div className="txt">Our products</div><div className="bar"></div></div>
            <h2 className="text-[36px] font-semibold mt-[16px]">Software AWT builds and runs</h2>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-[24px]"
          >
            <motion.div variants={revealVariant} className="product-card group">
              <span className="tag">SME's</span>
              <h3 className="text-[23px] mb-[10px] font-display font-semibold">Mysales</h3>
              <p className="text-content-secondary text-[14px] leading-[1.6] mb-[18px]">
                Real-time operational tracking for growing businesses — inventory, sales and staff performance in one dashboard.
              </p>
              <Link to="/products/biztracker-pro" className="text-[13.5px] font-semibold text-brand-black inline-flex items-center gap-[6px] group-hover:text-brand-blue transition-colors">
                Explore Mysales <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            
            <motion.div variants={revealVariant} className="product-card group">
              <span className="tag">Real Estate</span>
              <h3 className="text-[23px] mb-[10px] font-display font-semibold">Twende House Hunting</h3>
              <p className="text-content-secondary text-[14px] leading-[1.6] mb-[18px]">
                Basically involved in searching, listing for properties, shops, land, gardens and conferences halls for event rent and sale for various real estate companies, landlords/property owners and general clients.
              </p>
              <Link to="/products/twende" className="text-[13.5px] font-semibold text-brand-black inline-flex items-center gap-[6px] group-hover:text-brand-blue transition-colors">
                Explore Twende <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-[120px] bg-white">
        <div className="wrap">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealVariant} className="text-center max-w-[560px] mx-auto mb-[64px]">
            <div className="div-line"><div className="bar"></div><div className="txt">Why choose us</div><div className="bar"></div></div>
            <h2 className="text-[36px] font-semibold mt-[16px]">Why choose AWT Group?</h2>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]"
          >
            {keyValues.map((val, idx) => (
              <motion.div key={idx} variants={revealVariant} className="p-[32px] rounded-[16px] bg-brand-mist border border-black/[0.04] hover:-translate-y-2 transition-transform duration-300">
                <div className="w-[48px] h-[48px] rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-[20px]">
                  {getKeyValueIcon(val.icon)}
                </div>
                <h3 className="text-[18px] font-semibold mb-[10px]">{val.title}</h3>
                <p className="text-[14px] leading-[1.65] text-content-secondary">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-brand-black text-white py-[110px] text-center relative overflow-hidden">
        <div className="wrap">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.div variants={revealVariant} className="div-line">
              <div className="bar"></div>
              <div className="txt !text-brand-gold">Let's talk</div>
              <div className="bar"></div>
            </motion.div>
            <motion.h2 variants={revealVariant} className="text-[clamp(30px,4vw,44px)] font-semibold max-w-[600px] mx-auto mt-[20px] mb-[30px]">
              Ready to transform how your business runs?
            </motion.h2>
            <motion.div variants={revealVariant}>
              <Link to="/contact" className="cta-btn !bg-brand-blue hover:!bg-brand-gold">
                Get in touch →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;
