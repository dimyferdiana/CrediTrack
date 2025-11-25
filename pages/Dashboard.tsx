import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Icon, ProgressBar } from "../components/UI";
import { Card as CreditCardType } from "../types";

// Mock Data
const cards: CreditCardType[] = [
  {
    id: "1",
    name: "Chase Sapphire",
    last4: "1234",
    balance: 1250,
    limit: 5000,
    dueDate: "Oct 25th",
    minPayment: 50,
    color: "text-amber-500",
    icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1_-gE6R_861C3640crqP3IoUzsSG9hZXmhCVD8GFLI9shuINSSZvEO_v_fANvYVIkjNq33e-NNhSgTbNAMv1ljZjNAwffl_ac3RCEd1tqHyZJ8xJIojPF_zcMHiCHJuapn8n3tF3cFTyjUdisiZaKDljimqlaW3bLvY52iPxNEiQsDCjRKmptuUOESQVes2rVPfzdRUvP8sQFH7W1a-0u-X99_cJxd0bQrS29g4KvGtq_8PQtH2QLwpnU1ClxQg7E1VOxhDepOzg"
  },
  {
    id: "2",
    name: "Amex Gold",
    last4: "5678",
    balance: 7500,
    limit: 8500,
    dueDate: "Oct 15th",
    minPayment: 250,
    color: "text-red-500",
    icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7U0oh3kmqqDdUWFBYr8g2b7_ZrMeiDsRwnfHixwfS6UUrUld_iSgwT8aay9fHCYHQg3h6B21cmOdEaxX8eHQaHrjXHR7PJhL5VC3O6CH111oX6bC-VyblL8dSgWCCKbscfmk2DB9Pcex2gzY0EOiV1LUdvSwHuApdurKFqh99xNbkEA7hGlND9uNvhVLs2Sx-8tppjj0Yq5NDuW7a3sIMdtE-Jxa0q4XXsb1hN_Sz1pnCIvHwbTDD5feHw4AlZL9z_Tun5LdfOVk"
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);
  const totalLimit = cards.reduce((sum, card) => sum + card.limit, 0);
  const utilization = Math.round((totalBalance / totalLimit) * 100);

  return (
    <div className="flex flex-col gap-6 p-4 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-secondary">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb1Et40NGug7ARf2UlVaPtzbzgmIs51wl18Pz8NP1bxty9a_j1ilVBj9Q-MeqSw6w7ycBQXdJw5qhOayOK2Xkvvn82lceZi5EUW509JM43x5XwPIYmfQJJEU2u4ksjhzInV0IyoTVDR7ZDp0A9LjMajLDSUsAAwRc-MfBQqqJPN85vk8LDnhHzwwTYl4vIG4y2RQWnFnqIOC_-IIl6OPcgGABrKjojVd_gjjAWvkvpXHLcgB1Pdj6fxsquyPLLQeRuFJa5aGKIbRs" alt="Profile" className="h-full w-full object-cover" />
          </div>
          <span className="text-2xl font-bold">Good morning, Alex!</span>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-secondary/20" onClick={() => navigate('/notifications')}>
          <Icon name="notifications" />
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="p-6 bg-secondary/30 border-none">
        <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
        <h2 className="mb-4 text-4xl font-bold tracking-tight">${totalBalance.toLocaleString()}.00</h2>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Overall Credit Utilization</span>
            <span className={`font-bold ${utilization > 30 ? 'text-amber-500' : 'text-green-500'}`}>{utilization}%</span>
          </div>
          <ProgressBar value={utilization} colorClass={utilization > 50 ? "bg-amber-500" : "bg-primary"} />
          <p className="text-xs text-muted-foreground">${totalBalance.toLocaleString()} of ${totalLimit.toLocaleString()} used</p>
        </div>
      </Card>

      {/* Cards List */}
      <section>
        <h3 className="mb-4 text-xl font-bold">Your Cards</h3>
        <div className="space-y-4">
          {cards.map((card) => (
            <Card key={card.id} className="flex flex-col gap-3 p-4 bg-secondary/10" onClick={() => navigate(`/card/${card.id}`)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={card.icon} alt={card.name} className="h-6 w-auto" />
                  <span className="font-medium">{card.name}</span>
                </div>
                <span className="font-mono text-sm text-muted-foreground">**** {card.last4}</span>
              </div>
              
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className={`font-bold ${card.color}`}>${card.balance.toLocaleString()}</span>
                  <span className="text-muted-foreground">/ ${card.limit.toLocaleString()}</span>
                </div>
                <ProgressBar 
                  value={(card.balance / card.limit) * 100} 
                  colorClass={card.color.replace('text-', 'bg-')} 
                />
              </div>

              <div className="flex justify-between border-t pt-3 text-sm">
                <span className="text-muted-foreground">Min. Payment</span>
                <span className="font-bold">${card.minPayment} due {card.dueDate}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Payments */}
      <section>
        <h3 className="mb-4 text-xl font-bold">Upcoming Payments</h3>
        <Card className="p-0 overflow-hidden">
          {cards.map((card, i) => (
            <div key={card.id} className={`flex items-center justify-between p-4 ${i !== cards.length-1 ? 'border-b' : ''}`}>
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.color.replace('text-', 'bg-')}/10`}>
                  <Icon name="calendar_month" className={card.color} />
                </div>
                <div>
                  <p className="font-bold">{card.name}</p>
                  <p className="text-xs text-muted-foreground">Due {card.dueDate}</p>
                </div>
              </div>
              <span className={`font-bold text-lg ${card.color}`}>${card.minPayment.toFixed(2)}</span>
            </div>
          ))}
        </Card>
      </section>
      
      {/* FAB */}
      <div className="fixed bottom-24 right-4">
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg" onClick={() => navigate('/transaction/new')}>
          <Icon name="add" className="text-3xl" />
        </Button>
      </div>
    </div>
  );
}
