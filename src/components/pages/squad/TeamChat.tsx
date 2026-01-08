import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from '../../GlassCard';
import { Send, User, MessageSquare, Zap, Cpu, Radio, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  text: string;
  isMe: boolean;
  timestamp: string;
}

interface TeamChatProps {
  onBack: () => void;
}

export function TeamChat({ onBack }: TeamChatProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Rahim A.',
      text: 'Hey guys! Ready for the penalty kick challenge?',
      isMe: false,
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      sender: 'Tania M.',
      text: 'Yes! I think we should aim for the corners.',
      isMe: false,
      timestamp: '10:31 AM'
    },
    {
      id: '3',
      sender: 'You',
      text: 'Good idea. Who goes first?',
      isMe: true,
      timestamp: '10:32 AM'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      text: message,
      isMe: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate response with a delay
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'Karim S.',
        text: 'Let\'s do this! 🚀',
        isMe: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto h-[70vh] flex flex-col relative z-10">
      <GlassCard className="flex-1 flex flex-col overflow-hidden p-0 relative border-[#00A8E1]/30 shadow-[0_0_20px_rgba(0,168,225,0.15)] group">
        
        {/* Sci-Fi Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,168,225,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,168,225,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00A8E1] to-transparent opacity-50" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00A8E1] to-transparent opacity-50" />
        </div>

        {/* HUD Header */}
        <div className="relative p-4 border-b border-[#00A8E1]/20 bg-black/40 backdrop-blur-md flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full border border-[#00A8E1] animate-[spin_4s_linear_infinite]" />
              <div className="absolute inset-0 rounded-full border border-dashed border-cyan-300 animate-[spin_8s_linear_infinite_reverse] scale-110" />
              <div className="w-12 h-12 rounded-full bg-[#00A8E1]/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#00A8E1]/40 to-transparent animate-pulse" />
                <Cpu className="w-6 h-6 text-cyan-300 relative z-10" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-cyan-100 font-bold tracking-wider uppercase text-sm">Squad Link</h3>
                <span className="px-1.5 py-0.5 rounded bg-[#00A8E1]/20 border border-[#00A8E1]/40 text-[10px] text-cyan-300 font-mono">
                  CH-ALPHA
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <p className="text-blue-200/60 text-xs font-mono uppercase tracking-wide">4 Units Active</p>
              </div>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-[#00A8E1]/60">
            <Radio className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-mono">ENCRYPTED</span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 relative z-10">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.isMe ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end gap-3 max-w-[85%] ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                {!msg.isMe && (
                  <div className="w-8 h-8 rounded-lg bg-[#00A8E1]/10 border border-[#00A8E1]/30 flex items-center justify-center flex-shrink-0 relative overflow-hidden group-hover:border-[#00A8E1]/50 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent" />
                    <User className="w-4 h-4 text-cyan-300" />
                  </div>
                )}
                
                <div className={`space-y-1 ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                  {/* Sender Name */}
                  {!msg.isMe && (
                    <span className="text-[10px] text-cyan-400/80 uppercase tracking-wider font-mono ml-1 flex items-center gap-1">
                      {msg.sender} <ChevronRight className="w-3 h-3" />
                    </span>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`relative p-3.5 ${
                      msg.isMe
                        ? 'bg-gradient-to-br from-[#00A8E1] to-blue-600 text-white rounded-2xl rounded-tr-sm'
                        : 'bg-black/40 backdrop-blur-sm border border-[#00A8E1]/30 text-cyan-100 rounded-2xl rounded-tl-sm'
                    }`}
                  >
                    {/* Decorative bits for 'Other' messages */}
                    {!msg.isMe && (
                      <>
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400/50 rounded-tl-sm" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400/50 rounded-br-2xl" />
                      </>
                    )}
                    
                    <p className="text-sm relative z-10 leading-relaxed">{msg.text}</p>
                  </div>
                  
                  {/* Timestamp */}
                  <span className="text-[9px] text-blue-200/40 font-mono px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Sci-Fi Input Area */}
        <div className="p-4 bg-black/40 backdrop-blur-xl border-t border-[#00A8E1]/20 relative z-20">
          <form onSubmit={handleSend} className="relative flex items-center gap-3">
            {/* Input Wrapper */}
            <div className="flex-1 relative group/input">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00A8E1]/20 to-transparent rounded-lg opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-2 h-[1px] bg-cyan-400 group-focus-within/input:w-full transition-all duration-500" />
              
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="TRANSMIT MESSAGE..."
                className="w-full bg-black/30 border border-[#00A8E1]/30 rounded-lg px-4 py-3 text-cyan-100 placeholder-cyan-800/50 focus:outline-none focus:border-[#00A8E1]/60 focus:bg-black/50 transition-all font-mono text-sm"
              />
              
              {/* Tech decoration inside input */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 pointer-events-none">
                <div className="w-1 h-1 rounded-full bg-cyan-500/50 animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-cyan-500/30 animate-pulse delay-75" />
                <div className="w-1 h-1 rounded-full bg-cyan-500/10 animate-pulse delay-150" />
              </div>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!message.trim()}
              className="p-3 rounded-lg bg-[#00A8E1] text-white disabled:opacity-30 disabled:grayscale hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,168,225,0.4)] group-hover:shadow-[0_0_25px_rgba(0,168,225,0.6)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <Send className="w-5 h-5 relative z-10" />
            </button>
          </form>
          
          <div className="text-[9px] text-cyan-900/40 text-center mt-2 font-mono tracking-[0.2em] uppercase">
            Secure Connection • End-to-End Encrypted
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
