/**
 * Backend Health Check Service
 * Checks if the backend CMS is ready before showing content
 */

import { API_CONFIG, getApiUrl } from '../lib/apiConfig';

const API_BASE_URL = getApiUrl(API_CONFIG.WAGTAIL_API_BASE);

export interface BackendStatus {
  isReady: boolean;
  isHealthy: boolean;
  lastChecked: Date;
  error?: string;
}

class BackendHealthService {
  private static instance: BackendHealthService;
  private status: BackendStatus = {
    isReady: false,
    isHealthy: false,
    lastChecked: new Date(),
  };

  private constructor() {}

  static getInstance(): BackendHealthService {
    if (!BackendHealthService.instance) {
      BackendHealthService.instance = new BackendHealthService();
    }
    return BackendHealthService.instance;
  }

  /**
   * Check if backend is healthy and ready
   */
  async checkBackendHealth(): Promise<BackendStatus> {
    try {
      console.log('🔍 Checking backend health...');
      
      // Try to fetch the health endpoint
      const healthResponse = await fetch(`${API_BASE_URL}/health/`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      if (!healthResponse.ok) {
        throw new Error(`Health check failed: ${healthResponse.status}`);
      }

      // Try to fetch a simple API endpoint to ensure CMS is ready
      const apiResponse = await fetch(`${API_BASE_URL}/pages/`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!apiResponse.ok) {
        throw new Error(`API check failed: ${apiResponse.status}`);
      }

      this.status = {
        isReady: true,
        isHealthy: true,
        lastChecked: new Date(),
      };

      console.log('✅ Backend is healthy and ready');
      return this.status;

    } catch (error) {
      console.warn('⚠️ Backend health check failed:', error);
      
      this.status = {
        isReady: false,
        isHealthy: false,
        lastChecked: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error',
      };

      return this.status;
    }
  }

  /**
   * Wait for backend to be ready with retry logic
   */
  async waitForBackend(maxAttempts: number = 10, delayMs: number = 2000): Promise<BackendStatus> {
    console.log(`🔄 Waiting for backend to be ready (max ${maxAttempts} attempts)...`);

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(`Attempt ${attempt}/${maxAttempts}`);
      
      const status = await this.checkBackendHealth();
      
      if (status.isReady && status.isHealthy) {
        console.log('✅ Backend is ready!');
        return status;
      }

      if (attempt < maxAttempts) {
        console.log(`⏳ Backend not ready, waiting ${delayMs}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

    console.error('❌ Backend failed to become ready after all attempts');
    return this.status;
  }

  /**
   * Get current status
   */
  getStatus(): BackendStatus {
    return { ...this.status };
  }

  /**
   * Reset status
   */
  reset(): void {
    this.status = {
      isReady: false,
      isHealthy: false,
      lastChecked: new Date(),
    };
  }
}

export default BackendHealthService;
