import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Developer information
const developers = [
  {
    name: 'Admin',
    role: 'cybersecurity learner $ penetration testor & python developer',  // ← FIXED: Added missing comma
    image: 'https://i.ibb.co/jGkNMZ8/IMG-20230124-WA0001.jpg',
    links: {
      instagram: 'https://instagram.com/kutty_rolex_naveen',
      github: 'https://github.com/naveenhacking',
      telegram: 'https://t.me/rolexnaveen',
      website: 'https://kgfhacker.blogspot.com',
      codepen: 'https://codepen.io/cybernaveen',
    },
  },
];

const About: React.FC = () => {
  return (
    <Layout backgroundMedia="https://giffiles.alphacoders.com/220/220297.gif">
      <div className="min-h-[80vh] py-12">
        <div className="max-w-4xl mx-auto glass-effect p-8 rounded-lg animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">About the Developer</h1>
          
          <div className="mt-12">
            {developers.map((dev, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-primary/50">
                  <img 
                    src={dev.image} 
                    alt={dev.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback for missing image
                      e.currentTarget.src = 'https://via.placeholder.com/200';
                    }}
                  />
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <div className="inline-block bg-primary/10 px-3 py-1 rounded-full text-sm text-primary font-medium mb-2">
                    {dev.role}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{dev.name}</h2>
                  
                  <p className="text-muted-foreground mb-4">
                    Passionate developer focused on creating intuitive and powerful web development tools.
                    With expertise in HTML, CSS, JavaScript, and modern web frameworks.
                  </p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                    {dev.links.instagram && (
                      <a 
                        href={dev.links.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-background/50 hover:bg-primary/10 border border-border rounded-md text-sm transition-all-200"
                      >
                        Instagram
                      </a>
                    )}
                    
                    {dev.links.github && (
                      <a 
                        href={dev.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-background/50 hover:bg-primary/10 border border-border rounded-md text-sm transition-all-200"
                      >
                        GitHub
                      </a>
                    )}
                    
                    {dev.links.telegram && (
                      <a 
                        href={dev.links.telegram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-background/50 hover:bg-primary/10 border border-border rounded-md text-sm transition-all-200"
                      >
                        Telegram
                      </a>
                    )}
                    
                    {dev.links.website && (
                      <a 
                        href={dev.links.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-background/50 hover:bg-primary/10 border border-border rounded-md text-sm transition-all-200"
                      >
                        Website
                      </a>
                    )}
                    
                    {dev.links.codepen && (
                      <a 
                        href={dev.links.codepen} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-background/50 hover:bg-primary/10 border border-border rounded-md text-sm transition-all-200"
                      >
                        CodePen
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-xl font-semibold mb-4">About This Project</h3>
            <p className="text-muted-foreground mb-6">
              This VS Code-like editor was built to provide developers with a powerful browser-based 
              coding environment. It supports HTML, CSS, and JavaScript editing with features like 
              file management, live preview, and code export.
            </p>
            
            <div className="mt-8 text-center">
              <Link to="/editor">
                <Button size="lg">Start Coding Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
