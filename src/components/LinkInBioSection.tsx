import React from 'react';
import { Send, CheckCircle2, MessageSquare, Instagram, Users, Youtube, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { ADMIN_CONTACTS } from '../data';

interface LinkInBioSectionProps {
  theme: 'light' | 'kuning-biru';
  onContactAdmin: (msg: string) => void;
}

export default function LinkInBioSection({ theme, onContactAdmin }: LinkInBioSectionProps) {
  const isKuningBiru = theme === 'kuning-biru';

  const contactIcons: Record<string, any> = {
    MessageSquare: MessageSquare,
    Instagram: Instagram,
    Users: Users,
    Youtube: Youtube,
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Profile Bio Card */}
      <div 
        className={`p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden text-center ${
          isKuningBiru 
            ? 'bg-slate-800/20 border-slate-700/60 text-white' 
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Animated Background decorative circle */}
        <div className="absolute -right-10 -top-10 size-32 rounded-full bg-blue-500/10 blur-xl animate-pulse" />
        <div className="absolute -left-10 -bottom-10 size-32 rounded-full bg-yellow-500/10 blur-xl animate-pulse" />

        <div className="relative space-y-4">
          {/* Avatar Ring Animation */}
          <div className="relative inline-block">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-yellow-400 via-blue-500 to-amber-500 animate-spin opacity-75 blur-[3px]" />
            <div className="relative size-20 rounded-full overflow-hidden bg-slate-900 border-2 border-slate-900 p-0.5">
              {/* Profile icon representation */}
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-slate-800 to-indigo-900 flex items-center justify-center font-extrabold text-white text-3xl">
                AG
              </div>
            </div>
            {/* Status Online dot */}
            <span className="absolute bottom-1 right-1 size-4 bg-emerald-400 border-2 border-slate-900 rounded-full animate-ping" />
            <span className="absolute bottom-1 right-1 size-4 bg-emerald-400 border-2 border-slate-900 rounded-full" />
          </div>

          <div>
            <h2 className="text-lg font-black tracking-tight inline-flex items-center gap-1.5">
              Admin Arga Gaming FF
              <CheckCircle2 size={16} className="text-blue-500 fill-blue-500 text-blue-400 fill-blue-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-1">Official Founder Arga Store & Jasa Post Group</p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold text-emerald-400">
            <span>● OPERASIONAL OPEN (Fast Respon)</span>
          </div>
          
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
            Tempat jual beli akun Free Fire paling terpercaya, amanah, bergaransi anti-HB, dan penyedia Jasa Posting (JP) termurah se-Indonesia.
          </p>
        </div>
      </div>

      {/* Grid Stack Links in Bio */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-left">Pintu Kontak Link Bio</h3>
        
        <div className="space-y-3.5">
          {ADMIN_CONTACTS.map((contact, i) => {
            const Icon = contactIcons[contact.iconName] || MessageSquare;
            return (
              <a
                key={i}
                href={contact.url}
                target="_blank"
                rel="noreferrer"
                className={`group p-4 rounded-2xl flex items-center justify-between border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                  contact.isPrimary 
                    ? 'bg-blue-600 text-white border-blue-550/50 hover:bg-blue-700' 
                    : isKuningBiru
                      ? 'bg-slate-800/40 border-slate-700/60 text-slate-200 hover:border-yellow-400/40'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-blue-500/40'
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <div className={`p-2.5 rounded-xl ${
                    contact.isPrimary 
                      ? 'bg-white/10' 
                      : 'bg-slate-500/10'
                  }`}>
                    <Icon size={18} className={contact.isPrimary ? 'text-yellow-400' : 'text-blue-500'} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-sans tracking-wide leading-tight group-hover:text-amber-400 transition-colors">
                      {contact.label}
                    </h4>
                    <span className="text-[10px] text-slate-300 block opacity-80">{contact.value}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 font-sans">
                  {contact.badge && (
                    <span className="px-2 py-0.5 text-[8px] font-bold uppercase rounded-full bg-amber-400 text-slate-950">
                      {contact.badge}
                    </span>
                  )}
                  <ExternalLink size={12} className="opacity-60 transition-transform group-hover:translate-x-0.5" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
