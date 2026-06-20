import { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Megaphone, 
  Star, 
  ShieldCheck, 
  Zap, 
  Briefcase, 
  Award, 
  CheckCircle, 
  MessageSquare, 
  Moon, 
  Sun, 
  BookOpen, 
  TrendingUp, 
  Users,
  BadgeCheck,
  Lock,
  Eye,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';

// Import Types and Data
import { ActiveTab, AppTheme, StockAccount, JasaPostAccount, Testimonial } from './types';
import { 
  INITIAL_STOCK_ACCOUNTS, 
  INITIAL_JASA_POST_ACCOUNTS, 
  INITIAL_TESTIMONIALS 
} from './data';

// Import Components
import BannerSlider from './components/BannerSlider';
import Toolbar from './components/Toolbar';
import StokAkunSection from './components/StokAkunSection';
import JasaPostSection from './components/JasaPostSection';
import TestimoniSection from './components/TestimoniSection';
import LinkInBioSection from './components/LinkInBioSection';

export default function App() {
  // Navigation active tab State
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');

  // Theme Style State with client-side memory
  const [theme, setTheme] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('arga_store_theme');
    return (saved as AppTheme) || 'light';
  });

  // Client-populated Stock database
  const [stockAccounts] = useState<StockAccount[]>(INITIAL_STOCK_ACCOUNTS);

  // State to track a stock account clicked from Beranda to open immediately on the Catalog page
  const [focusedAccount, setFocusedAccount] = useState<StockAccount | null>(null);

  // Client-populated Jasa Post database with LocalStorage memory
  const [jasaPosts, setJasaPosts] = useState<JasaPostAccount[]>(() => {
    const saved = localStorage.getItem('arga_store_jp_posts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_JASA_POST_ACCOUNTS;
  });

  // Client-populated Testimonials with LocalStorage memory
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('arga_store_testimonials');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_TESTIMONIALS;
  });

  // Save changes to LocalStorage when database state changes
  useEffect(() => {
    localStorage.setItem('arga_store_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('arga_store_jp_posts', JSON.stringify(jasaPosts));
  }, [jasaPosts]);

  useEffect(() => {
    localStorage.setItem('arga_store_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  // Helper functions to handle new entries
  const handleAddNewJP = (newJP: JasaPostAccount) => {
    setJasaPosts((prev) => [newJP, ...prev]);
  };

  const handleAddNewTestimonial = (newReview: Testimonial) => {
    setTestimonials((prev) => [newReview, ...prev]);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'kuning-biru' : 'light'));
  };

  // Coordinated helper to trigger direct WhatsApp redirection
  const triggerWhatsAppAdmin = (customMessage: string) => {
    const encoded = encodeURIComponent(customMessage);
    const waUrl = `https://wa.me/6282255001122?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  const triggerWhatsAppSeller = (customMessage: string, sellerNumber: string) => {
    const encoded = encodeURIComponent(customMessage);
    const waUrl = `https://wa.me/${sellerNumber}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  const handleViewDetailsFromHome = (acc: StockAccount) => {
    setFocusedAccount(acc);
    setActiveTab('stok');
  };

  const [homeRecTab, setHomeRecTab] = useState<'hot' | 'sultan' | 'murah'>('hot');
  const [expandedIntroKey, setExpandedIntroKey] = useState<string | null>(null);

  const isKuningBiru = theme === 'kuning-biru';

  return (
    <div 
      id="app-container"
      className={`min-h-screen transition-colors duration-300 pb-24 font-sans relative overflow-x-hidden ${
        isKuningBiru 
          ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100' 
          : 'bg-slate-50/60 text-slate-800'
      }`}
    >
      {/* Decorative Floating Ambient Particles (Visual Bergerak) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute top-[15%] -left-12 w-64 h-64 rounded-full blur-[100px] opacity-[0.14] animate-float-slow ${
          isKuningBiru ? 'bg-blue-600' : 'bg-blue-400'
        }`} />
        <div className={`absolute top-[45%] -right-16 w-80 h-80 rounded-full blur-[120px] opacity-[0.11] animate-float-reverse ${
          isKuningBiru ? 'bg-yellow-400' : 'bg-indigo-300'
        }`} />
        <div className={`absolute bottom-[20%] left-[20%] w-72 h-72 rounded-full blur-[110px] opacity-[0.09] animate-float ${
          isKuningBiru ? 'bg-indigo-500' : 'bg-emerald-300'
        }`} />
      </div>

      {/* Top Brand Header */}
      <header 
        id="app-header"
        className={`sticky top-0 z-30 transition-all duration-300 border-b backdrop-blur-md relative ${
          isKuningBiru 
            ? 'bg-slate-950/90 border-slate-800/80 text-white shadow-lg shadow-slate-950/20' 
            : 'bg-white/95 border-slate-200 text-slate-850 shadow-xs'
        }`}
      >
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo / Title */}
          <div 
            onClick={() => setActiveTab('beranda')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className={`p-1.5 rounded-xl ${
              isKuningBiru ? 'bg-yellow-400 text-slate-950' : 'bg-blue-600 text-white'
            }`}>
              <Gamepad2 size={18} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight uppercase leading-none">ARGA STORE</h1>
              <span className="text-[9px] text-slate-400 font-mono tracking-widest leading-none block mt-0.5">FF GAMING MARKET</span>
            </div>
          </div>

          {/* Theme Dynamic Selector Switcher */}
          <button
            id="theme-toggler"
            onClick={toggleTheme}
            className={`p-2 rounded-xl border flex items-center gap-1.5 transition-all text-xs font-semibold cursor-pointer ${
              isKuningBiru 
                ? 'border-slate-800 bg-slate-900/80 text-yellow-400 hover:border-slate-700' 
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600'
            }`}
          >
            {isKuningBiru ? (
              <>
                <Sun size={13} className="text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Tema Terang</span>
              </>
            ) : (
              <>
                <Moon size={13} className="text-blue-500" />
                <span>Tema Kuning Biru</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Dynamic Marquee Running Text Stock Ticker */}
      <div 
        id="news-marquee"
        className={`w-full overflow-hidden border-b py-2 text-[10.5px] font-bold select-none relative z-10 ${
          isKuningBiru 
            ? 'bg-slate-900/90 border-slate-800 text-yellow-400' 
            : 'bg-blue-50/70 border-slate-200/80 text-blue-800'
        }`}
      >
        <div className="max-w-xl mx-auto px-4 flex items-center">
          <div className="flex gap-1 items-center font-black uppercase text-[10px] shrink-0 border-r pr-3 border-slate-800/20 mr-3 text-red-500 animate-pulse">
            <Activity size={12} className="text-emerald-500" />
            <span>LIVE INFO</span>
          </div>
          <div className="relative overflow-hidden w-full flex">
            <div className="animate-marquee-scroll whitespace-nowrap flex gap-10">
              <span className="flex items-center gap-1">🚀 REKBER RESMI ARGA SANGAT AMANAH - TRANSAKSI INSTAN DI BAWAH 10 MENIT <span className="text-emerald-500">🟢</span></span>
              <span>🔥 UPDATED STOK: AKUN SULTAN FF REKOMENDASI TERSEDIA SORE INI!</span>
              <span>🛡️ GARANSI ANTI-HB PENUH 100% DIKONTROL LANGSUNG KAK ARGA ADMIN</span>
              <span>💸 PROMO JASA POSITION (JP): POST AKUN KAMU DISINI GRATIS TANPA ADMIN FEE!</span>
              
              {/* Duplicate contents to support continuous infinite carousel wrap */}
              <span className="flex items-center gap-1">🚀 REKBER RESMI ARGA SANGAT AMANAH - TRANSAKSI INSTAN DI BAWAH 10 MENIT <span className="text-emerald-500">🟢</span></span>
              <span>🔥 UPDATED STOK: AKUN SULTAN FF REKOMENDASI TERSEDIA SORE INI!</span>
              <span>🛡️ GARANSI ANTI-HB PENUH 100% DIKONTROL LANGSUNG KAK ARGA ADMIN</span>
              <span>💸 PROMO JASA POSITION (JP): POST AKUN KAMU DISINI GRATIS TANPA ADMIN FEE!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Single View Stage Card */}
      <main className="max-w-xl mx-auto px-4 pt-5 pb-8 space-y-6 relative z-10">
        
        {/* Content Tabs conditional switching */}
        {activeTab === 'beranda' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            id="beranda-tab-panel" 
            className="space-y-6"
          >
            
            {/* Automatic sliding banner replacing blue visuals (User: banner yg bisa geser setelah 5 detik) */}
            <BannerSlider onExploreClick={() => setActiveTab('stok')} />

            {/* Quick Action Navigation Grid */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab('stok')}
                className={`p-4 rounded-2xl border text-left space-y-2 transition-all transform hover:-translate-y-0.5 shadow-sm group cursor-pointer ${
                  isKuningBiru 
                    ? 'bg-slate-800/20 border-slate-700/60 hover:border-yellow-400/40' 
                    : 'bg-white border-slate-200 hover:border-blue-500/30'
                }`}
              >
                <div className="p-2 bg-amber-450/10 text-amber-400 w-max rounded-xl">
                  <Gamepad2 size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold font-sans">Katalog Stok Akun</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Explore 30+ akun Free Fire sultan siap pakai.</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('jasapost')}
                className={`p-4 rounded-2xl border text-left space-y-2 transition-all transform hover:-translate-y-0.5 shadow-sm group cursor-pointer ${
                  isKuningBiru 
                    ? 'bg-slate-800/20 border-slate-700/60 hover:border-yellow-400/40' 
                    : 'bg-white border-slate-200 hover:border-blue-500/30'
                }`}
              >
                <div className="p-2 bg-blue-450/10 text-blue-400 w-max rounded-xl">
                  <Megaphone size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold font-sans">Jasa Posting (JP)</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Promosikan akun pribadi Anda di sini gratis.</p>
                </div>
              </button>
            </div>

            {/* Trust Badges Features Row */}
            <div 
              className={`p-4 rounded-2xl border ${
                isKuningBiru ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100'
              }`}
            >
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="space-y-1">
                  <ShieldCheck size={20} className="mx-auto text-emerald-400 animate-bounce" style={{ animationDuration: '3s' }} />
                  <h4 className="text-[10px] font-extrabold font-sans">100% Anti HB</h4>
                  <p className="text-[9px] text-slate-400 leading-none">Garansi penuh admin</p>
                </div>
                <div className="space-y-1 border-x border-slate-700/20">
                  <Zap size={20} className="mx-auto text-amber-400 animate-pulse" />
                  <h4 className="text-[10px] font-extrabold font-sans">Proses Kilat</h4>
                  <p className="text-[9px] text-slate-400 leading-none">Serah data &lt;10 menit</p>
                </div>
                <div className="space-y-1">
                  <Briefcase size={20} className="mx-auto text-blue-400" />
                  <h4 className="text-[10px] font-extrabold font-sans">Rekber Terpercaya</h4>
                  <p className="text-[9px] text-slate-400 leading-none">Komunitas amanah</p>
                </div>
              </div>
            </div>

            {/* Interactive Pengenalan Arga Store Guide (New Modern Introduction Section) */}
            <div 
              className={`p-5 rounded-3xl border text-left space-y-3.5 relative overflow-hidden transition-all duration-300 ${
                isKuningBiru 
                  ? 'bg-slate-900/30 border-slate-800/85 text-white' 
                  : 'bg-white border-slate-150 text-slate-800'
              }`}
            >
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black text-blue-500 dark:text-yellow-400 tracking-wider font-mono">💡 PANDUAN & PENGENALAN</span>
                <h3 className="text-xs font-black tracking-tight uppercase">Platform Teraman Jual Beli Akun Free Fire</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Arga Store menyajikan ekosistem gaming terintegrasi untuk mempertemukan pembeli dan penjual secara langsung. Kami mengutamakan verifikasi ketat transaksi, postingan gratis, dan jaminan anti-HB 100%.
                </p>
              </div>

              {/* Collapsible/Interactive Accordion Items */}
              <div className="space-y-2 pt-2 border-t border-slate-700/10 dark:border-slate-800/40">
                {[
                  {
                    key: 'anti-hb',
                    title: '🛡️ Mengapa Belanja di Arga Store 100% Anti Hackback?',
                    desc: 'Semua proses serah terima akun diawasi langsung oleh Kak Arga Admin. Kami mengamankan alamat email pemulihan, memutuskan sesi aktif perangkat lain secara paksa, serta memberikan garansi admin penuh apabila terjadi keganjilan di kemudian hari.'
                  },
                  {
                    key: 'jasa-posting',
                    title: '📢 Layanan Jasa Posting (JP) Akun FF - 100% Gratis!',
                    desc: 'Memiliki akun pribadi yang ingin segera dicairkan menjadi uang tunai? Anda bisa memajang detail dagangan Anda di menu Jasa Post secara gratis! Akun Anda akan dipromosikan ke grup komunitas WhatsApp kami tanpa komisi potongan sepeser pun.'
                  },
                  {
                    key: 'sistem-rekber',
                    title: '💳 Bagaimana Mekanisme Rekber Jual Beli Berjalan?',
                    desc: 'Rekber (Rekening Bersama) melindungi pembeli dan penjual. Pembeli mengirim pembayaran ke rekening resmi Kak Arga, Admin mengamankan detail login akun Free Fire dari Penjual, setelah pembeli berhasil login & mengecek spesifikasi, uang diteruskan ke Penjual.'
                  }
                ].map((item) => {
                  const isExpanded = expandedIntroKey === item.key;
                  return (
                    <div 
                      key={item.key}
                      onClick={() => setExpandedIntroKey(isExpanded ? null : item.key)}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                        isExpanded 
                          ? isKuningBiru
                            ? 'bg-slate-950/80 border-yellow-400/40 shadow-xs'
                            : 'bg-blue-50/50 border-blue-500/20 shadow-xs'
                          : isKuningBiru
                            ? 'bg-slate-900/30 border-slate-800/60 hover:bg-slate-900/60 text-slate-100'
                            : 'bg-slate-50/50 border-slate-100/80 hover:bg-slate-100/60 text-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-center select-none">
                        <span className="text-[11px] font-bold">{item.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{isExpanded ? '▲' : '▼'}</span>
                      </div>
                      {isExpanded && (
                        <p className="text-[10.5px] text-slate-400 leading-normal mt-2 pt-2 border-t border-slate-705 border-slate-700/10 dark:border-slate-800/20 whitespace-pre-wrap">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stok Akun Beranda (Showcase Recommended Accounts directly in Homepage) */}
            <div className="text-left space-y-3">
              <div className="flex justify-between items-center border-b border-slate-700/10 pb-1 select-none">
                <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase inline-flex items-center gap-1.5">
                  <Gamepad2 size={13} className="text-amber-400" />
                  Stok Akun Rekomendasi 🛡️
                </h3>
                <span 
                  onClick={() => setActiveTab('stok')} 
                  className="text-[11px] font-black text-blue-500 dark:text-yellow-400 hover:underline cursor-pointer transition-all"
                >
                  Lihat Semua ➔
                </span>
              </div>

              {/* Dynamic Recommendation Filter Toggles (Visual Bergerak) */}
              <div className="flex gap-2 max-w-full overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'hot', label: '🔥 Pilihan Hot' },
                  { id: 'sultan', label: '👑 Akun Sultan' },
                  { id: 'murah', label: '🛒 Harga Hemat' }
                ].map((t) => {
                  const isActive = homeRecTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setHomeRecTab(t.id as any)}
                      className={`px-3 py-2 rounded-xl text-[10px] font-extrabold tracking-tight cursor-pointer whitespace-nowrap transition-all flex-1 text-center border ${
                        isActive
                          ? isKuningBiru
                            ? 'bg-yellow-400 text-slate-950 border-yellow-400 shadow-xs'
                            : 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : isKuningBiru
                            ? 'bg-slate-905 bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {((homeRecTab === 'hot') 
                  ? stockAccounts.filter(acc => acc.isHot).slice(0, 2)
                  : (homeRecTab === 'sultan')
                    ? [...stockAccounts].sort((a,b) => b.price - a.price).slice(0, 2)
                    : [...stockAccounts].sort((a,b) => a.price - b.price).slice(0, 2)
                ).map((acc) => {
                  return (
                    <motion.div
                      key={acc.id}
                      layout
                      whileHover={{ y: -4, scale: 1.01 }}
                      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                        isKuningBiru 
                          ? 'bg-slate-900/50 border-slate-850 hover:border-yellow-400/40 text-white shadow-lg shadow-slate-950/20' 
                          : 'bg-white border-slate-150 hover:border-blue-500/20 hover:shadow-md text-slate-800'
                      }`}
                    >
                      <div className="relative h-[115px] bg-slate-950">
                        <img 
                          src={acc.imageUrl} 
                          alt={acc.title} 
                          className="w-full h-full object-cover opacity-90"
                          referrerPolicy="no-referrer"
                        />
                        {acc.isHot && (
                          <span className="absolute top-2 left-2 text-[8px] font-black uppercase bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded tracking-wide shadow-xs animate-pulse">
                            Hot Deal
                          </span>
                        )}
                        <span className="absolute top-2 right-2 text-[9px] font-extrabold font-mono px-2 py-0.5 rounded-full bg-slate-900/80 text-white border border-slate-700/50">
                          {acc.code}
                        </span>
                      </div>
                      <div className="p-3.5 space-y-2 text-left">
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-black line-clamp-1">{acc.title}</h4>
                          <span className="text-[10px] text-slate-400 block font-mono">Tier: {acc.tier} • Lvl {acc.level}</span>
                        </div>
                        
                        <div className="flex gap-2 text-[10px] text-slate-400">
                          <span>Skins: <strong>{acc.skinSenjataCount}</strong></span>
                          <span>Bundle: <strong>{acc.bundleCount}</strong></span>
                          <span>Emote: <strong>{acc.emoteCount}</strong></span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-700/10 dark:border-slate-800/60">
                          <div className="flex flex-col">
                            {acc.originalPrice && (
                              <span className="text-[9px] text-slate-500 line-through">Rp {acc.originalPrice.toLocaleString('id-ID')}</span>
                            )}
                            <span className="text-xs font-black text-emerald-400">Rp {acc.price.toLocaleString('id-ID')}</span>
                          </div>
                          
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleViewDetailsFromHome(acc)}
                              className={`p-1 px-2.5 rounded-lg text-[10px] border font-bold transition-all ${
                                isKuningBiru 
                                  ? 'border-slate-700 bg-slate-800 hover:border-yellow-400 hover:text-yellow-400 text-slate-300 cursor-pointer' 
                                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 cursor-pointer'
                              }`}
                              title="Detail"
                            >
                              <Eye size={10} className="inline mr-1" />
                              Specs
                            </button>
                            <button
                              onClick={() => triggerWhatsAppAdmin(`Halo Kak Admin Arga Store, saya ingin membeli akun stok dengan Kode: ${acc.code} [Harga: Rp ${acc.price.toLocaleString('id-ID')}]. Apakah masih ready?`)}
                              className={`p-1 px-2.5 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                                isKuningBiru 
                                  ? 'bg-yellow-400 hover:bg-yellow-550 text-slate-950 shadow-xs' 
                                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                              }`}
                            >
                              Beli
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Community stats widgets (Campur js untuk animasi bergerak) */}
            <div className="grid grid-cols-3 gap-3">
              <div className={`p-3 rounded-2xl border text-center ${
                isKuningBiru ? 'bg-slate-800/10 border-slate-800' : 'bg-white border-slate-100'
              }`}>
                <Users size={14} className="mx-auto text-blue-400 mb-1 animate-pulse" />
                <span className="text-sm font-extrabold block text-blue-500">12K+</span>
                <span className="text-[8px] text-slate-400 tracking-wider">MEMBER GRUP</span>
              </div>
              <div className={`p-3 rounded-2xl border text-center ${
                isKuningBiru ? 'bg-slate-800/10 border-slate-800' : 'bg-white border-slate-100'
              }`}>
                <CheckCircle size={14} className="mx-auto text-emerald-400 mb-1" />
                <span className="text-sm font-extrabold block text-emerald-400">340+</span>
                <span className="text-[8px] text-slate-400 tracking-wider">SUKSES REKBER</span>
              </div>
              <div className={`p-3 rounded-2xl border text-center ${
                isKuningBiru ? 'bg-slate-800/10 border-slate-800' : 'bg-white border-slate-100'
              }`}>
                <Award size={14} className="mx-auto text-yellow-400 mb-1" />
                <span className="text-sm font-extrabold block text-yellow-400">99.8%</span>
                <span className="text-[8px] text-slate-400 tracking-wider">RATING PUAS</span>
              </div>
            </div>

            {/* Easy Guide Module block */}
            <div className="text-left space-y-3">
              <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase inline-flex items-center gap-1.5">
                <BookOpen size={13} />
                Langkah Transaksi Jual-Beli Akun
              </h3>

              <div className="space-y-2.5">
                {[
                  { step: '01', title: 'Pilih Akun yang Cocok', desc: 'Buka tab "Stok Akun" untuk melihat akun FF sultan atau tab "Jasa Post" untuk memilah titipan user.' },
                  { step: '02', title: 'Hubungi Admin / Penjual', desc: 'Tekan tombol "Beli" untuk langsung dialihkan ke WhatsApp Admin Arga dengan template otomatis.' },
                  { step: '03', title: 'Proses Rekber Amanah', desc: 'Admin akan memeriksa kecocokan data, mengamankan kode login, mengganti email/HP, lalu menyalurkan uang ke penjual.' }
                ].map((item) => (
                  <div 
                    key={item.step} 
                    className={`p-3.5 rounded-xl border flex gap-3.5 items-start ${
                      isKuningBiru ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-150'
                    }`}
                  >
                    <span className="text-xs font-mono font-black text-blue-500 bg-blue-500/10 size-6 rounded-full flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold">{item.title}</h4>
                      <p className="text-[10.5px] text-slate-400 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profil Admin Resmi & Rekber ARGA (Interactive Card) */}
            <motion.div 
              whileHover={{ scale: 1.005 }}
              className={`p-5 rounded-3xl border text-left space-y-3.5 relative overflow-hidden transition-all duration-300 ${
                isKuningBiru 
                  ? 'bg-gradient-to-br from-slate-900/40 via-slate-950 to-slate-900/40 border-slate-800/80 shadow-md' 
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-yellow-450/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* Decorative avatar icon */}
                  <div className="relative">
                    <div className={`p-3 rounded-2xl ${
                      isKuningBiru ? 'bg-yellow-400 text-slate-950' : 'bg-blue-600 text-white'
                    } shadow-xs`}>
                      <BadgeCheck size={20} className="animate-pulse" />
                    </div>
                    {/* Pulsing online indicator */}
                    <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"></span>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-tight leading-none uppercase inline-flex items-center gap-1">
                      Kak Arga (Official Admin)
                    </h3>
                    <p className="text-[9px] text-slate-400 mt-1.5 font-mono tracking-widest leading-none">REKBER ID: VERIFIED_01</p>
                  </div>
                </div>
                
                <span className="text-[9px] px-2 py-0.5 font-bold rounded-md bg-emerald-400/10 text-emerald-400 border border-emerald-500/20 tracking-wider">
                  ONLINE 🟢
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                <p>
                  Mediator transaksi resmi: <strong className="text-blue-500 dark:text-yellow-400">Kak Arga</strong>. Semua penyerahan data akun, pengamanan email binned, dan transfer dana amanat diproses aman terhindar dari hack-back (HB) maupun penipuan (Escrow).
                </p>

                {/* Accepted Payment icons/tags */}
                <div className="space-y-1.5 pt-1.5 border-t border-slate-700/10 dark:border-slate-800/40">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Metode Pembayaran Rekber Resmi Arga Store</span>
                  <div className="flex flex-wrap gap-1">
                    {['DANA', 'OVO', 'GOPAY', 'QRIS Mandiri', 'BCA Transfer'].map((pay) => (
                      <span key={pay} className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-900/40 dark:bg-slate-800 text-slate-305 text-slate-350 border border-slate-700/10 dark:border-slate-800/10">
                        {pay}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live transaction ticker in admin profile for realism and trust (Visual Bergerak) */}
                <div className="pt-2.5 border-t border-slate-700/10 dark:border-slate-800/40 space-y-1.5">
                  <span className="text-[9px] uppercase font-bold text-blue-500 dark:text-yellow-400 tracking-wider flex items-center gap-1 mb-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Aktivitas Rekber Terkini (Live)
                  </span>
                  <div className={`p-2.5 rounded-xl text-[10.5px] font-mono leading-relaxed relative ${
                    isKuningBiru ? 'bg-slate-900/65 text-slate-300' : 'bg-slate-100/70 text-slate-600'
                  }`}>
                    <div className="flex items-center justify-between text-emerald-400 font-black mb-1">
                      <span className="flex items-center gap-1 text-[9.5px]">🛡️ SUCCESSFUL TRANSACTION</span>
                      <span className="text-[8.5px] text-slate-500">Baru Selesai</span>
                    </div>
                    Pembelian Kode <strong className={isKuningBiru ? 'text-white' : 'text-slate-900'}>FF-812</strong> senilai <strong className="text-emerald-400">Rp 450.000</strong> berhasil diserahterahkan dengan aman terverifikasi! Status: <span className="px-1.5 py-0.5 bg-emerald-500/10 rounded text-[8.5px] text-emerald-400 font-bold">DONE</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Call Action */}
              <button
                onClick={() => triggerWhatsAppAdmin('Halo Kak Arga, saya rindu bertransaksi / ingin berkonsultasi seputar rekber aman di Arga Store!')}
                className={`w-full py-3 rounded-2xl font-black text-xs cursor-pointer shadow-xs inline-flex items-center justify-center gap-2 transform active:scale-95 transition-all ${
                  isKuningBiru 
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-extrabold' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white font-extrabold'
                }`}
              >
                <MessageSquare size={14} />
                Hubungi Resmi WhatsApp Kak Arga
              </button>
            </motion.div>

            {/* Quick Testimonial summary ticker */}
            <div 
              className={`p-4 rounded-2xl border text-left flex items-center justify-between cursor-pointer ${
                isKuningBiru ? 'bg-slate-800/10 border-slate-800' : 'bg-white border-slate-150'
              }`}
              onClick={() => setActiveTab('testimoni')}
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-yellow-400/20 text-yellow-400 rounded-lg">
                  <Star size={14} fill="currentColor" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Ulasan Terbaru Pembeli</h4>
                  <p className="text-[9.5px] text-slate-400">Lihat kepuasan {testimonials.length} transaksi terverifikasi admin.</p>
                </div>
              </div>
              <span className="text-xs font-black text-blue-500 dark:text-yellow-400">Lihat ➔</span>
            </div>

          </motion.div>
        )}

        {activeTab === 'stok' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            id="stok-tab-panel" 
            className="space-y-4"
          >
            <div className="text-left space-y-1">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block font-mono">ARGA STOK KATALOG</span>
              <h2 className="text-lg font-black tracking-tight uppercase">Galeri Stok Akun Free Fire</h2>
              <p className="text-xs text-slate-400">Dua langkah praktis: Cari akun sultan idamanmu, klik tombol Beli, langsung transaksi rekber aman dipandu admin.</p>
            </div>
            
            <StokAkunSection 
              accounts={stockAccounts} 
              theme={theme} 
              onContactAdmin={triggerWhatsAppAdmin} 
              focusedAccount={focusedAccount}
              onClearFocusedAccount={() => setFocusedAccount(null)}
            />
          </motion.div>
        )}

        {activeTab === 'jasapost' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            id="jasapost-tab-panel" 
            className="space-y-4"
          >
            <div className="text-left space-y-1">
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block font-mono">JASA PROMOSI AKUN</span>
              <h2 className="text-lg font-black tracking-tight uppercase">Koleksi Jasa Posting (JP)</h2>
              <p className="text-xs text-slate-400">Ingin mempromosikan akun Anda di sini secara gratis? Isi pendaftaran WhatsApp admin!</p>
            </div>

            <JasaPostSection 
              accounts={jasaPosts} 
              theme={theme} 
              onSubmitNewJP={handleAddNewJP} 
              onContactSeller={triggerWhatsAppSeller} 
            />
          </motion.div>
        )}

        {activeTab === 'testimoni' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            id="testimoni-tab-panel" 
            className="space-y-4"
          >
            <div className="text-left space-y-1">
              <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest block font-mono">TESTIMONIALS & REVIEWS</span>
              <h2 className="text-lg font-black tracking-tight uppercase">Ulasan & Bukti Transaksi</h2>
              <p className="text-xs text-slate-400">Konsumen adalah raja. Berikut adalah tanggapan asli dari rekan-rekan pembeli yang bertransaksi di Arga Store.</p>
            </div>

            <TestimoniSection 
              testimonials={testimonials} 
              theme={theme} 
              onSubmitTestimonial={handleAddNewTestimonial} 
            />
          </motion.div>
        )}

        {activeTab === 'bio' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            id="bio-tab-panel" 
            className="space-y-4"
          >
            <div className="text-left space-y-1">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block font-mono">KARTU LINK IN BIO</span>
              <h2 className="text-lg font-black tracking-tight uppercase">Profil & Kontak Admin</h2>
              <p className="text-xs text-slate-400">Gunakan link resmi di bawah untuk menghindari akun admin tiruan yang mencoba melakukan penipuan.</p>
            </div>

            <LinkInBioSection 
              theme={theme} 
              onContactAdmin={triggerWhatsAppAdmin} 
            />
          </motion.div>
        )}

      </main>

      {/* Fixed bottom toolbar matching 'terang' / 'kuning-biru' requirements */}
      <Toolbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme} 
      />
    </div>
  );
}
