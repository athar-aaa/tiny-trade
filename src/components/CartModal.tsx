import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, CheckCircle2, ShoppingBag, ArrowRightLeft, CreditCard, QrCode } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onShowToast: (msg: string) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'purchase' | 'trade'>('purchase');
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [selectedPayment, setSelectedPayment] = useState<'qris' | 'va' | 'cod'>('qris');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = cartItems.length > 0 ? 12000 : 0;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    setStep('checkout');
  };

  const handleProcessPayment = () => {
    setStep('success');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative bg-white rounded-3xl w-full max-w-2xl my-auto shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Top Bar */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('purchase')}
              className={`font-bold text-sm pb-1 border-b-2 transition-all ${
                activeTab === 'purchase'
                  ? 'text-orange-600 border-orange-500'
                  : 'text-slate-400 border-transparent hover:text-slate-700'
              }`}
            >
              Purchase Cart ({cartItems.length})
            </button>
            <button
              onClick={() => setActiveTab('trade')}
              className={`font-bold text-sm pb-1 border-b-2 transition-all ${
                activeTab === 'trade'
                  ? 'text-orange-600 border-orange-500'
                  : 'text-slate-400 border-transparent hover:text-slate-700'
              }`}
            >
              Trade Requests (2)
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 flex-1">
          {activeTab === 'trade' ? (
            /* Trade Cart List (Page 79) */
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                PENDING TRADE NEGOTIATIONS
              </h4>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1591088398332-8a7791972843?w=120&auto=format&fit=crop&q=80"
                    alt="Stroller"
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <h5 className="font-bold text-sm text-slate-900">Joie Tourist Signature Auto Fold</h5>
                    <p className="text-xs text-orange-600 font-semibold mt-0.5">
                      Seller hasn’t replied to your trade request.
                    </p>
                    <span className="text-[11px] text-slate-400">Waiting for @tokomama</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=120&auto=format&fit=crop&q=80"
                    alt="Bag"
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <h5 className="font-bold text-sm text-slate-900">Tas Serut Smiggle Bola</h5>
                    <p className="text-xs text-cyan-600 font-semibold mt-0.5">
                      You have sent a trade request.
                    </p>
                    <span className="text-[11px] text-slate-400">Offered item: New Balance 237</span>
                  </div>
                </div>
              </div>
            </div>
          ) : step === 'checkout' ? (
            /* Checkout View (Pages 50-59) */
            <div className="space-y-6">
              <h4 className="font-bold text-base text-slate-900">Checkout Details</h4>

              {/* Delivery Address */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold uppercase text-slate-400">Alamat Pengiriman</span>
                <p className="text-xs font-bold text-slate-800">Iah Sopiah (0817-423-5269)</p>
                <p className="text-xs text-slate-600">
                  Komplek Permata Sari Blok A No. 5, Bojong Kenyot, Jawa Barat 14320
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase text-slate-400">Metode Pembayaran</span>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setSelectedPayment('qris')}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                      selectedPayment === 'qris'
                        ? 'border-orange-500 bg-orange-50 text-orange-700 font-bold'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <QrCode className="w-5 h-5" />
                    <span className="text-xs">QRIS / e-Wallet</span>
                  </button>

                  <button
                    onClick={() => setSelectedPayment('va')}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                      selectedPayment === 'va'
                        ? 'border-orange-500 bg-orange-50 text-orange-700 font-bold'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs">Virtual Account</span>
                  </button>

                  <button
                    onClick={() => setSelectedPayment('cod')}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                      selectedPayment === 'cod'
                        ? 'border-orange-500 bg-orange-50 text-orange-700 font-bold'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <ArrowRightLeft className="w-5 h-5" />
                    <span className="text-xs">COD / Meet-up</span>
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal ({cartItems.length} produk)</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Biaya Pengiriman / Kurir</span>
                  <span>Rp {shippingFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Pembayaran</span>
                  <span className="text-orange-600">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep('cart')}
                  className="flex-1 py-3 rounded-full border border-slate-300 text-xs font-bold text-slate-700"
                >
                  Kembali
                </button>
                <button
                  onClick={handleProcessPayment}
                  className="flex-1 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/20"
                >
                  Bayar Sekarang
                </button>
              </div>
            </div>
          ) : step === 'success' ? (
            /* Success View */
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-heading text-slate-900">
                Pesanan Berhasil Dibuat!
              </h4>
              <p className="text-xs text-slate-500 max-w-sm">
                Terima kasih telah berbelanja di TinyTrade. Penjual sedang menyiapkan barang si kecil Anda.
              </p>
              <button
                onClick={() => {
                  setStep('cart');
                  onClose();
                }}
                className="px-8 py-3 rounded-full bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 shadow-md"
              >
                Selesai
              </button>
            </div>
          ) : (
            /* Standard Cart Items View (Page 48-49) */
            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <ShoppingBag className="w-12 h-12 mx-auto text-slate-300" />
                  <p className="font-semibold text-sm">Keranjang Anda masih kosong</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-14 h-14 rounded-xl object-cover"
                          />
                          <div>
                            <h5 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                              {item.title}
                            </h5>
                            <p className="text-xs font-bold text-orange-600 mt-0.5">
                              Rp {item.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-slate-200 rounded-full bg-white px-2 py-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="p-1 text-slate-500 hover:text-orange-500"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-2">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="p-1 text-slate-500 hover:text-orange-500"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal</span>
                      <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-100">
                      <span>Estimasi Total</span>
                      <span className="text-orange-600">Rp {subtotal.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs tracking-wider uppercase shadow-md shadow-orange-500/20 active:scale-98 transition-all"
                  >
                    Lanjut ke Checkout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
