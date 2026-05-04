import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

interface Log {
    id: string;
    action: string;
    details: any;
    created_at: string;
    user_id: string;
}

const AuditLogsPage: React.FC = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            // In a real scenario, you might fetch from your Node.js endpoint which has Service Role access
            // or use Supabase client if RLS policies allow admins to read.
            // Using Supabase client directly for now assuming RLS is set up.
            const { data, error } = await supabase
                .from('audit_logs')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLogs(data || []);
        } catch (err: any) {
            console.error('Error fetching logs:', err);
            // Fallback for demo if table doesn't exist yet
            setError("Could not load logs. Ensuring database schema is set up...");
            setLogs([]);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="min-h-screen pt-4 pb-20 relative">
      <div className="container-premium relative z-10 reveal">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Chronos Protocol</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">System <span className="text-blue-500 italic">Logs</span></h1>
          </div>
          <button onClick={fetchLogs} className="btn-secondary px-8 py-3 text-sm flex items-center">
            <svg className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Sync Logs
          </button>
        </div>

        {error && (
           <div className="glass-card p-8 mb-12 border-blue-500/20 bg-blue-500/5 reveal">
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                 </div>
                 <div>
                    <h4 className="text-white font-bold tracking-tight">{error}</h4>
                    <p className="text-awt-text-secondary text-xs mt-1">Initialize the SQL schema in your terminal or Supabase console to enable real-time tracking.</p>
                 </div>
              </div>
           </div>
        )}

        <div className="glass-card overflow-hidden reveal">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-8 py-6 text-left text-[10px] font-bold text-blue-400 uppercase tracking-widest">Protocol Action</th>
                  <th className="px-8 py-6 text-left text-[10px] font-bold text-blue-400 uppercase tracking-widest">Data Details</th>
                  <th className="px-8 py-6 text-left text-[10px] font-bold text-blue-400 uppercase tracking-widest">Operator Node</th>
                  <th className="px-8 py-6 text-left text-[10px] font-bold text-blue-400 uppercase tracking-widest">Temporal Stamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-[9px] font-black rounded-full bg-blue-500/10 text-blue-400 uppercase tracking-widest border border-blue-500/20">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <pre className="text-[10px] text-awt-text-secondary font-mono bg-white/[0.02] p-3 rounded-lg max-w-[300px] overflow-hidden truncate">
                        {JSON.stringify(log.details)}
                      </pre>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-[10px] text-white/40 font-mono italic">
                      {log.user_id.slice(0, 12)}...
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-[10px] text-white/60 font-bold uppercase tracking-widest">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {logs.length === 0 && !loading && !error && (
            <div className="py-20 text-center text-awt-text-secondary text-sm italic">No chronos signals detected in the current cycle.</div>
          )}
        </div>
      </div>
    </div>
  );

};

export default AuditLogsPage;
