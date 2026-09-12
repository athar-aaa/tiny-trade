import React from 'react';
import { X, Check } from 'lucide-react';

interface PriceFilterProps {
  isOpen: boolean;
  onClose: () => void;
  minPrice: string;
  maxPrice: string;
  sortOrder: 'lowToHigh' | 'highToLow' | null;
  shipmentMethods: string[];
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  onSortOrderChange: (val: 'lowToHigh' | 'highToLow' | null) => void;
  onToggleShipment: (method: string) => void;
}

export const PriceFilterPopover: React.FC<PriceFilterProps> = ({
  isOpen,
  onClose,
  minPrice,
  maxPrice,
  sortOrder,
  shipmentMethods,
  onMinPriceChange,
  onMaxPriceChange,
  onSortOrderChange,
  onToggleShipment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 z-50 animate-fadeIn">
      {/* Price section */}
      <div className="space-y-4 mb-6">
        <h4 className="font-bold text-base text-slate-900">Price</h4>
        
        {/* Min Input */}
        <div className="flex items-center px-4 py-2.5 rounded-full border border-slate-300 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200 transition-all">
          <span className="text-sm font-semibold text-slate-500 mr-2">Rp</span>
          <input
            type="number"
            placeholder="Minimum"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="w-full text-sm outline-none text-slate-800 placeholder-slate-400 bg-transparent"
          />
        </div>

        {/* Max Input */}
        <div className="flex items-center px-4 py-2.5 rounded-full border border-slate-300 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200 transition-all">
          <span className="text-sm font-semibold text-slate-500 mr-2">Rp</span>
          <input
            type="number"
            placeholder="Maximum"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-full text-sm outline-none text-slate-800 placeholder-slate-400 bg-transparent"
          />
        </div>

        {/* Low to High Checkbox */}
        <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={sortOrder === 'lowToHigh'}
            onChange={() => onSortOrderChange(sortOrder === 'lowToHigh' ? null : 'lowToHigh')}
            className="w-4 h-4 rounded text-orange-500 focus:ring-orange-400 accent-orange-500 cursor-pointer"
          />
          <span>Low to High</span>
        </label>

        {/* High to Low Checkbox */}
        <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={sortOrder === 'highToLow'}
            onChange={() => onSortOrderChange(sortOrder === 'highToLow' ? null : 'highToLow')}
            className="w-4 h-4 rounded text-orange-500 focus:ring-orange-400 accent-orange-500 cursor-pointer"
          />
          <span>High to Low</span>
        </label>
      </div>

      {/* Shipment Method section */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <h4 className="font-bold text-base text-slate-900">Shipment Method</h4>

        {['Meet-up', 'Shipping', 'Drop Point'].map((method) => (
          <label key={method} className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={shipmentMethods.includes(method)}
              onChange={() => onToggleShipment(method)}
              className="w-4 h-4 rounded text-orange-500 focus:ring-orange-400 accent-orange-500 cursor-pointer"
            />
            <span>{method}</span>
          </label>
        ))}
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
        <button
          onClick={onClose}
          className="text-xs font-semibold px-4 py-1.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
        >
          Terapkan
        </button>
      </div>
    </div>
  );
};

interface ConditionFilterProps {
  isOpen: boolean;
  onClose: () => void;
  selectedConditions: string[];
  onToggleCondition: (cond: string) => void;
}

export const ConditionFilterPopover: React.FC<ConditionFilterProps> = ({
  isOpen,
  onClose,
  selectedConditions,
  onToggleCondition,
}) => {
  if (!isOpen) return null;

  const conditions = ['Brand New', 'Like New', 'Lightly Used', 'Well Used', 'Heavily Used'];

  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 z-50 animate-fadeIn">
      <h4 className="font-bold text-base text-slate-900 mb-4">Item Condition</h4>

      <div className="space-y-3.5">
        {conditions.map((cond) => (
          <label key={cond} className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedConditions.includes(cond)}
              onChange={() => onToggleCondition(cond)}
              className="w-4.5 h-4.5 rounded text-orange-500 focus:ring-orange-400 accent-orange-500 cursor-pointer"
            />
            <span>{cond}</span>
          </label>
        ))}
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
        <button
          onClick={onClose}
          className="text-xs font-semibold px-4 py-1.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
        >
          Terapkan
        </button>
      </div>
    </div>
  );
};

interface SearchSuggestionsProps {
  isOpen: boolean;
  onSelectTag: (tag: string) => void;
  onClose: () => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  isOpen,
  onSelectTag,
  onClose,
}) => {
  if (!isOpen) return null;

  const recent = ['vest anak', 'sepatu', 'jumpsuit', 'baju renang'];
  const popular = ['buku bayi', 'mainan', 'bawahan', 'buku balita'];

  return (
    <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 z-50 animate-fadeIn">
      {/* Recent Searches */}
      <div className="mb-5">
        <h5 className="font-bold text-sm text-slate-900 mb-3">Recent Searches</h5>
        <div className="flex flex-wrap gap-2.5">
          {recent.map((item) => (
            <button
              key={item}
              onClick={() => {
                onSelectTag(item);
                onClose();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-xs font-medium hover:border-orange-500 hover:text-orange-600 transition-all active:scale-95"
            >
              <span>{item}</span>
              <X className="w-3 h-3 text-slate-400 hover:text-red-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Popular Searches */}
      <div>
        <h5 className="font-bold text-sm text-slate-900 mb-3">Popular Searches</h5>
        <div className="flex flex-wrap gap-2.5">
          {popular.map((item) => (
            <button
              key={item}
              onClick={() => {
                onSelectTag(item);
                onClose();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 text-slate-700 text-xs font-medium hover:border-orange-500 hover:text-orange-600 transition-all active:scale-95"
            >
              <span>{item}</span>
              <X className="w-3 h-3 text-slate-400 hover:text-red-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
