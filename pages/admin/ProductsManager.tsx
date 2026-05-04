import React, { useState } from 'react';

const ProductsManager: React.FC = () => {
  const [products] = useState([
    { id: 1, name: 'BizTracker Pro', category: 'SaaS', status: 'Active', subscriptions: 89 },
    { id: 2, name: 'Twende House Hunting', category: 'Platform', status: 'Active', subscriptions: 156 },
  ]);

  return (
    <div className="min-h-screen pt-4 pb-20 relative">
      <div className="container-premium relative z-10 reveal">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Inventory Protocol</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">Product <span className="text-blue-500 italic">Lab</span></h1>
          </div>
          <button className="btn-primary px-8 py-3 text-sm flex items-center shadow-[0_0_30px_rgba(0,87,184,0.3)]">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Initiate New Product
          </button>
        </div>

        <div className="glass-card overflow-hidden reveal" style={{ animationDelay: '0.2s' }}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-8 py-6 text-left text-[10px] font-bold text-blue-400 uppercase tracking-widest">Product Module</th>
                  <th className="px-8 py-6 text-left text-[10px] font-bold text-blue-400 uppercase tracking-widest">Classification</th>
                  <th className="px-8 py-6 text-left text-[10px] font-bold text-blue-400 uppercase tracking-widest">Sync Status</th>
                  <th className="px-8 py-6 text-left text-[10px] font-bold text-blue-400 uppercase tracking-widest">Signal Density</th>
                  <th className="px-8 py-6 text-right text-[10px] font-bold text-blue-400 uppercase tracking-widest">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product) => (
                  <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mr-4 group-hover:scale-110 transition-transform font-black">
                          {product.name.charAt(0)}
                        </div>
                        <div className="text-sm font-bold text-white tracking-tight">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="text-xs font-bold text-awt-text-secondary uppercase tracking-widest">{product.category}</div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-[9px] leading-5 font-black rounded-full bg-blue-500/10 text-blue-400 uppercase tracking-widest">
                        {product.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm text-awt-text-secondary font-mono">
                      {product.subscriptions.toString().padStart(3, '0')}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-right text-xs font-bold">
                      <button className="text-blue-400 hover:text-white transition-colors uppercase tracking-widest mr-6">Calibrate</button>
                      <button className="text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest">Decommission</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ProductsManager;
