import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Icon } from "../components/UI";

export default function TransactionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background/80 px-4 py-3 backdrop-blur-sm border-b border-border/40">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
          <Icon name="arrow_back" />
        </Button>
        <h1 className="text-lg font-bold">Transaction Details</h1>
        <button className="text-sm font-bold text-primary px-2">Help</button>
      </header>

      <main className="flex-1 p-4 space-y-6 pb-32">
        {/* Hero */}
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-secondary overflow-hidden shadow-sm">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRe7eHg_U56_uz_IGHGkilnMdsjcGF_KMQShJ2vcwoKCQTvkORQ-WA3QY2NAof9cGN7mtzVA9zv1tfI2FDhv6rDMZD2lia1Nv8alwbzkUEpeSnGJCWOYAtpYo03n2EWVZCL_WoW6bBMiZZLArTlTrkRsewxnGxnpgtecXLT4qCsab33TDUyrmZxHJ5EufEwmpKP0mqttlxWEwHAdDOlfQbk--S73VUpEaBaFOgo0iKYaQSdzKWQYo9hnvlZEraLr3kWX34wvPAwgM" alt="Merchant" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-orange-400 border-2 border-background text-white shadow-sm">
              <Icon name="restaurant" className="text-sm" />
            </div>
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-4xl font-bold tracking-tighter">-$42.50</h2>
            <p className="text-muted-foreground font-medium">The Coffee Shop</p>
          </div>
        </div>

        {/* Details Card */}
        <Card className="p-0 overflow-hidden border border-border/50 shadow-sm">
            <div className="flex items-center gap-4 p-4 border-b border-border/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon name="check_circle" className="text-[20px]" />
                </div>
                <div className="flex-1 flex justify-between items-center">
                    <span className="text-muted-foreground text-sm font-medium">Status</span>
                    <span className="font-bold">Posted</span>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 border-b border-border/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon name="calendar_month" className="text-[20px]" />
                </div>
                <div className="flex-1 flex justify-between items-center">
                    <span className="text-muted-foreground text-sm font-medium">Date & Time</span>
                    <span className="font-bold">Oct 26, 4:30 PM</span>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon name="credit_card" className="text-[20px]" />
                </div>
                <div className="flex-1 flex justify-between items-center">
                    <span className="text-muted-foreground text-sm font-medium">Card Used</span>
                    <span className="font-bold">Visa •••• 1234</span>
                </div>
            </div>
        </Card>

        {/* Location */}
        <div className="space-y-3">
            <h3 className="font-bold text-lg px-1">Location</h3>
            <div className="rounded-2xl overflow-hidden h-48 bg-secondary relative shadow-sm border border-border/50">
                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCuMk-V2qmEkgBXKG8Sydsfa3GF1YjZF72BsD_ezzAk9uANSHAyoXqioDJyiWHR5o-6XTiBMaROmkeknBf6YTZ2E1F8mI4p8e0TzKrB__gmopP1DRtMM1N_3E0vgk4GoGzI0U1ikkMqN1hChRJrzRlRnpxKLOf5HDlIZk3-dCnhTwDdWWCeMsC_Xpy0-dhvC3zl6FTrS_ziyWVeTWjvjhqxsrTyWn9aPCAm2YSt19LHKFoIFWsd5sXR1RhoPvkrB5of5bfYTHDsoQ" alt="Map" className="w-full h-full object-cover" />
            </div>
        </div>

        {/* Notes */}
        <div className="space-y-3">
            <h3 className="font-bold text-lg px-1">Notes</h3>
            <Card className="p-4 flex justify-between items-start bg-card border border-border/50 shadow-sm">
                <div className="space-y-1 pr-4">
                    <p className="font-bold text-base">Business Lunch</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">This was a business lunch with the design team to discuss the new project.</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-3 text-primary bg-primary/10 hover:bg-primary/20 hover:text-primary font-bold rounded-lg">Edit</Button>
            </Card>
        </div>

        <div className="flex justify-center pt-6">
            <button className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                Report an issue with this transaction
            </button>
        </div>
      </main>

      {/* Footer Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t flex gap-4 shadow-lg z-20">
        <Button variant="outline" className="flex-1 h-14 text-base rounded-2xl border-border font-bold hover:bg-secondary">Change Category</Button>
        <Button className="flex-1 h-14 text-base rounded-2xl font-bold shadow-primary/25 shadow-lg">Add Note</Button>
      </div>
    </div>
  );
}