# Shopping Tracking App Plan

A comprehensive application for tracking purchases, managing budgets, and receiving financial feedback.

## Scope Summary
- **Budget Management:** Set and track a monthly or total budget.
- **Purchase Tracking:** Add, edit, and delete items with categories, price, and date.
- **Spending Analytics:** Visualizations (charts) of spending habits.
- **Financial Feedback:** Automated tips on saving based on spending patterns.
- **Investment Suggestions:** Recommendations on where to invest "change" (savings/unspent budget).
- **Persistence:** Local storage only (no database).

## Non-Goals
- Real bank integration/syncing.
- Multi-user support/Cloud sync.
- Real-time stock market tracking for investments.

## Assumptions & Open Questions
- **Assumption:** The app will use `localStorage` for data persistence.
- **Assumption:** "Invest your change" refers to the surplus from the budget or small round-ups from purchases.
- **Question:** Are there specific investment categories preferred (e.g., ETFs, Savings Accounts, Crypto)? (Defaulting to general low-to-high risk categories).

## Affected Areas
- **State Management:** React hooks (useState, useEffect) for managing budget and purchase list.
- **Components:** Dashboard, Purchase Form, Analytics Charts, Budget Progress, Savings Insights.
- **Styling:** Tailwind CSS with Shadcn UI components.

## Ordered Phases

### Phase 1: Core Foundation & State
- Setup data models for `Purchase` and `Budget`.
- Create a `useLocalStorage` hook or equivalent logic for data persistence.
- Setup basic layout with navigation.
- **Owner:** `frontend_engineer`

### Phase 2: Budget & Purchase Entry
- Implement "Set Budget" functionality.
- Implement "Add Purchase" form with validation.
- List view for recent purchases.
- **Owner:** `frontend_engineer`

### Phase 3: Analytics & Visualization
- Integrate `recharts` (already supported via shadcn/ui chart components).
- Build spending by category (Pie/Donut chart).
- Build spending over time (Line/Bar chart).
- **Owner:** `frontend_engineer`

### Phase 4: Feedback & Investment Engine
- Logic to analyze spending vs. budget.
- Component to display saving tips (e.g., "You spent 40% on Dining Out, try cooking more").
- "Invest Your Change" module suggesting allocations for unspent funds.
- **Owner:** `frontend_engineer`

### Phase 5: UI Polish & Refinement
- Final CSS adjustments, responsiveness check.
- Error handling for empty states.
- **Owner:** `quick_fix_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Build core logic, entry forms, and analytics.
2. quick_fix_engineer — Final UI polish and text refinements.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4
- **Scope:** 
    - Create `src/types/index.ts` for Budget and Purchase interfaces.
    - Implement a `useShoppingData` hook to handle `localStorage` logic.
    - Build the UI:
        - `Dashboard`: Overview of budget (Progress bar), Total Spent, and Change remaining.
        - `PurchaseForm`: Modal or section to add items (name, price, category).
        - `Analytics`: Use Shadcn charts to show spending breakdowns.
        - `Insights`: Logic to generate feedback based on categories.
- **Files:** `src/App.tsx`, `src/components/`, `src/hooks/`
- **Depends on:** none
- **Acceptance criteria:** Users can set a budget, add items, see their spending visualized, and get automated "tips" and investment ideas.

### 2. quick_fix_engineer
- **Phases:** 5
- **Scope:** 
    - Review UI for responsiveness.
    - Add "Empty State" illustrations or text when no purchases exist.
    - Ensure color schemes for budget alerts (Red for over-budget, Green for under).
- **Files:** `src/index.css`, `src/App.tsx`, `src/components/`
- **Depends on:** frontend_engineer
- **Acceptance criteria:** The app looks polished and professional across mobile and desktop.
