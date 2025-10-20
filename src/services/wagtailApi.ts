/**
 * Wagtail CMS API Service
 * Provides methods to fetch content from the headless Wagtail CMS
 */

import { API_CONFIG, getApiUrl } from '../lib/apiConfig';

const API_BASE_URL = getApiUrl(API_CONFIG.WAGTAIL_API_BASE);

export interface WagtailPage {
  id: number;
  meta: {
    type: string;
    detail_url: string;
    html_url: string;
    slug: string;
    show_in_menus: boolean;
    seo_title: string;
    search_description: string;
    first_published_at: string;
    locale: string;
  };
  title: string;
  [key: string]: any;
}

export interface WagtailAPIResponse {
  meta: {
    total_count: number;
  };
  items: WagtailPage[];
}

/**
 * Fetch all pages from Wagtail CMS
 */
export const fetchPages = async (params?: Record<string, string>): Promise<WagtailAPIResponse> => {
  const queryParams = new URLSearchParams(params);
  const url = `${API_BASE_URL}/pages/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
  
  console.log('🌐 Fetching from:', url);
  
  const response = await fetch(url, {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ API Error:', response.status, response.statusText, errorText);
    throw new Error(`Failed to fetch pages: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  return response.json();
};

/**
 * Fetch a specific page by ID
 */
export const fetchPageById = async (id: number): Promise<WagtailPage> => {
  const response = await fetch(`${API_BASE_URL}/pages/${id}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch page ${id}: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Fetch a specific page by slug
 */
export const fetchPageBySlug = async (slug: string): Promise<WagtailPage | null> => {
  const response = await fetchPages({ slug });
  return response.items.length > 0 ? response.items[0] : null;
};

/**
 * Fetch home page with full details
 */
export const fetchHomePage = async (): Promise<WagtailPage | null> => {
  try {
    console.log('🔄 Fetching home page...');
    const response = await fetchPages({ type: 'cms_app.HomePage' });
    
    if (response.items.length > 0) {
      console.log('📄 Found home page, fetching details...');
      const pageId = response.items[0].id;
      const pageData = await fetchPageById(pageId);
      console.log('✅ Home page data loaded:', pageData);
      return pageData;
    }
    
    console.log('⚠️ No home page found');
    return null;
  } catch (error) {
    console.error('❌ Error fetching home page:', error);
    throw error;
  }
};

/**
 * Fetch pages by type
 */
export const fetchPagesByType = async (type: string): Promise<WagtailPage[]> => {
  const response = await fetchPages({ type });
  return response.items;
};

/**
 * Fetch images from Wagtail
 */
export const fetchImages = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/images/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch images: ${response.statusText}`);
  }
  
  return response.json();
};

export default {
  fetchPages,
  fetchPageById,
  fetchPageBySlug,
  fetchHomePage,
  fetchPagesByType,
  fetchImages,
};

