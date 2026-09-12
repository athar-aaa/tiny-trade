import React, { useState } from 'react';
import { UserProfile, TradeRequest, ProductItem } from '../types';
import { User, Shield, Bell, LayoutDashboard, Star, HelpCircle, FileText, Globe, LogOut, ChevronRight, Check, X, Plus } from 'lucide-react';

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onLogout: () => void;
  tradeRequests: TradeRequest[];
  onAcceptTrade: (reqId: string) => void;
  onRejectTrade: (reqId: string) => void;
  userProducts: ProductItem[];
  onRemoveProduct: (id: string) => void;
  onAddNewProduct: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
  onLogout,
  tradeRequests,
  onAcceptTrade,
  onRejectTrade,
  userProducts,
  onRemoveProduct,
  onAddNewProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notification' | 'dashboard' | 'rate' | 'help' | 'terms'>('profile');
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);

  // Form states for personal info
  const [firstName, setFirstName] = useState(userProfile.firstName);
  const [lastName, setLastName] = useState(userProfile.lastName);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [bio, setBio] = useState(userProfile.bio);

  // Address form states
  const [country, setCountry] = useState(userProfile.country);
  const [address, setAddress] = useState(userProfile.address);
  const [postalCode, setPostalCode] = useState(userProfile.postalCode);
  const [taxId, setTaxId] = useState(userProfile.taxId);

  const handleSavePersonal = () => {
    onUpdateProfile({
      ...userProfile,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email,
      phone,
      bio,
    });
    setIsEditingPersonal(false);
  };

  const handleSaveAddress = () => {
    onUpdateProfile({
      ...userProfile,
      country,
      address,
      postalCode,
      taxId,
    });
    setIsEditingAddress(false);
  };

  // Mock timeline chart data (April 11 to May 10)
  const chartPoints = [
    { date: '11 Apr', views: 2 },
    { date: '15 Apr', views: 4 },
    { date: '19 Apr', views: 5 },
    { date: '23 Apr', views: 3 },
    { date: '25 Apr', views: 8 },
    { date: '28 Apr', views: 6 },
    { date: '1 May', views: 7 },
    { date: '5 May', views: 6 },
    { date: '7 May', views: 12 },
    { date: '8 May', views: 8 },
    { date: '10 May', views: 16 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Profile Sidebar (Pages 5, 6, 7) */}
        <aside className="lg:col-span-3 bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1">
          {[
            { id: 'profile', label: 'My Profile', icon: User },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'notification', label: 'Notification', icon: Bell },
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'rate', label: 'Rate', icon: Star },
            { id: 'help', label: 'Help & Support', icon: HelpCircle },
            { id: 'terms', label: 'Terms & Conditions', icon: FileText },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-200/80 text-slate-900 font-bold shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-6 border-t border-slate-100 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800">
              <Globe className="w-4 h-4" />
              <span>Change Language</span>
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-900 hover:text-orange-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Right Main Content */}
        <main className="lg:col-span-9">
          {/* TAB 1: MY PROFILE (Page 5, 15-17) */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fadeIn">
              <h1 className="text-2xl font-bold font-heading text-slate-900">My Profile</h1>

              {/* Profile Card */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-orange-200 shadow-sm"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{userProfile.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{userProfile.role}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{userProfile.location}</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                  className="text-xs font-bold text-slate-400 hover:text-orange-600 transition-colors"
                >
                  Edit
                </button>
              </div>

              {/* Personal Information Card (Page 5) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900">Personal Information</h3>
                  <button
                    onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                    className="text-xs font-bold text-slate-400 hover:text-orange-600 transition-colors"
                  >
                    {isEditingPersonal ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                {isEditingPersonal ? (
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">First Name</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Last Name</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Email address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Bio</label>
                      <input
                        type="text"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleSavePersonal}
                        className="px-6 py-2 bg-orange-500 text-white rounded-full text-xs font-bold hover:bg-orange-600"
                      >
                        Save Personal Information
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-xs">
                    <div>
                      <span className="text-slate-400 block mb-1">First Name</span>
                      <strong className="text-slate-800 text-sm">{userProfile.firstName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1">Last Name</span>
                      <strong className="text-slate-800 text-sm">{userProfile.lastName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1">Email address</span>
                      <strong className="text-slate-800 text-sm">{userProfile.email}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1">Phone</span>
                      <strong className="text-slate-800 text-sm">{userProfile.phone}</strong>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-400 block mb-1">Bio</span>
                      <strong className="text-slate-800 text-sm">{userProfile.bio}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Address Card (Page 5) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900">Address</h3>
                  <button
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="text-xs font-bold text-slate-400 hover:text-orange-600 transition-colors"
                  >
                    {isEditingAddress ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                {isEditingAddress ? (
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Country</label>
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Postal Code</label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">TAX ID</label>
                      <input
                        type="text"
                        value={taxId}
                        onChange={(e) => setTaxId(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm outline-none"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleSaveAddress}
                        className="px-6 py-2 bg-orange-500 text-white rounded-full text-xs font-bold hover:bg-orange-600"
                      >
                        Save Address
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-xs">
                    <div>
                      <span className="text-slate-400 block mb-1">Country</span>
                      <strong className="text-slate-800 text-sm">{userProfile.country}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1">Address</span>
                      <strong className="text-slate-800 text-sm line-clamp-2">{userProfile.address}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1">Postal Code</span>
                      <strong className="text-slate-800 text-sm">{userProfile.postalCode}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1">TAX ID</span>
                      <strong className="text-slate-800 text-sm">{userProfile.taxId}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SECURITY (Page 6) */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-fadeIn">
              <h1 className="text-2xl font-bold font-heading text-slate-900">Security</h1>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
                {/* Change Password */}
                <div className="p-5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-base text-slate-700">***</span>
                    <span className="font-bold text-sm text-slate-800">Change Password</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>

                {/* Change PIN */}
                <div className="p-5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-sm text-slate-700">123</span>
                    <span className="font-bold text-sm text-slate-800">Change PIN</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>

                {/* Profile Verification */}
                <div className="p-5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <User className="w-5 h-5 text-slate-600" />
                    <span className="font-bold text-sm text-slate-800">Profile Verification</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>

                {/* Face ID Switch */}
                <div className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-lg">🔲</span>
                    <span className="font-bold text-sm text-slate-800">Face ID</span>
                  </div>
                  <button
                    onClick={() => setFaceIdEnabled(!faceIdEnabled)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      faceIdEnabled ? 'bg-black justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DASHBOARD (Page 7) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h1 className="text-2xl font-bold font-heading text-slate-900">Dashboard</h1>
                <p className="text-xs text-slate-400">
                  Last updated: May 11ᵗʰ, 2025 09:45 WIB
                </p>
              </div>

              {/* Stats Row (Balance, Sold Products, Products Viewed) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <div>
                  <span className="text-xs font-semibold text-slate-500 block mb-1">Balance</span>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                    Rp 423,765
                  </h3>
                </div>

                <div className="sm:border-l border-slate-100 sm:pl-6">
                  <span className="text-xs font-semibold text-slate-500 block mb-1">Sold Products</span>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                    4
                  </h3>
                </div>

                <div className="sm:border-l border-slate-100 sm:pl-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-1">Products Viewed</span>
                    <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                      43
                    </h3>
                  </div>
                  <button className="text-xs font-bold text-slate-400 hover:text-orange-600 transition-colors">
                    View Details
                  </button>
                </div>
              </div>

              {/* Activity Chart Area (Page 7) */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                  <span>VIEWS ACTIVITY (LAST 30 DAYS)</span>
                  <span className="text-cyan-600 font-semibold">Peak: 16 Views</span>
                </div>

                {/* SVG Chart */}
                <div className="h-44 w-full relative pt-4">
                  <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,110 L 45,95 L 90,85 L 140,100 L 190,70 L 240,80 L 290,75 L 340,80 L 390,50 L 440,70 L 500,20 L 500,120 L 0,120 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M 0,110 L 45,95 L 90,85 L 140,100 L 190,70 L 240,80 L 290,75 L 340,80 L 390,50 L 440,70 L 500,20"
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="2.5"
                    />
                    {/* Points */}
                    <circle cx="500" cy="20" r="4" fill="#06B6D4" className="animate-ping" />
                    <circle cx="500" cy="20" r="3" fill="#0891B2" />
                  </svg>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
                    <span>11 Apr</span>
                    <span>19 Apr</span>
                    <span>28 Apr</span>
                    <span>5 May</span>
                    <span>10 May</span>
                  </div>
                </div>
              </div>

              {/* Bottom Split: Your Products (20) & Trade Requests (2) (Page 7) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Your Products */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900">Your Products (20)</h4>
                    <button className="text-xs font-bold text-slate-400 hover:text-orange-600">Edit</button>
                  </div>

                  <div className="space-y-3">
                    {userProducts.slice(0, 5).map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={prod.images[0]} alt={prod.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                          <div className="min-w-0">
                            <h5 className="font-bold text-xs text-slate-900 truncate">{prod.title}</h5>
                            <p className="text-xs font-bold text-orange-600 mt-0.5">
                              Rp {prod.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveProduct(prod.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-white rounded-full transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button className="text-xs font-semibold text-slate-500 hover:underline">More</button>
                    <button
                      onClick={onAddNewProduct}
                      className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-orange-500 text-white text-xs font-bold transition-all shadow-sm"
                    >
                      Add New Products
                    </button>
                  </div>
                </div>

                {/* Trade Requests (Page 7) */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h4 className="font-bold text-sm text-slate-900">Trade Requests (2)</h4>

                  {tradeRequests.map((req) => (
                    <div key={req.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                      <div className="aspect-video rounded-xl overflow-hidden bg-white border border-slate-200">
                        <img src={req.offeredItem.photos[0]} alt="Trade item" className="w-full h-full object-cover" />
                      </div>

                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                          {req.offeredItem.name}
                        </h5>
                        <p className="text-xs font-bold text-orange-600 mt-1">
                          Category: {req.offeredItem.category}
                        </p>
                        {req.offeredItem.size && (
                          <p className="text-[11px] text-slate-500">Size: {req.offeredItem.size}</p>
                        )}
                        <p className="text-[11px] text-slate-600 mt-1 line-clamp-3 whitespace-pre-line">
                          {req.offeredItem.description}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-2">
                          {req.offeredItem.location} • {req.offeredItem.shipmentMethod}
                        </p>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-slate-200">
                        <button
                          onClick={() => onAcceptTrade(req.id)}
                          className="flex-1 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-full transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => onRejectTrade(req.id)}
                          className="flex-1 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold rounded-full transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* OTHER TABS: NOTIFICATION, RATE, HELP, TERMS */}
          {activeTab === 'notification' && (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Notifications</h2>
              <p className="text-sm text-slate-500">Kelola preferensi dan notifikasi transaksi preloved Anda.</p>
            </div>
          )}
          {activeTab === 'rate' && (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4 text-center">
              <h2 className="text-xl font-bold text-slate-900">Beri Nilai TinyTrade</h2>
              <div className="flex justify-center text-3xl text-amber-400 gap-2 my-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} className="hover:scale-125 transition-transform">★</button>
                ))}
              </div>
              <p className="text-xs text-slate-500">Terima kasih telah mendukung sirkulasi kebutuhan balita berkelanjutan.</p>
            </div>
          )}
          {activeTab === 'help' && (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Help & Support</h2>
              <p className="text-sm text-slate-600">Hubungi kami melalui WhatsApp Customer Care di (021) 8899-7711 atau email support@tinytrade.id</p>
            </div>
          )}
          {activeTab === 'terms' && (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Terms & Conditions</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Platform TinyTrade tunduk pada Undang-Undang Perlindungan Konsumen No. 8 Tahun 1999 Republik Indonesia. Setiap pengguna wajib memastikan keakuratan kondisi barang yang diposting demi kenyamanan bersama.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* LOGOUT CONFIRMATION MODAL (Pages 18-20) */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl border border-slate-100 text-center space-y-6">
            <h4 className="font-bold text-xl font-heading text-slate-900 leading-snug">
              Are you sure want to log out?
            </h4>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  onLogout();
                }}
                className="px-8 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-8 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-sm transition-all active:scale-95"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
