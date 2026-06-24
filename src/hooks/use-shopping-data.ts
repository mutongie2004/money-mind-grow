import { useState, useEffect } from 'react';
import { ShoppingData, Purchase, Budget } from '../types';

const STORAGE_KEY = 'shopping_tracker_data';

const DEFAULT_DATA: ShoppingData = {
  budget: { amount: 0, period: 'monthly' },
  purchases: [],
};

export function useShoppingData() {
  const [data, setData] = useState<ShoppingData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse shopping data', e);
        return DEFAULT_DATA;
      }
    }
    return DEFAULT_DATA;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const setBudget = (budget: Budget) => {
    setData((prev) => ({ ...prev, budget }));
  };

  const addPurchase = (purchase: Purchase) => {
    setData((prev) => ({
      ...prev,
      purchases: [purchase, ...prev.purchases],
    }));
  };

  const removePurchase = (id: string) => {
    setData((prev) => ({
      ...prev,
      purchases: prev.purchases.filter((p) => p.id !== id),
    }));
  };

  const totalSpent = data.purchases.reduce((acc, p) => acc + p.amount, 0);
  const remainingBudget = data.budget.amount - totalSpent;

  return {
    data,
    setBudget,
    addPurchase,
    removePurchase,
    totalSpent,
    remainingBudget,
  };
}
