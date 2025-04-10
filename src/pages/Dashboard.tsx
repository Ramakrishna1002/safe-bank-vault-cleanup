
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import AccountCard from "@/components/AccountCard";
import TransactionItem, { Transaction } from "@/components/TransactionItem";
import { Button } from "@/components/ui/button";

// Mock data for the dashboard
const mockAccounts = [
  {
    id: "acc-1",
    accountType: "Checking Account",
    accountNumber: "4023897412",
    balance: 4287.55,
  },
  {
    id: "acc-2",
    accountType: "Savings Account",
    accountNumber: "3824561790",
    balance: 12540.33,
  },
];

const mockTransactions: Transaction[] = [
  {
    id: "tr-1",
    description: "Salary Deposit",
    amount: 2500.00,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    type: "deposit",
  },
  {
    id: "tr-2",
    description: "Grocery Store",
    amount: -156.38,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    type: "withdrawal",
  },
  {
    id: "tr-3",
    description: "Transfer to Savings",
    amount: -500.00,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    type: "transfer",
    recipient: "acc-2",
  },
  {
    id: "tr-4",
    description: "Electric Bill",
    amount: -98.42,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    type: "withdrawal",
  },
  {
    id: "tr-5",
    description: "Online Shopping",
    amount: -124.99,
    date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
    type: "withdrawal",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string } | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const userData = sessionStorage.getItem("user");
    if (!userData) {
      navigate("/");
      return;
    }
    
    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      // If there's an error parsing the user data, redirect to login
      navigate("/");
    }
  }, [navigate]);
  
  if (!user) {
    return null; // Don't render anything until we check authentication
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.username}</h1>
          <p className="text-gray-600">Here's a summary of your accounts</p>
        </div>
        
        {/* Account Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {mockAccounts.map((account) => (
            <AccountCard
              key={account.id}
              accountType={account.accountType}
              accountNumber={account.accountNumber}
              balance={account.balance}
            />
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            className="bg-bank-primary hover:bg-bank-primary/90"
            onClick={() => navigate("/transfer")}
          >
            Transfer Money
          </Button>
          <Button variant="outline">
            View Statements
          </Button>
        </div>
        
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
          </div>
          <div>
            {mockTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <Button variant="ghost" className="text-bank-secondary">
              View All Transactions
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
