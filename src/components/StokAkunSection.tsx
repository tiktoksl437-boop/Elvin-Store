import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Gamepad, Lock, Eye, Check, AlertCircle, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { StockAccount } from '../types';

interface StokAkunSectionProps {
  accounts: StockAccount[];
  theme: 'light' | 'kuning-biru';
  onContactAdmin: (msg: string) => void;
  focusedAccount?: StockAccount | null;
  onClearFocusedAccount?: () => void;
}

export default function StokAkunSection({ accounts, theme, onContactAdmin, focusedAccount, onClearFocusedAccount }: StokAkunSectionProps) {
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');
  const [sortBy, setSortBy] = useState('hot'); // hot, cheap, expensive, level
  const [selectedAccount, setSelectedAccount] = useState<StockAccount | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    if (focusedAccount) {
      setSelectedAccount(focusedAccount);
      setActiveImgIndex(0);
      if (onClearFocusedAccount) {
        onClearFocusedAccount();
      }
    }
  }, [focusedAccount, onClearFocusedAccount]);
  
  const isKuningBiru = theme === 'kuning-biru';

  // Get distinct tiers for filter
  const distinctTiers = ['All', ...Array.from(new Set(accounts.map((acc) => acc.tier)))];

  // Filter and Sort implementation
  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch = 
      acc.title.toLowerCase().includes(search.toLowerCase()) ||
      acc.code.toLowerCase().includes(search.toLowerCase()) ||
      acc.epicSkins.some(skin => skin.toLowerCase().includes(search.toLowerCase())) ||
      acc.description.toLowerCase().includes(search.toLowerCase());
      
    const matchesTier = selectedTier === 'All' || acc.tier === selectedTier;
    
    return matchesSearch && matchesTier;
  });

  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    if (sortBy === 'hot') {
      return (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0);
    }
    if (sortBy === 'cheap') {
      return a.price - b.price;
    }
    if (sortBy === 'expensive') {
      return b.price - a.price;
    }
    if (sortBy === 'level') {
      return b.level - a.level;
    }
    return 0;
  });

  const handleBuyClick = (acc: StockAccount) => {
    const textMsg = `Halo Admin Arga, saya tertarik untuk membeli Stok Akun Free Fire:\n\n- KODE: ${acc.code}\n- SPEK: ${acc.title}\n- TIER: ${acc.tier}\n- HARGA: Rp ${acc.price.toLocaleString('id-ID')}\n\nApakah akun ini masih ready?`;
    onContactAdmin(textMsg);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Section */}
      <div 
        className={`p-4 rounded-2xl border transition-all duration-300 ${
          isKuningBiru 
            ? 'bg-slate-800/40 border-slate-700/80 text-slate-200' 
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-4.5" />
            <input
              type="text"
              placeholder="Cari Evo Gun, Skin, Kode, atau Deskripsi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-sm rounded-xl outline-hidden focus:ring-2 transition-all ${
                isKuningBiru 
                  ? 'bg-slate-900/60 border-slate-700 focus:ring-yellow-400 border text-white' 
                  : 'bg-slate-50 border-slate-200 focus:ring-blue-500 border text-slate-800'
              }`}
            />
          </div>

          {/* Tier Filter */}
          <div className="flex gap-2">
            <div className="relative flex-1 md:w-40 min-w-[120px]">
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className={`w-full px-3 py-2 text-sm rounded-xl outline-hidden appearance-none cursor-pointer border ${
                  isKuningBiru 
                    ? 'bg-slate-900/60 border-slate-700 text-white focus:ring-yellow-400 focus:ring-2' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:ring-blue-500 focus:ring-2'
                }`}
              >
                {distinctTiers.map((tier) => (
                  <option key={tier} value={tier}>Rank: {tier}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                <SlidersHorizontal size={14} />
              </div>
            </div>

            {/* Sort Options */}
            <div className="relative flex-1 md:w-44 min-w-[140px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`w-full px-3 py-2 text-sm rounded-xl outline-hidden appearance-none cursor-pointer border ${
                  isKuningBiru 
                    ? 'bg-slate-900/60 border-slate-700 text-white focus:ring-yellow-400 focus:ring-2' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:ring-blue-500 focus:ring-2'
                }`}
              >
                <option value="hot">🔥 Rekomendasi / Hot</option>
                <option value="cheap">💸 Termurah</option>
                <option value="expensive">💎 Termahal</option>
                <option value="level">🎖️ Level Tertinggi</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                <SlidersHorizontal size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Accounts */}
      {sortedAccounts.length === 0 ? (
        <div className="text-center py-12 space-y-3">
          <AlertCircle className="mx-auto size-12 text-slate-400 animate-bounce" />
          <p className="text-sm text-slate-500 font-medium">Wah, stok akun pencarianmu tidak ditemukan.</p>
          <button 
            onClick={() => { setSearch(''); setSelectedTier('All'); }} 
            className="text-xs font-semibold px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Reset Filter Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedAccounts.map((acc) => (
            <div
              key={acc.id}
              className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
                isKuningBiru
                  ? 'bg-slate-800/30 border-slate-700/60 text-slate-200 hover:border-yellow-400/40'
                  : 'bg-white border-slate-100 text-slate-800 hover:shadow-slate-200/60'
              }`}
            >
              {/* Card Image and Sold out banner */}
              <div className="relative h-[180px] overflow-hidden bg-slate-950 shrink-0">
                <img
                  src={acc.imageUrl}
                  alt={acc.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hot badge */}
                {acc.isHot && !acc.isSold && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500 text-slate-900 uppercase tracking-wider shadow-md animate-pulse">
                    Hot Deal
                  </span>
                )}

                {/* Account Code badge */}
                <span className={`absolute top-3 right-3 px-2.5 py-0.5 text-[11px] font-mono font-bold rounded-full text-white ${
                  isKuningBiru ? 'bg-blue-600' : 'bg-slate-800'
                }`}>
                  {acc.code}
                </span>

                {/* Sold badge */}
                {acc.isSold && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3">
                    <div className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg text-sm font-extrabold uppercase tracking-widest bg-red-950/20 rotate-[-8deg] shadow-lg">
                      SOLD OUT (LAKU)
                    </div>
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold leading-snug line-clamp-1 group-hover:text-amber-400 transition-colors">
                    {acc.title}
                  </h3>
                  
                  {/* Quick specs grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Gamepad size={13} className="text-blue-400" />
                      <span>Tier: <strong className="text-slate-300 font-semibold">{acc.tier}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Lock size={13} className="text-amber-400" />
                      <span>Log: <strong className="text-slate-300 font-semibold">{acc.loginType}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <span className="inline-flex gap-1">Skin Senjata: <strong>{acc.skinSenjataCount}</strong></span>
                      <span className="text-slate-700">|</span>
                      <span className="inline-flex gap-1">Bundle: <strong>{acc.bundleCount}</strong></span>
                      <span className="text-slate-700">|</span>
                      <span>Level: <strong>{acc.level}</strong></span>
                    </div>
                  </div>

                  {/* Highlights of skins */}
                  <p className="text-[11px] text-slate-400 line-clamp-2 italic pt-1 border-t border-slate-700/20">
                    Skins: {acc.epicSkins.slice(0, 3).join(', ')}...
                  </p>
                </div>

                {/* Bottom interactive items */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-700/10">
                  {/* Price */}
                  <div>
                    {acc.originalPrice && (
                      <span className="text-[10px] text-slate-400 line-through block">
                        Rp {acc.originalPrice.toLocaleString('id-ID')}
                      </span>
                    )}
                    <span className="text-base font-extrabold text-emerald-400 block dark:text-emerald-400">
                      Rp {acc.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-1.5">
                    {/* View Details button */}
                    <button
                      onClick={() => {
                        setSelectedAccount(acc);
                        setActiveImgIndex(0);
                      }}
                      className={`p-2 rounded-xl border transition-all ${
                        isKuningBiru 
                          ? 'border-slate-705 border-slate-700 bg-slate-900/60 hover:border-yellow-400 hover:text-yellow-400' 
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:text-blue-500'
                      }`}
                      title="Lihat Gambar & Detail Spek"
                    >
                      <Eye size={16} />
                    </button>

                    {/* Buy button */}
                    <button
                      disabled={acc.isSold}
                      onClick={() => handleBuyClick(acc)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        acc.isSold
                          ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
                          : isKuningBiru
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-extrabold shadow-md transform active:scale-95'
                            : 'bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-md transform active:scale-95'
                      }`}
                    >
                      <ShoppingCart size={13} />
                      Beli
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details/Screenshots Spec Modal */}
      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-hidden">
          <div 
            className={`w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh] border transition-all ${
              isKuningBiru 
                ? 'bg-slate-900 border-slate-800 text-slate-100' 
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            {/* Modal Header */}
            <div className="p-4 flex items-center justify-between border-b border-slate-700/20">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-400 text-slate-950">
                  {selectedAccount.code}
                </span>
                <span className="text-xs text-slate-450 italic">Detail Akun</span>
              </div>
              <button 
                onClick={() => setSelectedAccount(null)}
                className="p-1 px-2.5 rounded-lg hover:bg-slate-700/10 text-slate-400 font-bold hover:text-red-500"
              >
                ✕ Close
              </button>
            </div>

            {/* Modal Scrollable Contents */}
            <div className="p-5 space-y-5 overflow-y-auto flex-1">
              {/* Pictures/Screenshots Gallery */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Screenshot Akun Spotlights</h4>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-amber-450 font-mono font-medium">
                    {activeImgIndex + 1} / {selectedAccount.galleryUrls.length} Gambar
                  </span>
                </div>
                
                {/* Main active preview image */}
                <div className="relative rounded-2xl overflow-hidden h-[230px] bg-slate-950 border border-slate-700/50 group/gallery shadow-inner">
                  <img 
                    src={selectedAccount.galleryUrls[activeImgIndex]} 
                    alt={`Screenshot Active ${activeImgIndex + 1}`} 
                    className="w-full h-full object-cover transition-all duration-350"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Prev button */}
                  {selectedAccount.galleryUrls.length > 1 && (
                    <button
                      onClick={() => setActiveImgIndex((prev) => (prev - 1 + selectedAccount.galleryUrls.length) % selectedAccount.galleryUrls.length)}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white transition-colors duration-155 backdrop-blur-xs hover:scale-105 active:scale-95"
                      title="Sebelumnya"
                    >
                      <ChevronLeft size={18} />
                    </button>
                  )}

                  {/* Next button */}
                  {selectedAccount.galleryUrls.length > 1 && (
                    <button
                      onClick={() => setActiveImgIndex((prev) => (prev + 1) % selectedAccount.galleryUrls.length)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white transition-colors duration-155 backdrop-blur-xs hover:scale-105 active:scale-95"
                      title="Berikutnya"
                    >
                      <ChevronRight size={18} />
                    </button>
                  )}

                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 bg-slate-950/80 backdrop-blur-xs text-[10px] rounded-lg text-slate-350 border border-slate-800 font-mono">
                    Slide {activeImgIndex + 1}
                  </span>
                </div>

                {/* Smaller thumbnails selector for multi screenshots */}
                {selectedAccount.galleryUrls.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 pt-1">
                    {selectedAccount.galleryUrls.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImgIndex(i)}
                        className={`relative rounded-xl overflow-hidden h-[54px] bg-slate-950 border-2 transition-all duration-200 ${
                          activeImgIndex === i 
                            ? 'border-amber-450 border-amber-400 scale-[1.02] shadow-md shadow-amber-400/20' 
                            : 'border-transparent hover:border-slate-500/50 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`Thumbnail ${i+1}`} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Price */}
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold">{selectedAccount.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-emerald-400">
                    Rp {selectedAccount.price.toLocaleString('id-ID')}
                  </span>
                  {selectedAccount.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      Mulai Rp {selectedAccount.originalPrice.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
              </div>

              {/* Data Specifications Table */}
              <div className="p-4 rounded-2xl bg-slate-950/20 border border-slate-700/10 space-y-2.5">
                <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider">Spesifikasi Detail (Spek Data)</h4>
                
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                  <div className="flex justify-between border-b border-slate-700/10 pb-1">
                    <span className="text-slate-400">LEVEL AKUN</span>
                    <span className="font-bold">{selectedAccount.level}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700/10 pb-1">
                    <span className="text-slate-400">RANK TIER</span>
                    <span className="font-bold text-blue-400">{selectedAccount.tier}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700/10 pb-1 mr-1">
                    <span className="text-slate-400">SISTEM LOGIN</span>
                    <span className="font-bold text-orange-400">{selectedAccount.loginType}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700/10 pb-1">
                    <span className="text-slate-400">EMOTE MOVES</span>
                    <span className="font-bold">{selectedAccount.emoteCount} Emote</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700/10 pb-1 col-span-2">
                    <span className="text-slate-400">TOTAL SKIN SENJATA</span>
                    <span className="font-bold text-yellow-400">{selectedAccount.skinSenjataCount} Skin Tersedia</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700/10 pb-1 col-span-2">
                    <span className="text-slate-400">TOTAL BUNDLE BAJU</span>
                    <span className="font-bold text-yellow-400">{selectedAccount.bundleCount} Baju Keren</span>
                  </div>
                </div>
              </div>

              {/* Epic items list */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skin / Item Langka (VVIP)</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAccount.epicSkins.map((skin, i) => (
                    <span 
                      key={i} 
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
                        isKuningBiru ? 'bg-slate-800 text-yellow-400 border border-slate-700' : 'bg-blue-50 text-blue-600 border border-blue-100'
                      }`}
                    >
                      <Check size={11} className="text-emerald-450" />
                      {skin}
                    </span>
                  ))}
                </div>
              </div>

              {/* Long Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Catatan Tambahan Penjual</h4>
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/10 p-3 rounded-xl border border-slate-700/5">
                  {selectedAccount.description}
                </p>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 bg-slate-950/10 border-t border-slate-700/20 flex gap-3">
              <button
                onClick={() => setSelectedAccount(null)}
                className="flex-1 py-3 text-xs font-bold rounded-xl border border-slate-700 hover:bg-slate-700/15"
              >
                Kembali ke Katalog
              </button>
              <button
                disabled={selectedAccount.isSold}
                onClick={() => {
                  handleBuyClick(selectedAccount);
                  setSelectedAccount(null);
                }}
                className={`flex-1 py-3 text-xs font-bold rounded-xl text-center flex justify-center items-center gap-1.5 shadow-md ${
                  selectedAccount.isSold
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : isKuningBiru
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-extrabold'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <ShoppingCart size={14} />
                Hubungi Admin Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
