import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Button, Card, Icon, ProgressBar } from "../components/UI";

const spendingData = [
  { name: "Groceries", value: 493.82, color: "#3b82f6" },
  { name: "Shopping", value: 308.64, color: "#f59e0b" },
  { name: "Restaurants", value: 185.18, color: "#ef4444" },
  { name: "Transport", value: 123.46, color: "#22c55e" },
];

export default function Reports() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-background pb-24">
      <div className="p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <Icon name="arrow_back" />
        </Button>
        <h1 className="text-lg font-bold">Reports</h1>
        <Button variant="ghost" size="icon">
          <Icon name="more_vert" />
        </Button>
      </div>

      <div className="px-4 pb-4">
        <div className="flex rounded-full bg-secondary p-1">
          <button className="flex-1 rounded-full bg-primary py-1.5 text-sm font-bold text-primary-foreground shadow">Weekly</button>
          <button className="flex-1 rounded-full py-1.5 text-sm font-medium text-muted-foreground">Monthly</button>
          <button className="flex-1 rounded-full py-1.5 text-sm font-medium text-muted-foreground">Yearly</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-6">
        <Card className="p-6 bg-secondary/10 border-none">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Spending by Category</h2>
            <span className="text-xs text-muted-foreground">Oct 1-7</span>
          </div>
          
          <div className="h-48 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-muted-foreground">Total Spent</span>
              <span className="text-2xl font-bold">$1,234</span>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {spendingData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-bold">${item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-secondary/10 border-none">
          <h2 className="font-bold text-lg mb-4">Budget vs. Actual</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Budget</span>
                <span className="text-muted-foreground">$1,234 / $2,000</span>
              </div>
              <ProgressBar value={61} colorClass="bg-primary" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Groceries</span>
                <span className="text-muted-foreground">$493 / $500</span>
              </div>
              <ProgressBar value={98} colorClass="bg-red-500" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Shopping</span>
                <span className="text-muted-foreground">$308 / $600</span>
              </div>
              <ProgressBar value={51} colorClass="bg-amber-500" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
