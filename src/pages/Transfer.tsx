
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import TransferForm from "@/components/TransferForm";
import AccountCard from "@/components/AccountCard";

// Mock data for accounts
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

const Transfer = () => {
  const navigate = useNavigate();
  const [isTransferComplete, setIsTransferComplete] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const userData = sessionStorage.getItem("user");
    if (!userData) {
      navigate("/");
    }
  }, [navigate]);
  
  const handleTransferComplete = () => {
    setIsTransferComplete(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsTransferComplete(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Transfer Money</h1>
        <p className="text-gray-600 mb-8">Transfer funds between your accounts or to external accounts</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transfer Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Make a Transfer</h2>
            
            {isTransferComplete ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                <p className="text-green-800 font-medium">
                  Transfer completed successfully!
                </p>
                <p className="text-green-600 text-sm mt-1">
                  Your transfer has been processed and the funds have been moved.
                </p>
              </div>
            ) : null}
            
            <TransferForm 
              accounts={mockAccounts} 
              onTransferComplete={handleTransferComplete} 
            />
          </div>
          
          {/* Account Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Accounts</h2>
              
              <div className="space-y-4">
                {mockAccounts.map((account) => (
                  <AccountCard
                    key={account.id}
                    accountType={account.accountType}
                    accountNumber={account.accountNumber}
                    balance={account.balance}
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Transfer Limits</h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Daily Transfer Limit</p>
                  <p className="font-medium">$5,000.00</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Transfer Limit</p>
                  <p className="font-medium">$25,000.00</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">External Transfer Fee</p>
                  <p className="font-medium">$0.00 (Free for premium accounts)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transfer;
