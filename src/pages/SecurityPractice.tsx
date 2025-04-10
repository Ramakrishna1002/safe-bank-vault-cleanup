
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VulnerableLoginForm from "@/components/VulnerableLoginForm";

const SecurityPractice = () => {
  const [loginAttempt, setLoginAttempt] = useState<{
    username: string;
    success: boolean;
    message: string;
  } | null>(null);

  const handleLoginResult = (username: string, success: boolean, message: string) => {
    setLoginAttempt({ username, success, message });
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1]">
      {/* Header */}
      <header className="bg-[#003366] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Altoro Mutual</h1>
            <span className="ml-2 text-sm italic">Dummy Security Practice Site</span>
          </div>
          <div>
            <Link to="/">
              <Button variant="link" className="text-white">Back to SecureBank</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Disclaimer */}
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto my-4 max-w-4xl">
        <p className="font-bold">Security Practice Environment</p>
        <p className="text-sm">
          This page is for educational purposes only to practice identifying and understanding SQL injection vulnerabilities.
          The login form intentionally contains security flaws. No real data is at risk.
        </p>
      </div>

      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
        {/* Left sidebar */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold text-[#003366] mb-4">Site Navigation</h2>
          <ul className="space-y-2">
            <li className="border-b pb-1">
              <a href="#" className="text-[#003366] hover:text-[#336699]">Home</a>
            </li>
            <li className="border-b pb-1">
              <a href="#" className="text-[#003366] hover:text-[#336699]">About Us</a>
            </li>
            <li className="border-b pb-1">
              <a href="#" className="text-[#003366] hover:text-[#336699]">Online Banking Login</a>
            </li>
            <li className="border-b pb-1">
              <a href="#" className="text-[#003366] hover:text-[#336699]">Privacy Policy</a>
            </li>
          </ul>
          
          <h2 className="text-lg font-bold text-[#003366] mt-6 mb-4">SQL Injection Examples</h2>
          <div className="bg-gray-100 p-3 rounded text-sm">
            <p className="font-medium mb-2">Try these examples:</p>
            <ul className="space-y-1 font-mono">
              <li>admin' OR '1'='1</li>
              <li>anything' OR 1=1 --</li>
              <li>admin'--</li>
              <li>admin' #</li>
              <li>admin' UNION SELECT 1,2 --</li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">Online Banking Login</h2>
          
          {loginAttempt ? (
            <div className={`p-4 rounded-lg mb-6 ${loginAttempt.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <h3 className="font-bold">{loginAttempt.success ? 'Login Successful' : 'Login Failed'}</h3>
              <p>{loginAttempt.message}</p>
              <Button 
                onClick={() => setLoginAttempt(null)} 
                className="mt-2 bg-[#003366]"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <p className="mb-6">
                Sign in to access your accounts. For demonstration purposes, use:
                <br />
                <strong>Username:</strong> jsmith | <strong>Password:</strong> demo1234
              </p>
              <VulnerableLoginForm onLoginResult={handleLoginResult} />
            </>
          )}
          
          <div className="mt-8 border-t pt-4">
            <h3 className="text-lg font-bold text-[#003366] mb-2">Security Notice</h3>
            <p className="text-sm text-gray-700">
              This is a simulated banking environment for practicing security testing.
              The form above intentionally contains vulnerabilities for educational purposes.
              In real applications, proper security measures must be implemented to prevent SQL injection attacks.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#003366] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2025 Altoro Mutual Dummy Site (Educational Purposes Only)</p>
          <p className="text-xs mt-1">Not affiliated with any real financial institution</p>
        </div>
      </footer>
    </div>
  );
};

export default SecurityPractice;
