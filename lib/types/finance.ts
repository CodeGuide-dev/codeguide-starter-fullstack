export interface Asset {
  id: string;
  userId: string;
  name: string;
  description?: string;
  value: number;
  currency: string;
  purchaseDate?: Date;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Investment {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type?: string;
  quantity: number;
  purchasePrice: number;
  currentValue?: number;
  purchaseDate: Date;
  currentPrice?: number;
  currency: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  id: string;
  userId: string;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  date: Date;
  category?: string;
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Income {
  id: string;
  userId: string;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  date: Date;
  category?: string;
  frequency?: string;
  createdAt: Date;
  updatedAt: Date;
}