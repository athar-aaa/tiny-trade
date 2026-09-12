import React, { useState, useEffect } from 'react';
import { NavTab } from '../types';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface ServicesViewProps {
  onSelectTab: (tab: NavTab) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onSelectTab }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'shop',
      title: 'Shop',
      tab: 'SHOP' as NavTab,
      description: 'Discover a curated selection of preloved baby essentials at affordable prices. From clothes to toys, every item is chosen with care, helping you save while giving second life to quality goods.',
      bgImage: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1600&auto=format&fit=crop&q=80',
      cards: [
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80',
      ]
    },
    {
      id: 'trade',
      title: 'Trade',
      tab: 'TRADE' as NavTab,
      description: 'Swap items you no longer need with other moms! Our easy-to-use trade system connects you with trusted users for a fair and practical way to exchange baby gear.',
      bgImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1600&auto=format&fit=crop&q=80',
      cards: [
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      ]
    },
    {
      id: 'forum',
      title: 'Forum',
      tab: 'FORUM' as NavTab,
      description: 'Join a warm space where moms support moms. Share experiences, ask questions, or just vent — this is your go-to spot for real talk and real connection.',
      bgImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&auto=format&fit=crop&q=80',
      cards: [
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80',
      ]
    },
    {
      id: 'insights',
      title: 'Insights',
      tab: 'INSIGHTS' as NavTab,
      description: 'Access parenting tips, articles, and expert advice tailored for moms with little ones. Stay informed, stay on track, and stay inspired as your child grows.',
      bgImage: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1600&auto=format&fit=crop&q=80',
      cards: [
        'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80',
      ]
    }
  ];

  const current = slides[currentSlide];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-4.5rem)] bg-slate-950 text-white flex flex-col justify-between overflow-hidden">
      {/* Background with Dark Atmospheric Vignette */}
      <div
        key={current.id}
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out opacity-45 scale-102"
        style={{ backgroundImage: `url('${current.bgImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

      {/* Main Showcase Body */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-24 flex-1 flex items-center z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold tracking-widest uppercase">
              Feature 0{currentSlide + 1}
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight text-white drop-shadow-md">
              {current.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-lg">
              {current.description}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onSelectTab(current.tab)}
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-black hover:bg-orange-500 text-white font-medium text-sm tracking-wide border border-white/20 hover:border-transparent transition-all shadow-xl hover:shadow-orange-500/25 active:scale-95 group"
              >
                Explore Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white transition-all active:scale-90"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white transition-all active:scale-90"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Carousel Preview Cards (Pages 30-34) */}
          <div className="lg:col-span-6 flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
            {current.cards.map((cardImg, idx) => (
              <div
                key={idx}
                onClick={() => onSelectTab(current.tab)}
                className={`cursor-pointer rounded-3xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                  idx === 0
                    ? 'w-64 sm:w-80 aspect-[4/5] border-white shadow-2xl scale-100'
                    : 'w-48 sm:w-60 aspect-[4/5] border-white/30 opacity-70 hover:opacity-100 hover:scale-102'
                }`}
              >
                <img
                  src={cardImg}
                  alt="Feature preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Dot Indicators (Pages 30-34) */}
      <div className="relative z-10 pb-10 flex items-center justify-center space-x-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? 'w-8 h-2.5 bg-orange-500'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
