
import React, { useState, useEffect, useRef } from 'react';
import { CodeFile } from '../types';
import { Button } from '@/components/ui/button';

interface EditorPanelProps {
  file: CodeFile;
  onUpdate: (field: 'html' | 'css' | 'js', value: string) => void;
  onSave: () => void;
  onRun: () => void;
  isSaving: boolean;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ 
  file, 
  onUpdate, 
  onSave, 
  onRun,
  isSaving 
}) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const htmlTextareaRef = useRef<HTMLTextAreaElement>(null);
  const cssTextareaRef = useRef<HTMLTextAreaElement>(null);
  const jsTextareaRef = useRef<HTMLTextAreaElement>(null);
  
  const tabs = [
    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
    { id: 'js', label: 'JavaScript' }
  ];
  
  // Handle tab indentation and Enter key for running code
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Insert tab character
      const newValue = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
      
      // Update textarea value
      onUpdate(activeTab, newValue);
      
      // Set cursor position after tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    } else if (e.key === 'Enter' && e.ctrlKey) {
      // Run code with Ctrl+Enter
      e.preventDefault();
      onRun();
    }
  };
  
  // Focus textarea when tab changes
  useEffect(() => {
    if (activeTab === 'html' && htmlTextareaRef.current) {
      htmlTextareaRef.current.focus();
    } else if (activeTab === 'css' && cssTextareaRef.current) {
      cssTextareaRef.current.focus();
    } else if (activeTab === 'js' && jsTextareaRef.current) {
      jsTextareaRef.current.focus();
    }
  }, [activeTab]);
  
  return (
    <div className="h-full flex flex-col rounded-md overflow-hidden border border-border bg-background/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
              onClick={() => setActiveTab(tab.id as 'html' | 'css' | 'js')}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          <Button 
            size="sm"
            onClick={onRun}
          >
            Run (Ctrl+Enter)
          </Button>
        </div>
      </div>
      
      <div className="flex-grow relative">
        {activeTab === 'html' && (
          <textarea
            ref={htmlTextareaRef}
            className="w-full h-full p-4 font-mono text-sm outline-none resize-none bg-background/80"
            value={file.html}
            onChange={(e) => onUpdate('html', e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            data-gramm="false"
            placeholder="Write your HTML here..."
          />
        )}
        
        {activeTab === 'css' && (
          <textarea
            ref={cssTextareaRef}
            className="w-full h-full p-4 font-mono text-sm outline-none resize-none bg-background/80"
            value={file.css}
            onChange={(e) => onUpdate('css', e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            data-gramm="false"
            placeholder="Write your CSS here..."
          />
        )}
        
        {activeTab === 'js' && (
          <textarea
            ref={jsTextareaRef}
            className="w-full h-full p-4 font-mono text-sm outline-none resize-none bg-background/80"
            value={file.js}
            onChange={(e) => onUpdate('js', e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            data-gramm="false"
            placeholder="Write your JavaScript here..."
          />
        )}
      </div>
    </div>
  );
};

export default EditorPanel;
