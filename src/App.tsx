import { ShoppingBag, Wallet, PieChart as ChartIcon, History, Lightbulb, AlertTriangle } from 'lucide-react';
import { useShoppingData } from './hooks/use-shopping-data';
import { BudgetForm } from './components/BudgetForm';
import { PurchaseForm } from './components/PurchaseForm';
import { PurchaseList } from './components/PurchaseList';
import { SpendingCharts } from './components/SpendingCharts';
import { Insights } from './components/Insights';
import { Progress } from './components/ui/progress';
import { Toaster } from './components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

function App() {
  const { data, setBudget, addPurchase, removePurchase, totalSpent, remainingBudget } = useShoppingData();

  const budgetUtilization = data.budget.amount > 0 
    ? Math.min((totalSpent / data.budget.amount) * 100, 100) 
    : 0;

  const isOverBudget = totalSpent > data.budget.amount && data.budget.amount > 0;

  const hasBudget = data.budget.amount > 0;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 text-foreground pb-12">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">SpentWise</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Summary Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 p-6 bg-background border rounded-2xl shadow-sm space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {hasBudget ? 'Budget Progress' : 'Set a Budget to Get Started'}
                </p>
                <h2 className="text-2xl font-bold">
                  ${totalSpent.toFixed(2)}{' '}
                  <span className="text-sm font-normal text-muted-foreground">
                    {hasBudget ? `of $${data.budget.amount.toFixed(2)}` : 'spent'}
                  </span>
                </h2>
              </div>
              <div className={`text-sm font-bold flex items-center gap-1 ${isOverBudget ? 'text-destructive' : hasBudget ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                {isOverBudget ? <><AlertTriangle className="h-4 w-4" /> Over Budget!</> : hasBudget ? `${(100 - budgetUtilization).toFixed(1)}% Left` : 'No budget set'}
              </div>
            </div>
            <Progress 
              value={budgetUtilization} 
              className={`h-3 ${isOverBudget ? '[&>[data-slot=progress-indicator]]:bg-destructive' : '[&>[data-slot=progress-indicator]]:bg-emerald-500'}`}
            />
          </div>

          <div className="p-6 bg-background border rounded-2xl shadow-sm flex flex-col justify-center">
            <p className="text-sm font-medium text-muted-foreground mb-1">Available Change</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold ${remainingBudget < 0 ? 'text-destructive' : hasBudget ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                ${Math.max(0, remainingBudget).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="dashboard" className="gap-2">
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">Budget</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <ChartIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Stats</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="gap-2">
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Tips</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BudgetForm currentBudget={data.budget} onSetBudget={setBudget} />
              <PurchaseForm onAddPurchase={addPurchase} />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <SpendingCharts purchases={data.purchases} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <PurchaseList purchases={data.purchases} onRemove={removePurchase} />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Insights data={data} totalSpent={totalSpent} remainingBudget={remainingBudget} />
          </TabsContent>
        </Tabs>
      </main>

      <Toaster position="top-center" />
    </div>
  );
}

export default App;
