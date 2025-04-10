
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useFileProcessor } from '@/hooks/useFileProcessor';
import { UploadResults } from '@/types/upload';

interface UploadContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  notionUrl: string;
  setNotionUrl: (url: string) => void;
  airtableUrl: string;
  setAirtableUrl: (url: string) => void;
  processData: () => Promise<void>;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider = ({ 
  children, 
  onProcessComplete 
}: { 
  children: ReactNode;
  onProcessComplete: (results: UploadResults) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notionUrl, setNotionUrl] = useState("");
  const [airtableUrl, setAirtableUrl] = useState("");
  
  const { 
    isLoading, 
    setIsLoading,
    processFileData,
    processSampleData,
    processExternalData
  } = useFileProcessor({ 
    onProcessComplete 
  });

  const processData = async () => {
    try {
      if (!selectedFile && !notionUrl && !airtableUrl) {
        await processSampleData();
        return;
      }
      
      if (selectedFile) {
        await processFileData(selectedFile);
      } else if (notionUrl) {
        await processExternalData("Hemp Database", notionUrl);
      } else if (airtableUrl) {
        await processExternalData("Hemp Catalog", airtableUrl);
      }
    } catch (error) {
      console.error("Error in processData:", error);
    }
  };

  return (
    <UploadContext.Provider 
      value={{ 
        isLoading, 
        setIsLoading,
        selectedFile, 
        setSelectedFile,
        notionUrl,
        setNotionUrl,
        airtableUrl,
        setAirtableUrl,
        processData
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  const context = useContext(UploadContext);
  
  if (context === undefined) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  
  return context;
};
