import React, { useState } from 'react';
import { Eye, Download, ExternalLink, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openPDF, checkPDFExists, isPDFFile, getWagtailDocumentUrl } from '@/lib/pdfViewer';
import { findWorkingMediaUrl } from '@/lib/mediaConfig';
import { API_URLS } from '@/lib/apiConfig';

interface PDFViewerProps {
  document: {
    name: string;
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

const PDFViewer: React.FC<PDFViewerProps> = ({ document, className = '' }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [pdfExists, setPdfExists] = useState<boolean | null>(null);

  const handleViewPDF = async () => {
    setIsChecking(true);
    
    try {
      // First try to get the document URL from the CMS structure
      let pdfUrl = null;
      
      // Check if we have a document object with URL
      if (document.document?.url) {
        pdfUrl = document.document.url;
      } else if (document.document?.file) {
        pdfUrl = document.document.file;
      } else if (document.document?.id) {
        // Try to fetch from Wagtail API
        try {
          const response = await fetch(`${API_URLS.DOCUMENTS}${document.document.id}/`);
          if (response.ok) {
            const data = await response.json();
            pdfUrl = data.url;
          }
        } catch (apiError) {
          console.warn('Failed to fetch document from API:', apiError);
        }
      }
      
      // If we have a URL, open it
      if (pdfUrl) {
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
        setPdfExists(true);
      } else {
        // Fallback to the original openPDF function
        await openPDF(document);
        setPdfExists(true);
      }
    } catch (error) {
      console.error('Error opening PDF:', error);
      setPdfExists(false);
      alert('PDF not found. Please check if the document is properly uploaded in the CMS.');
    } finally {
      setIsChecking(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      let pdfUrl = null;
      
      // Check if we have a document object with URL
      if (document.document?.url) {
        pdfUrl = document.document.url;
      } else if (document.document?.file) {
        pdfUrl = document.document.file;
      } else if (document.document?.id) {
        // Try to fetch from Wagtail API
        try {
          const response = await fetch(`${API_URLS.DOCUMENTS}${document.document.id}/`);
          if (response.ok) {
            const data = await response.json();
            pdfUrl = data.url;
          }
        } catch (apiError) {
          console.warn('Failed to fetch document from API:', apiError);
        }
      }
      
      // If still no URL, try fallback
      if (!pdfUrl) {
        pdfUrl = await findWorkingMediaUrl(document.name);
      }
      
      if (pdfUrl) {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `${document.name}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('PDF file not found for download. Please check if the document is properly uploaded in the CMS.');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error downloading PDF file.');
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleViewPDF}
        disabled={isChecking}
        title="View PDF - Opens in new tab"
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
        onClick={handleDownloadPDF}
        title="Download PDF"
        className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
      >
        <Download className="h-4 w-4" />
      </Button>
      
      {pdfExists === false && (
        <div className="flex items-center text-yellow-600" title="PDF file not found">
          <AlertCircle className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
