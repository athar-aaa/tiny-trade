import React, { useState } from 'react';
import { ChatConversation, ChatMessage, UserProfile } from '../types';
import { Search, Send, Paperclip, MoreVertical, Phone, Image, Smile, CheckCheck, Trash2, ArrowLeft } from 'lucide-react';

interface ChatViewProps {
  conversations: ChatConversation[];
  userProfile: UserProfile;
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onSendMessage: (chatId: string, text: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  conversations = [],
  userProfile,
  activeChatId,
  onSelectChat,
  onSendMessage,
  onDeleteChat,
}) => {
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmChatId, setDeleteConfirmChatId] = useState<string | null>(null);

  const safeConversations = Array.isArray(conversations) ? conversations : [];
  const activeConversation = safeConversations.find(c => c && c.id === activeChatId) || safeConversations[0] || null;

  const handleSend = () => {
    if (!inputText.trim() || !activeConversation) return;
    onSendMessage(activeConversation.id, inputText);
    setInputText('');
  };

  const filteredConversations = safeConversations.filter(c =>
    c && c.recipientName && c.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[700px] max-h-[82vh]">
        {/* Left: Chat List (Pages 8, 9) */}
        <div className={`md:col-span-5 lg:col-span-4 border-r border-slate-200 flex flex-col ${activeChatId ? 'hidden md:flex' : 'flex'}`}>
          {/* Header & Search */}
          <div className="p-4 border-b border-slate-100 space-y-3">
            <h2 className="text-xl font-bold font-heading text-slate-900">Chats</h2>
            <div className="relative flex items-center bg-slate-50 rounded-full border border-slate-200 px-3.5 py-2 focus-within:bg-white focus-within:border-orange-500">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search or start a new chat"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-transparent outline-none text-slate-800"
              />
            </div>
          </div>

          {/* Conversations Scroll */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {filteredConversations.map((conv) => {
              const isSelected = activeConversation?.id === conv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => onSelectChat(conv.id)}
                  className={`p-4 flex items-start gap-3.5 cursor-pointer transition-colors relative ${
                    isSelected ? 'bg-orange-50/60' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.recipientAvatar}
                      alt={conv.recipientName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conv.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {conv.recipientName}
                      </h4>
                      <span className="text-[10px] text-slate-400 ml-2 shrink-0">{conv.lastMessageTime}</span>
                    </div>

                    <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>

                    {conv.productContext && (
                      <div className="mt-1.5 px-2 py-0.5 rounded-md bg-white border border-slate-100 text-[10px] text-orange-600 font-semibold truncate inline-block">
                        Item: {conv.productContext.title}
                      </div>
                    )}
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-1">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Area (Pages 8, 10, 11-14) */}
        {activeConversation ? (
          <div className={`md:col-span-7 lg:col-span-8 flex flex-col ${!activeChatId ? 'hidden md:flex' : 'flex'}`}>
            {/* Chat Top Bar */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/40">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectChat('')}
                  className="md:hidden p-1 text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="relative">
                  <img
                    src={activeConversation.recipientAvatar}
                    alt={activeConversation.recipientName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {activeConversation.isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">
                    {activeConversation.recipientName}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {activeConversation.isOnline ? 'Online • Very Responsive' : 'Active recently'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-500">
                <button
                  onClick={() => setDeleteConfirmChatId(activeConversation.id)}
                  className="p-2 hover:bg-slate-100 hover:text-red-500 rounded-full transition-colors"
                  title="Hapus Obrolan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product Context Sticky Header Banner if attached (Page 8) */}
            {activeConversation.productContext && (
              <div className="px-5 py-2.5 bg-orange-50/70 border-b border-orange-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeConversation.productContext.image}
                    alt="Product"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <h5 className="font-bold text-xs text-slate-800 line-clamp-1">
                      {activeConversation.productContext.title}
                    </h5>
                    <p className="text-xs font-extrabold text-orange-600">
                      Rp {activeConversation.productContext.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white text-orange-600 text-xs font-bold border border-orange-200">
                  Trading / Bargain
                </span>
              </div>
            )}

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/20">
              {activeConversation.messages.map((msg) => {
                const isMe = msg.senderId === 'me';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                        isMe
                          ? 'bg-orange-500 text-white rounded-br-sm'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <div
                        className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                          isMe ? 'text-orange-100' : 'text-slate-400'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {isMe && <CheckCheck className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 border-t border-slate-100 bg-white flex items-center gap-2 sm:gap-3">
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
                <Image className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 bg-slate-50 focus:bg-white focus:border-orange-500 outline-none"
              />

              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className={`p-2.5 rounded-full transition-all ${
                  inputText.trim()
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md active:scale-95'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="col-span-8 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
            <p>Pilih salah satu percakapan untuk melihat pesan.</p>
          </div>
        )}
      </div>

      {/* Delete Chat Confirmation Modal (Pages 11-14) */}
      {deleteConfirmChatId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-slate-100 text-center space-y-4">
            <h4 className="font-bold text-lg font-heading text-slate-900">
              Hapus Obrolan Ini?
            </h4>
            <p className="text-xs text-slate-500">
              Pesan dalam percakapan ini akan dihapus dari riwayat Anda secara permanen.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmChatId(null)}
                className="flex-1 py-2.5 rounded-full border border-slate-300 text-slate-700 text-xs font-bold"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onDeleteChat(deleteConfirmChatId);
                  setDeleteConfirmChatId(null);
                }}
                className="flex-1 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold shadow-md"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
