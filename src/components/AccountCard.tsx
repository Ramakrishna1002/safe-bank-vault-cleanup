
import React from "react";
import { cn } from "@/lib/utils";

interface AccountCardProps {
  accountType: string;
  accountNumber: string;
  balance: number;
  className?: string;
}

const AccountCard: React.FC<AccountCardProps> = ({
  accountType,
  accountNumber,
  balance,
  className,
}) => {
  // Format account number to show only last 4 digits
  const maskedAccountNumber = `•••• •••• •••• ${accountNumber.slice(-4)}`;
  
  // Format balance with commas and two decimal places
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(balance);

  return (
    <div className={cn("bank-card p-6 w-full", className)}>
      <div className="bank-card-pattern" />
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">{accountType}</h3>
          <p className="text-sm opacity-80">{maskedAccountNumber}</p>
        </div>
        <div className="mt-6">
          <p className="text-xs uppercase opacity-80">Available Balance</p>
          <p className="text-2xl font-bold">{formattedBalance}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
