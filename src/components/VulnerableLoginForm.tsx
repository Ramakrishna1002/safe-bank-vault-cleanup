
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VulnerableLoginFormProps {
  onLoginResult: (username: string, success: boolean, message: string) => void;
}

const VulnerableLoginForm: React.FC<VulnerableLoginFormProps> = ({ onLoginResult }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Dummy database of users
  const users = [
    { username: "jsmith", password: "demo1234", fullName: "John Smith" },
    { username: "admin", password: "admin123", fullName: "Administrator" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username) {
      onLoginResult(username, false, "Username cannot be empty");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // INTENTIONALLY VULNERABLE code for educational purposes
    // DO NOT use this approach in real applications!
    const sqlInjectionSim = simulateSqlInjection(username, password);
    
    if (sqlInjectionSim.success) {
      onLoginResult(
        username, 
        true, 
        `SQL Injection detected! You've successfully bypassed authentication using: ${username}`
      );
    } else {
      // Check regular credentials (only if SQL injection didn't succeed)
      const user = users.find(u => u.username === username && u.password === password);
      
      if (user) {
        onLoginResult(username, true, `Welcome back, ${user.fullName}`);
      } else {
        onLoginResult(username, false, "Invalid username or password");
      }
    }
    
    setIsLoading(false);
  };

  // This function simulates SQL injection vulnerability detection
  // In a real app, this would NEVER exist - it's for educational demonstration only
  const simulateSqlInjection = (username: string, password: string) => {
    // Check for common SQL injection patterns
    const injectionPatterns = [
      "' OR '1'='1",
      "' OR '1'=1",
      "' OR 1=1 --",
      "' OR 1=1#",
      "' OR 1=1/*",
      "') OR '1'='1",
      "') OR ('1'='1",
      " OR 1=1--",
      " OR 1=1#",
      " OR 1=1/*",
      "admin'--",
      "admin' #"
    ];

    // Check if username contains any of the injection patterns
    for (const pattern of injectionPatterns) {
      if (username.toLowerCase().includes(pattern.toLowerCase())) {
        return { success: true, method: "username" };
      }
    }

    // Check if password contains any of the injection patterns
    for (const pattern of injectionPatterns) {
      if (password.toLowerCase().includes(pattern.toLowerCase())) {
        return { success: true, method: "password" };
      }
    }

    // UNION-based injection detection (simplified)
    if (username.toLowerCase().includes("union select") || 
        password.toLowerCase().includes("union select")) {
      return { success: true, method: "UNION" };
    }

    return { success: false };
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md border p-6 rounded-lg shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-[#003366]">Username</Label>
        <Input
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-[#003366] border-opacity-30"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-[#003366]">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-[#003366] border-opacity-30"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-[#003366] hover:bg-[#004488]"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
      
      <div className="text-sm text-center mt-4">
        <a href="#" className="text-[#003366] hover:underline">Forgot username/password?</a>
      </div>
    </form>
  );
};

export default VulnerableLoginForm;
