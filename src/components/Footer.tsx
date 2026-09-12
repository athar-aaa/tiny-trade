import React from 'react';
import { TinyTradeLogo } from './TinyTradeLogo';
import { NavTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-100">
          {/* Logo and Stay in Touch */}
          <div className="col-span-2 space-y-4">
            <div onClick={() => onSelectTab('HOME')} className="cursor-pointer">
              <TinyTradeLogo size="lg" showSlogan={true} />
            </div>
            <div className="pt-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Stay in touch
              </p>
              <div className="flex items-center space-x-3">
                {/* X (Twitter) */}
                <a
                  href="#social"
                  className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-orange-500 transition-colors"
                  aria-label="X"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="#social"
                  className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-orange-500 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="#social"
                  className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-orange-500 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="#social"
                  className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-orange-500 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('ABOUT')}
                  className="hover:text-orange-600 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('SERVICES')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('INSIGHTS')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Articles
                </button>
              </li>
            </ul>
          </div>

          {/* JOIN US & SUPPORT */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Join Us
            </h4>
            <ul className="space-y-2.5 text-sm mb-6">
              <li>
                <button
                  onClick={() => onSelectTab('SERVICES')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Merchant Partners
                </button>
              </li>
            </ul>

            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('PROFILE')}
                  className="hover:text-orange-600 transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('PROFILE')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('PROFILE')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('ABOUT')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('ABOUT')}
                  className="hover:text-orange-600 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright notice exact text from Figma */}
        <div className="pt-8 text-center text-xs text-slate-400 leading-relaxed">
          © 2025 TinyTrade | TinyTrade is a trademark of Toddler Paradise Emporium Company Registered in the Directorate General of Intellectual Property of the Republic of Indonesia.
        </div>
      </div>
    </footer>
  );
};
