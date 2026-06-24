import { ShoppingData } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Lightbulb, TrendingUp, Info } from 'lucide-react';

interface InsightsProps {
  data: ShoppingData;
  totalSpent: number;
  remainingBudget: number;
}

export function Insights({ data, totalSpent, remainingBudget }: InsightsProps) {
  const getFeedback = () => {
    const tips: string[] = [];
    
    if (totalSpent === 0) return ["Start adding your purchases to get personalized insights!"];

    if (data.budget.amount === 0) {
      return ["💡 Set a monthly budget to get personalized saving tips and track your progress."];
    }

    const budgetUtilization = (totalSpent / data.budget.amount) * 100;

    if (budgetUtilization > 100) {
      tips.push("⚠️ You have exceeded your budget! Consider reviewing your 'Shopping' or 'Others' categories for potential cuts.");
    } else if (budgetUtilization > 80) {
      tips.push("🟡 You're close to your budget limit. Try to defer non-essential purchases until next month.");
    } else {
      tips.push("✅ Great job staying within your budget so far!");
    }

    // Category specific feedback
    const categoryTotals = data.purchases.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + p.amount;
      return acc;
    }, {} as Record<string, number>);

    if ((categoryTotals['Food & Drinks'] || 0) > totalSpent * 0.4) {
      tips.push("🍔 Your 'Food & Drinks' spending is quite high (over 40%). Try meal prepping to save more.");
    }

    if ((categoryTotals['Shopping'] || 0) > totalSpent * 0.3) {
      tips.push("🛍️ Consider waiting 24 hours before making purchases in the 'Shopping' category to avoid impulse buys.");
    }

    return tips;
  };

  const getInvestmentSuggestions = () => {
    if (remainingBudget <= 0) return ["Stay focused on managing your current expenses before looking into investments."];

    const suggestions = [];
    if (remainingBudget < 50) {
      suggestions.push("💰 Low Risk: Put your change into a high-yield savings account.");
    } else if (remainingBudget < 200) {
      suggestions.push("📈 Moderate Risk: Invest in a diversified Index Fund or ETF.");
    } else {
      suggestions.push("🚀 Diversified: Consider splitting your surplus between Blue-chip stocks and a Roth IRA.");
    }
    
    suggestions.push("✨ Micro-investing: Use apps that round up your purchases to the nearest dollar.");

    return suggestions;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-500" />
            Saving Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {getFeedback().map((tip, i) => (
              <li key={i} className="text-sm flex gap-2">
                <span className="shrink-0">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Invest Your Change
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200/50 dark:border-emerald-800/30">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              Surplus available: ${Math.max(0, remainingBudget).toFixed(2)}
            </p>
          </div>
          <ul className="space-y-3">
            {getInvestmentSuggestions().map((suggestion, i) => (
              <li key={i} className="text-sm flex gap-2">
                <span className="shrink-0">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider">
            <Info className="h-3 w-3" />
            Not financial advice
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
