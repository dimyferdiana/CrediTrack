export interface Transaction {
  id: string;
  merchant: string;
  date: string;
  amount: number;
  category: string;
  type: "credit" | "debit";
  icon?: string;
  status?: "Posted" | "Pending";
}

export interface Card {
  id: string;
  name: string;
  last4: string;
  balance: number;
  limit: number;
  dueDate: string;
  minPayment: number;
  color: string;
  icon?: string;
  bgImage?: string;
}

export interface BudgetCategory {
  name: string;
  spent: number;
  limit: number;
  icon: string;
  color: string;
}
