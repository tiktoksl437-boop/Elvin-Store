import React, { useState } from 'react';
import { Megaphone, FilePlus2, BadgeCheck, Eye, EyeOff, Check, Heart, PlusCircle, Sparkles } from 'lucide-react';
import { JasaPostAccount } from '../types';

interface JasaPostSectionProps {
  accounts: JasaPostAccount[];
  theme: 'light' | 'kuning-biru';
  onSubmitNewJP: (newJP: JasaPostAccount) => void;
  onContactSeller: (msg: string, number: string) => void;
}

export default function JasaPostSection({ accounts, theme, onSubmitNewJP, onContactSeller }: JasaPostSectionProps) {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [selectedJP, setSelectedJP] = useState<JasaPostAccount | null>(null);

  // Form Fields State
  const [senderName, setSenderName] = useState('');
  const [nickname, setNickname] = useState('');
  const [priceRequested, setPriceRequested] = useState('');
  const [level, setLevel] = useState('');
  const [tier, setTier] = useState('Heroic');
  const [loginType, setLoginType] = useState('Google login');
  const [skinSenjataCount, setSkinSenjataCount] = useState('');
  const [bundleCount, setBundleCount] = useState('');
  const [emoteCount, setEmoteCount] = useState('');
  const [description, setDescription] = useState('');
  const [contactSender, setContactSender] = useState('');
  const [imageStyle, setImageStyle] = useState<'lobby' | 'weapon'>('lobby');

  const isKuningBiru = theme === 'kuning-biru';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !nickname || !priceRequested || !level || !contactSender) {
      alert('Tolong lengkapi semua baris bertanda bintang (*)!');
      return;
    }

    // Determine the image fallback based on style selected
    // (We reference our high quality generated image paths)
    const lobbyImg = '/src/assets/images/ff_lobby_screenshot_one_1781870227494.jpg';
    const weaponImg = '/src/assets/images/ff_gun_screenshot_two_1781870243815.jpg';
    const selectedImg = imageStyle === 'lobby' ? lobbyImg : weaponImg;

    const newJPItem: JasaPostAccount = {
      id: `jp-custom-${Date.now()}`,
      senderName,
      nickname,
      priceRequested: Number(priceRequested) || 100000,
      level: Number(level) || 50,
      tier,
      loginType,
      skinSenjataCount: Number(skinSenjataCount) || 10,
      bundleCount: Number(bundleCount) || 10,
      emoteCount: Number(emoteCount) || 5,
      description: description || 'Akun titipan cepat laku bro!',
      imageUrl: selectedImg,
      galleryUrls: [selectedImg],
      contactSender: contactSender.replace(/\D/g, ''), // strip down non-numeric
      views: 1,
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: false // Admin must verify in practice but we append to list on UI
    };

    onSubmitNewJP(newJPItem);
    
    // Reset Form
    setSenderName('');
    setNickname('');
    setPriceRequested('');
    setLevel('');
    setSkinSenjataCount('');
    setBundleCount('');
    setEmoteCount('');
    setDescription('');
    setContactSender('');
    setShowSubmitForm(false);
    
    alert('Sukses! Akun Anda berhasil didaftarkan ke daftar antrean Jasa Posting (JP) Arga Store.');
  };

  const handleContactClick = (jp: JasaPostAccount) => {
    const textMsg = `Halo Kak ${jp.senderName}, saya melihat Akun FF Kakak [Nick: ${jp.nickname}] dipromosikan di Jasa Post ARGA STORE. Apakah masih dipromosikan? Speknya: Tier ${jp.tier}, level ${jp.level}, Harga: Rp ${jp.priceRequested.toLocaleString('id-ID')}`;
    onContactSeller(textMsg, jp.contactSender);
  };

  return (
    <div className="space-y-6">
      {/* Grid of promoted JP listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((jp) => (
          <div
            key={jp.id}
            className={`flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl ${
              isKuningBiru 
                ? 'bg-slate-800/20 border-slate-700/50 hover:border-yellow-400/30 text-slate-200' 
                : 'bg-white border-slate-200/60 hover:shadow-slate-100 text-slate-800'
            }`}
          >
            {/* Image layout */}
            <div className="relative h-[160px] overflow-hidden bg-slate-900">
              <img
                src={jp.imageUrl}
                alt={jp.nickname}
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Verified badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-blue-500/90 text-white text-[10px] uppercase font-bold py-0.5 px-2 rounded-full shadow-xs">
                <BadgeCheck size={11} />
                {jp.isVerified ? 'VERIFIED SELLER' : 'PLAYER UNIT'}
              </div>

              {/* Target Price */}
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md py-1 px-2.5 rounded-xl text-teal-400 font-extrabold text-xs">
                Rp {jp.priceRequested.toLocaleString('id-ID')}
              </div>
            </div>

            {/* JP Card specifications */}
            <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
              <div className="space-y-2 text-left">
                {/* Nick & Creator */}
                <div>
                  <h3 className="text-sm font-extrabold line-clamp-1">{jp.nickname}</h3>
                  <p className="text-[10px] text-slate-400">Diposting oleh: <span className="text-slate-300 font-medium">{jp.senderName}</span></p>
                </div>

                {/* Specs list */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 p-2.5 rounded-xl bg-slate-900/20 text-[11px] border border-slate-700/10">
                  <div className="text-slate-400">Level: <strong className="text-slate-300">{jp.level}</strong></div>
                  <div className="text-slate-400">Tier: <strong className="text-slate-300">{jp.tier}</strong></div>
                  <div className="text-slate-400 col-span-2">Login: <strong className="text-slate-300">{jp.loginType}</strong></div>
                  <div className="text-slate-400">Skin: <strong className="text-slate-300">{jp.skinSenjataCount}</strong></div>
                  <div className="text-slate-400">Bundle: <strong className="text-slate-300">{jp.bundleCount}</strong></div>
                </div>

                {/* Additional detailed specification */}
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-normal italic">
                  &ldquo;{jp.description}&rdquo;
                </p>
              </div>

              {/* Interactive buttons */}
              <div className="flex gap-2 pt-2 border-t border-slate-700/10 shrink-0">
                <button
                  onClick={() => setSelectedJP(jp)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                    isKuningBiru 
                      ? 'border-slate-700 hover:bg-slate-800' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  🔎 Lihat Selengkapnya
                </button>
                <button
                  onClick={() => handleContactClick(jp)}
                  className="flex-1 py-2 text-xs font-extrabold rounded-xl bg-teal-500 hover:bg-teal-600 text-white shadow-md flex justify-center items-center gap-1 transition-all transform active:scale-95"
                >
                  💬 Kontak Owner
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Model Spec popup specifically for Jasa Post items */}
      {selectedJP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className={`w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative border ${
            isKuningBiru ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="p-4 flex items-center justify-between border-b border-slate-700/20">
              <span className="text-xs font-bold text-slate-400 uppercase">Detail Akun Jasa Post</span>
              <button 
                onClick={() => setSelectedJP(null)}
                className="p-1 px-2 text-slate-400 font-bold hover:text-red-500"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-5 space-y-4 text-left max-h-[82vh] overflow-y-auto">
              <div className="h-[150px] relative rounded-2xl overflow-hidden bg-slate-950">
                <img 
                  src={selectedJP.imageUrl} 
                  alt={selectedJP.nickname} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-blue-400">{selectedJP.nickname}</h3>
                <p className="text-xs text-slate-400">Pengirim: {selectedJP.senderName} ({selectedJP.createdAt})</p>
              </div>

              {/* Data specifications list */}
              <div className="p-3 bg-slate-950/20 border border-slate-700/10 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-750 pb-1">
                  <span className="text-slate-400">Level:</span>
                  <span className="font-bold">{selectedJP.level}</span>
                </div>
                <div className="flex justify-between border-b border-slate-750 pb-1">
                  <span className="text-slate-400">Tier:</span>
                  <span className="font-bold text-teal-400">{selectedJP.tier}</span>
                </div>
                <div className="flex justify-between border-b border-slate-750 pb-1">
                  <span className="text-slate-400">Login:</span>
                  <span className="font-bold">{selectedJP.loginType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-750 pb-1">
                  <span className="text-slate-400">Skin Senjata:</span>
                  <span className="font-bold">{selectedJP.skinSenjataCount} Skin</span>
                </div>
                <div className="flex justify-between border-b border-slate-750 pb-1">
                  <span className="text-slate-400">Bundle Baju:</span>
                  <span className="font-bold">{selectedJP.bundleCount} Baju</span>
                </div>
                <div className="flex justify-between pb-0.5">
                  <span className="text-slate-400">Emote:</span>
                  <span className="font-bold">{selectedJP.emoteCount} Emote</span>
                </div>
              </div>

              {/* Long Description note */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Catatan Pengirim:</h4>
                <p className="text-xs text-slate-350 leading-relaxed bg-slate-950/15 p-3 rounded-xl border border-slate-700/5">
                  &ldquo;{selectedJP.description}&rdquo;
                </p>
              </div>

              {/* Safety warning */}
              <div className="p-3 bg-amber-450/10 border border-amber-500/20 rounded-xl text-[10px] text-amber-500 leading-normal flex gap-1.5 items-start">
                <span>⚠️</span>
                <span><strong>Perhatian:</strong> Akun ini dipasang oleh player luar. Selalu gunakan Jasa Rekber Admin Arga (bisa diakses di tab Kontak Bio) untuk meniti transaksi agar 100% aman anti penipuan!</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950/10 border-t border-slate-700/20 flex gap-2">
              <button
                onClick={() => setSelectedJP(null)}
                className="flex-1 py-3 text-xs font-bold rounded-xl border border-slate-700 hover:bg-slate-750"
              >
                Kembali
              </button>
              <button
                onClick={() => {
                  handleContactClick(selectedJP);
                  setSelectedJP(null);
                }}
                className="flex-1 py-3 text-xs font-extrabold rounded-xl bg-teal-500 text-white hover:bg-teal-600 text-center flex justify-center items-center gap-1"
              >
                Hubungi Penjual (WA)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
