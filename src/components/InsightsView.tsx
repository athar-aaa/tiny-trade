import React, { useState } from 'react';
import { InsightArticle, NavTab, UserProfile } from '../types';
import { sampleArticleComments } from '../data/mockData';
import { Search, Heart, MessageSquare, Bookmark, Share2, ChevronLeft, Send, Check, X } from 'lucide-react';

interface InsightsViewProps {
  articles: InsightArticle[];
  userProfile: UserProfile;
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onToggleLikeArticle: (id: string) => void;
  onToggleSaveArticle: (id: string) => void;
  activeArticleId?: string | null;
  onCloseArticle?: () => void;
  onSelectArticle?: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  articles = [],
  userProfile,
  currentTab,
  onSelectTab,
  onToggleLikeArticle,
  onToggleSaveArticle,
  activeArticleId,
  onCloseArticle,
  onSelectArticle,
  onShowToast,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [subView, setSubView] = useState<'Feed' | 'History' | 'Saved'>('Feed');
  const [searchQuery, setSearchQuery] = useState('');

  // Inside article reader modals:
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentsList, setCommentsList] = useState(sampleArticleComments);

  const activeArticle = articles.find(a => a.id === activeArticleId);

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;
    setCommentsList(prev => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        name: userProfile.name,
        avatar: userProfile.avatar,
        text: newCommentText,
        likes: 0,
        repliesCount: 0,
      }
    ]);
    setNewCommentText('');
  };

  const handleShareTo = (channel: string) => {
    onShowToast(`Membagikan artikel ke ${channel}...`);
    setShareModalOpen(false);
  };

  const safeArticles = Array.isArray(articles) ? articles : [];
  const filteredArticles = safeArticles.filter(a => {
    if (selectedFilter !== 'All' && a.type !== selectedFilter) return false;
    if (searchQuery.trim()) {
      return a.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const eventItems = filteredArticles.filter(a => a.type === 'EVENT & PLACES');
  const articleItems = filteredArticles.filter(a => a.type === 'ARTICLES');
  const videoItems = filteredArticles.filter(a => a.type === 'VIDEOS');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div
            onClick={() => onSelectTab('PROFILE')}
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-200"
            />
            <div className="min-w-0">
              <h4 className="font-bold text-sm text-slate-900 truncate">{userProfile.name}</h4>
              <p className="text-xs text-slate-500 truncate">{userProfile.email}</p>
            </div>
          </div>

          <nav className="space-y-1.5 pt-2">
            {[
              { label: 'Shop', tab: 'SHOP' as NavTab, icon: '🛍️' },
              { label: 'Trade', tab: 'TRADE' as NavTab, icon: '🔄' },
              { label: 'Forum', tab: 'FORUM' as NavTab, icon: '💬' },
              { label: 'Insights', tab: 'INSIGHTS' as NavTab, icon: '💡' },
            ].map((item) => (
              <button
                key={item.tab}
                onClick={() => onSelectTab(item.tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm font-bold transition-all ${
                  currentTab === item.tab
                    ? 'bg-orange-100/70 text-orange-600 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 space-y-8">
          {/* If reading an article (Page 87-90) */}
          {activeArticle ? (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 animate-fadeIn">
              {/* Back Button */}
              <button
                onClick={onCloseArticle}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-orange-600 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali ke Insights</span>
              </button>

              {/* Title & Meta */}
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold">
                  {activeArticle.type} • {activeArticle.date}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 leading-tight">
                  {activeArticle.title}
                </h1>
              </div>

              {/* Banner Graphic */}
              <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-inner bg-slate-100">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Body Text & Quotes */}
              <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
                {activeArticle.content && activeArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}

                {activeArticle.quote && (
                  <blockquote className="p-6 rounded-2xl bg-orange-50/70 border-l-4 border-orange-500 font-medium italic text-orange-950">
                    "{activeArticle.quote}"
                  </blockquote>
                )}
              </div>

              {/* Action Bar (Pages 87-90) */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => onToggleLikeArticle(activeArticle.id)}
                    className="flex items-center gap-1.5 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${activeArticle.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{activeArticle.likes}</span>
                  </button>

                  <button
                    onClick={() => setCommentsModalOpen(true)}
                    className="flex items-center gap-1.5 hover:text-orange-500 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{activeArticle.commentsCount} Comments</span>
                  </button>

                  <button
                    onClick={() => onToggleSaveArticle(activeArticle.id)}
                    className="hover:text-orange-500 transition-colors"
                  >
                    <Bookmark className={`w-4 h-4 ${activeArticle.isSaved ? 'fill-orange-500 text-orange-500' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => setShareModalOpen(true)}
                  className="hover:text-slate-800 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Main Feed / History / Saved (Page 60, 86, 91, 92) */
            <div className="space-y-8">
              {/* Search Bar */}
              <div className="relative flex items-center w-full bg-slate-50 rounded-full border border-slate-200 px-5 py-3 focus-within:bg-white focus-within:border-orange-500 transition-all shadow-sm">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400"
                />
                <Search className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
              </div>

              {/* Subview switcher & Categories */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {['Event & places', 'Articles', 'Videos', 'All'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedFilter(cat === 'Event & places' ? 'EVENT & PLACES' : cat.toUpperCase() === 'ALL' ? 'All' : cat.toUpperCase());
                        setSubView('Feed');
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                        (selectedFilter === cat.toUpperCase() || (cat === 'All' && selectedFilter === 'All') || (cat === 'Event & places' && selectedFilter === 'EVENT & PLACES'))
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Subview switches (History, Saved) */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSubView('History')}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      subView === 'History' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    History
                  </button>
                  <button
                    onClick={() => setSubView('Saved')}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      subView === 'Saved' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Saved
                  </button>
                </div>
              </div>

              {/* Subview: HISTORY (Page 91) */}
              {subView === 'History' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold font-heading text-slate-900">History</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold uppercase text-slate-400">
                      <span>EVENT & PLACES</span>
                      <button className="text-cyan-600 hover:underline">Clear All</button>
                    </div>
                    <div
                      onClick={() => onSelectArticle && onSelectArticle('art-1')}
                      className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 cursor-pointer hover:border-orange-300"
                    >
                      <img src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=120&auto=format&fit=crop&q=80" alt="MACAN" className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">Enjoy Mornings at Museum MACAN: Toddler Activities You Shouldn’t Miss</h4>
                        <p className="text-xs text-slate-400">February 21, 2025</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase text-slate-400">ARTICLES</span>
                    <p className="text-xs text-slate-400 italic">No history</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold uppercase text-slate-400">
                      <span>VIDEOS</span>
                      <button className="text-cyan-600 hover:underline">Clear All</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4">
                        <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=120&auto=format&fit=crop&q=80" alt="Video" className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">Speech Milestones: Is Your Toddler on Track?</h4>
                          <p className="text-xs text-slate-400">March 3, 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Subview: SAVED (Page 92) */}
              {subView === 'Saved' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold font-heading text-slate-900">Saved</h3>
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase text-slate-400">EVENT & PLACES</span>
                    <div
                      onClick={() => onSelectArticle && onSelectArticle('art-1')}
                      className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 cursor-pointer hover:border-orange-300"
                    >
                      <img src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=120&auto=format&fit=crop&q=80" alt="MACAN" className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">Enjoy Mornings at Museum MACAN: Toddler Activities You Shouldn’t Miss</h4>
                        <p className="text-xs text-slate-400">February 21, 2025</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase text-slate-400">ARTICLES</span>
                    <p className="text-xs text-slate-400 italic">No articles saved</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase text-slate-400">VIDEOS</span>
                    <p className="text-xs text-slate-400 italic">No videos saved</p>
                  </div>
                </div>
              )}

              {/* Standard Feed Sections (Page 60, 86) */}
              {subView === 'Feed' && (
                <>
                  {/* 1. EVENT & PLACES */}
                  {(selectedFilter === 'All' || selectedFilter === 'EVENT & PLACES') && (
                    <section className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400">
                          EVENT & PLACES
                        </h3>
                        <span className="text-xs font-bold text-slate-400">More</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {eventItems.map((art) => (
                          <div
                            key={art.id}
                            onClick={() => onSelectArticle && onSelectArticle(art.id)}
                            className="group cursor-pointer rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all p-4 space-y-3"
                          >
                            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100">
                              <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <h4 className="font-bold text-sm text-slate-900 group-hover:text-orange-600 line-clamp-2">
                              {art.title}
                            </h4>
                            <p className="text-xs text-slate-400">{art.date}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* 2. ARTICLES */}
                  {(selectedFilter === 'All' || selectedFilter === 'ARTICLES') && (
                    <section className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400">
                          ARTICLES
                        </h3>
                        <span className="text-xs font-bold text-slate-400">More</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {articleItems.map((art) => (
                          <div
                            key={art.id}
                            onClick={() => onSelectArticle && onSelectArticle(art.id)}
                            className="group cursor-pointer rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all p-4 space-y-3"
                          >
                            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100">
                              <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <h4 className="font-bold text-sm text-slate-900 group-hover:text-orange-600 line-clamp-2">
                              {art.title}
                            </h4>
                            <p className="text-xs text-slate-400">{art.date}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* 3. VIDEOS */}
                  {(selectedFilter === 'All' || selectedFilter === 'VIDEOS') && (
                    <section className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400">
                          VIDEOS
                        </h3>
                        <span className="text-xs font-bold text-slate-400">More</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {videoItems.map((art) => (
                          <div
                            key={art.id}
                            onClick={() => onSelectArticle && onSelectArticle(art.id)}
                            className="group cursor-pointer rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all p-4 space-y-3"
                          >
                            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100">
                              <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <h4 className="font-bold text-sm text-slate-900 group-hover:text-orange-600 line-clamp-2">
                              {art.title}
                            </h4>
                            <p className="text-xs text-slate-400">{art.date}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </>
              )}
            </div>
          )}
        </main>
      </div>

      {/* COMMENTS MODAL (Pages 94-95) */}
      {commentsModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-100 space-y-6 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-bold text-lg font-heading text-slate-900">
                {commentsList.length} Comments
              </h4>
              <button
                onClick={() => setCommentsModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comments List */}
            <div className="overflow-y-auto space-y-5 flex-1 pr-1">
              {commentsList.map((comm) => (
                <div key={comm.id} className="space-y-1.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={comm.avatar} alt={comm.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <h5 className="font-bold text-xs text-slate-900">{comm.name}</h5>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Heart className="w-3.5 h-3.5 hover:text-red-500 cursor-pointer" />
                      <span>{comm.likes}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 pl-11 leading-relaxed">
                    {comm.text}
                  </p>

                  <div className="pl-11 flex items-center gap-4 text-[11px] font-semibold text-cyan-600">
                    <button className="hover:underline">Reply</button>
                    {comm.repliesCount > 0 && (
                      <button className="text-slate-400 hover:underline">
                        — View {comm.repliesCount} more replies
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment input */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                placeholder="Tulis komentar Anda..."
                className="flex-1 px-4 py-2.5 rounded-full border border-slate-200 text-xs focus:outline-none focus:border-orange-500"
              />
              <button
                onClick={handleAddComment}
                className="p-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHARE TO MODAL (Page 93) */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base font-heading text-slate-900">Share to</h4>
              <button
                onClick={() => setShareModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contacts Row */}
            <div className="flex items-center justify-between overflow-x-auto gap-2 pb-2">
              {[
                { name: 'Mama Kenneth', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop&q=80' },
                { name: 'Titi Kumal', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
                { name: '20km Finisher', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' },
                { name: '16 Thn 2 Anak', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80' },
                { name: 'Grace Natalia', img: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80' },
              ].map((c) => (
                <div
                  key={c.name}
                  onClick={() => handleShareTo(c.name)}
                  className="flex flex-col items-center text-center cursor-pointer min-w-[58px]"
                >
                  <img src={c.img} alt={c.name} className="w-12 h-12 rounded-full object-cover mb-1 ring-1 ring-slate-200" />
                  <span className="text-[10px] text-slate-600 truncate max-w-[55px]">{c.name}</span>
                </div>
              ))}
            </div>

            {/* Social Apps Row */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-5 gap-2 text-center">
              <button
                onClick={() => handleShareTo('WhatsApp')}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  💬
                </div>
                <span className="text-[10px] text-slate-600">WhatsApp</span>
              </button>

              <button
                onClick={() => handleShareTo('Instagram')}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  📷
                </div>
                <span className="text-[10px] text-slate-600">Instagram</span>
              </button>

              <button
                onClick={() => handleShareTo('TikTok')}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  🎵
                </div>
                <span className="text-[10px] text-slate-600">TikTok</span>
              </button>

              <button
                onClick={() => handleShareTo('X')}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  𝕏
                </div>
                <span className="text-[10px] text-slate-600">X</span>
              </button>

              <button
                onClick={() => handleShareTo('More')}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  •••
                </div>
                <span className="text-[10px] text-slate-600">More</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
