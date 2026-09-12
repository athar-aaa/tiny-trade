import React, { useState } from 'react';
import { TradeItem, NavTab, UserProfile } from '../types';
import { Search, Heart, Plus, MapPin, ArrowRightLeft, Upload, CheckCircle2, ChevronRight, Star, X } from 'lucide-react';
import { PriceFilterPopover, ConditionFilterPopover } from './FilterComponents';

interface TradeViewProps {
  tradeItems: TradeItem[];
  userProfile: UserProfile;
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onAddToCart: (item: { id: string; title: string; price: number; image: string }) => void;
  onToggleLike: (itemId: string) => void;
  onChatWithSeller: (sellerName: string) => void;
}

export const TradeView: React.FC<TradeViewProps> = ({
  tradeItems = [],
  userProfile,
  currentTab,
  onSelectTab,
  onAddToCart,
  onToggleLike,
  onChatWithSeller,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected item for detail view (Page 62)
  const [activeItem, setActiveItem] = useState<TradeItem | null>(null);

  // Trade Request form modal state (Pages 63-71)
  const [tradeFormOpen, setTradeFormOpen] = useState(false);
  const [targetItemForTrade, setTargetItemForTrade] = useState<TradeItem | null>(null);

  // Trade form state
  const [formName, setFormName] = useState('New Balance kids 237 sepatu anak');
  const [formCategory, setFormCategory] = useState('Shoes');
  const [formSize, setFormSize] = useState('27,5');
  const [formDescription, setFormDescription] = useState(
    'Sepatu New Balance 237\nSize 27,5\nInsole 16cm on tag\nTag kanan kiri beda\nInsole masih bawaan'
  );
  const [formLocation, setFormLocation] = useState('West Jakarta');
  const [formShipment, setFormShipment] = useState<'Meet-up' | 'Drop Point'>('Meet-up');
  const [formPhotos, setFormPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80',
  ]);

  // Submission statuses
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter states
  const [pricePopoverOpen, setPricePopoverOpen] = useState(false);
  const [conditionPopoverOpen, setConditionPopoverOpen] = useState(false);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState<'lowToHigh' | 'highToLow' | null>(null);
  const [selectedShipment, setSelectedShipment] = useState<string[]>([]);

  const safeTradeItems = Array.isArray(tradeItems) ? tradeItems : [];
  const filteredItems = safeTradeItems.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.need.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStartTrade = (item: TradeItem) => {
    setTargetItemForTrade(item);
    setTradeFormOpen(true);
    setIsSubmitted(false);
  };

  const handleSendTradeRequest = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar (Desktop) matching Page 61 */}
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
          {/* Top Search */}
          <div className="relative">
            <div className="relative flex items-center w-full bg-slate-50 rounded-full border border-slate-200 px-5 py-3 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100 transition-all shadow-sm">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400"
              />
              <Search className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
            {['Clothes', 'Toys', 'Accessories', 'All'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                }`}
              >
                {cat}
              </button>
            ))}

            <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

            {['Newest', 'Nearest', 'Favorites'].map((s) => (
              <button
                key={s}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Trade Items Grid (Page 61) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400">
                RECOMMENDED FOR YOU
              </h3>
              <span className="text-xs font-medium text-slate-400">
                {filteredItems.length} items available for barter
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-2xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 p-3 flex flex-col justify-between"
                >
                  <div>
                    {/* Item Image */}
                    <div
                      onClick={() => setActiveItem(item)}
                      className="aspect-square rounded-xl overflow-hidden bg-slate-100 cursor-pointer relative mb-3"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[10px] font-bold text-slate-700">
                        {item.condition}
                      </div>
                    </div>

                    {/* Title & Need */}
                    <h4
                      onClick={() => setActiveItem(item)}
                      className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {item.title}
                    </h4>

                    {/* The prominent "Need: ..." tag from Figma */}
                    <div className="mt-2 p-1.5 rounded-lg bg-orange-50 border border-orange-100">
                      <p className="text-xs font-bold text-orange-600 truncate">
                        Need: {item.need}
                      </p>
                    </div>

                    {item.size && (
                      <p className="text-[11px] text-slate-500 mt-1">
                        Size: {item.size}
                      </p>
                    )}
                  </div>

                  {/* Bottom Meta & Action */}
                  <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span className="text-[11px] truncate max-w-[75px]">{item.location}</span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleLike(item.id)}
                        className="flex items-center gap-1 hover:text-red-500 transition-colors"
                      >
                        <Heart className={`w-3.5 h-3.5 ${item.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        <span className="text-[11px]">{item.likes}</span>
                      </button>

                      <button
                        onClick={() => handleStartTrade(item)}
                        title="Ajukan Barter"
                        className="px-2.5 py-1 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold flex items-center gap-1 transition-all shadow-sm active:scale-90"
                      >
                        <ArrowRightLeft className="w-3 h-3" />
                        Trade
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* 2. ITEM DETAIL MODAL (Page 62) */}
      {activeItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
          <div className="relative bg-white rounded-3xl w-full max-w-4xl my-auto shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center text-xs font-semibold text-slate-500 space-x-1.5">
                <span>Trade</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span>{activeItem.category}</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-800">{activeItem.title}</span>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Images */}
                <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={activeItem.images[0]}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 leading-snug">
                    {activeItem.title}
                  </h2>

                  <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200">
                    <p className="text-sm font-extrabold text-orange-600">
                      Need: {activeItem.need}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {activeItem.condition}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700">
                      {activeItem.shipmentMethods.join(' • ')}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {activeItem.location}
                    </span>
                  </div>

                  {/* Action buttons (Trade, Add to cart) Page 62 */}
                  <div className="flex items-center gap-3 pt-4">
                    <button
                      onClick={() => {
                        const target = activeItem;
                        setActiveItem(null);
                        handleStartTrade(target);
                      }}
                      className="flex-1 py-3 px-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-all active:scale-98"
                    >
                      Trade
                    </button>
                    <button
                      onClick={() => {
                        onAddToCart({
                          id: activeItem.id,
                          title: activeItem.title,
                          price: 0,
                          image: activeItem.images[0],
                        });
                        setActiveItem(null);
                      }}
                      className="flex-1 py-3 px-6 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 transition-all active:scale-98"
                    >
                      Add to cart
                    </button>
                  </div>

                  {/* Seller info */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={activeItem.seller.avatar}
                        alt={activeItem.seller.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{activeItem.seller.name}</h4>
                        <p className="text-xs text-slate-500">{activeItem.seller.handle}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onChatWithSeller(activeItem.seller.name);
                        setActiveItem(null);
                      }}
                      className="px-4 py-1.5 bg-orange-500 text-white text-xs font-semibold rounded-full hover:bg-orange-600"
                    >
                      Chat
                    </button>
                  </div>

                  {/* Description */}
                  <div className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                    {activeItem.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TRADE REQUEST FORM MODAL (Pages 63-71 & 72-73) */}
      {tradeFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
          <div className="relative bg-white rounded-3xl w-full max-w-5xl my-auto shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[94vh]">
            {/* Top Bar */}
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-lg font-heading text-slate-900">Trade Request</h3>
              <button
                onClick={() => setTradeFormOpen(false)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-4 sm:p-8">
              {/* Submission loading state (Page 72) */}
              {isSubmitting ? (
                <div className="py-24 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500 animate-ping opacity-75" />
                  <p className="text-sm font-semibold text-slate-600">Mengirimkan pengajuan barter...</p>
                </div>
              ) : isSubmitted ? (
                /* Success state (Page 73) */
                <div className="py-16 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4 animate-fadeIn">
                  <div className="w-20 h-20 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold font-heading text-slate-900">
                    Your Trade Request Has Been Sent!
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    The seller will review your request soon. Please wait for a response or message the seller for updates.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setTradeFormOpen(false);
                        setIsSubmitted(false);
                      }}
                      className="px-8 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold tracking-wider uppercase transition-colors"
                    >
                      Continue Trading
                    </button>
                  </div>
                </div>
              ) : (
                /* The Two-Column Form Layout (Pages 63-71) */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Input Form */}
                  <div className="lg:col-span-8 space-y-6">
                    {/* Mode selector */}
                    <div className="flex items-center gap-4 text-xs font-bold border-b border-slate-100 pb-3">
                      <span className="text-slate-900 border-b-2 border-orange-500 pb-1">
                        Describe Your Product
                      </span>
                      <span className="text-orange-500 hover:underline cursor-pointer">
                        or Pick from Your Product List
                      </span>
                    </div>

                    {/* 1. Product Information */}
                    <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200 space-y-4">
                      <h4 className="font-bold text-sm text-slate-900">Product Information</h4>

                      {/* Product Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Ex: sepatu cowo (jenis) + mamitoko (merek) + kanvas hitam"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white"
                        />
                        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                          <span>Product name must include brand, type, color, material or model.</span>
                          <span>{formName.length}/300</span>
                        </div>
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Category *
                        </label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-orange-500 bg-white"
                        >
                          <option value="Shoes">Shoes</option>
                          <option value="Clothes">Clothes</option>
                          <option value="Toys">Toys</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Stroller">Stroller</option>
                        </select>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Description *
                        </label>
                        <textarea
                          rows={4}
                          value={formDescription}
                          onChange={(e) => setFormDescription(e.target.value)}
                          placeholder="Write description about your product"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-orange-500 bg-white leading-relaxed"
                        />
                        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                          <span>Include key details like size, condition, and material.</span>
                          <span>{formDescription.length}/2000</span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Product Details (Photos, Page 67-69) */}
                    <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200 space-y-4">
                      <h4 className="font-bold text-sm text-slate-900">Product Details</h4>
                      <p className="text-xs text-slate-500">Product Photo *</p>

                      <div className="grid grid-cols-5 gap-3">
                        {formPhotos.map((photo, idx) => (
                          <div
                            key={idx}
                            className="aspect-square rounded-2xl overflow-hidden border-2 border-orange-400 relative shadow-sm"
                          >
                            <img src={photo} alt="Upload preview" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {[...Array(Math.max(0, 5 - formPhotos.length))].map((_, i) => (
                          <div
                            key={i}
                            className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-orange-400 flex flex-col items-center justify-center p-2 text-slate-400 hover:text-orange-500 cursor-pointer bg-white transition-colors"
                          >
                            <Upload className="w-4 h-4 mb-1" />
                            <span className="text-[10px] text-center">Photo {formPhotos.length + i + 1}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Upload up to 5 product photos. Drag and drop them here.
                      </p>
                    </div>

                    {/* 3. Shipment (Page 70-71) */}
                    <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200 space-y-4">
                      <h4 className="font-bold text-sm text-slate-900">Shipment</h4>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Your Location *
                        </label>
                        <select
                          value={formLocation}
                          onChange={(e) => setFormLocation(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-orange-500 bg-white"
                        >
                          <option value="West Jakarta">West Jakarta</option>
                          <option value="East Jakarta">East Jakarta</option>
                          <option value="South Jakarta">South Jakarta</option>
                          <option value="North Jakarta">North Jakarta</option>
                          <option value="Tangerang">Tangerang</option>
                          <option value="Bekasi">Bekasi</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Shipment Method *
                        </label>
                        <div className="flex items-center gap-6 text-xs text-slate-800">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="shipment"
                              checked={formShipment === 'Meet-up'}
                              onChange={() => setFormShipment('Meet-up')}
                              className="text-orange-500 accent-orange-500"
                            />
                            <span>Meet-up</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="shipment"
                              checked={formShipment === 'Drop Point'}
                              onChange={() => setFormShipment('Drop Point')}
                              className="text-orange-500 accent-orange-500"
                            />
                            <span>Drop Point</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Interactive Preview Card (Pages 63-71) */}
                  <div className="lg:col-span-4 space-y-4">
                    <h4 className="font-bold text-sm text-slate-900">Preview</h4>

                    <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-xl space-y-4">
                      {/* Image */}
                      <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                        {formPhotos[0] ? (
                          <img src={formPhotos[0]} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                            Your product photo
                          </div>
                        )}
                      </div>

                      {/* Live Name */}
                      <h5 className="font-bold text-sm text-slate-900 leading-snug">
                        {formName || 'Your product name'}
                      </h5>

                      {/* Category & Size */}
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-orange-600">
                          Category: {formCategory || 'Your category'}
                        </p>
                        <p className="text-xs text-slate-500">
                          Size: {formSize || 'Your product size'}
                        </p>
                      </div>

                      {/* Description preview */}
                      <p className="text-xs text-slate-600 whitespace-pre-line bg-slate-50 p-3 rounded-xl border border-slate-100 line-clamp-3">
                        {formDescription || 'Your product description'}
                      </p>

                      {/* Location & Shipment */}
                      <p className="text-xs text-slate-500 font-medium">
                        {formLocation} • {formShipment}
                      </p>

                      {/* Preview Accept/Reject buttons as illustrated in Figma */}
                      <div className="flex gap-2 pt-2 border-t border-slate-100">
                        <button
                          disabled
                          className="flex-1 py-1.5 rounded-full border border-slate-300 text-slate-600 text-xs font-semibold opacity-70"
                        >
                          Accept
                        </button>
                        <button
                          disabled
                          className="flex-1 py-1.5 rounded-full border border-slate-300 text-slate-600 text-xs font-semibold opacity-70"
                        >
                          Reject
                        </button>
                      </div>

                      {/* Send Trade Request Button */}
                      <button
                        onClick={handleSendTradeRequest}
                        className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-98"
                      >
                        Send Trade Request
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
