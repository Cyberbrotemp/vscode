
import React, { useRef, useEffect, useState } from 'react';
import { CodeFile } from '../types';
import { Button } from '@/components/ui/button';

interface PreviewProps {
  file: CodeFile;
  autoRun: boolean;
}

const Preview: React.FC<PreviewProps> = ({ file, autoRun }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [lastRun, setLastRun] = useState<Date>(new Date());
  
  const updatePreview = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      
      try {
        // Access the document or create a new one
        let doc;
        if (iframe.contentDocument) {
          doc = iframe.contentDocument;
        } else if (iframe.contentWindow) {
          doc = iframe.contentWindow.document;
        }
        
        if (doc) {
          // Clear existing content
          doc.open();
          
          // Combine HTML, CSS, and JS
          const html = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${file.name || 'Untitled'}</title>
                <style type="text/css">
                  ${file.css || ''}
                </style>
              </head>
              <body>
                ${file.html || ''}
                <script>
                  try {
                    ${file.js || ''}
                  } catch(error) {
                    console.error('JavaScript error:', error);
                  }
                </script>
              </body>
            </html>
          `;
          
          doc.write(html);
          doc.close();
          
          setLastRun(new Date());
        }
      } catch (error) {
        console.error('Preview error:', error);
      }
    }
  };
  
  // Update preview when autoRun is true and file changes
  useEffect(() => {
    if (autoRun) {
      const timer = setTimeout(() => {
        updatePreview();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [file, autoRun]);
  
  // Initial preview load
  useEffect(() => {
    // Small delay to ensure iframe is loaded
    const timer = setTimeout(() => {
      updatePreview();
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    // When toggling fullscreen, we need to update the preview after a small delay
    setTimeout(updatePreview, 100);
  };
  
  return (
    <div className={`flex flex-col ${isFullScreen ? 'fixed inset-0 z-50 bg-background p-4' : 'h-full'}`}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/90 rounded-t-md">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Preview</span>
          <span className="text-xs text-muted-foreground">
            Last run: {lastRun.toLocaleTimeString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={updatePreview}
          >
            Run
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={toggleFullScreen}
          >
            {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
          </Button>
        </div>
      </div>
      
      <div className="flex-grow bg-white relative">
        <iframe
          ref={iframeRef}
          title="Preview"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
          onLoad={() => updatePreview()}
        />
      </div>
    </div>
  );
};

export default Preview;
