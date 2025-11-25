import React from "react";
import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Icon } from "./components/UI";

// Pages
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import TransactionList from "./pages/TransactionList";
import Reports from "./pages/Reports";
import TransactionDetail from "./pages/TransactionDetail";
import Settings from "./pages/Settings";
import NewTransaction from "./pages/NewTransaction";

// Temporary Placeholder Pages for completeness
const Login = () => <div className="p-10 text-center"><h1>Login Page</h1><Link to="/dashboard" className="text-primary underline">Go to Dashboard</Link></div>;
const Plans = () => <div className="p-10 text-center"><h1>Debt Plans</h1><p className="text-muted-foreground">Avalanche & Snowball strategies go here.</p></div>;

function BottomNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  // Only show on main tabs
  const showNav = ["/dashboard", "/plans", "/reports", "/settings"].includes(location.pathname);
  if (!showNav) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background/90 backdrop-blur-lg pb-safe pt-2 z-10">
      <div className="flex justify-around pb-2">
        {[
          { path: "/dashboard", icon: "dashboard", label: "Dashboard" },
          { path: "/plans", icon: "credit_score", label: "Plans" },
          { path: "/reports", icon: "insights", label: "Reports" },
          { path: "/settings", icon: "settings", label: "Settings" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 p-2 transition-colors ${
              isActive(item.path) ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon name={item.icon} className={isActive(item.path) ? "filled" : ""} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="mx-auto max-w-md bg-background min-h-screen text-foreground relative shadow-2xl overflow-hidden">
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/transaction/new" element={<NewTransaction />} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
          <Route path="/card/:id" element={<TransactionList />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}