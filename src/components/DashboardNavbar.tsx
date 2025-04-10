
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const DashboardNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // Clear user session
    sessionStorage.removeItem("user");
    
    toast({
      title: "Logged out successfully",
      description: "You have been securely logged out.",
    });
    
    // Redirect to login page
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-bank-primary">SecureBank</h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Button 
            variant="ghost" 
            className="text-gray-600 hover:text-bank-primary"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className="text-gray-600 hover:text-bank-primary"
            onClick={() => navigate("/accounts")}
          >
            Accounts
          </Button>
          <Button 
            variant="ghost" 
            className="text-gray-600 hover:text-bank-primary"
            onClick={() => navigate("/transfer")}
          >
            Transfer
          </Button>
        </nav>
        
        <Button variant="outline" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </header>
  );
};

export default DashboardNavbar;
