import React, { useState } from 'react';
import { NavTab, UserProfile, ProductItem, TradeItem, ForumPost, InsightArticle, CartItem, ChatConversation, TradeRequest, NotificationItem } from './types';
import {
  sampleUserProfile,
  sampleProducts,
  sampleTradeItems,
  sampleForumPosts,
  sampleArticles,
  sampleCart,
  sampleConversations,
  sampleTradeRequests,
  sampleNotifications,
} from './data/mockData';

// Component Imports
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ServicesView } from './components/ServicesView';
import { ShopView } from './components/ShopView';
import { TradeView } from './components/TradeView';
import { ForumView } from './components/ForumView';
import { InsightsView } from './components/InsightsView';
import { ProfileView } from './components/ProfileView';
import { ChatView } from './components/ChatView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartModal } from './components/CartModal';
import { CheckCircle2 } from 'lucide-react';

export function App() {
  // Global Navigation State
  const [currentTab, setCurrentTab] = useState<NavTab>('HOME');

  // Core Data States
  const [userProfile, setUserProfile] = useState<UserProfile>(sampleUserProfile);
  const [products, setProducts] = useState<ProductItem[]>(sampleProducts);
  const [tradeItems, setTradeItems] = useState<TradeItem[]>(sampleTradeItems);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(sampleForumPosts);
  const [articles, setArticles] = useState<InsightArticle[]>(sampleArticles);
  const [cartItems, setCartItems] = useState<CartItem[]>(sampleCart);
  const [conversations, setConversations] = useState<ChatConversation[]>(sampleConversations);
  const [tradeRequests, setTradeRequests] = useState<TradeRequest[]>(sampleTradeRequests);
  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);

  // Modals & Overlays
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>('conv-1');

  // Floating Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (product: { id: string; title: string; price: number; image?: string; images?: string[] }) => {
    const img = product.image || (product.images ? product.images[0] : '');
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, image: img, quantity: 1 }];
    });
    // Trigger Figma Page 47 Toast "Added to cart!"
    showToast('Added to cart!');
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Product Likes
  const handleToggleProductLike = (productId: string) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const nextLiked = !item.isLiked;
          return {
            ...item,
            isLiked: nextLiked,
            likes: nextLiked ? item.likes + 1 : item.likes - 1,
          };
        }
        return item;
      })
    );
  };

  // Trade Item Likes
  const handleToggleTradeLike = (itemId: string) => {
    setTradeItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const nextLiked = !item.isLiked;
          return {
            ...item,
            isLiked: nextLiked,
            likes: nextLiked ? item.likes + 1 : item.likes - 1,
          };
        }
        return item;
      })
    );
  };

  // Forum Post Likes
  const handleToggleForumLike = (postId: string) => {
    setForumPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const nextLiked = !post.isLiked;
          return {
            ...post,
            isLiked: nextLiked,
            likes: nextLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  // Article Likes & Saves
  const handleToggleLikeArticle = (id: string) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const nextLiked = !art.isLiked;
          return {
            ...art,
            isLiked: nextLiked,
            likes: nextLiked ? art.likes + 1 : art.likes - 1,
          };
        }
        return art;
      })
    );
  };

  const handleToggleSaveArticle = (id: string) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const nextSaved = !art.isSaved;
          showToast(nextSaved ? 'Artikel disimpan ke daftar bacaan!' : 'Artikel dihapus dari simpanan');
          return { ...art, isSaved: nextSaved };
        }
        return art;
      })
    );
  };

  // Chat Actions
  const handleChatWithSeller = (sellerName: string) => {
    setSelectedProduct(null);
    setCurrentTab('CHATS');
    const existing = conversations.find((c) => c.recipientName.toLowerCase().includes(sellerName.toLowerCase()));
    if (existing) {
      setActiveChatId(existing.id);
    } else {
      const newConv: ChatConversation = {
        id: `conv-${Date.now()}`,
        recipientName: sellerName,
        recipientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        lastMessage: 'Halo, saya tertarik dengan barang Anda.',
        lastMessageTime: 'Baru saja',
        unreadCount: 0,
        isOnline: true,
        messages: [
          {
            id: `m-${Date.now()}`,
            senderId: 'me',
            text: 'Halo, apakah barang ini masih ada?',
            timestamp: 'Baru saja',
            isRead: true,
          },
        ],
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveChatId(newConv.id);
    }
  };

  const handleSendMessage = (chatId: string, text: string) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMessage],
          };
        }
        return c;
      })
    );
  };

  const handleDeleteChat = (chatId: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== chatId));
    setActiveChatId(null);
    showToast('Obrolan berhasil dihapus');
  };

  // Trade Request Approvals
  const handleAcceptTrade = (reqId: string) => {
    setTradeRequests((prev) => prev.filter((r) => r.id !== reqId));
    showToast('Pengajuan barter telah diterima! Penjual akan menghubungi Anda.');
  };

  const handleRejectTrade = (reqId: string) => {
    setTradeRequests((prev) => prev.filter((r) => r.id !== reqId));
    showToast('Pengajuan barter ditolak.');
  };

  const handleRemoveUserProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Produk Anda berhasil dihapus.');
  };

  const handleAddNewProduct = () => {
    showToast('Silakan isi detail produk baru di formulir.');
    setCurrentTab('TRADE');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-slate-800 selection:bg-orange-500 selection:text-white">
      {/* Universal Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChats={() => setCurrentTab('CHATS')}
        notifications={notifications}
        userAvatar={userProfile.avatar}
        isLoggedIn={true}
      />

      {/* Main Routed Content */}
      <div className="flex-1">
        {currentTab === 'HOME' && (
          <HomeView
            onSelectTab={setCurrentTab}
            featuredProducts={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {currentTab === 'ABOUT' && (
          <AboutView />
        )}

        {currentTab === 'SERVICES' && (
          <ServicesView onSelectTab={setCurrentTab} />
        )}

        {currentTab === 'SHOP' && (
          <ShopView
            products={products}
            userProfile={userProfile}
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
            onToggleLike={handleToggleProductLike}
          />
        )}

        {currentTab === 'TRADE' && (
          <TradeView
            tradeItems={tradeItems}
            userProfile={userProfile}
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            onAddToCart={(item) => handleAddToCart(item)}
            onToggleLike={handleToggleTradeLike}
            onChatWithSeller={handleChatWithSeller}
          />
        )}

        {currentTab === 'FORUM' && (
          <ForumView
            posts={forumPosts}
            userProfile={userProfile}
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            onToggleLike={handleToggleForumLike}
            onAddPost={(newPost) => setForumPosts([newPost, ...forumPosts])}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'INSIGHTS' && (
          <InsightsView
            articles={articles}
            userProfile={userProfile}
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            onToggleLikeArticle={handleToggleLikeArticle}
            onToggleSaveArticle={handleToggleSaveArticle}
            activeArticleId={activeArticleId}
            onCloseArticle={() => setActiveArticleId(null)}
            onSelectArticle={(id) => setActiveArticleId(id)}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'PROFILE' && (
          <ProfileView
            userProfile={userProfile}
            onUpdateProfile={setUserProfile}
            onLogout={() => {
              showToast('Anda telah keluar dari akun.');
              setCurrentTab('HOME');
            }}
            tradeRequests={tradeRequests}
            onAcceptTrade={handleAcceptTrade}
            onRejectTrade={handleRejectTrade}
            userProducts={(products || []).filter((p) => p?.seller?.handle === '@iahsopiah' || p?.seller?.name === userProfile.name)}
            onRemoveProduct={handleRemoveUserProduct}
            onAddNewProduct={handleAddNewProduct}
          />
        )}

        {currentTab === 'CHATS' && (
          <ChatView
            conversations={conversations}
            userProfile={userProfile}
            activeChatId={activeChatId}
            onSelectChat={setActiveChatId}
            onSendMessage={handleSendMessage}
            onDeleteChat={handleDeleteChat}
          />
        )}
      </div>

      {/* Universal Footer */}
      <Footer onSelectTab={setCurrentTab} />

      {/* Product Detail Modal (Page 39) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p) => handleAddToCart(p)}
        onBuyNow={(p) => {
          handleAddToCart(p);
          setSelectedProduct(null);
          setIsCartOpen(true);
        }}
        onChatWithSeller={handleChatWithSeller}
        onToggleLike={handleToggleProductLike}
        onSelectSimilarProduct={(p) => setSelectedProduct(p)}
        allProducts={products}
      />

      {/* Cart & Checkout Modal (Pages 48-59, 79) */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onShowToast={showToast}
      />

      {/* Floating Figma Toast Notification (Page 47 "Added to cart!", Page 78 "Posted!") */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-slate-900/95 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-2xl border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
