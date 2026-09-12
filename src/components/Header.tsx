import React, { useState } from 'react';
import { NavTab, NotificationItem } from '../types';
import { TinyTradeLogo } from './TinyTradeLogo';
import { Bell, MessageCircle, ShoppingBag, Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  cartCount: number;
  notifications?: NotificationItem[];
  unreadNotifications?: number;
  onOpenCart: () => void;
  onOpenChats?: () => void;
  onOpenNotifications?: () => void;
  userAvatar?: string;
  isLoggedIn?: boolean;
  onOpenAuth?: (isLogin?: boolean) => void;
  isScrolled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  cartCount = 0,
  notifications = [],
  unreadNotifications,
  onOpenCart,
  onOpenChats,
  onOpenNotifications,
  userAvatar = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  isLoggedIn = true,
  onOpenAuth = (_isLogin?: boolean) => {},
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  
  const notifsList = Array.isArray(notifications) ? notifications : [];
  const unreadNotifCount = typeof unreadNotifications === 'number'
    ? unreadNotifications
    : notifsList.filter(n => n?.unread).length;

  const navItems: { label: string; tab: NavTab }[] = [
    { label: 'HOME', tab: 'HOME' },
    { label: 'ABOUT', tab: 'ABOUT' },
    { label: 'SERVICES', tab: 'SERVICES' },
    { label: 'PROFILE', tab: 'PROFILE' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onSelectTab('HOME')}
          className="cursor-pointer transition-transform hover:opacity-95 active:scale-98"
        >
          <TinyTradeLogo size="md" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = currentTab === item.tab || 
              (item.tab === 'PROFILE' && (currentTab === 'PROFILE' || currentTab === 'SHOP' || currentTab === 'TRADE' || currentTab === 'FORUM' || currentTab === 'INSIGHTS')) ||
              (item.tab === 'SERVICES' && currentTab === 'SERVICES');
            
            return (
              <button
                key={item.tab}
                onClick={() => onSelectTab(item.tab)}
                className={`text-sm font-semibold tracking-wider transition-colors duration-200 py-1.5 border-b-2 ${
                  currentTab === item.tab
                    ? 'text-slate-900 border-orange-500 font-bold'
                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Quick Action Icons & Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick links to core features */}
          <div className="hidden lg:flex items-center bg-slate-100 rounded-full p-1 text-xs font-semibold text-slate-600 mr-2">
            <button
              onClick={() => onSelectTab('SHOP')}
              className={`px-3 py-1 rounded-full transition-all ${
                currentTab === 'SHOP' ? 'bg-white text-orange-600 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => onSelectTab('TRADE')}
              className={`px-3 py-1 rounded-full transition-all ${
                currentTab === 'TRADE' ? 'bg-white text-orange-600 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              Trade
            </button>
            <button
              onClick={() => onSelectTab('FORUM')}
              className={`px-3 py-1 rounded-full transition-all ${
                currentTab === 'FORUM' ? 'bg-white text-orange-600 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              Forum
            </button>
            <button
              onClick={() => onSelectTab('INSIGHTS')}
              className={`px-3 py-1 rounded-full transition-all ${
                currentTab === 'INSIGHTS' ? 'bg-white text-orange-600 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              Insights
            </button>
          </div>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => {
                if (onOpenNotifications) {
                  onOpenNotifications();
                } else {
                  setShowNotificationsPanel(!showNotificationsPanel);
                }
              }}
              title="Notifications"
              className="relative p-2 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotificationsPanel && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 font-heading text-sm">Notifications</h3>
                    {unreadNotifCount > 0 && (
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[11px] font-bold rounded-full">
                        {unreadNotifCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setShowNotificationsPanel(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs"
                  >
                    Close
                  </button>
                </div>

                <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto mt-2 space-y-1">
                  {notifsList.length === 0 ? (
                    <p className="text-center text-xs text-slate-400 py-6">No notifications yet</p>
                  ) : (
                    notifsList.map((item) => (
                      <div
                        key={item.id}
                        className={`p-2.5 rounded-xl transition-colors flex items-start gap-3 ${
                          item.unread ? 'bg-orange-50/50' : 'hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-lg">{item.icon || '🔔'}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 leading-tight">{item.title}</p>
                          <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">{item.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{item.time}</span>
                        </div>
                        {item.unread && (
                          <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Chats Button */}
          <button
            onClick={onOpenChats ? onOpenChats : () => onSelectTab('CHATS')}
            title="Messages"
            className="relative p-2 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            title="Shopping Cart"
            className="relative p-2 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 px-1 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* User profile avatar or Login */}
          {isLoggedIn ? (
            <button
              onClick={() => onSelectTab('PROFILE')}
              className="flex items-center gap-2 pl-2 focus:outline-none group"
            >
              <img
                src={userAvatar}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-200 group-hover:ring-orange-400 transition-all"
              />
            </button>
          ) : (
            <button
              onClick={() => onOpenAuth(true)}
              className="text-xs font-semibold px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors shadow-sm active:scale-95"
            >
              Log in
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => {
                onSelectTab(item.tab);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold tracking-wide ${
                currentTab === item.tab
                  ? 'bg-orange-50 text-orange-600 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onSelectTab('SHOP');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-center text-xs font-semibold rounded-md bg-slate-100 hover:bg-orange-50 text-slate-800 hover:text-orange-600"
            >
              Shop Preloved
            </button>
            <button
              onClick={() => {
                onSelectTab('TRADE');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-center text-xs font-semibold rounded-md bg-slate-100 hover:bg-orange-50 text-slate-800 hover:text-orange-600"
            >
              Trade / Barter
            </button>
            <button
              onClick={() => {
                onSelectTab('FORUM');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-center text-xs font-semibold rounded-md bg-slate-100 hover:bg-orange-50 text-slate-800 hover:text-orange-600"
            >
              Mom Forum
            </button>
            <button
              onClick={() => {
                onSelectTab('INSIGHTS');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-center text-xs font-semibold rounded-md bg-slate-100 hover:bg-orange-50 text-slate-800 hover:text-orange-600"
            >
              Articles & Guides
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
