export type Category = 
  | 'Food & Drinks'
  | 'Transportation'
  | 'Shopping'
  | 'Entertainment'
  | 'Health'
  | 'Utilities'
  | 'Others';

export interface Purchase {
  id: string;
  name: string;
  amount: number;
  category: Category;
  date: string;
}

export interface Budget {
  amount: number;
  period: 'monthly';
}

export interface ShoppingData {
  budget: Budget;
  purchases: Purchase[];
}
