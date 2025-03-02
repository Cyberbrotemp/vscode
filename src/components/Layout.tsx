
import React, { ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { getCurrentUser } from '../utils/storage';

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
  backgroundMedia?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  requireAuth = false,
  backgroundMedia
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated when required
    const checkAuth = () => {
      const currentUser = getCurrentUser();
      if (requireAuth && !currentUser) {
        navigate('/login');
      }
      setIsLoading(false);
    };
    
    // Small delay for animation to work properly
    const timer = setTimeout(checkAuth, 200);
    return () => clearTimeout(timer);
  }, [navigate, requireAuth]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col relative">
      {backgroundMedia && (
        <div className="absolute inset-0 overflow-hidden z-0">
          {backgroundMedia.endsWith('.mp4') ? (
            <video 
              autoPlay 
              muted 
              loop 
              className="object-cover w-full h-full"
            >
              <source src={backgroundMedia} type="video/mp4" />
            </video>
          ) : (
            <img 
              src={backgroundMedia} 
              alt="Background" 
              className="object-cover w-full h-full"
            />
          )}
        </div>
      )}
      
      <div className="relative z-10 flex-grow flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
        <footer className="py-4 text-center text-sm text-muted-foreground">
          <div className="container mx-auto">
            <p>© {new Date().getFullYear()} VS Code Editor. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
