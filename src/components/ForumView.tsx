import React, { useState } from 'react';
import { ForumPost, NavTab, UserProfile } from '../types';
import { sampleCommunities, sampleSuggestedCommunities } from '../data/mockData';
import { Search, Heart, MessageSquare, Bookmark, Share2, Image, Smile, BarChart2, Calendar, Globe, Users, AtSign, CheckCircle2, UserPlus, Users2 } from 'lucide-react';

interface ForumViewProps {
  posts: ForumPost[];
  userProfile: UserProfile;
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onToggleLike: (postId: string) => void;
  onAddPost: (newPost: ForumPost) => void;
  onShowToast: (message: string) => void;
}

export const ForumView: React.FC<ForumViewProps> = ({
  posts = [],
  userProfile,
  currentTab,
  onSelectTab,
  onToggleLike,
  onAddPost,
  onShowToast,
}) => {
  const [activeFeedTab, setActiveFeedTab] = useState<'For You' | 'Following' | 'Community'>('For You');
  const [postContent, setPostContent] = useState('');
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [privacyOption, setPrivacyOption] = useState<'Everyone' | 'Accounts you follow' | 'Only accounts you mention'>('Everyone');

  const trendingTags = [
    { tag: '#MPASIViral', count: '2.987 posts' },
    { tag: '#Tantrum', count: '22.713 posts' },
    { tag: '#ISPA', count: '20.290 posts' },
    { tag: '#JandaKembang', count: '134 posts' },
    { tag: '#Stunting', count: '15.444 posts' },
    { tag: '#SusahTidurNih', count: '2.581 posts' },
    { tag: '#LemariBayiLegaaa', count: '1.569 posts' },
    { tag: '#MainanTinyTroops', count: '7.598 posts' },
    { tag: '#AnakBertanyaIbuMenjawab', count: '15.969 posts' },
  ];

  const whoToFollow = [
    { name: 'Iis Lahdia', handle: '@iisma', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
    { name: 'Cimoy Cantik', handle: '@cmontox', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { name: 'Kak Gem', handle: '@HiddenGem', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
  ];

  const [followingUsers, setFollowingUsers] = useState<string[]>([]);

  const toggleFollowUser = (handle: string) => {
    setFollowingUsers(prev =>
      prev.includes(handle) ? prev.filter(h => h !== handle) : [...prev, handle]
    );
  };

  const handleOpenPrivacy = () => {
    if (!postContent.trim()) return;
    setPrivacyModalOpen(true);
  };

  const handleConfirmPost = () => {
    const newPost: ForumPost = {
      id: `fp-${Date.now()}`,
      authorName: userProfile.name,
      authorHandle: '@iahsopiah',
      authorAvatar: userProfile.avatar,
      timeAgo: 'Just now',
      title: postContent.slice(0, 45) + (postContent.length > 45 ? '...' : ''),
      content: postContent,
      hashtags: ['#curhatbunda', '#tinytrade'],
      likes: 0,
      commentsCount: 0,
      isLiked: false,
      isFollowed: true,
    };

    onAddPost(newPost);
    setPostContent('');
    setPrivacyModalOpen(false);
    onShowToast('Posted!');
  };

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

        {/* Center Content */}
        <main className="lg:col-span-9 space-y-6">
          {/* Feed Tabs: For You / Following / Community */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-8">
              <button
                onClick={() => setActiveFeedTab('For You')}
                className={`font-bold text-sm tracking-wide pb-2 border-b-2 transition-all ${
                  activeFeedTab === 'For You'
                    ? 'text-orange-600 border-orange-500'
                    : 'text-slate-500 border-transparent hover:text-slate-900'
                }`}
              >
                For You
              </button>
              <button
                onClick={() => setActiveFeedTab('Following')}
                className={`font-bold text-sm tracking-wide pb-2 border-b-2 transition-all ${
                  activeFeedTab === 'Following'
                    ? 'text-orange-600 border-orange-500'
                    : 'text-slate-500 border-transparent hover:text-slate-900'
                }`}
              >
                Following
              </button>
              <button
                onClick={() => setActiveFeedTab('Community')}
                className={`font-bold text-sm tracking-wide pb-2 border-b-2 transition-all ${
                  activeFeedTab === 'Community'
                    ? 'text-orange-600 border-orange-500'
                    : 'text-slate-500 border-transparent hover:text-slate-900'
                }`}
              >
                Community Groups
              </button>
            </div>
          </div>

          {/* If Following tab: Show "Who to follow" (Page 82-84) */}
          {activeFeedTab === 'Following' && (
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                Who to follow
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {whoToFollow.map((u) => {
                  const isFollowed = followingUsers.includes(u.handle);
                  return (
                    <div
                      key={u.handle}
                      className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-slate-900 truncate">{u.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{u.handle}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFollowUser(u.handle)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                          isFollowed
                            ? 'bg-slate-100 text-slate-600 border border-slate-300'
                            : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
                      >
                        {isFollowed ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* If For You tab: Show "What's happening" hashtags (Page 81) */}
          {activeFeedTab === 'For You' && (
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                What’s happening
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {trendingTags.map((t) => (
                  <div key={t.tag} className="p-2.5 bg-white rounded-xl border border-slate-100 hover:border-orange-200 transition-colors">
                    <p className="font-bold text-xs text-slate-800 hover:text-orange-600 cursor-pointer">
                      {t.tag}
                    </p>
                    <p className="text-[10px] text-slate-400">{t.count}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COMMUNITY VIEW (Page 85) */}
          {activeFeedTab === 'Community' ? (
            <div className="space-y-6">
              {/* Joined Community */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-bold text-sm text-slate-900">Joined Community</h4>
                <div className="space-y-3">
                  {sampleCommunities.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img src={c.avatar} alt={c.name} className="w-11 h-11 rounded-full object-cover" />
                        <div>
                          <h5 className="font-bold text-sm text-slate-900">{c.name}</h5>
                          <p className="text-xs text-slate-500">{c.lastMessage}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block">{c.time}</span>
                        {c.unread > 0 && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-cyan-500 text-white text-[10px] font-bold">
                            {c.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* You might like community */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-bold text-sm text-slate-900">You might like</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sampleSuggestedCommunities.map((sc) => (
                    <div
                      key={sc.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={sc.avatar} alt={sc.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="min-w-0">
                          <h5 className="font-bold text-xs text-slate-900 truncate">{sc.name}</h5>
                          <p className="text-[10px] text-slate-400">{sc.members} Members • <span className="text-emerald-500">{sc.online} Online</span></p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-full transition-colors">
                        Join
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Standard Posts Feed (Page 81-84) */
            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all"
                >
                  {/* Author Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{post.authorName}</span>
                          <span className="text-xs text-slate-400">{post.timeAgo}</span>
                        </div>
                        {post.authorHandle && (
                          <span className="text-xs text-slate-400">{post.authorHandle}</span>
                        )}
                      </div>
                    </div>

                    <button className="px-3.5 py-1 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-sm transition-colors">
                      Follow
                    </button>
                  </div>

                  {/* Title & Body */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-base text-slate-900 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>
                  </div>

                  {/* Hashtags */}
                  {post.hashtags && post.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 text-xs font-semibold text-orange-600">
                      {post.hashtags.map((h) => (
                        <span key={h} className="hover:underline cursor-pointer">{h}</span>
                      ))}
                    </div>
                  )}

                  {/* Image attachment if any */}
                  {post.image && (
                    <div className="rounded-2xl overflow-hidden bg-slate-100 max-h-96 border border-slate-100">
                      <img src={post.image} alt="Attachment" className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Post Actions: Likes, Comments, Bookmark, Share */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => onToggleLike(post.id)}
                        className="flex items-center gap-1.5 hover:text-red-500 transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        <span>{post.likes}</span>
                      </button>

                      <button className="flex items-center gap-1.5 hover:text-orange-500 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.commentsCount}</span>
                      </button>

                      <button className="hover:text-orange-500 transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => onShowToast('Tautan post berhasil disalin!')}
                      className="hover:text-slate-800 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Bottom Compose Post Bar (Pages 81-84) */}
          <div className="sticky bottom-4 z-20 p-4 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl space-y-3">
            <div className="flex items-start gap-3">
              <img
                src={userProfile.avatar}
                alt="You"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-200 shrink-0"
              />
              <div className="flex-1">
                <span className="text-xs font-bold text-slate-700 block mb-1">You</span>
                <input
                  type="text"
                  placeholder="What’s going on? Type your thoughts here!"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleOpenPrivacy();
                  }}
                  className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-400">
                <button className="p-1.5 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors">
                  <Image className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors">
                  <Smile className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors">
                  <BarChart2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors">
                  <Calendar className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleOpenPrivacy}
                disabled={!postContent.trim()}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  postContent.trim()
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                +
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* PRIVACY SELECTION MODAL: "Who can see and reply?" (Pages 76-77) */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-slate-100 space-y-6">
            <div>
              <h4 className="font-bold text-lg font-heading text-slate-900 mb-2">
                Who can see and reply?
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Choose who can see and reply to this post. Anyone mentioned can always reply.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Everyone', icon: Globe },
                { label: 'Accounts you follow', icon: Users },
                { label: 'Only accounts you mention', icon: AtSign },
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = privacyOption === opt.label;
                return (
                  <button
                    key={opt.label}
                    onClick={() => setPrivacyOption(opt.label as any)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-orange-50 border-orange-400 text-orange-700 font-bold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-orange-600' : 'text-slate-400'}`} />
                    <span className="text-xs sm:text-sm">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="flex-1 py-3 rounded-full border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPost}
                className="flex-1 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/20"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
