import React from 'react';

const ReportsDashboard: React.FC = () => {
  return (
    <div className="min-h-screen pt-4 pb-20 relative">
      <div className="container-premium relative z-10 reveal">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Analytics Protocol</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">Data <span className="text-blue-500 italic">Analytics</span></h1>
          </div>
          <button className="btn-primary px-8 py-3 text-sm flex items-center shadow-[0_0_30px_rgba(0,87,184,0.3)]">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Export intelligence
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Total Entities', value: '1,245', trend: '+12%', color: 'blue' },
            { label: 'Signal Transmission', value: '342', trend: '+5%', color: 'cyan' },
            { label: 'BizTracker Trials', value: '89', trend: '+24%', color: 'purple' },
            { label: 'Twende House Hunting Inquiries', value: '156', trend: '+18%', color: 'red' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-8 group reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-[10px] font-bold text-awt-text-secondary uppercase tracking-[0.2em]">{stat.label}</h3>
                <span className={`text-[10px] font-bold px-2 py-1 rounded bg-${stat.color}-500/10 text-${stat.color}-400`}>{stat.trend}</span>
              </div>
              <div className="text-4xl font-black text-white tracking-tighter">{stat.value}</div>
              <div className={`mt-4 h-1 w-full bg-${stat.color}-500/10 rounded-full overflow-hidden`}>
                <div className={`h-full bg-${stat.color}-500 w-2/3 animate-pulse`}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          <div className="glass-card p-10 h-[500px] flex flex-col reveal" style={{ animationDelay: '0.4s' }}>
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-bold text-white tracking-tight">Traffic Signal Density</h3>
              <div className="flex gap-2">
                {['24H', '7D', '30D'].map(t => (
                  <button key={t} className="text-[9px] font-bold px-3 py-1 bg-white/5 text-awt-text-secondary rounded-full hover:bg-white/10 hover:text-white transition-all">{t}</button>
                ))}
              </div>
            </div>
            <div className="flex-1 relative bg-white/[0.02] border border-dashed border-white/10 rounded-2xl flex items-center justify-center group overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                 <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
                    <path d="M0,60 Q25,40 50,60 T100,60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500" />
                 </svg>
              </div>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] group-hover:text-blue-500 transition-colors">Analyzing Traffic Patterns...</span>
            </div>
          </div>
          
          <div className="glass-card p-10 h-[500px] flex flex-col reveal" style={{ animationDelay: '0.5s' }}>
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-bold text-white tracking-tight">Conversion Matrix</h3>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-awt-text-secondary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"></path></svg>
              </div>
            </div>
            <div className="flex-1 relative bg-white/[0.02] border border-dashed border-white/10 rounded-2xl flex items-center justify-center group overflow-hidden">
               <div className="grid grid-cols-4 items-end gap-4 px-10 w-full h-full pb-10">
                  {[40, 70, 55, 90].map((h, i) => (
                    <div key={i} className="bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-xl group-hover:animate-pulse transition-all" style={{ height: `${h}%` }}></div>
                  ))}
               </div>
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] group-hover:text-cyan-400 transition-colors">Simulating Conversion Flow...</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ReportsDashboard;
