
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import AccountCard from "@/components/AccountCard";
import TransactionItem, { Transaction } from "@/components/TransactionItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Mock data for accounts
const mockAccounts = [
  {
    id: "acc-1",
    accountType: "Checking Account",
    accountNumber: "4023897412",
    balance: 4287.55,
    transactions: [
      {
        id: "tr-1",
        description: "Salary Deposit",
        amount: 2500.00,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        type: "deposit" as const,
      },
      {
        id: "tr-2",
        description: "Grocery Store",
        amount: -156.38,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        type: "withdrawal" as const,
      },
      {
        id: "tr-4",
        description: "Electric Bill",
        amount: -98.42,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        type: "withdrawal" as const,
      },
    ]
  },
  {
    id: "acc-2",
    accountType: "Savings Account",
    accountNumber: "3824561790",
    balance: 12540.33,
    transactions: [
      {
        id: "tr-3",
        description: "Transfer from Checking",
        amount: 500.00,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        type: "transfer" as const,
        sender: "acc-1",
      },
      {
        id: "tr-6",
        description: "Interest Payment",
        amount: 5.21,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        type: "deposit" as const,
      },
    ]
  },
];

interface AccountWithTransactions {
  id: string;
  accountType: string;
  accountNumber: string;
  balance: number;
  transactions: Transaction[];
}

const Accounts = () => {
  const navigate = useNavigate();
  const [activeAccount, setActiveAccount] = useState<AccountWithTransactions | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const userData = sessionStorage.getItem("user");
    if (!userData) {
      navigate("/");
      return;
    }
    
    // Set initial active account
    if (mockAccounts.length > 0) {
      setActiveAccount(mockAccounts[0]);
    }
  }, [navigate]);
  
  if (!activeAccount) {
    return null; // Don't render until we have data
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Accounts</h1>
        
        <Tabs defaultValue={mockAccounts[0].id} onValueChange={(value) => {
          const account = mockAccounts.find(acc => acc.id === value);
          if (account) setActiveAccount(account);
        }}>
          <TabsList className="mb-6">
            {mockAccounts.map((account) => (
              <TabsTrigger key={account.id} value={account.id} className="px-6">
                {account.accountType}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {mockAccounts.map((account) => (
            <TabsContent key={account.id} value={account.id}>
              <div className="mb-6">
                <AccountCard
                  accountType={account.accountType}
                  accountNumber={account.accountNumber}
                  balance={account.balance}
                  className="h-52"
                />
              </div>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <Button 
                  className="bg-bank-primary hover:bg-bank-primary/90"
                  onClick={() => navigate("/transfer")}
                >
                  Transfer Money
                </Button>
                <Button variant="outline">
                  Account Details
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">Account Transactions</h2>
                </div>
                <div>
                  {account.transactions.length > 0 ? (
                    account.transactions.map((transaction) => (
                      <TransactionItem key={transaction.id} transaction={transaction} />
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      No transactions found for this account.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default Accounts;
