/**
 * Centralized API Configuration for ARC Frontend
 * This is the single source of truth for all API endpoints and URLs
 */

// Main API Configuration
export const API_CONFIG = {
  // Base URL for the backend API
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.arc.pingtech.dev',
  
  // Wagtail CMS API endpoints
  WAGTAIL_API_BASE: '/api/v2',
  PAGES_ENDPOINT: '/api/v2/pages/',
  SETTINGS_ENDPOINT: '/api/v2/settings/',
  IMAGES_ENDPOINT: '/api/v2/images/',
  DOCUMENTS_ENDPOINT: '/api/v2/documents/',
  
  // Media paths
  MEDIA_BASE: '/media/',
  RULES_PATH: '/media/rules/',
  IMAGES_PATH: '/media/images/',
  DOCUMENTS_PATH: '/media/documents/',
  
  // Fallback URLs for different environments
  FALLBACK_URLS: [
    '/media/documents/',  // Primary: Wagtail documents
    '/media/rules/',       // Secondary: Rules folder
    'https://api.arc.pingtech.dev/media/documents/',
    'https://api.arc.pingtech.dev/media/rules/',
    'http://localhost:8001/media/documents/',
    'http://localhost:8001/media/rules/'
  ]
};

/**
 * Get the full API URL for a given endpoint
 * @param endpoint - The API endpoint (e.g., '/api/v2/pages/')
 * @returns Full URL for the API endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

/**
 * Get the full media URL for a given file
 * @param filename - The filename
 * @param path - The media path (default: rules)
 * @returns Full URL for the media file
 */
export const getMediaUrl = (filename: string, path: string = API_CONFIG.RULES_PATH): string => {
  // Clean filename
  const cleanFilename = filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-.]/g, '');
  
  // Ensure .pdf extension
  const finalFilename = cleanFilename.endsWith('.pdf') ? cleanFilename : `${cleanFilename}.pdf`;
  
  return `${API_CONFIG.BASE_URL}${path}${finalFilename}`;
};

/**
 * Get fallback URLs for a media file
 * @param filename - The filename
 * @returns Array of fallback URLs
 */
export const getFallbackUrls = (filename: string): string[] => {
  const cleanFilename = filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-.]/g, '');
  
  const finalFilename = cleanFilename.endsWith('.pdf') ? cleanFilename : `${cleanFilename}.pdf`;
  
  return API_CONFIG.FALLBACK_URLS.map(url => `${url}${finalFilename}`);
};

/**
 * Check if a media file exists by trying multiple URLs
 * @param filename - The filename to check
 * @returns Promise<string | null> - The first working URL or null
 */
export const findWorkingMediaUrl = async (filename: string): Promise<string | null> => {
  const urls = getFallbackUrls(filename);
  
  for (const url of urls) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return url;
      }
    } catch (error) {
      console.warn(`Failed to check URL: ${url}`, error);
    }
  }
  
  return null;
};

// Export commonly used URLs for convenience
export const API_URLS = {
  PAGES: getApiUrl(API_CONFIG.PAGES_ENDPOINT),
  SETTINGS: getApiUrl(API_CONFIG.SETTINGS_ENDPOINT),
  IMAGES: getApiUrl(API_CONFIG.IMAGES_ENDPOINT),
  DOCUMENTS: getApiUrl(API_CONFIG.DOCUMENTS_ENDPOINT),
};
