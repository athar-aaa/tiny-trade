import React, { useState, useMemo } from 'react';
import { ProductItem, NavTab, UserProfile } from '../types';
import { Search, Heart, Plus, ShoppingBag, SlidersHorizontal, ArrowUpDown, ChevronDown } from 'lucide-react';
import { PriceFilterPopover, ConditionFilterPopover, SearchSuggestions } from './FilterComponents';

interface ShopViewProps {
  products: ProductItem[];
  userProfile: UserProfile;
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onSelectProduct: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onToggleLike: (productId: string) => void;
  initialCategory?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products = [],
  userProfile,
  currentTab,
  onSelectTab,
  onSelectProduct,
  onAddToCart,
  onToggleLike,
  initialCategory = 'All',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [activeSort, setActiveSort] = useState<'Newest' | 'Nearest' | 'Favorites' | null>('Newest');
  
  // Filter popover states
  const [pricePopoverOpen, setPricePopoverOpen] = useState(false);
  const [conditionPopoverOpen, setConditionPopoverOpen] = useState(false);
  
  // Filter values
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState<'lowToHigh' | 'highToLow' | null>(null);
  const [selectedShipment, setSelectedShipment] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const toggleShipment = (method: string) => {
    setSelectedShipment(prev => 
      prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
    );
  };

  const toggleCondition = (cond: string) => {
    setSelectedConditions(prev =>
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : [];
    return safeProducts.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Price filter
      if (minPrice && item.price < Number(minPrice)) return false;
      if (maxPrice && item.price > Number(maxPrice)) return false;

      // Condition filter
      if (selectedConditions.length > 0 && !selectedConditions.includes(item.condition)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOrder === 'lowToHigh') return a.price - b.price;
      if (sortOrder === 'highToLow') return b.price - a.price;
      if (activeSort === 'Favorites') return b.likes - a.likes;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, minPrice, maxPrice, selectedConditions, sortOrder, activeSort]);

  const recentSearchItems = filteredProducts.slice(0, 4);
  const recommendedItems = filteredProducts.slice(4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar (Desktop) matching Page 38 */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          {/* User Profile Snippet */}
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

          {/* Sub Navigation */}
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

        {/* Right Main Content */}
        <main className="lg:col-span-9 space-y-8">
          {/* Top Search Bar with Suggestions */}
          <div className="relative">
            <div className="relative flex items-center w-full bg-slate-50 rounded-full border border-slate-200 px-5 py-3 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100 transition-all shadow-sm">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400"
              />
              <Search className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
            </div>

            {/* Recent & Popular Suggestions Overlay (Page 74) */}
            <SearchSuggestions
              isOpen={isSearchFocused && !searchQuery}
              onSelectTag={(tag) => setSearchQuery(tag)}
              onClose={() => setIsSearchFocused(false)}
            />
          </div>

          {/* Filter Pills Bar (Page 38) */}
          <div className="space-y-3">
            {/* Primary Categories */}
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

              {/* Quick Sort Options */}
              {(['Newest', 'Nearest', 'Favorites'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSort(activeSort === s ? null : s)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeSort === s
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}

              {/* Condition Filter Button */}
              <div className="relative">
                <button
                  onClick={() => {
                    setConditionPopoverOpen(!conditionPopoverOpen);
                    setPricePopoverOpen(false);
                  }}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    selectedConditions.length > 0
                      ? 'bg-orange-50 border-orange-400 text-orange-600 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Condition {selectedConditions.length > 0 && `(${selectedConditions.length})`}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <ConditionFilterPopover
                  isOpen={conditionPopoverOpen}
                  onClose={() => setConditionPopoverOpen(false)}
                  selectedConditions={selectedConditions}
                  onToggleCondition={toggleCondition}
                />
              </div>

              {/* Price Filter Button */}
              <div className="relative">
                <button
                  onClick={() => {
                    setPricePopoverOpen(!pricePopoverOpen);
                    setConditionPopoverOpen(false);
                  }}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    minPrice || maxPrice || sortOrder
                      ? 'bg-orange-50 border-orange-400 text-orange-600 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Price</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <PriceFilterPopover
                  isOpen={pricePopoverOpen}
                  onClose={() => setPricePopoverOpen(false)}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  sortOrder={sortOrder}
                  shipmentMethods={selectedShipment}
                  onMinPriceChange={setMinPrice}
                  onMaxPriceChange={setMaxPrice}
                  onSortOrderChange={setSortOrder}
                  onToggleShipment={toggleShipment}
                />
              </div>

              {(minPrice || maxPrice || selectedConditions.length > 0 || searchQuery) && (
                <button
                  onClick={() => {
                    setMinPrice('');
                    setMaxPrice('');
                    setSelectedConditions([]);
                    setSearchQuery('');
                    setSortOrder(null);
                  }}
                  className="text-xs text-orange-600 hover:underline font-bold px-2"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>

          {/* Section 1: RECENT SEARCHES (Page 38) */}
          {recentSearchItems.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400">
                RECENT SEARCHES
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {recentSearchItems.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onOpen={() => onSelectProduct(prod)}
                    onAddToCart={() => onAddToCart(prod)}
                    onToggleLike={() => onToggleLike(prod.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Section 2: RECOMMENDED FOR YOU (Page 38) */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400">
              RECOMMENDED FOR YOU
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {recommendedItems.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onOpen={() => onSelectProduct(prod)}
                  onAddToCart={() => onAddToCart(prod)}
                  onToggleLike={() => onToggleLike(prod.id)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="p-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">Tidak ada produk yang cocok dengan pencarian atau filter Anda.</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: ProductItem;
  onOpen: () => void;
  onAddToCart: () => void;
  onToggleLike: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpen,
  onAddToCart,
  onToggleLike,
}) => {
  return (
    <div className="group rounded-2xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 p-3 flex flex-col justify-between">
      <div>
        {/* Product Image */}
        <div
          onClick={onOpen}
          className="aspect-square rounded-xl overflow-hidden bg-slate-100 cursor-pointer relative mb-3"
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[10px] font-bold text-slate-700">
            {product.condition}
          </div>
        </div>

        {/* Title & Specs */}
        <h4
          onClick={onOpen}
          className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
        >
          {product.title}
        </h4>

        <p className="text-sm sm:text-base font-extrabold text-orange-600 font-heading mt-1">
          Rp {product.price.toLocaleString('id-ID')}
        </p>

        {product.size && (
          <p className="text-[11px] text-slate-500 mt-0.5">
            Size: {product.size}
          </p>
        )}
      </div>

      {/* Footer Meta: Location, Likes, Add to Cart */}
      <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs text-slate-500">
        <span className="text-[11px] truncate max-w-[70px]">{product.location}</span>

        <div className="flex items-center gap-2">
          {/* Like */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike();
            }}
            className="flex items-center gap-1 hover:text-red-500 transition-colors"
          >
            <Heart className={`w-3.5 h-3.5 ${product.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            <span className="text-[11px]">{product.likes}</span>
          </button>

          {/* Add to Cart (+) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            title="Add to Cart"
            className="w-6 h-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-all shadow-sm active:scale-90"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
