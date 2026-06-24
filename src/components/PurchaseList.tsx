import { Purchase } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Trash2, ShoppingBag } from 'lucide-react';
import { format } from 'date-fns';

interface PurchaseListProps {
  purchases: Purchase[];
  onRemove: (id: string) => void;
}

export function PurchaseList({ purchases, onRemove }: PurchaseListProps) {
  if (purchases.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <ShoppingBag className="h-12 w-12 mb-4 opacity-20" />
          <p className="text-lg font-medium mb-1">No purchases yet</p>
          <p className="text-sm text-center max-w-xs">
            Head to the <span className="font-medium">Budget</span> tab to add your first purchase and start tracking your spending.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recent Purchases</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {purchases.map((purchase) => (
            <div
              key={purchase.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex flex-col">
                <span className="font-medium">{purchase.name}</span>
                <span className="text-xs text-muted-foreground">
                  {purchase.category} • {format(new Date(purchase.date), 'MMM d, h:mm a')}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-primary">${purchase.amount.toFixed(2)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => onRemove(purchase.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
