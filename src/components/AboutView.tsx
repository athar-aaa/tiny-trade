import React from 'react';
import { TinyTradeLogo } from './TinyTradeLogo';
import { Scale, Heart, Shield, Sparkles } from 'lucide-react';

export const AboutView: React.FC = () => {
  const missions = [
    {
      num: 1,
      text: 'Extend the life of baby items and reduce waste through trading.',
      align: 'left',
    },
    {
      num: 2,
      text: 'Build a secure and trustworthy platform for parents to exchange items with confidence.',
      align: 'right',
    },
    {
      num: 3,
      text: 'Create a strong parenting community that shares and helps each other.',
      align: 'left',
    },
    {
      num: 4,
      text: 'Provide a seamless and user-friendly experience for finding preloved items.',
      align: 'right',
    },
    {
      num: 5,
      text: 'Help parents reduce expenses while still getting quality essentials for their little ones.',
      align: 'left',
    },
    {
      num: 6,
      text: 'Advocate for a circular economy and responsible consumption in parenting.',
      align: 'right',
    },
  ];

  return (
    <div className="w-full bg-white pb-20">
      {/* 1. Hero / Vision Section (Page 54) */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 text-center bg-slate-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1600&auto=format&fit=crop&q=80')`,
          }}
        />
        <div className="relative max-w-3xl mx-auto space-y-6 z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight text-white drop-shadow">
            Vision
          </h1>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            To create a sustainable and trusted community where parents can effortlessly share, trade, and give preloved baby items—reducing waste, saving money, and supporting each other in the journey of parenting.
          </p>
        </div>
      </section>

      {/* 2. Mission Section with Alternating Pills (Page 54) */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold font-heading text-center text-slate-900 mb-14">
          Mission
        </h2>

        <div className="space-y-5">
          {missions.map((m) => (
            <div
              key={m.num}
              className={`flex items-center ${
                m.align === 'right' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-2xl w-full flex items-center gap-4 px-6 py-4 rounded-full transition-all duration-300 shadow-sm border ${
                  m.align === 'right'
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 justify-between flex-row-reverse'
                    : 'bg-slate-700 hover:bg-slate-800 text-white border-slate-600 justify-between'
                }`}
              >
                {/* Number in circle */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                    m.align === 'right'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'bg-white text-slate-900 shadow-sm'
                  }`}
                >
                  {m.num}
                </div>

                {/* Mission text */}
                <p className={`text-sm sm:text-base font-medium flex-1 ${
                  m.align === 'right' ? 'text-right' : 'text-left'
                }`}>
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Value Section (Page 54) */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-orange-50/20 border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold font-heading text-slate-900">
            Value
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            <strong className="text-slate-900">Tiny<span className="text-orange-600">Trade</span></strong> is built on sustainability, trust, community, and affordability—helping parents swap preloved baby items safely while reducing waste and saving money.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-2xl">🌱</span>
              <p className="font-bold text-xs uppercase tracking-wider text-slate-800 mt-2">Sustainability</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-2xl">🤝</span>
              <p className="font-bold text-xs uppercase tracking-wider text-slate-800 mt-2">Trust</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-2xl">👨‍👩‍👧</span>
              <p className="font-bold text-xs uppercase tracking-wider text-slate-800 mt-2">Community</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-2xl">💡</span>
              <p className="font-bold text-xs uppercase tracking-wider text-slate-800 mt-2">Affordability</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Legal Basis Section (Page 54) */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-slate-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&auto=format&fit=crop&q=80')`,
          }}
        />
        <div className="relative max-w-2xl mx-auto space-y-4 z-10">
          <div className="w-12 h-12 mx-auto rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mb-2">
            <Scale className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold font-heading text-white">
            Legal Basis
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Consumer Protection Law (Law No. 8 of 1999) – Protects user rights in buying and selling or bartering preloved goods transactions to ensure fairness and transparency.
          </p>
        </div>
      </section>
    </div>
  );
};
