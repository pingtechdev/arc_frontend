/**
 * Media Configuration for ARC Frontend
 * Handles media file paths and fallback URLs
 */

export const MEDIA_CONFIG = {
  // Base URL for media files
  BASE_URL: import.meta.env.VITE_CMS_API_URL || 'https://api.arc.pingtech.dev',
  
  // Media paths
  RULES_PATH: '/media/rules/',
  IMAGES_PATH: '/media/images/',
  DOCUMENTS_PATH: '/media/documents/',
  
  // Wagtail API endpoints
  WAGTAIL_API_BASE: '/api/v2/',
  DOCUMENTS_API: '/api/v2/documents/',
  
  // Fallback URLs for different environments
  FALLBACK_URLS: [
    '/media/documents/',  // Primary: Wagtail documents
    '/media/rules/',       // Secondary: Rules folder
    'https://api.arc.pingtech.dev/media/documents/',
    'https://api.arc.pingtech.dev/media/rules/',
    'https://your-cms-domain.com/media/documents/',
    'https://your-cms-domain.com/media/rules/'
  ]
};

/**
 * Get the full URL for a media file
 * @param filename - The filename
 * @param path - The media path (default: rules)
 * @returns Full URL for the media file
 */
export const getMediaUrl = (filename: string, path: string = MEDIA_CONFIG.RULES_PATH): string => {
  // Clean filename
  const cleanFilename = filename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-.]/g, '');
  
  // Ensure .pdf extension
  const finalFilename = cleanFilename.endsWith('.pdf') ? cleanFilename : `${cleanFilename}.pdf`;
  
  return `${MEDIA_CONFIG.BASE_URL}${path}${finalFilename}`;
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
  
  return MEDIA_CONFIG.FALLBACK_URLS.map(url => `${url}${finalFilename}`);
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
