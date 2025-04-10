
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Account {
  id: string;
  accountType: string;
  accountNumber: string;
  balance: number;
}

interface TransferFormProps {
  accounts: Account[];
  onTransferComplete: () => void;
}

const TransferForm: React.FC<TransferFormProps> = ({ accounts, onTransferComplete }) => {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromAccount || !toAccount || !amount || !description) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (fromAccount === toAccount) {
      toast({
        title: "Invalid accounts",
        description: "Source and destination accounts cannot be the same",
        variant: "destructive",
      });
      return;
    }
    
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive amount",
        variant: "destructive",
      });
      return;
    }
    
    const sourceAccount = accounts.find(acc => acc.id === fromAccount);
    if (!sourceAccount || sourceAccount.balance < numericAmount) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough balance to complete this transfer",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Transfer successful",
        description: `$${numericAmount.toFixed(2)} has been transferred successfully`,
      });
      
      // Reset form
      setFromAccount("");
      setToAccount("");
      setAmount("");
      setDescription("");
      
      // Notify parent component
      onTransferComplete();
    } catch (error) {
      toast({
        title: "Transfer failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fromAccount">From Account</Label>
        <Select value={fromAccount} onValueChange={setFromAccount}>
          <SelectTrigger id="fromAccount" className="input-field">
            <SelectValue placeholder="Select source account" />
          </SelectTrigger>
          <SelectContent>
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                {account.accountType} - {account.accountNumber.slice(-4)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="toAccount">To Account</Label>
        <Select value={toAccount} onValueChange={setToAccount}>
          <SelectTrigger id="toAccount" className="input-field">
            <SelectValue placeholder="Select destination account" />
          </SelectTrigger>
          <SelectContent>
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                {account.accountType} - {account.accountNumber.slice(-4)}
              </SelectItem>
            ))}
            <SelectItem value="external-account">External Account</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {toAccount === "external-account" && (
        <div className="space-y-2">
          <Label htmlFor="externalAccount">External Account Number</Label>
          <Input
            id="externalAccount"
            placeholder="Enter account number"
            className="input-field"
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min={0.01}
          step={0.01}
          className="input-field"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="Enter a description for this transfer"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-bank-primary hover:bg-bank-primary/90 mt-4"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Transfer Funds"}
      </Button>
    </form>
  );
};

export default TransferForm;
