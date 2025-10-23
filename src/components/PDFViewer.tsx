import React, { useState } from 'react';
import { Eye, Download, ExternalLink, AlertCircle, FileText, File, FileImage, FileVideo, FileAudio, FileArchive, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openPDF, checkPDFExists, isPDFFile, getWagtailDocumentUrl } from '@/lib/pdfViewer';
import { findWorkingMediaUrl } from '@/lib/mediaConfig';
import { API_URLS } from '@/lib/apiConfig';

interface DocumentViewerProps {
  document: {
    name: string;                    // Display name (user-friendly)
    filename?: string;               // Actual filename for URL generation
    document?: {
      url?: string;
      file?: string;
      id?: number;
    };
    file_type?: string;
    file_size?: string;
  };
  className?: string;
}

const PDFViewer: React.FC<DocumentViewerProps> = ({ document, className = '' }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [documentExists, setDocumentExists] = useState<boolean | null>(null);

  // Get appropriate icon for file type
  const getFileIcon = (filename: string, fileType?: string) => {
    const extension = filename.split('.').pop()?.toLowerCase() || fileType?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return FileText;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'svg':
      case 'webp':
        return FileImage;
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'wmv':
      case 'flv':
      case 'webm':
        return FileVideo;
      case 'mp3':
      case 'wav':
      case 'flac':
      case 'aac':
      case 'ogg':
        return FileAudio;
      case 'zip':
      case 'rar':
      case '7z':
      case 'tar':
      case 'gz':
        return FileArchive;
      case 'js':
      case 'ts':
      case 'jsx':
      case 'tsx':
      case 'html':
      case 'css':
      case 'scss':
      case 'sass':
      case 'json':
      case 'xml':
      case 'yaml':
      case 'yml':
        return FileCode;
      case 'doc':
      case 'docx':
      case 'txt':
      case 'rtf':
        return FileText;
      case 'xls':
      case 'xlsx':
      case 'csv':
        return FileText;
      case 'ppt':
      case 'pptx':
        return FileText;
      default:
        return File;
    }
  };

  // Get file extension for download
  const getFileExtension = (filename: string, fileType?: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    if (extension) return extension;
    
    // Fallback to fileType if no extension in filename
    return fileType?.toLowerCase() || 'pdf';
  };

  // Get the document URL directly from Wagtail
  const getDocumentUrl = (document: any): string | null => {
    console.log('🔍 Getting document URL from:', document);
    
    // If we have a direct URL from Wagtail, use it
    if (document.document?.url) {
      const url = document.document.url;
      console.log('📄 Using Wagtail document URL:', url);
      return url;
    }
    
    // If we have a file path, construct the URL
    if (document.document?.file) {
      const file = document.document.file;
      console.log('📁 Using document file path:', file);
      return file;
    }
    
    console.log('❌ No document URL found');
    return null;
  };

  const handleViewDocument = async () => {
    setIsChecking(true);
    
    try {
      console.log('Document structure:', document);
      
      // Get the document URL directly from Wagtail
      let documentUrl = getDocumentUrl(document);
      
      if (documentUrl) {
        // Ensure the URL is absolute
        if (documentUrl.startsWith('/')) {
          // Get the base URL from API_URLS.DOCUMENTS
          const baseUrl = API_URLS.DOCUMENTS.replace('/api/v2/documents/', '');
          documentUrl = `${baseUrl}${documentUrl}`;
        }
        console.log('Opening document URL:', documentUrl);
        window.open(documentUrl, '_blank', 'noopener,noreferrer');
        setDocumentExists(true);
      } else {
        console.log('No document URL found');
        setDocumentExists(false);
        alert('Document not found. Please check if the file is properly uploaded in the CMS.');
      }
    } catch (error) {
      console.error('Error opening document:', error);
      setDocumentExists(false);
      alert('Document not found. Please check if the file is properly uploaded in the CMS.');
    } finally {
      setIsChecking(false);
    }
  };

  const handleDownloadDocument = async () => {
    try {
      console.log('Document structure for download:', document);
      
      // Get the document URL directly from Wagtail
      let documentUrl = getDocumentUrl(document);
      
      if (documentUrl) {
        // Ensure the URL is absolute
        if (documentUrl.startsWith('/')) {
          // Get the base URL from API_URLS.DOCUMENTS
          const baseUrl = API_URLS.DOCUMENTS.replace('/api/v2/documents/', '');
          documentUrl = `${baseUrl}${documentUrl}`;
        }
        
        console.log('Downloading document URL:', documentUrl);
        
        // Get the filename from the URL or use the document name
        const urlFilename = documentUrl.split('/').pop() || document.name;
        const fileExtension = getFileExtension(urlFilename, document.file_type);
        const downloadFilename = urlFilename.includes('.') ? urlFilename : `${urlFilename}.${fileExtension}`;
        
        // Use window.document to avoid conflict with the document prop
        const link = window.document.createElement('a');
        link.href = documentUrl;
        link.download = downloadFilename;
        link.target = '_blank';
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
      } else {
        console.log('No document URL found for download');
        alert('Document not found for download. Please check if the file is properly uploaded in the CMS.');
      }
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Error downloading document. Please try again.');
    }
  };

  // Get the appropriate icon for this file type
  const FileIcon = getFileIcon(document.filename || document.name, document.file_type);
  const fileExtension = getFileExtension(document.filename || document.name, document.file_type);
  const isPDF = fileExtension === 'pdf';

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleViewDocument}
        disabled={isChecking}
        title={`View ${fileExtension.toUpperCase()} - Opens in new tab`}
        className="hover:bg-red-50 hover:text-red-600 transition-colors"
      >
        {isChecking ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-red-600" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleDownloadDocument}
        title={`Download ${fileExtension.toUpperCase()}`}
        className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
      >
        <Download className="h-4 w-4" />
      </Button>
      
      {/* File type indicator */}
      <div className="flex items-center text-muted-foreground" title={`${fileExtension.toUpperCase()} file`}>
        <FileIcon className="h-4 w-4" />
      </div>
      
      {documentExists === false && (
        <div className="flex items-center text-yellow-600" title="Document file not found">
          <AlertCircle className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
