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

  // Extract actual filename from Wagtail document structure
  const getActualFilename = (document: any): string | null => {
    // Try to extract filename from Wagtail document URL
    if (document.document?.url) {
      const url = document.document.url;
      const filename = url.split('/').pop();
      if (filename && filename.includes('.')) {
        return filename;
      }
    }
    
    // Try to extract from file path
    if (document.document?.file) {
      const file = document.document.file;
      const filename = file.split('/').pop();
      if (filename && filename.includes('.')) {
        return filename;
      }
    }
    
    return null;
  };

  const handleViewDocument = async () => {
    setIsChecking(true);
    
    try {
      console.log('Document structure:', document);
      
      // First try to get the document URL from the CMS structure
      let documentUrl = null;
      
      // Check if we have a document object with URL
      if (document.document?.url) {
        documentUrl = document.document.url;
        console.log('Using Wagtail document URL:', documentUrl);
      } else if (document.document?.file) {
        documentUrl = document.document.file;
        console.log('Using document file path:', documentUrl);
      } else if (document.document?.id) {
        // Try to fetch from Wagtail API
        try {
          console.log('Fetching document details from Wagtail API for ID:', document.document.id);
          const response = await fetch(`${API_URLS.DOCUMENTS}${document.document.id}/`);
          if (response.ok) {
            const data = await response.json();
            documentUrl = data.url;
            console.log('Fetched document URL from API:', documentUrl);
          }
        } catch (apiError) {
          console.warn('Failed to fetch document from API:', apiError);
        }
      }
      
      // If we have a URL, open it
      if (documentUrl) {
        // Ensure the URL is absolute
        if (documentUrl.startsWith('/')) {
          // Get the base URL from API_URLS.DOCUMENTS
          const baseUrl = API_URLS.DOCUMENTS.replace('/api/v2/documents/', '');
          documentUrl = `${baseUrl}${documentUrl}`;
        }
        console.log('Opening document URL:', documentUrl);
        console.log('Document name from CMS:', document.name);
        console.log('Document structure:', document);
        window.open(documentUrl, '_blank', 'noopener,noreferrer');
        setDocumentExists(true);
      } else {
        console.log('No document URL found, trying fallback...');
        // Try to extract actual filename from Wagtail document structure
        const actualFilename = getActualFilename(document);
        const filenameForUrl = actualFilename || document.filename || document.name;
        console.log('Using filename for fallback:', filenameForUrl);
        
        const fallbackUrl = await findWorkingMediaUrl(filenameForUrl);
        if (fallbackUrl) {
          console.log('Using fallback URL:', fallbackUrl);
          window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
          setDocumentExists(true);
        } else {
          // Final fallback to the original openPDF function
          await openPDF(document);
          setDocumentExists(true);
        }
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
      
      let documentUrl = null;
      
      // Check if we have a document object with URL
      if (document.document?.url) {
        documentUrl = document.document.url;
        console.log('Using Wagtail document URL for download:', documentUrl);
      } else if (document.document?.file) {
        documentUrl = document.document.file;
        console.log('Using document file path for download:', documentUrl);
      } else if (document.document?.id) {
        // Try to fetch from Wagtail API
        try {
          console.log('Fetching document details from Wagtail API for download, ID:', document.document.id);
          const response = await fetch(`${API_URLS.DOCUMENTS}${document.document.id}/`);
          if (response.ok) {
            const data = await response.json();
            documentUrl = data.url;
            console.log('Fetched document URL from API for download:', documentUrl);
          }
        } catch (apiError) {
          console.warn('Failed to fetch document from API:', apiError);
        }
      }
      
      // If still no URL, try fallback with case preservation
      if (!documentUrl) {
        const actualFilename = getActualFilename(document);
        const filenameForUrl = actualFilename || document.filename || document.name;
        console.log('Using filename for download fallback:', filenameForUrl);
        documentUrl = await findWorkingMediaUrl(filenameForUrl);
      }
      
      if (documentUrl) {
        // Ensure the URL is absolute
        if (documentUrl.startsWith('/')) {
          // Get the base URL from API_URLS.DOCUMENTS
          const baseUrl = API_URLS.DOCUMENTS.replace('/api/v2/documents/', '');
          documentUrl = `${baseUrl}${documentUrl}`;
        }
        
        console.log('Downloading document URL:', documentUrl);
        
        // Get the proper file extension and filename
        const actualFilename = getActualFilename(document);
        const filenameForDownload = actualFilename || document.filename || document.name;
        const fileExtension = getFileExtension(filenameForDownload, document.file_type);
        const downloadFilename = filenameForDownload.includes('.') ? filenameForDownload : `${filenameForDownload}.${fileExtension}`;
        
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
      alert('Error downloading document file.');
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
