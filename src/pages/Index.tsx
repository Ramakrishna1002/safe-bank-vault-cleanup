
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  // Check if user is already logged in
  React.useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Bank info */}
      <div className="bg-bank-primary text-white md:w-1/2 flex flex-col justify-center p-8 md:p-12">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">SecureBank Online</h1>
          <p className="text-xl opacity-90 mb-6">
            Safe, secure, and reliable banking at your fingertips
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Secure login with advanced encryption</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>View account balances and transaction history</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Transfer money between accounts</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Manage payment methods and notifications</span>
            </li>
          </ul>
          <p className="text-sm opacity-70">
            SecureBank is committed to providing the highest level of security for your financial information. 
            Our platform uses end-to-end encryption to protect your data.
          </p>
          
          <div className="mt-6 border-t border-white/20 pt-6">
            <p className="text-sm mb-2">For educational purposes:</p>
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-bank-primary"
              onClick={() => navigate('/security-practice')}
            >
              Try SQL Injection Practice Site
            </Button>
            <p className="text-xs mt-2 opacity-60">
              A simulated vulnerable site for security awareness (testfire.net clone)
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="bg-white md:w-1/2 flex flex-col justify-center p-8 md:p-12">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2">
              Log in to access your accounts and banking services
            </p>
          </div>
          <LoginForm />
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Button variant="link" className="text-bank-secondary p-0">
                Contact your bank
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
