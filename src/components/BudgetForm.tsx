import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Budget } from '../types';

interface BudgetFormProps {
  currentBudget: Budget;
  onSetBudget: (budget: Budget) => void;
}

export function BudgetForm({ currentBudget, onSetBudget }: BudgetFormProps) {
  const [amount, setAmount] = useState<string>(currentBudget.amount > 0 ? currentBudget.amount.toString() : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error('Please enter a valid budget amount');
      return;
    }

    onSetBudget({
      amount: numericAmount,
      period: 'monthly',
    });
    toast.success('Budget updated successfully');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">🎯 Monthly Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Set your limit</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-muted-foreground">$</span>
              <Input
                type="number"
                step="0.01"
                placeholder="Enter budget amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <Button type="submit">Update</Button>
        </form>
      </CardContent>
    </Card>
  );
}
