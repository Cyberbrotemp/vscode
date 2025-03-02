
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { validateLogin, setCurrentUser, getCurrentUser } from '../utils/storage';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Redirect if already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
      navigate('/editor');
    }
  }, [navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      const user = validateLogin(email, password);
      
      if (user) {
        setCurrentUser(user);
        toast.success('Login successful');
        navigate('/editor');
      } else {
        toast.error('Invalid email or password');
        setIsLoading(false);
      }
    }, 1000);
  };
  
  const handleDemoLogin = () => {
    const demoEmail = 'demo@example.com';
    const demoPassword = 'demo1234';
    
    setEmail(demoEmail);
    setPassword(demoPassword);
    
    // Validate and login
    const user = validateLogin(demoEmail, demoPassword);
    
    if (user) {
      setCurrentUser(user);
      toast.success('Logged in with demo account');
      navigate('/editor');
    } else {
      // Create a demo account if it doesn't exist
      const demoUser = {
        id: 'demo-user',
        name: 'Demo User',
        email: demoEmail,
        password: demoPassword,
      };
      
      localStorage.setItem('vscode_users', JSON.stringify([demoUser]));
      setCurrentUser(demoUser);
      toast.success('Created and logged in with demo account');
      navigate('/editor');
    }
  };
  
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="glass-effect p-8 rounded-lg shadow-lg animate-fade-in-up">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground mt-2">Log in to your account to continue</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
            </form>
            
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleDemoLogin}
              >
                Try Demo Account
              </Button>
            </div>
            
            <div className="mt-8 text-center text-sm">
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
