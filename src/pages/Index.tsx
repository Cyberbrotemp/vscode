
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  return (
    <Layout backgroundMedia="/background.gif">
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 max-w-4xl mx-auto text-center">
        <div className="animate-fade-in-up glass-effect p-8 rounded-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Modern Web Development
            <span className="block text-primary mt-2">Made Simple</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            A powerful VS Code-like editor in your browser. Write, edit, and preview HTML, CSS, and JavaScript code in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/editor">
              <Button size="lg" className="px-8">
                Start Coding
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="px-8">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-effect p-6 rounded-lg transition-all-300 hover:translate-y-[-5px]">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <div className="text-primary text-xl">&lt;/&gt;</div>
            </div>
            <h3 className="text-xl font-semibold mb-2">HTML, CSS, JS Editor</h3>
            <p className="text-muted-foreground">
              Edit your code with syntax highlighting and see the results in real-time.
            </p>
          </div>
          
          <div className="glass-effect p-6 rounded-lg transition-all-300 hover:translate-y-[-5px]">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <div className="text-primary text-xl">↓</div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Save & Download</h3>
            <p className="text-muted-foreground">
              Save your projects and download them as ZIP files for offline use.
            </p>
          </div>
          
          <div className="glass-effect p-6 rounded-lg transition-all-300 hover:translate-y-[-5px]">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <div className="text-primary text-xl">↔</div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
            <p className="text-muted-foreground">
              Edit and preview your code on any device, from desktop to mobile.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
