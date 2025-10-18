/**
 * Media Configuration for ARC Frontend
 * Handles media file paths and fallback URLs
 * 
 * @deprecated Use API_CONFIG from '../apiConfig' instead
 * This file is kept for backward compatibility but will be removed in future versions
 */

import { API_CONFIG, getMediaUrl, getFallbackUrls, findWorkingMediaUrl } from './apiConfig';

// Re-export for backward compatibility
export const MEDIA_CONFIG = {
  // Base URL for media files
  BASE_URL: API_CONFIG.BASE_URL,
  
  // Media paths
  RULES_PATH: API_CONFIG.RULES_PATH,
  IMAGES_PATH: API_CONFIG.IMAGES_PATH,
  DOCUMENTS_PATH: API_CONFIG.DOCUMENTS_PATH,
  
  // Wagtail API endpoints
  WAGTAIL_API_BASE: API_CONFIG.WAGTAIL_API_BASE,
  DOCUMENTS_API: API_CONFIG.DOCUMENTS_ENDPOINT,
  
  // Fallback URLs for different environments
  FALLBACK_URLS: API_CONFIG.FALLBACK_URLS
};

// Re-export functions from centralized config for backward compatibility
export { getMediaUrl, getFallbackUrls, findWorkingMediaUrl };
