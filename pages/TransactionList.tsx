
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Icon, Input } from "../components/UI";
import { Transaction } from "../types";

const transactions: Transaction[] = [
  { id: "1", merchant: "Payment Received", date: "Oct 28", amount: 500.00, category: "Credit", type: "credit", icon: "north_east" },
  { id: "2", merchant: "Starbucks", date: "Oct 26", amount: 5.75, category: "Food & Drink", type: "debit", icon: "coffee" },
  { id: "3", merchant: "Amazon.com", date: "Oct 25", amount: 42.99, category: "Shopping", type: "debit", icon: "shopping_bag" },
  { id: "4", merchant: "Spotify", date: "Oct 24", amount: 10.99, category: "Entertainment", type: "debit", icon: "music_note" },
];

export default function TransactionList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Platinum Card");

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md p-4 space-y-4 border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate("/dashboard")}>
            <Icon name="arrow_back" />
          </Button>
          <h1 className="flex-1 text-center text-lg font-bold">Transactions</h1>
          <div className="w-10" />
        </div>

        <div className="flex rounded-xl bg-secondary/50 p-1">
          {["Platinum Card", "Cashback Rewards"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-lg py-1.5 text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by merchant name" className="pl-10 rounded-xl bg-secondary/30 border-none" />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            Active Filters: 2
          </div>
          {["Date Range", "Category", "Amount"].map((filter) => (
            <button key={filter} className="flex shrink-0 items-center gap-1 rounded-full bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              {filter} <Icon name="keyboard_arrow_down" className="text-base" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-28 space-y-2">
        {transactions.map((tx) => (
          <Card key={tx.id} className="flex items-center justify-between p-3 border-none bg-secondary/10" onClick={() => navigate(`/transaction/${tx.id}`)}>
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${tx.type === 'credit' ? 'bg-green-500/10 text-green-500' : 'bg-secondary text-foreground'}`}>
                <Icon name={tx.icon || "receipt"} />
              </div>
              <div>
                <p className="font-bold">{tx.merchant}</p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className={`font-bold ${tx.type === 'credit' ? 'text-green-500' : 'text-foreground'}`}>
                  {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">{tx.category}</p>
              </div>
              <Icon name="chevron_right" className="text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
