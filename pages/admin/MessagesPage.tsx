import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

interface Message {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
    is_read: boolean;
}

const MessagesPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
        if (error) console.error('Error fetching messages:', error);
        else setMessages(data || []);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this message?')) return;
        const { error } = await supabase.from('messages').delete().eq('id', id);
        if (error) alert('Error deleting message');
        else fetchMessages();
    };

    const toggleRead = async (message: Message) => {
        const { error } = await supabase.from('messages').update({ is_read: !message.is_read }).eq('id', message.id);
        if (!error) fetchMessages();
    };

    return (
    <div className="min-h-screen pt-4 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 reveal">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Communication Channel</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">Incoming <span className="text-blue-500 italic">Signal</span></h1>
          </div>
        </div>

        <div className="glass-panel rounded-3xl overflow-hidden reveal">
          {loading ? (
             <div className="flex justify-center py-40">
               <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
             </div>
          ) : messages.length === 0 ? (
             <div className="py-40 text-center text-content-secondary text-sm">No incoming signals detected in the current cycle.</div>
          ) : (
            <ul className="divide-y divide-white/5">
              {messages.map((msg) => (
                <li key={msg.id} className={`p-8 hover:bg-white/[0.02] transition-all group ${!msg.is_read ? 'bg-blue-500/[0.03]' : ''}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${!msg.is_read ? 'bg-blue-500 text-white' : 'bg-white/5 text-content-secondary'}`}>
                          {msg.name.charAt(0)}
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${!msg.is_read ? 'text-blue-400' : 'text-white'}`}>
                            {msg.name} <span className="text-content-secondary font-medium ml-2">{msg.email}</span>
                          </p>
                          <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">{new Date(msg.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">{msg.subject}</h3>
                      <p className="text-content-secondary text-sm leading-relaxed line-clamp-3">{msg.message}</p>
                    </div>
                    <div className="flex md:flex-col gap-4 items-center md:items-end">
                      <button 
                        onClick={() => toggleRead(msg)} 
                        className={`text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all ${
                          !msg.is_read ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(0,87,184,0.3)]' : 'bg-white/5 text-content-secondary hover:text-white'
                        }`}
                      >
                        {msg.is_read ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button onClick={() => handleDelete(msg.id)} className="text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 text-red-500 hover:text-white hover:bg-red-500 rounded-full transition-all">
                        Decommission
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    );
};

export default MessagesPage;




