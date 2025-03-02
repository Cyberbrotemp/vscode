
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, setCurrentUser } from '../utils/storage';
import { User } from '../types';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [location.pathname]);
  
  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
    navigate('/');
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="text-foreground font-bold text-lg tracking-tight transition-all-200 hover:text-primary"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
                  <span className="text-primary text-xs">&lt;/&gt;</span>
                </div>
                <span>VS Code Editor</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={`px-3 py-2 rounded-md text-sm transition-all-200 ${location.pathname === '/' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>
              Home
            </Link>
            <Link to="/editor" className={`px-3 py-2 rounded-md text-sm transition-all-200 ${location.pathname === '/editor' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>
              Editor
            </Link>
            <Link to="/about" className={`px-3 py-2 rounded-md text-sm transition-all-200 ${location.pathname === '/about' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>
              About
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-medium">{user.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-500 hover:text-primary focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-b border-border animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base ${location.pathname === '/' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/editor" 
              className={`block px-3 py-2 rounded-md text-base ${location.pathname === '/editor' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Editor
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md text-base ${location.pathname === '/about' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            {user ? (
              <div className="pt-4 pb-3 border-t border-border">
                <div className="flex items-center px-3 py-2">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden mr-3">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-medium">{user.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <div className="text-base font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                <div className="px-3 py-2">
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base text-foreground hover:text-primary"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-border">
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base text-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-base text-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
