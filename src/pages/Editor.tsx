
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import EditorPanel from '../components/EditorPanel';
import Preview from '../components/Preview';
import FileManager from '../components/FileManager';
import { getCurrentUser, getFiles, saveFile, deleteFile, createNewFile } from '../utils/storage';
import { CodeFile } from '../types';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Editor: React.FC = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [currentFile, setCurrentFile] = useState<CodeFile | null>(null);
  const [autoRun, setAutoRun] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [showFileManager, setShowFileManager] = useState(true);
  
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }
    
    setUserId(user.id);
    const userFiles = getFiles(user.id);
    setFiles(userFiles);
    
    if (userFiles.length > 0) {
      setCurrentFile(userFiles[0]);
    } else {
      // Create a default file if user has no files
      const newFile = createNewFile(user.id);
      saveFile(newFile);
      setFiles([newFile]);
      setCurrentFile(newFile);
    }
  }, [navigate]);
  
  const handleFileSelect = (file: CodeFile) => {
    setCurrentFile(file);
  };
  
  const handleFileCreate = (file: CodeFile) => {
    saveFile(file);
    setFiles((prevFiles) => [...prevFiles, file]);
    setCurrentFile(file);
    toast.success('New file created');
  };
  
  const handleFileDelete = (fileId: string) => {
    deleteFile(fileId);
    setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId));
    
    if (currentFile?.id === fileId) {
      const remainingFiles = files.filter((f) => f.id !== fileId);
      if (remainingFiles.length > 0) {
        setCurrentFile(remainingFiles[0]);
      } else {
        // Create a new file if all files are deleted
        const newFile = createNewFile(userId);
        saveFile(newFile);
        setFiles([newFile]);
        setCurrentFile(newFile);
      }
    }
    
    toast.success('File deleted');
  };
  
  const handleFileRename = (fileId: string, newName: string) => {
    const updatedFiles = files.map((file) => {
      if (file.id === fileId) {
        const updatedFile = { ...file, name: newName };
        saveFile(updatedFile);
        
        if (currentFile?.id === fileId) {
          setCurrentFile(updatedFile);
        }
        
        return updatedFile;
      }
      return file;
    });
    
    setFiles(updatedFiles);
    toast.success('File renamed');
  };
  
  const handleCodeUpdate = (field: 'html' | 'css' | 'js', value: string) => {
    if (!currentFile) return;
    
    const updatedFile = {
      ...currentFile,
      [field]: value,
      updatedAt: new Date()
    };
    
    setCurrentFile(updatedFile);
  };
  
  const handleSave = () => {
    if (!currentFile) return;
    
    setIsSaving(true);
    
    // Save current file to localStorage
    saveFile(currentFile);
    
    // Update files list
    setFiles((prevFiles) =>
      prevFiles.map((file) => (file.id === currentFile.id ? currentFile : file))
    );
    
    setTimeout(() => {
      setIsSaving(false);
      toast.success('File saved successfully');
    }, 500);
  };
  
  const handleExportHTML = () => {
    if (!currentFile) return;
    
    // Create a combined HTML file
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${currentFile.name}</title>
          <style>
            ${currentFile.css}
          </style>
        </head>
        <body>
          ${currentFile.html}
          <script>
            ${currentFile.js}
          </script>
        </body>
      </html>
    `;
    
    // Create download link
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentFile.name}.html`;
    link.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    toast.success('HTML file exported');
  };
  
  const handleExportZip = () => {
    if (!currentFile) return;
    toast.error('Feature not implemented yet');
    // In a real application, we would use JSZip to create a ZIP file with separate HTML, CSS, and JS files
  };
  
  const toggleAutoRun = () => {
    setAutoRun((prev) => !prev);
    toast.success(autoRun ? 'Auto-run disabled' : 'Auto-run enabled');
  };
  
  const toggleFileManager = () => {
    setShowFileManager((prev) => !prev);
  };
  
  if (!currentFile) {
    return (
      <Layout requireAuth>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="animate-pulse">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout requireAuth>
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{currentFile.name}</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date(currentFile.updatedAt).toLocaleString()}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleFileManager}
          >
            {showFileManager ? 'Hide Files' : 'Show Files'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleAutoRun}
          >
            {autoRun ? 'Disable Auto-Run' : 'Enable Auto-Run'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExportHTML}
          >
            Export HTML
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExportZip}
          >
            Export as ZIP
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[75vh]">
        {showFileManager && (
          <div className="lg:col-span-1 h-full">
            <FileManager
              files={files}
              currentFile={currentFile}
              onFileSelect={handleFileSelect}
              onFileCreate={handleFileCreate}
              onFileDelete={handleFileDelete}
              onFileRename={handleFileRename}
              userId={userId}
            />
          </div>
        )}
        
        <div className={`${showFileManager ? 'lg:col-span-3' : 'lg:col-span-4'} grid grid-cols-1 lg:grid-cols-2 gap-4 h-full`}>
          <div className="h-full">
            <EditorPanel
              file={currentFile}
              onUpdate={handleCodeUpdate}
              onSave={handleSave}
              onRun={() => setAutoRun(false)}
              isSaving={isSaving}
            />
          </div>
          
          <div className="h-full">
            <Preview
              file={currentFile}
              autoRun={autoRun}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Editor;
