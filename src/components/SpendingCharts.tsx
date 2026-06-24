import { Purchase, Category } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { BarChart3 } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

interface SpendingChartsProps {
  purchases: Purchase[];
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#82ca9d',
  '#ffc658',
];

export function SpendingCharts({ purchases }: SpendingChartsProps) {
  // Aggregate data by category
  const categoryData = purchases.reduce((acc, purchase) => {
    const existing = acc.find((d) => d.name === purchase.category);
    if (existing) {
      existing.value += purchase.amount;
    } else {
      acc.push({ name: purchase.category, value: purchase.amount });
    }
    return acc;
  }, [] as { name: Category; value: number }[]);

  // Aggregate data by day (last 7 days for example or all)
  const dailyData = purchases.reduce((acc, purchase) => {
    const day = new Date(purchase.date).toLocaleDateString();
    const existing = acc.find((d) => d.day === day);
    if (existing) {
      existing.amount += purchase.amount;
    } else {
      acc.push({ day, amount: purchase.amount });
    }
    return acc;
  }, [] as { day: string; amount: number }[]).slice(-7); // Keep last 7 days with data

  if (purchases.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <BarChart3 className="h-12 w-12 mb-4 opacity-20" />
          <p className="text-lg font-medium mb-1">No spending data yet</p>
          <p className="text-sm">Add purchases to see your spending analytics here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Spending Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <XAxis dataKey="day" hide />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
