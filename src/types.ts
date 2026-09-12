export type NavTab = 'HOME' | 'ABOUT' | 'SERVICES' | 'PROFILE' | 'SHOP' | 'TRADE' | 'FORUM' | 'INSIGHTS' | 'CHATS';

export interface ProductItem {
  id: string;
  title: string;
  category: 'Clothes' | 'Toys' | 'Accessories';
  subCategory?: string;
  price: number;
  condition: 'Brand New' | 'Like New' | 'Lightly Used' | 'Well Used' | 'Heavily Used';
  size?: string;
  location: string;
  likes: number;
  isLiked?: boolean;
  images: string[];
  seller: {
    name: string;
    handle: string;
    rating: number;
    reviewCount: number;
    activeText: string;
    responsiveness: string;
    productCount: number;
    avatar: string;
    isFollowed?: boolean;
  };
  description: string;
  meetUpAddress: string;
  postedTime: string;
}

export interface TradeItem {
  id: string;
  title: string;
  category: 'Clothes' | 'Toys' | 'Accessories' | 'Books' | 'Baby Carrier';
  need: string;
  size?: string;
  condition: 'Brand New' | 'Like New' | 'Lightly Used' | 'Well Used' | 'Heavily Used';
  location: string;
  likes: number;
  isLiked?: boolean;
  images: string[];
  seller: {
    name: string;
    handle: string;
    rating: number;
    reviewCount: number;
    activeText: string;
    responsiveness: string;
    productCount: number;
    avatar: string;
  };
  description: string;
  meetUpAddress: string;
  postedTime: string;
  shipmentMethods: ('Meet-up' | 'Drop Point' | 'Shipping')[];
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface TradeRequest {
  id: string;
  title: string;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
  targetItemTitle: string;
  offeredItem: {
    name: string;
    category: string;
    size?: string;
    description: string;
    photos: string[];
    location: string;
    shipmentMethod: string;
  };
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorHandle?: string;
  authorAvatar: string;
  timeAgo: string;
  title: string;
  content: string;
  hashtags: string[];
  image?: string;
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  isBookmarked?: boolean;
  isFollowed?: boolean;
}

export interface InsightArticle {
  id: string;
  title: string;
  type: 'EVENT & PLACES' | 'ARTICLES' | 'VIDEOS';
  date: string;
  image: string;
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  isSaved?: boolean;
  content?: string[];
  quote?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  location: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  country: string;
  address: string;
  postalCode: string;
  taxId: string;
}

export interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead?: boolean;
}

export interface ChatConversation {
  id: string;
  recipientName: string;
  recipientAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline?: boolean;
  messages: ChatMessage[];
  productContext?: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
}
