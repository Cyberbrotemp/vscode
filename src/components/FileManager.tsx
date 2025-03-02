
import React, { useState } from 'react';
import { CodeFile } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createNewFile, deleteFile } from '../utils/storage';

interface FileManagerProps {
  files: CodeFile[];
  currentFile: CodeFile | null;
  onFileSelect: (file: CodeFile) => void;
  onFileCreate: (file: CodeFile) => void;
  onFileDelete: (fileId: string) => void;
  onFileRename: (fileId: string, newName: string) => void;
  userId: string;
}

const FileManager: React.FC<FileManagerProps> = ({
  files,
  currentFile,
  onFileSelect,
  onFileCreate,
  onFileDelete,
  onFileRename,
  userId
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editingFileName, setEditingFileName] = useState('');
  
  const handleCreateFile = () => {
    if (isCreating) {
      const fileName = newFileName.trim() || 'Untitled';
      const newFile = createNewFile(userId, fileName);
      onFileCreate(newFile);
      setIsCreating(false);
      setNewFileName('');
    } else {
      setIsCreating(true);
    }
  };
  
  const handleCancelCreate = () => {
    setIsCreating(false);
    setNewFileName('');
  };
  
  const handleStartRename = (file: CodeFile) => {
    setEditingFileId(file.id);
    setEditingFileName(file.name);
  };
  
  const handleRename = (fileId: string) => {
    if (editingFileName.trim()) {
      onFileRename(fileId, editingFileName);
    }
    setEditingFileId(null);
    setEditingFileName('');
  };
  
  const handleCancelRename = () => {
    setEditingFileId(null);
    setEditingFileName('');
  };
  
  return (
    <div className="bg-background/50 backdrop-blur-sm border border-border rounded-md overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="text-sm font-medium">Files</h3>
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleCreateFile}
        >
          {isCreating ? 'Create' : 'New File'}
        </Button>
      </div>
      
      {isCreating && (
        <div className="p-3 border-b border-border flex items-center gap-2">
          <Input
            size={1}
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder="File name"
            className="flex-grow text-sm"
            autoFocus
          />
          <Button 
            size="sm" 
            variant="ghost"
            onClick={handleCancelCreate}
          >
            Cancel
          </Button>
        </div>
      )}
      
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        {files.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            No files yet. Create your first file!
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {files.map((file) => (
              <li 
                key={file.id} 
                className={`transition-all-200 ${currentFile?.id === file.id ? 'bg-primary/10' : 'hover:bg-background/80'}`}
              >
                <div className="p-3 flex items-center justify-between">
                  {editingFileId === file.id ? (
                    <div className="flex items-center gap-2 flex-grow">
                      <Input
                        size={1}
                        value={editingFileName}
                        onChange={(e) => setEditingFileName(e.target.value)}
                        className="flex-grow text-sm"
                        autoFocus
                      />
                      <div className="flex items-center gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleRename(file.id)}
                        >
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={handleCancelRename}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        className="text-sm flex-grow text-left truncate pr-2"
                        onClick={() => onFileSelect(file)}
                      >
                        {file.name}
                        <span className="text-xs text-muted-foreground ml-2">
                          {new Date(file.updatedAt).toLocaleDateString()}
                        </span>
                      </button>
                      <div className="flex items-center gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleStartRename(file)}
                        >
                          Rename
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => onFileDelete(file.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileManager;
