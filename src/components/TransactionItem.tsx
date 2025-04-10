
import React from "react";
import { formatDistanceToNow } from "date-fns";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: Date;
  type: "deposit" | "withdrawal" | "transfer";
  recipient?: string;
  sender?: string;
}

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { description, amount, date, type } = transaction;
  
  // Format the date as relative time (e.g., "2 days ago")
  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true });
  
  // Format the amount
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(amount));
  
  // Determine if the transaction is incoming or outgoing
  const isNegative = type === "withdrawal" || (type === "transfer" && !transaction.recipient);
  
  return (
    <div className="transaction-item">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
          isNegative ? "bg-red-100" : "bg-green-100"
        }`}>
          {type === "deposit" && <span className="text-bank-success text-lg">↓</span>}
          {type === "withdrawal" && <span className="text-bank-danger text-lg">↑</span>}
          {type === "transfer" && <span className={isNegative ? "text-bank-danger text-lg" : "text-bank-success text-lg"}>→</span>}
        </div>
        <div>
          <p className="font-medium text-gray-800">{description}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>
      <div className={`font-semibold ${isNegative ? "text-bank-danger" : "text-bank-success"}`}>
        {isNegative ? "-" : "+"}{formattedAmount}
      </div>
    </div>
  );
};

export default TransactionItem;
