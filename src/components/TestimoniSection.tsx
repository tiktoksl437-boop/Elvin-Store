import React, { useState } from 'react';
import { Star, MessageSquareQuote, CheckCircle2, UserPlus, Filter, Sparkles, Smile } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimoniSectionProps {
  testimonials: Testimonial[];
  theme: 'light' | 'kuning-biru';
  onSubmitTestimonial: (newTestimoni: Testimonial) => void;
}

export default function TestimoniSection({ testimonials, theme, onSubmitTestimonial }: TestimoniSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [productType, setProductType] = useState<'Beli Akun FF' | 'Jasa Post (JP)' | 'Sewa Rekber Admin' | 'Layanan Cepat'>('Beli Akun FF');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const isKuningBiru = theme === 'kuning-biru';

  // Compute stats
  const averageRating = (testimonials.reduce((sum, item) => sum + item.rating, 0) / testimonials.length).toFixed(1);
  const totalReviews = testimonials.length;
  const ratingFiveStars = testimonials.filter(t => t.rating >= 4.8).length;

  const filters = [
    { label: 'Semu Ulasan', value: 'All' },
    { label: 'Beli Akun', value: 'Beli Akun FF' },
    { label: 'Jasa Post', value: 'Jasa Post (JP)' },
    { label: 'Rekber Admin', value: 'Sewa Rekber Admin' }
  ];

  const filteredTestimonials = selectedFilter === 'All' 
    ? testimonials 
    : testimonials.filter(t => t.productType === selectedFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) {
      alert('Tolong tuliskan nama dan ulasan Anda!');
      return;
    }

    const newReview: Testimonial = {
      id: `review-${Date.now()}`,
      name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      productType,
      avatarSeed: name.toLowerCase().replace(/\s+/g, '')
    };

    onSubmitTestimonial(newReview);
    
    // Reset Form
    setName('');
    setRating(5);
    setComment('');
    setShowForm(false);
    
    alert('Terima kasih banyak! Ulasan Anda telah berhasil diterbitkan di Arga Store.');
  };

  return (
    <div className="space-y-6">
      {/* Testimonial Header and Statistics Review Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Statistics card 1 */}
        <div 
          className={`p-5 rounded-3xl border text-center flex flex-col justify-center items-center h-full transition-all duration-300 ${
            isKuningBiru ? 'bg-slate-800/30 border-slate-700/60' : 'bg-white border-slate-200'
          }`}
        >
          <span className="text-4xl font-extrabold text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.3)]">
            {averageRating}
          </span>
          <div className="flex gap-1.5 my-1.5 text-yellow-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={15} fill="currentColor" />
            ))}
          </div>
          <span className="text-xs text-slate-400 font-medium">Berdasarkan {totalReviews} Pembeli</span>
        </div>

        {/* Statistics card 2 */}
        <div 
          className={`p-5 rounded-3xl border text-left flex flex-col justify-center gap-1 transition-all duration-300 col-span-1 md:col-span-2 ${
            isKuningBiru ? 'bg-slate-800/30 border-slate-700/60 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-emerald-450 text-emerald-450" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Kepercayaan Konsumen</span>
          </div>
          <h3 className="text-base font-extrabold">Transaksi dijamin 100% Amanah</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Semua transaksi akun dikawal langsung oleh admin Arga. Hingga saat ini {ratingFiveStars} ulasan memberikan kepuasan bintang lima!
          </p>
        </div>
      </div>

      {/* Primary Action bar for Reviews */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        {/* Horizontal Filters */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setSelectedFilter(f.value)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                selectedFilter === f.value
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isKuningBiru
                    ? 'bg-slate-800 text-slate-350 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Write review button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className={`w-full sm:w-auto px-4.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
            showForm
              ? 'bg-red-500 hover:bg-red-650 text-white'
              : isKuningBiru
                ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-extrabold'
                : 'bg-blue-600 hover:bg-blue-700 text-white font-extrabold'
          }`}
        >
          <Smile size={14} />
          {showForm ? '✖ Tutup Ulasan' : '✍ Tulis Testimoni'}
        </button>
      </div>

      {/* Interactive write review Form */}
      {showForm && (
        <form 
          onSubmit={handleSubmit}
          className={`p-5 rounded-3xl border text-left space-y-4 transition-all duration-300 ${
            isKuningBiru ? 'bg-slate-800/40 border-slate-700/85' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="border-b border-slate-700/10 pb-2">
            <h3 className="text-xs font-extrabold text-blue-500 dark:text-yellow-400 uppercase tracking-widest inline-flex items-center gap-1">
              ⭐ Tulis Ulasan / Testimoni Pelanggan
            </h3>
            <p className="text-[10px] text-slate-400 mt-1">Pengalaman berbelanja Anda sangat berharga bagi kami!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Nama Anda *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Muhammad Rafli"
                className={`w-full p-2.5 text-xs rounded-xl border outline-hidden ${
                  isKuningBiru ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'
                }`}
              />
            </div>

            {/* Service Type */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Jenis Layanan Yang Dipakai</label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value as any)}
                className={`w-full p-2.5 text-xs rounded-xl border outline-hidden cursor-pointer ${
                  isKuningBiru ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'
                }`}
              >
                <option value="Beli Akun FF">🛒 Beli Akun Free Fire</option>
                <option value="Jasa Post (JP)">📣 Jasa Post (JP) Akun</option>
                <option value="Sewa Rekber Admin">🤝 Rekber / Rekening Bersama</option>
                <option value="Layanan Cepat">⚡ Layanan fast-respond</option>
              </select>
            </div>

            {/* Rating Stars select */}
            <div className="space-y-1 col-span-1 md:col-span-2">
              <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Nilai Kepuasan (Rating) *</label>
              <div className="flex items-center gap-2.5 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="cursor-pointer hover:scale-115 transition-transform"
                  >
                    <Star 
                      size={28} 
                      className={rating >= star ? "text-yellow-400 fill-yellow-400" : "text-slate-500"} 
                    />
                  </button>
                ))}
                <span className="text-xs text-slate-400 font-bold ml-1">({rating} / 5 Bintang)</span>
              </div>
            </div>

            {/* Comments comment */}
            <div className="space-y-1 col-span-1 md:col-span-2">
              <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Pesan Ulasan / Testimoni Anda *</label>
              <textarea
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Contoh: Sangat recommended! Proses serah data akun cepet dilatih sampe aman bgt."
                rows={3}
                className={`w-full p-2.5 text-xs rounded-xl border outline-hidden resize-none ${
                  isKuningBiru ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md flex justify-center items-center gap-1.5 cursor-pointer"
          >
            Kirimkan Testimoni Penilaian
          </button>
        </form>
      )}

      {/* Showcase list with quotes icon overlay */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTestimonials.map((t) => (
          <div
            key={t.id}
            className={`p-5 rounded-2xl border text-left relative overflow-hidden transition-all duration-350 hover:shadow-md ${
              isKuningBiru 
                ? 'bg-slate-800/10 border-slate-800/70 hover:border-slate-700' 
                : 'bg-white border-slate-100 hover:shadow-slate-100/50'
            }`}
          >
            {/* Card Content Layout */}
            <div className="space-y-3 relative z-10">
              {/* Rating stars & product category */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: Math.floor(t.rating) }).map((_, idx) => (
                    <Star key={idx} size={12} fill="currentColor" />
                  ))}
                  {t.rating % 1 !== 0 && <Star size={12} className="opacity-60" fill="currentColor" />}
                </div>

                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  isKuningBiru ? 'bg-blue-900/40 text-blue-300' : 'bg-slate-100 text-slate-500'
                }`}>
                  {t.productType}
                </span>
              </div>

              {/* Comment text */}
              <p className="text-xs text-slate-350 leading-relaxed italic pr-2 font-light text-slate-400">
                &ldquo;{t.comment}&rdquo;
              </p>

              {/* User Bio and Timestamp */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-700/10">
                {/* Random avatar element based on seed */}
                <div className="size-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs text-center uppercase tracking-wider">
                  {t.name.slice(0, 2)}
                </div>

                <div>
                  <h4 className="text-xs font-bold leading-tight">{t.name}</h4>
                  <span className="text-[9px] text-slate-400 block">{t.date} • Verified Shopper</span>
                </div>
              </div>
            </div>

            {/* Aesthetic Quote Icon element in absolute panel to prevent clutter */}
            <MessageSquareQuote 
              size={64} 
              className={`absolute -right-4 -bottom-3 text-slate-600/5 pointer-events-none`} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
