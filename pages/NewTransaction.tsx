import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon, Input } from "../components/UI";

const CATEGORIES = [
  { value: "food", label: "Food & Drink" },
  { value: "shopping", label: "Shopping" },
  { value: "transport", label: "Transport" },
  { value: "utilities", label: "Utilities" },
  { value: "entertainment", label: "Entertainment" },
  { value: "groceries", label: "Groceries" },
  { value: "health", label: "Health" },
];

const MERCHANT_CATEGORIES: Record<string, string> = {
  "starbucks": "food",
  "uber": "transport",
  "amazon": "shopping",
  "netflix": "entertainment",
  "shell": "transport",
  "whole foods": "groceries",
};

const ICONS = [
  "storefront", "restaurant", "local_cafe", "shopping_bag", "directions_car", 
  "local_gas_station", "movie", "flight", "fitness_center", "pets", 
  "school", "local_hospital", "home", "work", "checkroom"
];

export default function NewTransaction() {
  const navigate = useNavigate();
  
  // Form State
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [merchantName, setMerchantName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [transactionType, setTransactionType] = useState<"credit" | "debit">("debit");
  const [selectedIcon, setSelectedIcon] = useState("storefront");
  const [receiptImage, setReceiptImage] = useState<string | null>(null);

  // UI State
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [iconSearch, setIconSearch] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-suggest category based on merchant
  useEffect(() => {
    const lowerName = merchantName.toLowerCase();
    for (const [key, cat] of Object.entries(MERCHANT_CATEGORIES)) {
      if (lowerName.includes(key)) {
        setCategory(cat);
        break;
      }
    }
  }, [merchantName]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (!merchantName.trim()) newErrors.merchant = "Merchant name is required";
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (!category) newErrors.category = "Please select a category";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Logic to save transaction would go here
    navigate(-1);
  };

  const filteredIcons = ICONS.filter(icon => icon.includes(iconSearch.toLowerCase()));

  return (
    <div className="flex h-screen flex-col bg-background text-foreground relative">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background/80 p-4 backdrop-blur-sm border-b border-border/50">
        <div className="w-10" />
        <h1 className="text-lg font-bold">New Transaction</h1>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => navigate(-1)}>
          <Icon name="close" />
        </Button>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        
        {/* Transaction Type Toggle */}
        <div className="flex rounded-xl bg-secondary/50 p-1">
          <button
            type="button"
            onClick={() => setTransactionType("credit")}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
              transactionType === "credit"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Credit
          </button>
          <button
            type="button"
            onClick={() => setTransactionType("debit")}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
              transactionType === "debit"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Debit
          </button>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">$</span>
            <Input 
              type="number" 
              placeholder="0.00" 
              className={`pl-8 text-2xl font-bold h-16 ${errors.amount ? "border-destructive focus-visible:ring-destructive" : ""}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          {errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
        </div>

        {/* Merchant with Icon Picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Merchant Name</label>
          <div className="flex gap-2">
            <button 
              type="button"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-input bg-secondary hover:bg-secondary/80 transition-colors"
              onClick={() => setShowIconPicker(true)}
            >
              <Icon name={selectedIcon} className="text-primary" />
            </button>
            <div className="flex-1">
              <Input 
                placeholder="Enter merchant name" 
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
                className={errors.merchant ? "border-destructive focus-visible:ring-destructive" : ""}
              />
            </div>
          </div>
          {errors.merchant && <p className="text-xs text-destructive">{errors.merchant}</p>}
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Transaction Date</label>
          <div className="relative">
              <Input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pr-10 appearance-none" 
              />
              <Icon name="calendar_today" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Category</label>
          <div className="relative">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`flex h-14 w-full appearance-none rounded-xl border border-input bg-secondary px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-foreground ${errors.category ? "border-destructive focus-visible:ring-destructive" : ""}`}
            >
              <option value="" disabled>Select a category</option>
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <Icon name="expand_more" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
        </div>

        {/* Receipt Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Receipt</label>
          <div 
            className="relative flex min-h-[100px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-input bg-secondary/30 hover:bg-secondary/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {receiptImage ? (
              <img src={receiptImage} alt="Receipt" className="h-40 w-full object-contain rounded-xl" />
            ) : (
              <div className="flex flex-col items-center gap-2 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm">
                  <Icon name="add_a_photo" className="text-muted-foreground" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Add photo of receipt</span>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          {receiptImage && (
             <button 
               type="button"
               onClick={(e) => { e.stopPropagation(); setReceiptImage(null); }}
               className="text-xs text-destructive font-medium hover:underline"
             >
               Remove receipt
             </button>
          )}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Notes (Optional)</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="flex min-h-[100px] w-full rounded-xl border border-input bg-secondary px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none text-foreground"
            placeholder="Add a note..."
          />
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 border-t border-border bg-background p-4 pb-safe">
        <div className="flex gap-4">
          <Button variant="secondary" className="flex-1 h-12 bg-secondary hover:bg-secondary/80" onClick={() => navigate(-1)}>Cancel</Button>
          <Button className="flex-1 h-12" onClick={handleSave}>Save</Button>
        </div>
      </div>

      {/* Icon Picker Modal */}
      {showIconPicker && (
        <div className="absolute inset-0 z-50 flex flex-col bg-background">
          <div className="flex items-center gap-2 p-4 border-b border-border/50">
            <div className="relative flex-1">
              <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search icons..." 
                className="pl-9 h-10" 
                value={iconSearch}
                onChange={(e) => setIconSearch(e.target.value)}
                autoFocus
              />
            </div>
            <Button variant="ghost" onClick={() => setShowIconPicker(false)}>Cancel</Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-5 gap-4">
              {filteredIcons.map(icon => (
                <button
                  key={icon}
                  onClick={() => { setSelectedIcon(icon); setShowIconPicker(false); }}
                  className={`aspect-square flex items-center justify-center rounded-xl border transition-all ${selectedIcon === icon ? "border-primary bg-primary/10 text-primary" : "border-border bg-card hover:bg-secondary"}`}
                >
                  <Icon name={icon} className="text-2xl" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
