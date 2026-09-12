import React, { useState } from 'react';
import { ProductItem } from '../types';
import { X, Heart, Share2, MapPin, Star, MessageSquare, Send, CheckCircle2, ChevronRight } from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem) => void;
  onBuyNow: (product: ProductItem) => void;
  onChatWithSeller: (sellerName: string) => void;
  onToggleLike: (productId: string) => void;
  onSelectSimilarProduct: (product: ProductItem) => void;
  allProducts: ProductItem[];
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onChatWithSeller,
  onToggleLike,
  onSelectSimilarProduct,
  allProducts = [],
}) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [offerValue, setOfferValue] = useState('85000');
  const [offerSent, setOfferSent] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  if (!product) return null;

  const handleSendOffer = () => {
    if (!offerValue) return;
    setOfferSent(true);
    setTimeout(() => setOfferSent(false), 3000);
  };

  const safeAllProducts = Array.isArray(allProducts) ? allProducts : [];
  const similarItems = safeAllProducts.filter(p => p && p.id !== product.id).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl w-full max-w-5xl my-auto shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          {/* Breadcrumb matching Page 39 */}
          <div className="flex items-center text-xs font-semibold text-slate-500 space-x-1.5 overflow-x-auto">
            <span className="hover:text-slate-900 cursor-pointer">Shop</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="hover:text-slate-900 cursor-pointer">{product.category}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800">{product.subCategory || 'Toddler Collection'}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8">
          {/* Main Product Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Gallery (Left Col) */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                <img
                  src={product.images[activeImgIdx] || product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Top Actions */}
                <div className="absolute top-3 right-3 flex items-center space-x-2">
                  <button
                    onClick={() => onToggleLike(product.id)}
                    className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md text-xs font-semibold text-slate-700 hover:text-red-500 flex items-center gap-1.5 transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 ${product.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{product.likes} likes</span>
                  </button>
                  <button
                    onClick={() => navigator.clipboard?.writeText(window.location.href)}
                    className="p-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md text-slate-700 hover:text-orange-600 transition-colors"
                    title="Share"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-medium backdrop-blur-sm">
                  {product.images.length} images
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIdx(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImgIdx === idx ? 'border-orange-500 ring-2 ring-orange-200' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Actions (Right Col) */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 leading-snug">
                  {product.title}
                </h1>
                <p className="text-2xl sm:text-3xl font-extrabold text-orange-600 font-heading mt-2">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                  {product.condition}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Shipping • Meet-up
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {product.location}
                </span>
              </div>

              {/* Primary Action Buttons (Buy, Add to Cart) */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onBuyNow(product)}
                  className="flex-1 py-3.5 px-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md hover:shadow-orange-500/30 transition-all active:scale-98"
                >
                  Buy
                </button>
                <button
                  onClick={() => onAddToCart(product)}
                  className="flex-1 py-3.5 px-6 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 transition-all active:scale-98"
                >
                  Add to cart
                </button>
              </div>

              {/* Seller Quick Box & Make Offer */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.seller.avatar}
                      alt={product.seller.name}
                      className="w-11 h-11 rounded-full object-cover ring-1 ring-slate-300"
                    />
                    <div>
                      <p className="font-bold text-sm text-slate-900">{product.seller.name}</p>
                      <p className="text-xs text-slate-500">{product.seller.handle}</p>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold mt-0.5">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{product.seller.rating.toFixed(1)}</span>
                        <span className="text-slate-400">({product.seller.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onChatWithSeller(product.seller.name)}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-full shadow-sm transition-all"
                  >
                    Chat
                  </button>
                </div>

                {/* Make Offer input */}
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Make offer</span>
                  <div className="flex items-center flex-1 max-w-xs px-3 py-1.5 rounded-full bg-white border border-slate-300 focus-within:border-orange-500">
                    <span className="text-xs text-slate-400 mr-1.5 font-semibold">Rp</span>
                    <input
                      type="number"
                      value={offerValue}
                      onChange={(e) => setOfferValue(e.target.value)}
                      className="w-full text-xs outline-none text-slate-800 bg-transparent font-medium"
                      placeholder="85000"
                    />
                    <button
                      onClick={handleSendOffer}
                      disabled={offerSent}
                      className="p-1 text-orange-500 hover:text-orange-600 transition-colors"
                      title="Send Offer"
                    >
                      {offerSent ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Send className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                {offerSent && (
                  <p className="text-[11px] text-emerald-600 font-medium text-right">
                    Tawaran Rp {Number(offerValue).toLocaleString('id-ID')} berhasil dikirim ke seller!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Description Block */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="font-bold text-base text-slate-900 mb-4">Description</h3>
            
            {/* Key specs */}
            <div className="grid grid-cols-3 gap-4 max-w-xs mb-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Posted</span>
                <strong className="text-slate-800">{product.postedTime}</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Type</span>
                <strong className="text-slate-800">Tops</strong>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Size</span>
                <strong className="text-slate-800">{product.size || 'Standard'}</strong>
              </div>
            </div>

            <div className="text-slate-600 text-sm whitespace-pre-line leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
              {product.description}
            </div>
          </div>

          {/* Meet-Up Location */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
              Meet-up
            </h4>
            <div className="flex items-start gap-2 text-sm text-slate-700">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span>{product.meetUpAddress}</span>
            </div>
          </div>

          {/* About Seller Extended (Page 39) */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="font-bold text-base text-slate-900 mb-4">About Seller</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200">
              <div className="flex items-center gap-3">
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{product.seller.name}</h4>
                  <p className="text-xs text-slate-500">{product.seller.handle}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block">Active</span>
                  <strong>{product.seller.activeText}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Responsiveness</span>
                  <strong>{product.seller.responsiveness}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Products</span>
                  <strong>{product.seller.productCount}</strong>
                </div>

                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    isFollowing
                      ? 'bg-slate-100 text-slate-700 border border-slate-300'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          </div>

          {/* Customer Reviews (Page 39) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900">Reviews</h3>
              <button className="text-xs font-bold text-orange-600 hover:underline">More</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-slate-900">Lucinta Linu</strong>
                  <span className="text-slate-400">2d</span>
                </div>
                <div className="text-amber-500 text-xs">★★★★★</div>
                <p className="text-xs text-slate-600">Trims ya buk bagus bgt mainannya utk bocil sy</p>
                <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2 text-xs">
                  <div className="w-8 h-8 rounded bg-white overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=100&auto=format&fit=crop&q=80" alt="Item" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-800 block text-[11px]">PEZ Little Pony</span>
                    <strong className="text-orange-600 text-[11px]">Rp 10,000</strong>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-slate-900">Inul Dararenda</strong>
                  <span className="text-slate-400">4d</span>
                </div>
                <div className="text-amber-500 text-xs">★★★★★</div>
                <p className="text-xs text-slate-600">Mantep bgt nih jd semakin semangat goyang dombret</p>
                <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2 text-xs">
                  <div className="w-8 h-8 rounded bg-white overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1563245372-f21724e3856d?w=100&auto=format&fit=crop&q=80" alt="Item" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-800 block text-[11px]">My Little Pony Castle</span>
                    <strong className="text-orange-600 text-[11px]">Rp 150,000</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Items (Page 39) */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="font-bold text-base text-slate-900 mb-4">Similar</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {similarItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectSimilarProduct(item)}
                  className="cursor-pointer group rounded-2xl bg-white border border-slate-200 p-3 hover:border-orange-400 hover:shadow-md transition-all"
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-slate-100">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-orange-600">
                    {item.title}
                  </h4>
                  <p className="text-xs font-bold text-orange-600 mt-1">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>
                  <p className="text-[10px] text-slate-400">{item.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
