import React, { useState } from 'react';
import { NavTab } from '../types';
import { TinyTradeLogo } from './TinyTradeLogo';
import { Package, ShieldCheck, Banknote, Leaf, ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface HomeViewProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenArticle: (articleId: string) => void;
  onSelectCategory: (category: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onOpenArticle,
  onSelectCategory,
}) => {
  // Testimonial slider state
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const testimonials = [
    {
      name: 'Andriana Rahmawati',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      review: 'Dapet barang seken yang masih kayak baru! Seneng banget loh aku tohapok 😹😹',
    },
    {
      name: 'Bunda Sarah Aulia',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      review: 'Fitur barternya ngebantu banget waktu anak cepet gede. Tuker stroller sama playmat cuma 1 hari langsung deal!',
    },
    {
      name: 'Mama Alifah',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      review: 'Komunitasnya ramah dan amanah. Ga perlu ragu transaksi preloved di TinyTrade.',
    }
  ];

  const servicesHoverList = [
    {
      title: 'Find Quality Preloved Items',
      desc: 'Get baby essentials at lower costs.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Save More Spend Less',
      desc: 'Cut expenses with usable goods.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Declutter Easily',
      desc: 'Pass outgrown items to new families.',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Join a Trusted Community',
      desc: 'Connect with parents who care.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Go Green',
      desc: 'Reduce waste, support sustainability.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const currentTestimonial = testimonials[activeTestimonialIdx];

  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      {/* 1. HERO SECTION (Page 1) */}
      <section className="relative w-full h-[520px] md:h-[620px] overflow-hidden bg-slate-900 flex items-center">
        {/* Background Image of Toddler playing with beads */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-85 transition-transform duration-1000 scale-102"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1600&auto=format&fit=crop&q=85')`,
          }}
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="max-w-xl text-white space-y-5">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading leading-tight tracking-tight drop-shadow-md">
              Your One-Stop Shop for <span className="text-orange-400">Toddler Needs!</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
              Discover everything your beloved one’s needs with ease and convenience.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectTab('SHOP')}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-slate-950/90 hover:bg-orange-500 text-white font-medium text-sm tracking-wide border border-white/20 hover:border-transparent transition-all shadow-xl hover:shadow-orange-500/25 active:scale-95 group"
              >
                Let’s Start!
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR COMPANY / ABOUT US (Page 1) */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-1">
            About Us
          </p>
          <h2 className="text-3xl font-bold font-heading text-slate-900 mb-10">
            Our Company
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 text-left">
            {/* Logo Graphic */}
            <div className="shrink-0 p-4 bg-orange-50/50 rounded-2xl border border-orange-100/60 shadow-sm">
              <TinyTradeLogo size="xl" />
            </div>

            {/* Content text from Figma */}
            <div className="space-y-4 max-w-lg text-slate-600 text-sm leading-relaxed">
              <p>
                <strong className="text-slate-900 font-semibold">TinyTrade</strong> is a platform designed to help parents find and share preloved baby essentials in a simple, safe, and sustainable way. This website connects families looking for quality secondhand items, reducing waste while making parenting more affordable. Our slogan is:
              </p>
              <p className="text-lg font-bold text-orange-600 font-heading italic tracking-wide">
                “Thrift. Trade. Trust.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT CAN WE DO FOR YOU? / OUR SERVICES (Page 1 & 75) */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-1">
            Our Services
          </p>
          <h2 className="text-3xl font-bold font-heading text-slate-900 mb-2">
            What Can We Do For You?
          </h2>
          <p className="text-xs text-slate-500 italic mb-10">
            Hover your cursor over each picture!
          </p>

          {/* 5 Cards with Interactive Hover State (as seen on Page 75) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {servicesHoverList.map((srv, idx) => (
              <div
                key={idx}
                onClick={() => onSelectTab('SERVICES')}
                className="group cursor-pointer rounded-2xl bg-white p-3 border border-slate-200 hover:border-orange-400 hover:shadow-xl transition-all duration-300 flex flex-col items-center"
              >
                {/* Image Container with grayscale to color transition */}
                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 relative bg-slate-100">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {/* Text revealed and highlighted on hover */}
                <div className="text-center w-full px-1">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-orange-600 transition-colors leading-snug">
                    {srv.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal line-clamp-2">
                    {srv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US? (Page 1) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-heading text-slate-900 mb-14">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 mb-4 shadow-sm">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-slate-900 mb-2">
                QUALITY PRELOVED ITEMS
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Carefully selected, well-maintained baby essentials.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 mb-4 shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-slate-900 mb-2">
                SAFE & TRUSTED
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                A verified and secure community of parents.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4 shadow-sm">
                <Banknote className="w-7 h-7" />
              </div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-slate-900 mb-2">
                BUDGET-FRIENDLY
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Save money while getting what your child needs.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 shadow-sm">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-slate-900 mb-2">
                ECO-FRIENDLY CHOICE
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Reduce waste and promote sustainable parenting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT ITEMS CAN YOU FIND? (Page 1) */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-heading text-slate-900 mb-12">
            What Items Can You Find?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Clothes */}
            <div
              onClick={() => {
                onSelectCategory('Clothes');
                onSelectTab('SHOP');
              }}
              className="cursor-pointer group relative bg-cyan-50/70 hover:bg-cyan-100/70 rounded-3xl p-6 transition-all duration-300 border border-cyan-100 hover:shadow-lg flex flex-col items-center"
            >
              <div className="w-48 h-48 rounded-2xl overflow-hidden mb-4 bg-white/70 flex items-center justify-center p-2 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500&auto=format&fit=crop&q=80"
                  alt="Clothes"
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-bold text-lg text-slate-800 group-hover:text-cyan-800">
                Clothes
              </span>
            </div>

            {/* Toys */}
            <div
              onClick={() => {
                onSelectCategory('Toys');
                onSelectTab('SHOP');
              }}
              className="cursor-pointer group relative bg-orange-50/70 hover:bg-orange-100/70 rounded-3xl p-6 transition-all duration-300 border border-orange-100 hover:shadow-lg flex flex-col items-center"
            >
              <div className="w-48 h-48 rounded-2xl overflow-hidden mb-4 bg-white/70 flex items-center justify-center p-2 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop&q=80"
                  alt="Toys"
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-bold text-lg text-slate-800 group-hover:text-orange-800">
                Toys
              </span>
            </div>

            {/* Accessories */}
            <div
              onClick={() => {
                onSelectCategory('Accessories');
                onSelectTab('SHOP');
              }}
              className="cursor-pointer group relative bg-emerald-50/70 hover:bg-emerald-100/70 rounded-3xl p-6 transition-all duration-300 border border-emerald-100 hover:shadow-lg flex flex-col items-center"
            >
              <div className="w-48 h-48 rounded-2xl overflow-hidden mb-4 bg-white/70 flex items-center justify-center p-2 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1591088398332-8a7791972843?w=500&auto=format&fit=crop&q=80"
                  alt="Accessories"
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-bold text-lg text-slate-800 group-hover:text-emerald-800">
                Accessories
              </span>
            </div>
          </div>

          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 pt-4">
            AND MANY MORE!
          </p>
        </div>
      </section>

      {/* 6. LET'S DISCOVER (Blog Preview, Page 1) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-1">
            Explore newest and most updated informations here!
          </p>
          <h2 className="text-3xl font-bold font-heading text-slate-900 mb-12">
            Let’s Discover
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-10">
            {/* Card 1 */}
            <div
              onClick={() => onOpenArticle('art-4')}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80"
                  alt="Toddler Must-Haves"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                  Toddler Must-Haves: Essential Items for Every Growing Child
                </h3>
                <p className="text-xs text-slate-400 font-medium">March 7, 2025</p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => onOpenArticle('art-5')}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80"
                  alt="Sustainable Parenting"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                  Sustainable Parenting: How Preloved Items Benefit Your Toddler and the Planet
                </h3>
                <p className="text-xs text-slate-400 font-medium">February 8, 2025</p>
              </div>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => onOpenArticle('art-6')}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80"
                  alt="Decluttering with Toddlers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                  Decluttering with Toddlers: Smart Ways to Reuse and Recycle Baby Gear
                </h3>
                <p className="text-xs text-slate-400 font-medium">January 31, 2025</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('INSIGHTS')}
            className="px-8 py-2.5 rounded-full bg-slate-900 hover:bg-orange-600 text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm active:scale-95"
          >
            View all
          </button>
        </div>
      </section>

      {/* 7. WHAT OUR CLIENT SAYS (Page 1) */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-orange-50/30 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-heading text-slate-900 mb-12">
            What Our Client Says
          </h2>

          <div className="relative flex items-center justify-center gap-6 sm:gap-12">
            {/* Prev Button */}
            <button
              onClick={handlePrevTestimonial}
              className="p-2.5 rounded-full bg-white text-slate-600 hover:text-orange-600 hover:bg-orange-50 border border-slate-200 transition-all shadow-sm active:scale-90"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Testimonial Card */}
            <div className="flex flex-col items-center max-w-md">
              <div className="relative mb-4">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-orange-200 shadow-md"
                />
              </div>

              {/* 5 Stars */}
              <div className="flex items-center space-x-1 text-orange-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-slate-700 text-base italic font-medium leading-relaxed mb-4">
                “{currentTestimonial.review}”
              </blockquote>

              <p className="font-bold text-sm text-slate-900">
                {currentTestimonial.name}
              </p>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextTestimonial}
              className="p-2.5 rounded-full bg-white text-slate-600 hover:text-orange-600 hover:bg-orange-50 border border-slate-200 transition-all shadow-sm active:scale-90"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM BANNER: Thrift. Trade. Trust. (Page 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-8 sm:p-14 text-white shadow-2xl">
          {/* Background image overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=1400&auto=format&fit=crop&q=80')`,
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="mb-4">
                <TinyTradeLogo size="lg" isWhite={true} />
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight leading-tight">
                Thrift. <span className="text-cyan-400">Trade.</span> <span className="text-orange-500">Trust.</span>
              </h3>
            </div>
            <div>
              <button
                onClick={() => onSelectTab('SHOP')}
                className="px-7 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-all shadow-lg hover:shadow-orange-500/30 active:scale-95 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Mulai Berbelanja & Barter
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
