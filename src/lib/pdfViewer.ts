/**
 * PDF Viewer Utility Functions
 * Handles PDF viewing with multiple fallback options
 */

import { findWorkingMediaUrl, getMediaUrl, MEDIA_CONFIG } from './mediaConfig';

export interface PDFDocument {
  name: string;
  document?: {
    url?: string;
    file?: string;
    id?: number;
  };
  file_type?: string;
  file_size?: string;
}

/**
 * Get the best available PDF URL for a document
 * @param document - The document object from CMS
 * @returns The PDF URL or null if none found
 */
export const getPDFUrl = (document: PDFDocument): string | null => {
  // 1. First try Wagtail document URL (direct from CMS)
  if (document.document?.url) {
    return document.document.url;
  }
  
  // 2. Try direct file URL from CMS
  if (document.document?.file) {
    return document.document.file;
  }
  
  // 3. Try Wagtail documents API endpoint if we have an ID
  if (document.document?.id) {
    return `${MEDIA_CONFIG.BASE_URL}${MEDIA_CONFIG.DOCUMENTS_API}${document.document.id}/`;
  }
  
  // 4. Fallback to media/documents folder (Wagtail documents)
  return getMediaUrl(document.name, MEDIA_CONFIG.DOCUMENTS_PATH);
};

/**
 * Open PDF in new tab with proper security settings
 * @param document - The document object from CMS
 * @param fallbackUrl - Optional fallback URL if document URL is not found
 */
export const openPDF = async (document: PDFDocument, fallbackUrl?: string): Promise<void> => {
  let pdfUrl = getPDFUrl(document) || fallbackUrl;
  
  // If we have a document ID but no URL, try to fetch from Wagtail API
  if (!pdfUrl && document.document?.id) {
    try {
      pdfUrl = await getWagtailDocumentUrl(document.document.id);
    } catch (error) {
      console.error('Error fetching Wagtail document URL:', error);
    }
  }
  
  // If still no URL found, try to find a working URL
  if (!pdfUrl) {
    pdfUrl = await findWorkingMediaUrl(document.name);
  }
  
  if (pdfUrl) {
    // Open PDF in new tab with security settings
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  } else {
    console.error('No PDF URL found for document:', document);
    // Show user-friendly error message
    alert('PDF not found. Please check if the document is properly uploaded in the CMS.');
  }
};

/**
 * Check if a PDF file exists by making a HEAD request
 * @param url - The PDF URL to check
 * @returns Promise<boolean> - True if PDF exists, false otherwise
 */
export const checkPDFExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error checking PDF existence:', error);
    return false;
  }
};

/**
 * Get PDF file size in human-readable format
 * @param bytes - File size in bytes
 * @returns Human-readable file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Validate PDF file extension
 * @param filename - The filename to validate
 * @returns True if file has PDF extension
 */
export const isPDFFile = (filename: string): boolean => {
  return filename.toLowerCase().endsWith('.pdf');
};

/**
 * Fetch document details from Wagtail API
 * @param documentId - The document ID from Wagtail
 * @returns Promise<PDFDocument | null> - Document details or null if not found
 */
export const fetchWagtailDocument = async (documentId: number): Promise<PDFDocument | null> => {
  try {
    const response = await fetch(`${MEDIA_CONFIG.BASE_URL}${MEDIA_CONFIG.DOCUMENTS_API}${documentId}/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      name: data.title || 'Document',
      document: {
        url: data.url,
        id: data.id
      },
      file_type: data.file_extension?.toUpperCase() || 'PDF',
      file_size: formatFileSize(data.file_size || 0)
    };
  } catch (error) {
    console.error('Error fetching Wagtail document:', error);
    return null;
  }
};

/**
 * Get document URL from Wagtail API response
 * @param documentId - The document ID
 * @returns Promise<string | null> - Document URL or null if not found
 */
export const getWagtailDocumentUrl = async (documentId: number): Promise<string | null> => {
  try {
    const response = await fetch(`${MEDIA_CONFIG.BASE_URL}${MEDIA_CONFIG.DOCUMENTS_API}${documentId}/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.url || null;
  } catch (error) {
    console.error('Error fetching Wagtail document URL:', error);
    return null;
  }
};
